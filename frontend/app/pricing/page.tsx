'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Check, X, Zap, Crown, Building, ArrowRight, Sparkles, Shield, Clock, Users, Star, Rocket, Brain, Code, DollarSign, Heart, MessageSquare, Calendar } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { SubscriptionButton } from '@/components/SubscriptionButton'; // ← ADD THIS IMPORT

export default function ModernPricingPage() {
  const { isSignedIn } = useUser();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for exploring AI-powered development',
      highlight: 'Most Popular for Beginners',
      features: [
        '3 AI project analyses per month',
        'Basic project scoping & pricing',
        'Community support & Discord access',
        'Standard tech stack recommendations',
        'Project timeline estimates',
        'Basic documentation templates'
      ],
      limitations: [
        'Limited to 3 analyses monthly',
        'Community support only',
        'Standard response time'
      ],
      buttonText: 'Start Free',
      popular: false,
      color: 'emerald',
      badge: null
    },
    {
      name: 'Professional',
      price: { monthly: 49, annual: 39 },
      description: 'For serious builders and growing businesses',
      highlight: 'Best Value - Most Popular',
      features: [
        '50 AI analyses per month',
        'Advanced project scoping with risk assessment',
        'Priority development queue placement',
        'Custom tech stack recommendations',
        'Direct developer consultation calls',
        'Advanced project milestone tracking',
        'Code review & quality assurance',
        'Priority support (24-48h response)',
        'Access to beta features & tools',
        'Custom branding on deliverables'
      ],
      limitations: [],
      buttonText: 'Start Pro Trial',
      popular: true,
      color: 'emerald',
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise',
      price: { monthly: 199, annual: 159 },
      description: 'For teams and mission-critical projects',
      highlight: 'Maximum Power & Control',
      features: [
        'Unlimited AI analyses',
        'Dedicated project manager assigned',
        'Custom development team allocation',
        'Advanced security & compliance (SOC2, GDPR)',
        'White-label solutions available',
        'Custom API access & integrations',
        'Advanced analytics & reporting',
        'SLA guarantees (99.9% uptime)',
        'Custom workflow automation',
        'On-premise deployment options',
        'Priority phone support (1-4h response)',
        'Quarterly business reviews'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      popular: false,
      color: 'purple',
      badge: 'Enterprise'
    }
  ];

  const faqs = [
    {
      question: 'How does the subscription system work?',
      answer: 'Choose a plan that fits your needs. Starter gives you 3 free analyses monthly, Professional includes 50 analyses with advanced features, and Enterprise provides unlimited analyses with dedicated support.'
    },
    {
      question: 'What happens if I exceed my monthly analyses?',
      answer: 'Professional users can upgrade to Enterprise for unlimited analyses. We\'ll notify you before you hit your limit and provide upgrade options. Enterprise users have unlimited analyses.'
    },
    {
      question: 'Can I upgrade or downgrade anytime?',
      answer: 'Absolutely! You can change plans anytime with immediate effect. We provide prorated billing for fair transitions and immediate access to new features.'
    },
    {
      question: 'What\'s included in AI project analysis?',
      answer: 'Our AI provides detailed breakdowns including complexity scoring, accurate cost estimates, technology recommendations, timeline projections, risk assessments, development phases, and team requirements.'
    },
    {
      question: 'Do you offer refunds?',
      answer: '100% money-back guarantee within 30 days if you\'re not completely satisfied. For Enterprise customers, we offer custom SLAs and guarantees.'
    },
    {
      question: 'How fast do you actually deliver projects?',
      answer: 'We consistently deliver 40-60% faster than industry standard through AI-optimized workflows, experienced teams, and proven methodologies. Most projects complete 2-4 weeks ahead of traditional timelines.'
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center bg-emerald-500/20 border border-emerald-400/30 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-300" />
              <span className="text-emerald-200 font-medium">Transparent Pricing • No Hidden Fees • No Contracts</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Pricing That Makes
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                Perfect Sense
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-emerald-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              Start building for free, scale with confidence. No surprises, no setup fees, 
              no long-term contracts. Just transparent, fair pricing that grows with you.
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
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
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
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border-2 p-8 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                plan.popular
                  ? 'border-emerald-400 shadow-emerald-500/20 ring-4 ring-emerald-100'
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`${
                    plan.badge === 'Most Popular' 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                      : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                    } text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg`}>
                    {plan.badge === 'Most Popular' ? (
                      <Star className="w-4 h-4 mr-1" />
                    ) : (
                      <Crown className="w-4 h-4 mr-1" />
                    )}
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-6xl font-bold text-gray-900">${getPrice(plan)}</span>
                  {plan.price.monthly > 0 && (
                    <span className="text-xl text-gray-500 ml-1">/{billingCycle === 'annual' ? 'mo' : 'month'}</span>
                  )}
                </div>
                
                {billingCycle === 'annual' && getSavings(plan) > 0 && (
                  <div className="text-emerald-600 font-medium text-sm">
                    Save {getSavings(plan)}% with annual billing
                  </div>
                )}
                
                <p className="text-emerald-600 font-medium text-sm mt-2">{plan.highlight}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 mr-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-start opacity-60">
                    <X className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500 line-through text-sm">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* UPDATED: Enhanced Button Section with Stripe Integration */}
              {isSignedIn ? (
                plan.name === 'Starter' ? (
                  // Free plan - direct to dashboard
                  <Link href="/create">
                    <button className="w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800">
                      {plan.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </Link>
                ) : (
                  // Paid plans - use Stripe subscription
                  <SubscriptionButton
                    plan={plan}
                    billingCycle={billingCycle}
                  />
                )
              ) : (
                // Not signed in - show sign in modal
                <SignInButton mode="modal">
                  <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}>
                    {plan.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </SignInButton>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Tinkerly.io?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver projects 40-60% faster than industry standard with unmatched transparency and quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered development workflows deliver projects 40-60% faster than traditional agencies.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Guaranteed</h3>
              <p className="text-gray-600 leading-relaxed">
                Every project includes comprehensive testing, code review, and 30-day money-back guarantee.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                Get accurate cost estimates upfront with AI analysis. No surprises, no hidden fees, ever.
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and services.
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
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to build something amazing?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of founders who trust Tinkerly.io to bring their vision to life.
              Start with 3 free analyses today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isSignedIn ? (
                <Link href="/create">
                  <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                    Start Building Now
                    <Brain className="w-5 h-5 ml-2" />
                  </button>
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                    Get Started Free
                    <Rocket className="w-5 h-5 ml-2" />
                  </button>
                </SignInButton>
              )}
              
              <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}