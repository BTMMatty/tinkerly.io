
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Price mapping based on your pricing page structure
const SUBSCRIPTION_PRICES = {
  monthly: {
    professional: 4900, // $49.00 in cents
    enterprise: 19900,  // $199.00 in cents
  },
  annual: {
    professional: 3900, // $39.00 in cents 
    enterprise: 15900,  // $159.00 in cents
  }
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planName, billingCycle, price } = await req.json();

    // Validate input
    if (!planName || !billingCycle || typeof price !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate the plan and price match our expected values
    const expectedPrice = SUBSCRIPTION_PRICES[billingCycle as keyof typeof SUBSCRIPTION_PRICES]?.[planName as 'professional' | 'enterprise'];
    if (!expectedPrice || expectedPrice !== price * 100) {
      return NextResponse.json({ 
        error: 'Invalid plan or price',
        expected: expectedPrice,
        received: price * 100
      }, { status: 400 });
    }

    // Create or retrieve Stripe customer
    let customer;
    try {
      // First, try to find existing customer by Clerk user ID
      const customers = await stripe.customers.list({
        limit: 1,
      });

      // Look for customer with matching Clerk user ID in metadata
      const existingCustomer = customers.data.find(c => c.metadata?.clerkUserId === userId);

      if (existingCustomer) {
        customer = existingCustomer;
        console.log('✅ Found existing Stripe customer:', customer.id);
      } else {
        // Create new customer
        customer = await stripe.customers.create({
          metadata: {
            clerkUserId: userId,
          },
        });
        console.log('✅ Created new Stripe customer:', customer.id);
      }
    } catch (error) {
      console.error('❌ Customer creation/retrieval failed:', error);
      return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
    }

    // Create Stripe Checkout Session
    try {
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Tinkerly.io ${planName.charAt(0).toUpperCase() + planName.slice(1)}`,
                description: `${billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)} subscription to Tinkerly.io ${planName} plan`,
              },
              unit_amount: expectedPrice,
              recurring: {
                interval: billingCycle === 'annual' ? 'year' : 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
        metadata: {
          clerkUserId: userId,
          planName,
          billingCycle,
        },
        // Enable automatic tax calculation
        automatic_tax: { enabled: true },
        // Collect customer address for tax calculation
        billing_address_collection: 'required',
        // Allow promotional codes
        allow_promotion_codes: true,
      });

      console.log('✅ Created Stripe checkout session:', session.id);
      
      return NextResponse.json({ 
        sessionId: session.id,
        customerId: customer.id 
      });

    } catch (error) {
      console.error('❌ Checkout session creation failed:', error);
      return NextResponse.json({ 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Subscription creation failed:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create subscription session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}