'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Check, Zap, Crown, ArrowRight, Sparkles, Clock, Users, CreditCard, Star, Brain, Shield, Lightbulb } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';

export default function MagicPricingPage() {
  const { isSignedIn, user } = useUser();
  const [isProcessing, setIsProcessing] = useState('');
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // monthly or annual

  const subscriptionTiers = [
    {
      id: 'starter',
      name: 'Starter Magic',
      monthlyPrice: 9.99,
      annualPrice: 99.99, // 16.7% discount (2 months free)
      credits: 15,
      description: 'Transform ideas into reality with pixie dust ✨',
      tagline: 'For 9.99 a month you can change the world with your own pixie dust',
      features: [
        '15 magical credits monthly',
        'Max 2 credits per project (complexity cap)',
        '2 concurrent projects',
        'Community pixie support',
        'Basic integrations',
        'Speed magic: 100x faster than agencies'
      ],
      additionalCreditPrice: 1.00,
      popular: false,
      color: 'emerald',
      emoji: '🧚‍♀️'
    },
    {
      id: 'professional',
      name: 'Professional Magic',
      monthlyPrice: 39.99,
      annualPrice: 399.99,
      credits: 40,
      description: 'Professional magic at your fingertips',
      tagline: 'Pixie dust everywhere - unlimited magical projects',
      features: [
        '40 magical credits monthly',
        'Unlimited projects & complexity',
        'Priority pixie queue',
        'API access for automation',
        'Team collaboration (10 users)',
        'Advanced integrations',
        'Priority support from senior pixies'
      ],
      additionalCreditPrice: 0.80, // 20% discount
      popular: true,
      color: 'emerald',
      emoji: '✨'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Wizardry',
      monthlyPrice: 99.99,
      annualPrice: 959.99, // 20% discount
      credits: 150,
      description: 'Enterprise-grade wizardry for teams',
      tagline: 'Pixies everywhere - magical teams at scale',
      features: [
        '150 magical credits monthly',
        'Unlimited everything',
        'SSO & advanced admin controls',
        'Dedicated account wizard',
        '99.9% uptime SLA',
        'Custom integrations',
        'Bulk credit discounts (50% off)',
        'White-label pixie magic'
      ],
      additionalCreditPrice: 0.60, // 40% discount
      popular: false,
      color: 'emerald',
      emoji: '🏰'
    }
  ];

const getCurrentPrice = (tier: any) => {
    return billingPeriod === 'annual' ? tier.annualPrice : tier.monthlyPrice;
  };

  const getSavings = (tier: any) => {
    if (billingPeriod === 'annual') {
      const monthlyCost = tier.monthlyPrice * 12;
      const savings = monthlyCost - tier.annualPrice;
      return `Save $${savings.toFixed(0)}`;
    }
    return null;
  };

  const handlePurchase = async (tierId) => {
    if (!isSignedIn) {
      alert('Please sign in to start your magical journey');
      return;
    }

    setIsProcessing(tierId);

    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId,
          billingPeriod,
          userId: user.id
        })
      });

      if (!response.ok) throw new Error('Failed to create subscription');

      const { url } = await response.json();
      window.location.href = url;
      
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Magic temporarily disrupted. Please try again! 🧚‍♀️');
    } finally {
      setIsProcessing('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <NavigationHeader />
      
      {/* Floating Magic Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl animate-bounce opacity-20">✨</div>
        <div className="absolute top-40 right-20 text-3xl animate-pulse opacity-30">🧚‍♀️</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-spin-slow opacity-20">⭐</div>
        <div className="absolute top-60 left-1/2 text-2xl animate-bounce opacity-25">🪄</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-100 border border-purple-300 rounded-full px-6 py-3 mb-8">
            <Crown className="w-5 h-5 mr-2 text-purple-600" />
            <span className="text-purple-800 font-bold">ANTI-EXPLOITATION PRICING</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Deploy in Minutes,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              Not Months ✨
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            <strong>Pay for value, not meetings.</strong> Our magical development platform delivers 
            100x faster than agencies at 90% less cost. No gatekeepers, no markup, no middlemen.
          </p>

          {/* Agency vs Us Comparison */}
          <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">The Magic Difference</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="bg-red-100 rounded-xl p-6 mb-4">
                  <h4 className="font-bold text-red-800 mb-2">😤 Traditional Agencies</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>$150/hour + hidden costs</li>
                    <li>3-6 months delivery</li>
                    <li>23 hours/week in meetings</li>
                    <li>Scope creep & revisions</li>
                    <li>$75K+ for complex projects</li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-emerald-100 rounded-xl p-6 mb-4">
                  <h4 className="font-bold text-emerald-800 mb-2">🧚‍♀️ Tink.io Magic</h4>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>$0.60-1.00 per credit</li>
                    <li>Hours to days delivery</li>
                    <li>Zero unnecessary meetings</li>
                    <li>Transparent, fixed pricing</li>
                    <li>Not $75k+ - Our pixies are real ones</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-1 shadow-lg border border-emerald-200">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                Monthly Magic
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  billingPeriod === 'annual'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                Annual Wizardry 
                <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {subscriptionTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border-2 p-8 transition-all hover:scale-105 ${
                tier.popular
                  ? 'border-emerald-500 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl scale-105'
                  : 'border-emerald-200 bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Magical
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{tier.emoji}</div>
                <h3 className={`text-2xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                  {tier.name}
                </h3>
                
                <div className="mb-4">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className={`text-5xl font-bold ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                      ${getCurrentPrice(tier).toFixed(0)}
                    </span>
                    <span className={`text-lg ml-1 ${tier.popular ? 'text-emerald-100' : 'text-gray-600'}`}>
                      /{billingPeriod === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>
                  
                  {billingPeriod === 'annual' && (
                    <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-medium inline-block mb-2">
                      💰 {getSavings(tier)}
                    </div>
                  )}
                  
                  <div className={`text-lg font-semibold ${tier.popular ? 'text-emerald-100' : 'text-emerald-600'}`}>
                    {tier.credits} Credits Included
                  </div>
                  <div className={`text-sm ${tier.popular ? 'text-emerald-200' : 'text-gray-500'}`}>
                    Extra credits: ${tier.additionalCreditPrice}/credit
                  </div>
                </div>

                <p className={`${tier.popular ? 'text-emerald-100' : 'text-gray-600'} italic`}>
                  {tier.description}
                </p>
                
                <div className={`mt-3 p-3 rounded-lg ${tier.popular ? 'bg-white bg-opacity-20' : 'bg-emerald-50'}`}>
                  <p className={`text-sm font-medium ${tier.popular ? 'text-white' : 'text-emerald-800'}`}>
                    "{tier.tagline}"
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${tier.popular ? 'text-white' : 'text-emerald-500'}`} />
                    <span className={`text-sm ${tier.popular ? 'text-white' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {isSignedIn ? (
                <button
                  onClick={() => handlePurchase(tier.id)}
                  disabled={isProcessing === tier.id}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
                    tier.popular
                      ? 'bg-white text-emerald-600 hover:bg-emerald-50'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                >
                  {isProcessing === tier.id ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                      Casting Spell...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Start {tier.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center ${
                    tier.popular
                      ? 'bg-white text-emerald-600 hover:bg-emerald-50'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start {tier.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </SignInButton>
              )}
            </div>
          ))}
        </div>

        {/* How Credits Work */}
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">How Magic Credits Work</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Complexity Scoring (1-10)</h3>
              <p className="text-gray-600 text-sm">AI analyzes your project complexity before you commit any credits</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Dynamic Consumption</h3>
              <p className="text-gray-600 text-sm">Simple (1-3) = 1 credit • Medium (4-6) = 2 credits • Complex (7-10) = 3 credits</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Starter Protection</h3>
              <p className="text-gray-600 text-sm">Starter users: max 2 credits per project regardless of complexity</p>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6">
            <h4 className="font-bold text-emerald-800 mb-4 text-center">✨ Credit Examples ✨</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-emerald-700">Simple Landing Page</div>
                <div className="text-emerald-600">Complexity: 2 → 1 Credit</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-emerald-700">E-commerce Platform</div>
                <div className="text-emerald-600">Complexity: 6 → 2 Credits</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-emerald-700">AI-Powered SaaS</div>
                <div className="text-emerald-600">Complexity: 9 → 3 Credits</div>
              </div>
            </div>
          </div>
        </div>

        {/* Magic Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Clock, title: "100x Faster", desc: "Deploy in hours, not months. Magic beats meetings every time." },
            { icon: Shield, title: "Transparent Pricing", desc: "See exactly what you pay for. No hidden costs, no scope creep." },
            { icon: Lightbulb, title: "90% Cost Savings", desc: "Skip the agency markup. Pay for results, not bureaucracy." }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Ideas into Reality? ✨
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who chose magic over meetings. 
              Start with 15 free credits - no pixie dust required.
            </p>
            
            {isSignedIn ? (
              <Link href="/create">
                <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Creating Magic
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Creating Magic
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}