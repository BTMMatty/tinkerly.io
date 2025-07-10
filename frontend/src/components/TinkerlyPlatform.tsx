'use client';

import React, { useState, useEffect, startTransition, useCallback, useRef } from 'react';
import { useUser, SignInButton, type User } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Clock, Code, DollarSign, Brain, Shield, Heart, Zap, Users, Calculator, ArrowRight, Sparkles } from 'lucide-react';
import AuthHeader from './AuthHeader';
import Footer from './Footer';
import { userService, analyticsService, testConnection, checkUserAnalyses } from '@/lib/supabase';

const TinkerlyPlatform = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  
  // 🔧 FIX: State to prevent infinite loops
  const [userCredits, setUserCredits] = useState({ hasCredits: false, creditsRemaining: 0, subscriptionTier: 'free' });
  const [syncAttempted, setSyncAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  
  // 🔧 FIX: Use ref to track if Supabase was initialized
  const supabaseInitialized = useRef(false);

  // 🔧 FIX: Test Supabase connection ONCE only
  useEffect(() => {
    if (supabaseInitialized.current) return;
    
    const initializeSupabase = async () => {
      try {
        const isConnected = await testConnection();
        if (isConnected) {
          console.log('🚀 Supabase ready for Tinkerly.io!');
        } else {
          console.error('❌ Supabase connection failed');
        }
        supabaseInitialized.current = true;
      } catch (error) {
        console.error('❌ Supabase initialization error:', error);
        supabaseInitialized.current = true;
      }
    };
    
    initializeSupabase();
  }, []); // Empty deps - runs once only

  // 🔧 FIX: Stable sync function using useCallback with proper types
  const syncUserProfile = useCallback(async (clerkUser: User | null | undefined) => {
    // Prevent multiple sync attempts
    if (syncAttempted || isLoading || !clerkUser?.id) {
      console.log('🔄 Sync skipped - already attempted or invalid user');
      return;
    }

    setIsLoading(true);
    setSyncAttempted(true);
    setSyncError(null);

    try {
      console.log('🔍 STARTING USER SYNC DEBUG');
      console.log('👤 Clerk User Data:', {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        fullName: clerkUser.fullName,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl
      });
      
      console.log('🧚‍♀️ Calling userService.syncUser...');
      const { data: profile, error } = await userService.syncUser(clerkUser);
      
      console.log('📊 SyncUser Result:', { profile, error });
      
      if (error) {
        console.error('❌ SyncUser ERROR:', error);
        setSyncError(error.message || 'Unknown sync error');
        
        // Set default credits on error
        setUserCredits({
          hasCredits: true,
          creditsRemaining: 3,
          subscriptionTier: 'free'
        });
        
        // Try to understand the error better
        if (error.message) console.error('💬 Error message:', error.message);
        if (error.details) console.error('📋 Error details:', error.details);
        if (error.hint) console.error('💡 Error hint:', error.hint);
        if (error.code) console.error('🔢 Error code:', error.code);
      } else {
        console.log('✅ User synced successfully:', profile);
        
        // 🔧 FIX: Use checkUserAnalyses instead of checkUserCredits
        console.log('🔄 Checking user analyses...');
        try {
          const analyses = await checkUserAnalyses(clerkUser.id);
          setUserCredits({
            hasCredits: analyses.canAnalyze,
            creditsRemaining: analyses.remaining,
            subscriptionTier: analyses.pixieTier === 'fresh' ? 'free' : 'pro'
          });
          console.log('💳 User analyses result:', analyses);
        } catch (creditError) {
          console.error('⚠️ Credit check failed:', creditError);
          // Use defaults if credit check fails
          setUserCredits({
            hasCredits: true,
            creditsRemaining: 3,
            subscriptionTier: 'free'
          });
        }
        
        // Track user login (non-blocking)
        try {
          await analyticsService.trackEvent({
            user_id: clerkUser.id,
            event_type: 'user_login',
            event_data: { 
              timestamp: new Date().toISOString(),
              platform: 'web',
              userAgent: navigator.userAgent
            }
          });
          console.log('📊 Analytics event tracked');
        } catch (analyticsError) {
          console.warn('⚠️ Analytics tracking failed (non-critical):', analyticsError);
        }
      }
    } catch (error) {
      console.error('💥 SYNC USER CATASTROPHIC FAILURE:', error);
      
      // 🔧 FIX: Properly handle unknown error type
      if (error instanceof Error) {
        console.error('📍 Error name:', error.name);
        console.error('📝 Error message:', error.message);
        console.error('🗂️ Error stack:', error.stack);
        setSyncError(error.message);
      } else {
        console.error('📝 Unknown error type:', typeof error);
        console.error('🔍 Error details:', error);
        setSyncError('Unknown error occurred');
      }
      
      // Set safe defaults on catastrophic failure
      setUserCredits({
        hasCredits: true,
        creditsRemaining: 3,
        subscriptionTier: 'free'
      });
    } finally {
      setIsLoading(false);
    }
  }, [syncAttempted, isLoading]); // Only depend on sync state

  // 🔧 FIX: Only sync when conditions are met and not already attempted
  useEffect(() => {
    if (isSignedIn && user?.id && !syncAttempted && !isLoading) {
      console.log('🚀 Starting user sync for:', user.id);
      syncUserProfile(user);
    } else {
      console.log('⏳ Sync conditions not met:', { 
        isSignedIn, 
        hasUserId: !!user?.id, 
        syncAttempted, 
        isLoading 
      });
    }
  }, [isSignedIn, user?.id, syncUserProfile, syncAttempted, isLoading]);

  // 🔧 FIX: Reset sync state when user changes
  useEffect(() => {
    if (!isSignedIn || !user?.id) {
      setSyncAttempted(false);
      setIsLoading(false);
      setSyncError(null);
      setUserCredits({ hasCredits: false, creditsRemaining: 0, subscriptionTier: 'free' });
    }
  }, [isSignedIn, user?.id]);

  // Route-based navigation functions
  const handleStartBuilding = () => {
    if (!isSignedIn) {
      return; // SignInButton will handle this
    }
    
    startTransition(() => {
      router.push('/create');
    });
  };

  const handleViewProjects = () => {
    if (!isSignedIn) {
      return; // SignInButton will handle this
    }
    
    startTransition(() => {
      router.push('/dashboard');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <AuthHeader />
      
      {/* 🔧 ENHANCED: Debug info with more details */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 right-4 z-50 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm border border-emerald-500/30">
          <h4 className="font-bold text-emerald-400 mb-2">🔍 Debug Info</h4>
          <div className="space-y-1">
            <p>Auth: {isSignedIn ? '✅ Signed In' : '❌ Not Signed In'}</p>
            <p>User ID: {user?.id ? `✅ ${user.id.slice(-8)}` : '❌ None'}</p>
            <p>Email: {user?.emailAddresses[0]?.emailAddress || '❌ None'}</p>
            <p>Sync: {syncAttempted ? '✅ Attempted' : '⏳ Pending'}</p>
            <p>Loading: {isLoading ? '🔄 Yes' : '✅ No'}</p>
            <p>Error: {syncError ? `❌ ${syncError.slice(0, 20)}...` : '✅ None'}</p>
            <p>Credits: {userCredits.creditsRemaining}</p>
            <p>Tier: {userCredits.subscriptionTier}</p>
            <p>Can Analyze: {userCredits.hasCredits ? '✅' : '❌'}</p>
          </div>
        </div>
      )}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
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
            From idea to launch, Tinkerly makes development magical. ✨
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {/* Start Building Button - Updated with loading state */}
            {isSignedIn ? (
              <button
                onClick={handleStartBuilding}
                disabled={isLoading}
                className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Brain className="w-5 h-5 mr-2" />
                {isLoading ? 'Loading...' : 'Start Building'}
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
            
            {/* View Projects Button - Updated with loading state */}
            {isSignedIn ? (
              <button
                onClick={handleViewProjects}
                disabled={isLoading}
                className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className="w-5 h-5 mr-2" />
                {isLoading ? 'Loading...' : 'View Projects'}
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

          {/* Trust indicators - Updated with loading state */}
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
              {isLoading ? 'Loading...' : `${userCredits.creditsRemaining || 3} free analyses`}
            </div>
          </div>
        </div>
      </div>

      {/* How Tinkerly Works */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How does Tinkerly work?</h2>
          <p className="text-gray-400 text-lg">Simple, transparent, and magical ✨</p>
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
              <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-${step.color}-500/50 group-hover:brightness-110`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { icon: <DollarSign className="w-6 h-6" />, title: "Transparent Pricing", desc: "Know exactly what you'll pay upfront" },
            { icon: <Clock className="w-6 h-6" />, title: "Fast Turnaround", desc: "50% faster than industry average" },
            { icon: <Brain className="w-6 h-6" />, title: "AI-Powered Scoping", desc: "Accurate project estimation with AI" },
            { icon: <Code className="w-6 h-6" />, title: "Modern Tech Stack", desc: "Built with the latest technologies" },
            { icon: <Shield className="w-6 h-6" />, title: "Quality Guaranteed", desc: "100% satisfaction or money back" },
            { icon: <Users className="w-6 h-6" />, title: "Expert Team", desc: "Vetted developers and designers" }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="text-emerald-400 mb-4 transition-all duration-300 group-hover:text-emerald-300 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - Updated with loading state */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build something amazing?</h2>
          <p className="text-emerald-100 text-lg mb-8">Join hundreds of founders who trust Tinkerly with their vision</p>
          
          {isSignedIn ? (
            <button
              onClick={handleStartBuilding}
              disabled={isLoading}
              className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Get Started - 3 Free Analyses ✨'}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TinkerlyPlatform;