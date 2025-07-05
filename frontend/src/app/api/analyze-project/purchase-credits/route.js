// app/api/purchase-credits/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { packageType, userId } = await request.json();
    
    const packages = {
      starter: { 
        credits: 10, 
        price: 999,  // $9.99
        name: "Starter Pack",
        description: "10 AI project analyses"
      },
      professional: { 
        credits: 50, 
        price: 3999, // $39.99
        name: "Professional Pack", 
        description: "50 AI project analyses + priority support"
      },
      enterprise: { 
        credits: 200, 
        price: 9999, // $99.99
        name: "Enterprise Pack",
        description: "200 AI project analyses + dedicated support"
      }
    };
    
    const selectedPackage = packages[packageType];
    
    if (!selectedPackage) {
      return Response.json({ error: 'Invalid package type' }, { status: 400 });
    }
    
    console.log(`💳 Creating checkout for ${selectedPackage.name} - User: ${userId}`);
    
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: selectedPackage.name,
            description: selectedPackage.description,
            images: ['https://tinker.io/logo-512.png'], // Add your logo
          },
          unit_amount: selectedPackage.price,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?credits=purchased&amount=${selectedPackage.credits}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
      metadata: {
        userId: userId,
        credits: selectedPackage.credits.toString(),
        packageType: packageType,
        type: 'credit_purchase'
      }
    });
    
    console.log('✅ Created Stripe session:', session.id);
    
    return Response.json({ 
      url: session.url,
      sessionId: session.id 
    });
    
  } catch (error) {
    console.error('❌ Stripe error:', error);
    return Response.json(
      { error: 'Failed to create checkout session' }, 
      { status: 500 }
    );
  }
}