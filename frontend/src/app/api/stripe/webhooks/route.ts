import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { userService, analyticsService } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object.id);
        break;

      // NEW: Subscription events
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

// EXISTING: Your credit purchase handler (preserved)
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { metadata } = session;
  
  console.log('Checkout completed:', session.id, metadata);
  
  // Handle credit purchases (your existing logic)
  if (metadata?.type === 'credit_purchase') {
    try {
      // Add credits to user account
      const credits = parseInt(metadata.credits);
      const { data: updatedUser } = await userService.addCredits(metadata.user_id, credits);
      
      console.log('Credits added:', credits, 'to user:', metadata.user_id);
      
      // Track the purchase
      await analyticsService.trackEvent({
        user_id: metadata.user_id,
        event_type: 'credit_purchase',
        event_data: {
          package_id: metadata.package_id,
          credits_purchased: credits,
          amount_paid: session.amount_total,
          session_id: session.id
        }
      });
      
      console.log('Credit purchase processed successfully');
    } catch (error) {
      console.error('Error processing credit purchase:', error);
    }
  }

  // NEW: Handle subscription purchases
  if (session.mode === 'subscription' && metadata?.clerkUserId) {
    try {
      const clerkUserId = metadata.clerkUserId;
      const planName = metadata.planName;
      const billingCycle = metadata.billingCycle;

      // Update user subscription status in Supabase
      const { data, error } = await userService.updateUser(clerkUserId, {
        subscription_tier: planName === 'professional' ? 'pro' : planName as 'enterprise',
        subscription_status: 'active',
        subscription_period: billingCycle as 'monthly' | 'annual',
        stripe_customer_id: session.customer as string,
        subscription_id: session.subscription as string,
        subscription_start_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      if (error) {
        console.error('❌ Failed to update user subscription:', error);
      } else {
        console.log(`✅ User ${clerkUserId} upgraded to ${planName} (${billingCycle})`);
        
        // Track subscription purchase
        await analyticsService.trackEvent({
          user_id: clerkUserId,
          event_type: 'subscription_purchase',
          event_data: {
            plan_name: planName,
            billing_cycle: billingCycle,
            amount_paid: session.amount_total,
            session_id: session.id
          }
        });
      }
    } catch (error) {
      console.error('❌ Error processing subscription purchase:', error);
    }
  }
}

// NEW: Subscription event handlers
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('📝 New subscription created:', subscription.id);

  try {
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    
    if (customer && !customer.deleted && customer.metadata?.clerkUserId) {
      const clerkUserId = customer.metadata.clerkUserId;
      
      // Update subscription details
      const { data, error } = await userService.updateUser(clerkUserId, {
        subscription_id: subscription.id,
        subscription_status: subscription.status as 'active' | 'canceled' | 'past_due',
        subscription_start_date: new Date(subscription.created * 1000).toISOString(),
        updated_at: new Date().toISOString()
      });

      if (error) {
        console.error('❌ Failed to update subscription details:', error);
      } else {
        console.log(`✅ Updated subscription details for user ${clerkUserId}`);
      }
    }
  } catch (error) {
    console.error('❌ Failed to process subscription creation:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('📋 Subscription updated:', subscription.id);

  try {
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    
    if (customer && !customer.deleted && customer.metadata?.clerkUserId) {
      const clerkUserId = customer.metadata.clerkUserId;
      
      // Update subscription status
      const { data, error } = await userService.updateUser(clerkUserId, {
        subscription_status: subscription.status as 'active' | 'canceled' | 'past_due',
        updated_at: new Date().toISOString()
      });
      
      if (error) {
        console.error('❌ Failed to update subscription status:', error);
      } else {
        console.log(`✅ Updated subscription status for user ${clerkUserId}: ${subscription.status}`);
      }
    }
  } catch (error) {
    console.error('❌ Failed to process subscription update:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('❌ Subscription canceled:', subscription.id);

  try {
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    
    if (customer && !customer.deleted && customer.metadata?.clerkUserId) {
      const clerkUserId = customer.metadata.clerkUserId;
      
      // Downgrade to free tier
      const { data, error } = await userService.updateUser(clerkUserId, {
        subscription_tier: 'free',
        subscription_status: 'canceled',
        subscription_period: undefined,
        subscription_id: undefined,
        subscription_end_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      if (error) {
        console.error('❌ Failed to downgrade user:', error);
      } else {
        console.log(`✅ User ${clerkUserId} downgraded to free tier`);
        
        // Track subscription cancellation
        await analyticsService.trackEvent({
          user_id: clerkUserId,
          event_type: 'subscription_canceled',
          event_data: {
            subscription_id: subscription.id,
            canceled_at: new Date().toISOString()
          }
        });
      }
    }
  } catch (error) {
    console.error('❌ Failed to process subscription cancellation:', error);
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('💰 Payment succeeded for invoice:', invoice.id);

  if ((invoice as any).subscription) {
    try {
      const customer = await stripe.customers.retrieve(invoice.customer as string);
      
      if (customer && !customer.deleted && customer.metadata?.clerkUserId) {
        const clerkUserId = customer.metadata.clerkUserId;
        
        // Ensure subscription is active after successful payment
        const { data, error } = await userService.updateUser(clerkUserId, {
          subscription_status: 'active',
          updated_at: new Date().toISOString()
        });
        
        if (error) {
          console.error('❌ Failed to update payment success status:', error);
        } else {
          console.log(`✅ Confirmed active subscription for user ${clerkUserId}`);
        }
      }
    } catch (error) {
      console.error('❌ Failed to process payment success:', error);
    }
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('💳 Payment failed for invoice:', invoice.id);

  if ((invoice as any).subscription) {
    try {
      const customer = await stripe.customers.retrieve(invoice.customer as string);
      
      if (customer && !customer.deleted && customer.metadata?.clerkUserId) {
        const clerkUserId = customer.metadata.clerkUserId;
        
        // Mark subscription as past due
        const { data, error } = await userService.updateUser(clerkUserId, {
          subscription_status: 'past_due',
          updated_at: new Date().toISOString()
        });
        
        if (error) {
          console.error('❌ Failed to update payment failure status:', error);
        } else {
          console.log(`⚠️ User ${clerkUserId} subscription marked as past due`);
          
          // Track payment failure
          await analyticsService.trackEvent({
            user_id: clerkUserId,
            event_type: 'payment_failed',
            event_data: {
              invoice_id: invoice.id,
              subscription_id: invoice.subscription,
              failed_at: new Date().toISOString()
            }
          });
        }
      }
    } catch (error) {
      console.error('❌ Failed to process payment failure:', error);
    }
  }
}