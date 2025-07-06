'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Clock, Code, DollarSign, Brain, Shield, Heart, Zap, Users, Calculator, ArrowRight, Sparkles } from 'lucide-react';
import AuthHeader from '@/components/AuthHeader';

const TinkerPlatform = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [userCredits, setUserCredits] = useState({ hasCredits: false, creditsRemaining: 0, subscriptionTier: 'free' });

  // Test connection on mount
  useEffect(() => {
    console.log('🚀 Tink.io Platform Loading...');
  }, []);

  // Sync user when they sign in
  useEffect(() => {
    if (isSignedIn && user?.id) {
      console.log('👤 User signed in:', user.firstName);
      // Set default credits for demo
      setUserCredits({
        hasCredits: true,
        creditsRemaining: 3,
        subscriptionTier: 'free'
      });
    }
  }, [isSignedIn, user?.id]);

  // Route-based navigation functions
  const handleStartBuilding = () => {
    if (!isSignedIn) {
      return;
    }
    
    startTransition(() => {
      router.push('/create');
    });
  };

  const handleViewProjects = () => {
    if (!isSignedIn) {
      return;
    }
    
    startTransition(() => {
      router.push('/dashboard');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <AuthHeader />
      
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
            From idea to launch, Tinker.io makes development magical. ✨
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {/* Start Building Button */}
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
            
            {/* View Projects Button */}
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

      {/* How Tinker.io Works */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How does Tinker.io work?</h2>
          <p className="text-gray-400 text-lg">Simple, transparent, and magical ✨</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:brightness-110">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">AI Analysis</h3>
            <p className="text-gray-400 leading-relaxed">Describe your project and get instant AI-powered scoping, pricing, and timeline estimation.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:brightness-110">
              <Code className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Expert Development</h3>
            <p className="text-gray-400 leading-relaxed">Our skilled developers bring your vision to life with clean code and modern best practices.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:brightness-110">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Fast Delivery</h3>
            <p className="text-gray-400 leading-relaxed">Get your project delivered 50% faster than industry standard with regular updates.</p>
          </div>
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

      {/* The Story Section - FIXED VERSION */}
      <section id="story" className="relative z-10 py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Tinker.io Origin Story
            </h2>
            
            <div className="text-xl text-emerald-100 space-y-6 leading-relaxed">
              <p>
                <strong className="text-emerald-300">Born from frustration with exploitative development practices</strong>, 
                Tinker.io emerged when traditional agencies quoted outrageous prices for simple automation tasks.
              </p>
              
              <p>
                Our platform combines <strong className="text-teal-300">AI-powered project scoping</strong>, <strong className="text-teal-300">transparent pricing</strong>, 
                and <strong className="text-teal-300">knowledge transfer</strong> to create something revolutionary: 
                a development service that actually serves developers and clients equally.
              </p>
              
              <p>
                Every project comes with complete documentation, methodology explanations, and the tools 
                to understand exactly how your solution was built. Because true innovation happens when 
                knowledge is shared, not hoarded.
              </p>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/20">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-emerald-300 mb-2">AI-Powered Analysis</h3>
                <p className="text-emerald-100">
                  Intelligent project scoping that understands your needs and provides accurate estimates instantly.
                </p>
              </div>
              
              <div className="bg-teal-500/10 rounded-xl p-6 border border-teal-500/20">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-bold text-teal-300 mb-2">Transparent Pricing</h3>
                <p className="text-teal-100">
                  Know exactly what you're paying for with detailed breakdowns and no hidden fees.
                </p>
              </div>
              
              <div className="bg-cyan-500/10 rounded-xl p-6 border border-cyan-500/20">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-cyan-300 mb-2">Knowledge Transfer</h3>
                <p className="text-cyan-100">
                  Learn how your solution works with comprehensive documentation and methodology guides.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-center">
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
  );
};

export default TinkerPlatform;