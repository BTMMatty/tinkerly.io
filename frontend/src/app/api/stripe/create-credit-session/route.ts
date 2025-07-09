import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { CREDIT_PACKAGES } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { packageId } = await request.json();
    const creditPackage = CREDIT_PACKAGES.find(pkg => pkg.id === packageId);
    
    if (!creditPackage) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${creditPackage.name} - ${creditPackage.credits} Credits`,
              description: `AI Analysis Credits for Tinkerly.io`,
            },
            unit_amount: creditPackage.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?credit_purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?credit_purchase=cancelled`,
      customer_email: user.emailAddresses[0].emailAddress,
      metadata: {
        user_id: user.id,
        package_id: packageId,
        credits: creditPackage.credits.toString(),
        type: 'credit_purchase',
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Credit purchase error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}