// app/api/create-subscription/route.js
import Stripe from 'stripe';

export async function POST(request) {
  try {
    console.log('🧚‍♀️ Subscription API called');
    
    // Check if Stripe key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ Missing STRIPE_SECRET_KEY');
      return Response.json({ error: 'Stripe configuration missing' }, { status: 500 });
    }
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('📝 Request body:', body);
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }
    
    const { tierId, billingPeriod, userId } = body;
    
    // Validate required fields
    if (!tierId || !billingPeriod || !userId) {
      console.error('❌ Missing required fields:', { tierId, billingPeriod, userId });
      return Response.json({ 
        error: 'Missing required fields',
        received: { tierId, billingPeriod, userId }
      }, { status: 400 });
    }
    
    console.log(`🎯 Creating ${tierId} ${billingPeriod} subscription for user ${userId}`);
    
    // Tier pricing
    const tierPricing = {
      starter: { 
        monthly: 999, 
        annual: 9999, 
        credits: 15,
        name: 'Starter Magic' 
      },
      professional: { 
        monthly: 3999, 
        annual: 39999, 
        credits: 40,
        name: 'Professional Magic'
      },
      enterprise: { 
        monthly: 9999, 
        annual: 95999, 
        credits: 150,
        name: 'Enterprise Wizardry'
      }
    };
    
    const tier = tierPricing[tierId];
    if (!tier) {
      console.error('❌ Invalid tier:', tierId);
      return Response.json({ error: `Invalid tier: ${tierId}` }, { status: 400 });
    }
    
    const amount = tier[billingPeriod];
    if (!amount) {
      console.error('❌ Invalid billing period:', billingPeriod);
      return Response.json({ error: `Invalid billing period: ${billingPeriod}` }, { status: 400 });
    }
    
    console.log(`💰 Creating session for ${tier.name} - $${amount/100}`);
    
    // Create Stripe Checkout Session
    const sessionData = {
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tier.name} - ${billingPeriod === 'annual' ? 'Annual' : 'Monthly'}`,
            description: `${tier.credits} magical credits ${billingPeriod === 'annual' ? 'per year' : 'per month'}`,
            images: ['https://via.placeholder.com/300x300.png?text=Pixie+Dust'],
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment', // Start with one-time payments for simplicity
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/dashboard?subscription=success&tier=${tierId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pricing?canceled=true`,
      metadata: {
        userId,
        tierId,
        billingPeriod,
        credits: tier.credits.toString(),
        type: 'subscription'
      }
    };
    
    console.log('🔄 Creating Stripe session...');
    const session = await stripe.checkout.sessions.create(sessionData);
    
    console.log('✅ Session created:', session.id);
    
    return Response.json({ 
      url: session.url,
      sessionId: session.id,
      debug: {
        tier: tier.name,
        amount: amount,
        credits: tier.credits
      }
    });
    
  } catch (error) {
    console.error('❌ Subscription creation error:', error);
    console.error('❌ Error stack:', error.stack);
    
    return Response.json({ 
      error: 'Failed to create subscription',
      details: error.message,
      type: error.type || 'unknown'
    }, { status: 500 });
  }
}