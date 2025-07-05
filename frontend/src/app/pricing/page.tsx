'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Check, Zap, Crown, ArrowRight, Sparkles, Clock, Users, CreditCard, Star, Brain, Shield, Lightbulb } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';

// Define interfaces for better type safety
interface PricingTier {
  id: string;
  name: string;
  credits: number;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  limitations?: string[];
  description: string;
  buttonText: string;
  color: string;
}

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const pricingTiers: PricingTier[] = [
    {
      id: 'free',
      name: 'Free',
      credits: 3,
      monthlyPrice: 0,
      annualPrice: 0,
      description: 'Perfect for trying out Tink.io',
      features: [
        '3 AI project analyses per month',
        'Basic project scoping',
        'Community support',
        'Standard templates',
        'Email support'
      ],
      limitations: [
        'Limited to 3 analyses',
        'No priority support',
        'Basic features only'
      ],
      buttonText: 'Get Started Free',
      popular: false,
      color: 'emerald'
    },
    {
      id: 'starter',
      name: 'Starter',
      credits: 50,
      monthlyPrice: 19,
      annualPrice: 190,
      description: 'For individual developers and small projects',
      features: [
        '50 AI analyses per month',
        'Advanced project scoping',
        'Priority email support',
        'Custom tech stack recommendations',
        'Project milestone tracking',
        'Code review included',
        'Export to PDF/Word'
      ],
      buttonText: 'Start Free Trial',
      popular: false,
      color: 'emerald'
    },
    {
      id: 'pro',
      name: 'Pro',
      credits: 200,
      monthlyPrice: 49,
      annualPrice: 490,
      description: 'For serious builders and entrepreneurs',
      features: [
        '200 AI analyses per month',
        'Everything in Starter',
        'Priority development queue',
        'Direct developer contact',
        'Advanced analytics dashboard',
        'API access',
        'Custom integrations',
        'Phone support'
      ],
      buttonText: 'Start Pro Trial',
      popular: true,
      color: 'emerald'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      credits: 1000,
      monthlyPrice: 199,
      annualPrice: 1990,
      description: 'For teams and larger organizations',
      features: [
        '1000+ AI analyses per month',
        'Everything in Pro',
        'Dedicated project manager',
        'Custom development team',
        'Advanced security compliance',
        'White-label solutions',
        'SLA guarantees',
        'Dedicated account manager'
      ],
      buttonText: 'Contact Sales',
      popular: false,
      color: 'emerald'
    }
  ];

  // Fixed: Added proper type annotation
  const getCurrentPrice = (tier: PricingTier): number => {
    return billingPeriod === 'annual' ? tier.annualPrice : tier.monthlyPrice;
  };

  // Fixed: Added proper type annotation
  const getSavings = (tier: PricingTier): string | null => {
    if (billingPeriod === 'annual' && tier.monthlyPrice > 0) {
      const monthlyCost = tier.monthlyPrice * 12;
      const savings = monthlyCost - tier.annualPrice;
      return `Save $${savings.toFixed(0)}`;
    }
    return null;
  };

  // Fixed: Added proper type annotation
  const handlePurchase = async (tierId: string): Promise<void> => {
    if (!isSignedIn) {
      alert('Please sign in to start your magical journey');
      return;
    }

    try {
      // Here you would integrate with your payment system
      console.log(`Purchasing ${tierId} plan for ${billingPeriod} billing`);
      
      // Example: Navigate to create project page for free tier
      if (tierId === 'free') {
        window.location.href = '/create';
        return;
      }

      // For paid tiers, integrate with Stripe or your payment processor
      alert(`Redirecting to payment for ${tierId} plan...`);
      
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  // Fixed: Added proper type annotation for event parameter
  const handleBillingChange = (period: 'monthly' | 'annual'): void => {
    setBillingPeriod(period);
  };

  const faqs = [
    {
      question: 'How does the credit system work?',
      answer: 'Each AI analysis consumes 1 credit. Credits reset monthly and unused credits don\'t roll over in the free plan. Paid plans include rollover credits.'
    },
    {
      question: 'Can I upgrade or downgrade anytime?',
      answer: 'Yes! You can change your plan at any time. Pro-rated billing applies, and you\'ll receive immediate access to new features.'
    },
    {
      question: 'What\'s included in AI project analysis?',
      answer: 'Our AI analyzes your project requirements and provides detailed breakdowns including cost estimates, technology recommendations, timeline projections, and potential risks.'
    },
    {
      question: 'Do you offer refunds?',
      answer: '100% money-back guarantee within 30 days if you\'re not completely satisfied with our service.'
    },
    {
      question: 'How accurate are the AI estimates?',
      answer: 'Our AI models achieve 85-90% accuracy in project scoping based on thousands of completed projects. All estimates include confidence scores.'
    },
    {
      question: 'Can I see examples of completed projects?',
      answer: 'Yes! Contact our team to see case studies and examples of projects we\'ve delivered for clients in your industry.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-emerald-100 border border-emerald-200 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Transparent Pricing • No Hidden Fees</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight pb-2">
              Simple, Transparent{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                Pricing
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
              Start building for free, then scale with our flexible plans. 
              No contracts, no setup fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-gray-100 p-1 rounded-lg flex">
                <button
                  onClick={() => handleBillingChange('monthly')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    billingPeriod === 'monthly'
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => handleBillingChange('annual')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    billingPeriod === 'annual'
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  Annual
                  <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border-2 p-8 ${
                tier.popular
                  ? 'border-emerald-500 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl scale-105'
                  : 'border-gray-200 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold">${getCurrentPrice(tier)}</span>
                  {getCurrentPrice(tier) > 0 && <span className="text-lg ml-1">/{billingPeriod === 'annual' ? 'year' : 'month'}</span>}
                </div>
                {getSavings(tier) && (
                  <div className="text-emerald-200 text-sm font-medium">{getSavings(tier)}</div>
                )}
                <p className="text-white/80">{tier.description}</p>
                <div className="mt-2">
                  <span className="text-sm text-emerald-200">{tier.credits} credits/{billingPeriod === 'annual' ? 'year' : 'month'}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 mr-3 text-white flex-shrink-0" />
                    <span className="text-white text-sm">{feature}</span>
                  </div>
                ))}
                
                {tier.limitations?.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-center opacity-60">
                    <span className="w-5 h-5 mr-3 text-white flex-shrink-0">×</span>
                    <span className="text-white text-sm line-through">{limitation}</span>
                  </div>
                ))}
              </div>

              {isSignedIn ? (
                <button
                  onClick={() => handlePurchase(tier.id)}
                  className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  {tier.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center">
                    {tier.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </SignInButton>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tink.io?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver projects 50% faster than industry standard with transparent pricing and expert quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                AI-powered development workflows that deliver projects 50% faster than traditional agencies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Every project includes code review, testing, and 30-day money-back guarantee.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Pricing</h3>
              <p className="text-gray-600">
                Get accurate cost estimates upfront with AI analysis. No surprises, no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and services.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to build something amazing?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of founders who trust Tink.io to bring their vision to life.
              Start with 3 free analyses today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isSignedIn ? (
                <Link href="/create">
                  <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-4 px-8 rounded-xl transition-colors duration-200 flex items-center justify-center">
                    Start Building Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold py-4 px-8 rounded-xl transition-colors duration-200 flex items-center justify-center">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </SignInButton>
              )}
              
              <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold py-4 px-8 rounded-xl transition-colors duration-200">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}