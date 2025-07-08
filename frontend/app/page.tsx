'use client';

import React, { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Clock, Code, DollarSign, Brain, Shield, Heart, Zap, Users, Calculator, ArrowRight, Sparkles } from 'lucide-react';
import { userService, analyticsService, testConnection, checkUserCredits } from '@/lib/supabase';

const TinkerPlatform = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [userCredits, setUserCredits] = useState({ hasCredits: false, creditsRemaining: 0, subscriptionTier: 'free' });

  // Test Supabase connection on mount
  useEffect(() => {
    const initializeSupabase = async () => {
      const isConnected = await testConnection();
      if (isConnected) {
        console.log('🚀 Supabase ready for Tinker.io!');
      }
    };
    initializeSupabase();
  }, []);

  // Sync user with Supabase when they sign in
  useEffect(() => {
    const syncUserProfile = async () => {
      if (isSignedIn && user?.id) {
        try {
          console.log('👤 Syncing user with database...');
          const { data: profile, error } = await userService.syncUser(user);
          
          if (error) {
            console.error('Error syncing user:', error);
          } else {
            console.log('✅ User synced successfully:', profile);
            
            // Check user credits
            const credits = await checkUserCredits(user.id);
            setUserCredits(credits);
            console.log('💳 User credits:', credits);
            
            // Track user login
            await analyticsService.trackEvent({
              user_id: user.id,
              event_type: 'user_login',
              event_data: { timestamp: new Date().toISOString() }
            });
          }
        } catch (error) {
          console.error('Failed to sync user:', error);
        }
      }
    };

    syncUserProfile();
  }, [isSignedIn, user?.id]);

  // Route-based navigation functions
  const handleStartBuilding = () => {
    if (!isSignedIn) {
      return;
    }
    router.push('/create');
  };

  const handleViewProjects = () => {
    if (!isSignedIn) {
      return;
    }
    router.push('/dashboard');
  };

  return (
    <div className="w-full">
      {/* Hero Section - Fixed viewport constraints */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Animated background elements - Constrained to parent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-32 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-400" />
              <span className="text-emerald-400 font-medium">AI-Powered Development Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your Dream
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Into Reality
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Get AI-powered project scoping, transparent pricing, and 50% faster delivery. 
              <br className="hidden md:block" />
              From idea to launch, Tinker.io makes development magical. ✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {isSignedIn ? (
                <button
                  onClick={handleStartBuilding}
                  className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Start Building
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Start Building
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignInButton>
              )}
              
              {isSignedIn ? (
                <button
                  onClick={handleViewProjects}
                  className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  View Projects
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    View Projects
                  </button>
                </SignInButton>
              )}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-emerald-400" />
                Enterprise-grade security
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-emerald-400" />
                50% faster delivery
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2 text-emerald-400" />
                3 free analyses
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How does Tinker.io work?</h2>
            <p className="text-gray-600 text-lg">Simple, transparent, and magical ✨</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "AI Analysis",
                description: "Describe your project and get instant AI-powered scoping, pricing, and timeline estimation.",
                color: "emerald"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Expert Development", 
                description: "Our skilled developers bring your vision to life with clean code and modern best practices.",
                color: "teal"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Fast Delivery",
                description: "Get your project delivered 50% faster than industry standard with regular updates.",
                color: "cyan"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-${step.color}-500/50`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <DollarSign className="w-6 h-6" />, title: "Transparent Pricing", desc: "Know exactly what you'll pay upfront" },
              { icon: <Clock className="w-6 h-6" />, title: "Fast Turnaround", desc: "50% faster than industry average" },
              { icon: <Brain className="w-6 h-6" />, title: "AI-Powered Scoping", desc: "Accurate project estimation with AI" },
              { icon: <Code className="w-6 h-6" />, title: "Modern Tech Stack", desc: "Built with the latest technologies" },
              { icon: <Shield className="w-6 h-6" />, title: "Quality Guaranteed", desc: "100% satisfaction or money back" },
              { icon: <Users className="w-6 h-6" />, title: "Expert Team", desc: "Vetted developers and designers" }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group border border-gray-100">
                <div className="text-emerald-500 mb-4 transition-all duration-300 group-hover:text-emerald-600">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build something amazing?</h2>
            <p className="text-emerald-100 text-lg mb-8">Join hundreds of founders who trust Tinker.io with their vision</p>
            
            {isSignedIn ? (
              <button
                onClick={handleStartBuilding}
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started - 3 Free Analyses ✨
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Get Started - 3 Free Analyses ✨
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TinkerPlatform;