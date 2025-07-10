'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Check, X, Zap, Crown, Building, ArrowRight, Sparkles, Shield, Clock, Users, Star, Rocket, Brain, Code, DollarSign, Heart, MessageSquare, Calendar, Wand2, UserCheck, Headphones, Gift } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { SubscriptionButton } from '@/components/SubscriptionButton';

export default function ModernPricingPage() {
  const { isSignedIn } = useUser();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Fresh Pixies',
      price: { monthly: 0, annual: 0 },
      description: 'Start Your Journey into Ethical AI Development',
      highlight: '✨ Perfect for exploring what\'s possible',
      monthlyAnalyses: 3,
      features: [
        '3 AI project analyses per month',
        'AI-powered project scoping & transparent pricing',
        'Access to community Discord & forums',
        'Basic milestone planning templates',
        'Self-service knowledge base',
        '48-hour email support',
        'Basic documentation templates'
      ],
      limitations: [],
      humanSupport: 'Community Support',
      buttonText: 'Start Your Journey',
      popular: false,
      color: 'emerald',
      badge: null,
      icon: Wand2
    },
    {
      name: 'Pro Pixies',
      price: { monthly: 39, annual: 32 },
      description: 'Build With Confidence & Expert Guidance',
      highlight: '🚀 Most loved by growing businesses',
      monthlyAnalyses: 15,
      features: [
        '15 AI project analyses per month',
        'Weekly office hours with Tinkerly developers',
        'Priority project matching with verified developers',
        'Advanced risk assessment & mitigation planning',
        'Code quality review on first project',
        'Custom tech stack consultations',
        '24-hour priority email support',
        'Milestone payment protection guarantee',
        'Access to beta features & tools'
      ],
      limitations: [],
      humanSupport: 'Weekly Expert Guidance',
      buttonText: 'Join Pro Pixies',
      popular: true,
      color: 'emerald',
      badge: 'Most Popular',
      icon: Rocket
    },
    {
      name: 'Elite Pixies',
      price: { monthly: 99, annual: 79 },
      description: 'Accelerate Your Impact with Dedicated Support',
      highlight: '💎 For teams ready to scale ethically',
      monthlyAnalyses: 50,
      features: [
        '50 AI project analyses per month',
        'Dedicated success manager (monthly check-ins)',
        'Fast-track developer matching (48hr guarantee)',
        'White-glove project onboarding assistance',
        'Quarterly business strategy sessions',
        'Advanced analytics & project insights dashboard',
        'Custom workflow automation setup',
        'Same-day phone/video support',
        'Team collaboration tools (up to 5 seats)',
        'Priority access to new features'
      ],
      limitations: [],
      humanSupport: 'Dedicated Success Manager',
      buttonText: 'Become Elite',
      popular: false,
      color: 'purple',
      badge: null,
      icon: Crown
    },
    {
      name: 'Pixies Unlimited',
      price: { monthly: 299, annual: 239 },
      description: 'Transform Your Business with Full Concierge Service',
      highlight: '👑 The ultimate partnership experience',
      monthlyAnalyses: 'Unlimited',
      features: [
        'Unlimited AI project analyses',
        'Personal project architect assigned to your account',
        'Weekly 1-on-1 strategy calls',
        'Custom AI model training on your project patterns',
        'White-label platform options',
        'Dedicated Slack channel with Tinkerly team',
        'Quarterly executive business reviews',
        'Custom integrations & API access',
        'On-premise deployment options',
        'SLA guarantees (99.9% uptime)',
        'Priority access to Matty (Chief Pixie) himself'
      ],
      limitations: [],
      humanSupport: 'Personal Project Architect',
      buttonText: 'Go Unlimited',
      popular: false,
      color: 'gradient',
      badge: 'Enterprise',
      icon: Sparkles
    }
  ];

  const faqs = [
    {
      question: 'What exactly is an "AI project analysis"?',
      answer: 'Each analysis gives you a complete project breakdown including complexity scoring, transparent cost estimates, recommended tech stack, timeline projections, risk assessments, and milestone planning. It\'s everything you need to make informed decisions about your development project.'
    },
    {
      question: 'What\'s the difference between the Pixie tiers?',
      answer: 'It\'s all about the human touch! Fresh Pixies get community support, Pro Pixies enjoy weekly office hours with experts, Elite Pixies have a dedicated success manager, and Pixies Unlimited receive white-glove concierge service with a personal project architect.'
    },
    {
      question: 'What happens if I need more analyses?',
      answer: 'You can upgrade your tier anytime for immediate access to more analyses. We\'ll notify you when you\'re approaching your limit. If you consistently need more, it\'s probably time to spread your wings to the next tier!'
    },
    {
      question: 'Can I change my Pixie tier anytime?',
      answer: 'Absolutely! Upgrade or downgrade whenever your needs change. Changes take effect immediately with fair prorated billing. Your Pixie journey should grow with your business.'
    },
    {
      question: 'What makes Tinkerly.io different?',
      answer: 'We\'re the only platform combining AI-powered project analysis with transparent 80/20 developer payments, milestone-based escrow, and genuine human support at every tier. We\'re building an ethical alternative to traditional development platforms.'
    },
    {
      question: 'Do you really deliver 40-60% faster?',
      answer: 'Yes! Our AI-optimized workflows, pre-vetted developer network, and streamlined project management consistently deliver projects weeks ahead of traditional timelines, all while maintaining exceptional quality standards.'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'annual' ? plan.price.annual : plan.price.monthly;
  };

  const getSavings = (plan: typeof plans[0]) => {
    const monthly = plan.price.monthly;
    const annual = plan.price.annual;
    if (monthly === 0) return 0;
    return Math.round(((monthly - annual) / monthly) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50">
      <NavigationHeader />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Pixie Dust Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-emerald-400 rounded-full animate-float opacity-70"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-teal-300 rounded-full animate-float-delay-1 opacity-80"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-300 rounded-full animate-float-delay-2 opacity-60"></div>
          <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-teal-400 rounded-full animate-float opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center bg-emerald-500/20 border border-emerald-400/30 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-300" />
              <span className="text-emerald-200 font-medium">Simple Monthly Limits • Human Support • Ethical Development</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Choose Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                Pixie Path 🧚‍♀️
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-emerald-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              No confusing credits. No complex calculations. Just simple monthly analysis limits 
              and increasing levels of human support as you grow.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
                <div className="flex items-center">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      billingCycle === 'monthly'
                        ? 'bg-white text-emerald-600 shadow-lg'
                        : 'text-white hover:text-emerald-200'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`px-6 py-2 rounded-full font-medium transition-all relative ${
                      billingCycle === 'annual'
                        ? 'bg-white text-emerald-600 shadow-lg'
                        : 'text-white hover:text-emerald-200'
                    }`}
                  >
                    Annual
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-32 relative z-10">
        <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl border-2 p-6 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  plan.popular
                    ? 'border-emerald-400 shadow-emerald-500/20 ring-4 ring-emerald-100'
                    : plan.name === 'Pixies Unlimited'
                    ? 'border-gradient-to-r from-purple-400 to-emerald-400 shadow-purple-500/20'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`${
                      plan.badge === 'Most Popular' 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                      } text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center shadow-lg`}>
                      {plan.badge === 'Most Popular' ? (
                        <Star className="w-3 h-3 mr-1" />
                      ) : (
                        <Crown className="w-3 h-3 mr-1" />
                      )}
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  
                  {/* Analysis Limit Badge */}
                  <div className="inline-flex items-center bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 mb-4">
                    <Brain className="w-4 h-4 mr-2 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">
                      {plan.monthlyAnalyses === 'Unlimited' ? 'Unlimited' : plan.monthlyAnalyses} analyses/month
                    </span>
                  </div>
                  
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">${getPrice(plan)}</span>
                    {plan.price.monthly > 0 && (
                      <span className="text-lg text-gray-500 ml-1">/{billingCycle === 'annual' ? 'mo' : 'month'}</span>
                    )}
                  </div>
                  
                  {billingCycle === 'annual' && getSavings(plan) > 0 && (
                    <div className="text-emerald-600 font-medium text-xs">
                      Save {getSavings(plan)}% annually
                    </div>
                  )}
                  
                  {/* Human Support Highlight */}
                  <div className="mt-3 inline-flex items-center bg-purple-50 border border-purple-200 rounded-full px-3 py-1">
                    <UserCheck className="w-3 h-3 mr-1 text-purple-600" />
                    <span className="text-purple-700 font-medium text-xs">{plan.humanSupport}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-xs leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <p className="text-center text-xs text-gray-500 italic mb-6">{plan.highlight}</p>

                {/* Button */}
                {isSignedIn ? (
                  plan.name === 'Fresh Pixies' ? (
                    <Link href="/create">
                      <button className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800 text-sm">
                        {plan.buttonText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </Link>
                  ) : (
                    <SubscriptionButton
                      plan={plan}
                      billingCycle={billingCycle}
                    />
                  )
                ) : (
                  <SignInButton mode="modal">
                    <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center text-sm ${
                      plan.popular
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105'
                        : plan.name === 'Pixies Unlimited'
                        ? 'bg-gradient-to-r from-purple-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}>
                      {plan.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </SignInButton>
                )}
              </div>
            );
          })}
        </div>

        {/* Pixie Promise */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white border-2 border-emerald-300 rounded-full px-8 py-4 shadow-lg">
            <Heart className="w-6 h-6 text-red-500 mr-3" />
            <span className="text-gray-800 font-medium">
              The Pixie Promise: <span className="text-emerald-600 font-bold">80% to developers</span>, 
              <span className="text-purple-600 font-bold"> transparent pricing</span>, 
              <span className="text-blue-600 font-bold"> no hidden fees</span> — ever! 🧚‍♀️
            </span>
          </div>
        </div>
      </div>

      {/* Why Tinkerly Section - Updated */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Join the Pixie Revolution?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another dev platform. We're building an ethical, transparent, 
              human-first approach to software development.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">40-60% Faster</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                AI-powered workflows deliver projects weeks ahead of traditional timelines.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ethical First</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                80% goes to developers. Transparent pricing. Building a better industry.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Human Touch</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Real humans supporting your journey, not just automated responses.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Protected Always</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Milestone-based payments, quality guarantees, and 30-day refunds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pixie FAQs 🧚‍♀️
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about joining the Pixie revolution.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageSquare className="w-6 h-6 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-9">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated sparkles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-4xl animate-pulse">✨</div>
          <div className="absolute bottom-20 right-20 text-3xl animate-pulse animation-delay-1">🧚‍♀️</div>
          <div className="absolute top-40 right-10 text-2xl animate-pulse animation-delay-2">⭐</div>
          <div className="absolute bottom-40 left-20 text-3xl animate-pulse">💫</div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Spread Your Pixie Wings?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join the movement. Build ethically. Get real human support. 
              Start with 3 free analyses and see the magic happen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isSignedIn ? (
                <Link href="/create">
                  <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                    Start Your Pixie Journey
                    <Wand2 className="w-5 h-5 ml-2" />
                  </button>
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                    Become a Fresh Pixie (Free!)
                    <Sparkles className="w-5 h-5 ml-2" />
                  </button>
                </SignInButton>
              )}
              
              <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" />
                Meet the Chief Pixie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}