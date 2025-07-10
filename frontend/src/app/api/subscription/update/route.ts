import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { userService, PIXIE_TIERS } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { pixieTier, stripeSubscriptionId } = body;

    // Validate tier with proper typing
    if (!pixieTier || !(pixieTier in PIXIE_TIERS)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // TypeScript now knows pixieTier is a valid key
    const validTier = pixieTier as keyof typeof PIXIE_TIERS;

    // Update user's pixie tier
    const { data, error } = await userService.upgradePixieTier(user.id, validTier);

    if (error) {
      console.error('Error updating tier:', error);
      return NextResponse.json({ error: 'Failed to update tier' }, { status: 500 });
    }

    // You might also want to store the Stripe subscription ID
    if (stripeSubscriptionId) {
      // Store in your database for future reference
      console.log('Stripe subscription ID:', stripeSubscriptionId);
    }

    return NextResponse.json({ 
      success: true, 
      pixieTier: data?.pixie_tier,
      message: `Welcome to ${PIXIE_TIERS[validTier].name}! 🧚‍♀️`
    });

  } catch (error) {
    console.error('Subscription update error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}