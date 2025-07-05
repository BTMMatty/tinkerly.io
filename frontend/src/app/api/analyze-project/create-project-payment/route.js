// app/api/create-project-payment/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { 
      projectId, 
      amount, 
      userId, 
      projectTitle, 
      timeline, 
      complexity 
    } = await request.json();
    
    console.log(`💰 Creating project payment: ${projectTitle} - $${amount}`);
    
    // Create Stripe Checkout Session for project payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Project Development: ${projectTitle}`,
            description: `${complexity} complexity • ${timeline} delivery • Full development + knowledge transfer`,
            images: ['https://tinker.io/project-icon.png'],
          },
          unit_amount: amount * 100, // Convert to cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?project=started&id=${projectId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?payment=canceled`,
      metadata: {
        projectId,
        userId,
        type: 'project_payment',
        amount: amount.toString(),
        projectTitle,
        timeline,
        complexity
      }
    });
    
    console.log('✅ Created project payment session:', session.id);
    
    return Response.json({ 
      url: session.url,
      sessionId: session.id 
    });
    
  } catch (error) {
    console.error('❌ Project payment error:', error);
    return Response.json(
      { error: 'Failed to create project payment session' }, 
      { status: 500 }
    );
  }
}