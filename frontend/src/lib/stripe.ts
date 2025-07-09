// lib/stripe.ts
import { loadStripe, Stripe } from '@stripe/stripe-js';
import StripeSDK from 'stripe';

// Client-side Stripe
let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Server-side Stripe
export const stripe = new StripeSDK(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

// SUBSCRIPTION PLANS (matches your pricing page exactly)
export interface SubscriptionPlan {
  id: string;
  name: string;
  price_monthly: number; // in cents
  price_annual: number; // in cents
  stripe_price_monthly: string; // Stripe Price ID for monthly
  stripe_price_annual: string; // Stripe Price ID for annual
  analyses_per_month: number;
  features: string[];
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price_monthly: 0,
    price_annual: 0,
    stripe_price_monthly: '', // Free plan doesn't need Stripe
    stripe_price_annual: '',
    analyses_per_month: 3,
    features: ['3 AI project analyses per month', 'Basic project scoping', 'Community support']
  },
  {
    id: 'professional',
    name: 'Professional', 
    price_monthly: 4900, // $49
    price_annual: 3900, // $39 (annual discount)
    stripe_price_monthly: 'price_1234567890_professional_monthly', // You'll create these in Stripe
    stripe_price_annual: 'price_1234567890_professional_annual',
    analyses_per_month: 50,
    features: ['50 AI analyses per month', 'Advanced scoping', 'Priority support', 'Direct developer consultation']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price_monthly: 19900, // $199
    price_annual: 15900, // $159 (annual discount)
    stripe_price_monthly: 'price_1234567890_enterprise_monthly',
    stripe_price_annual: 'price_1234567890_enterprise_annual', 
    analyses_per_month: 999, // Unlimited
    features: ['Unlimited analyses', 'Dedicated project manager', 'Custom development team', 'SLA guarantees']
  }
];

// PROJECT MILESTONE SYSTEM (separate from subscriptions)
export interface ProjectMilestone {
  id: string;
  project_id: string;
  milestone_number: number;
  amount: number; // in cents
  description: string;
  status: 'pending' | 'paid' | 'released' | 'disputed';
  due_date?: string;
  stripe_payment_intent_id?: string;
}

// Helper functions
export const getPlanByBilling = (planId: string, billingCycle: 'monthly' | 'annual') => {
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  if (!plan) return null;
  
  return {
    ...plan,
    price: billingCycle === 'annual' ? plan.price_annual : plan.price_monthly,
    stripe_price_id: billingCycle === 'annual' ? plan.stripe_price_annual : plan.stripe_price_monthly
  };
};