import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { userService, PIXIE_TIERS } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pixieTier, stripeSubscriptionId } = await request.json();

    // Validate tier
    if (!PIXIE_TIERS[pixieTier]) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Update user's pixie tier
    const { data, error } = await userService.upgradePixieTier(user.id, pixieTier);

    if (error) {
      console.error('Error updating tier:', error);
      return NextResponse.json({ error: 'Failed to update tier' }, { status: 500 });
    }

    // You might also want to store the Stripe subscription ID
    if (stripeSubscriptionId) {
      // Store in your database for future reference
    }

    return NextResponse.json({ 
      success: true, 
      pixieTier: data?.pixie_tier,
      message: `Welcome to ${PIXIE_TIERS[pixieTier].name}! 🧚‍♀️`
    });

  } catch (error) {
    console.error('Subscription update error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}