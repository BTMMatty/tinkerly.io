import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { userService, PIXIE_TIERS } from '@/lib/supabase';

// Define the valid tier type
type ValidPixieTier = keyof typeof PIXIE_TIERS;

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const pixieTier: string = body.pixieTier;
    const stripeSubscriptionId: string | undefined = body.stripeSubscriptionId;

    // Check if the tier is valid
    const validTiers: ValidPixieTier[] = ['fresh', 'pro', 'elite', 'unlimited'];
    
    if (!pixieTier || !validTiers.includes(pixieTier as ValidPixieTier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Cast to valid tier type after validation
    const validatedTier = pixieTier as ValidPixieTier;

    // Update user's pixie tier
    const { data, error } = await userService.upgradePixieTier(user.id, validatedTier);

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
      message: `Welcome to ${PIXIE_TIERS[validatedTier].name}! 🧚‍♀️`
    });

  } catch (error) {
    console.error('Subscription update error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}