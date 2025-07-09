'use client';

import React, { useState } from 'react';
import { ArrowRight, Crown, Zap, Loader } from 'lucide-react';

interface SubscriptionButtonProps {
  plan: {
    name: string;
    price: { monthly: number; annual: number };
    buttonText: string;
    popular?: boolean;
  };
  billingCycle: 'monthly' | 'annual';
}

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  plan, 
  billingCycle
}) => {
  const [loading, setLoading] = useState(false);
  
  // Get the correct price based on billing cycle
  const currentPrice = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual;

  const handleSubscribe = async () => {
    // Free plan - direct to create page (dashboard access)
    if (currentPrice === 0) {
      window.location.href = '/create';
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          planName: plan.name.toLowerCase(),
          billingCycle,
          price: currentPrice
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create subscription');
      }
      
      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await import('@stripe/stripe-js').then(m => 
        m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      );
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      alert(`Subscription failed: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSubscribe}
      disabled={loading}
      className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
        plan.popular
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105'
          : 'bg-gray-900 text-white hover:bg-gray-800'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <>
          <Loader className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {currentPrice === 0 ? (
            <Zap className="w-4 h-4 mr-2" />
          ) : plan.popular ? (
            <Crown className="w-4 h-4 mr-2" />
          ) : null}
          {plan.buttonText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </>
      )}
    </button>
  );
};