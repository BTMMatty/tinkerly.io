import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { userService, PIXIE_TIERS } from '@/lib/supabase';

// Define proper types
type PixieTier = 'fresh' | 'pro' | 'elite' | 'unlimited';

interface SubscriptionUpdateRequest {
  pixieTier: string;
  stripeSubscriptionId?: string;
}

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: SubscriptionUpdateRequest = await request.json();
    const { pixieTier, stripeSubscriptionId } = body;

    // Type guard to check if pixieTier is valid
    const isValidTier = (tier: string): tier is PixieTier => {
      return tier in PIXIE_TIERS;
    };

    // Validate tier
    if (!pixieTier || !isValidTier(pixieTier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Now TypeScript knows pixieTier is a valid PixieTier
    // Update user's pixie tier
    const { data, error } = await userService.upgradePixieTier(user.id, pixieTier);

    if (error) {
      console.error('Error updating tier:', error);
      return NextResponse.json({ error: 'Failed to update tier' }, { status: 500 });
    }

    // Store Stripe subscription ID if provided
    if (stripeSubscriptionId) {
      // TODO: Store in your database for future reference
      console.log('Stripe subscription ID:', stripeSubscriptionId);
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