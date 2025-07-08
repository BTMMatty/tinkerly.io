'use client';

import React, { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Clock, Code, DollarSign, Brain, Shield, Heart, Zap, Users, Calculator, ArrowRight, Sparkles, Star, Rocket, Wand2 } from 'lucide-react';
import { userService, analyticsService, testConnection, checkUserCredits } from '@/lib/supabase';

export default function TinkerPlatform() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [userCredits, setUserCredits] = useState({ hasCredits: false, creditsRemaining: 0, subscriptionTier: 'free' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          const { data: profile, error } = await userService.syncUser(user);
          
          if (!error && profile) {
            const credits = await checkUserCredits(user.id);
            setUserCredits(credits);
            
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

  const handleStartBuilding = () => {
    if (!isSignedIn) return;
    router.push('/create');
  };

  const handleViewProjects = () => {
    if (!isSignedIn) return;
    router.push('/dashboard');
  };

  const howItWorksSteps = [
    {
      icon: <Brain className="w-10 h-10" />,
      title: "AI Analysis",
      description: "Describe your project and get instant AI-powered scoping, pricing, and timeline estimation.",
      color: "emerald",
      delay: "0"
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: "Expert Development", 
      description: "Our skilled developers bring your vision to life with clean code and modern best practices.",
      color: "teal",
      delay: "100"
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Fast Delivery",
      description: "Get your project delivered 50% faster than industry standard with regular updates.",
      color: "cyan",
      delay: "200"
    }
  ];

  const features = [
    { 
      icon: <DollarSign className="w-8 h-8" />, 
      title: "Transparent Pricing", 
      desc: "Know exactly what you'll pay upfront",
      gradient: "from-green-400 to-emerald-600"
    },
    { 
      icon: <Clock className="w-8 h-8" />, 
      title: "Fast Turnaround", 
      desc: "50% faster than industry average",
      gradient: "from-blue-400 to-cyan-600"
    },
    { 
      icon: <Brain className="w-8 h-8" />, 
      title: "AI-Powered Scoping", 
      desc: "Accurate project estimation with AI",
      gradient: "from-purple-400 to-pink-600"
    },
    { 
      icon: <Code className="w-8 h-8" />, 
      title: "Modern Tech Stack", 
      desc: "Built with the latest technologies",
      gradient: "from-orange-400 to-red-600"
    },
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: "Quality Guaranteed", 
      desc: "100% satisfaction or money back",
      gradient: "from-teal-400 to-emerald-600"
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: "Expert Team", 
      desc: "Vetted developers and designers",
      gradient: "from-indigo-400 to-purple-600"
    }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section - Dark & Dramatic */}
      <div className="relative bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-emerald-400 opacity-40 text-4xl animate-bounce">✨</div>
          <div className="absolute top-40 right-20 text-teal-400 opacity-40 text-3xl animate-bounce animation-delay-2000">🧚‍♀️</div>
          <div className="absolute bottom-20 left-20 text-cyan-400 opacity-40 text-4xl animate-bounce animation-delay-4000">⚡</div>
          <div className="absolute bottom-40 right-10 text-emerald-400 opacity-40 text-3xl animate-pulse">🌟</div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-32 pb-24">
          <div className="text-center max-w-5xl mx-auto">
            <div className={`inline-flex items-center bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-lg border border-emerald-500/30 rounded-full px-8 py-3 mb-8 transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Sparkles className="w-5 h-5 mr-2 text-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-semibold text-lg">AI-Powered Development Magic</span>
              <Wand2 className="w-5 h-5 ml-2 text-teal-400 animate-pulse" />
            </div>
            
            <h1 className={`text-6xl md:text-8xl font-black mb-8 leading-tight transform transition-all duration-1000 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-gradient">
                Dream Into Reality
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto transform transition-all duration-1000 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Get AI-powered project scoping, transparent pricing, and 
              <span className="text-emerald-400 font-semibold"> 50% faster delivery</span>. 
              <br className="hidden md:block" />
              From idea to launch, Tinkerly.io makes development magical. ✨
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transform transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {isSignedIn ? (
                <button
                  onClick={handleStartBuilding}
                  className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Brain className="w-6 h-6 mr-3 relative z-10" />
                  <span className="relative z-10">Start Building</span>
                  <ArrowRight className="w-6 h-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <Brain className="w-6 h-6 mr-3 relative z-10" />
                    <span className="relative z-10">Start Building</span>
                    <ArrowRight className="w-6 h-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignInButton>
              )}
              
              {isSignedIn ? (
                <button
                  onClick={handleViewProjects}
                  className="group backdrop-blur-lg bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center hover:shadow-xl hover:shadow-white/20 transform hover:scale-105"
                >
                  <Calculator className="w-6 h-6 mr-3" />
                  View Projects
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="group backdrop-blur-lg bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center hover:shadow-xl hover:shadow-white/20 transform hover:scale-105">
                    <Calculator className="w-6 h-6 mr-3" />
                    View Projects
                  </button>
                </SignInButton>
              )}
            </div>

            {/* Trust indicators with glow */}
            <div className={`flex flex-wrap justify-center items-center gap-8 text-gray-300 transform transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center bg-white/5 backdrop-blur-lg px-6 py-3 rounded-full border border-white/10">
                <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                <span className="font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-lg px-6 py-3 rounded-full border border-white/10">
                <Clock className="w-5 h-5 mr-2 text-teal-400" />
                <span className="font-medium">50% Faster</span>
              </div>
              <div className="flex items-center bg-white/5 backdrop-blur-lg px-6 py-3 rounded-full border border-white/10">
                <Heart className="w-5 h-5 mr-2 text-pink-400" />
                <span className="font-medium">3 Free Analyses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="url(#wave-gradient)"/>
            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0">
                <stop offset="0%" stopColor="#f0fdf4"/>
                <stop offset="50%" stopColor="#ecfdf5"/>
                <stop offset="100%" stopColor="#f0fdfa"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* How It Works Section - Gradient Background */}
      <div className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full filter blur-3xl opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              How does Tinkerly.io work?
            </h2>
            <p className="text-gray-600 text-xl md:text-2xl">
              Simple, transparent, and magical ✨
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className={`group transform transition-all duration-700 delay-${step.delay} ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                  {/* Card background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${step.color}-500/5 to-${step.color}-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <div className={`relative z-10 w-20 h-20 bg-gradient-to-br from-${step.color}-400 to-${step.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:shadow-${step.color}-500/50 transition-all duration-300 group-hover:scale-110`}>
                    {step.icon}
                  </div>
                  <h3 className="relative z-10 text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                  <p className="relative z-10 text-gray-600 leading-relaxed text-lg">{step.description}</p>
                  
                  {/* Number badge */}
                  <div className={`absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-${step.color}-400 to-${step.color}-600 text-white rounded-full flex items-center justify-center font-bold text-sm`}>
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid - Dark Contrast Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2310b981" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
              Why Choose Tinkerly.io?
            </h2>
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto">
              We combine cutting-edge AI with expert developers to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className={`group transform transition-all duration-700 delay-${index * 50} ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 border border-gray-700 hover:border-emerald-500/50 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className={`relative z-10 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="relative z-10 font-bold text-xl mb-3 text-white">{feature.title}</h3>
                  <p className="relative z-10 text-gray-400">{feature.desc}</p>
                  
                  {/* Hover arrow */}
                  <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Vibrant Gradient */}
      <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-32 overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-300 rounded-full filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-16 text-center shadow-2xl overflow-hidden">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-20 blur-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center mb-8">
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300 animate-pulse" />
                <Star className="w-10 h-10 text-yellow-300 fill-yellow-300 animate-pulse mx-2" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300 animate-pulse" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
                Ready to build something amazing?
              </h2>
              <p className="text-emerald-100 text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
                Join hundreds of founders who trust Tinkerly.io with their vision
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {isSignedIn ? (
                  <button
                    onClick={handleStartBuilding}
                    className="group relative bg-white text-emerald-600 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <Rocket className="inline-block w-6 h-6 mr-3 relative z-10 group-hover:animate-bounce" />
                    <span className="relative z-10">Get Started - 3 Free Analyses ✨</span>
                  </button>
                ) : (
                  <SignInButton mode="modal">
                    <button className="group relative bg-white text-emerald-600 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <Rocket className="inline-block w-6 h-6 mr-3 relative z-10 group-hover:animate-bounce" />
                      <span className="relative z-10">Get Started - 3 Free Analyses ✨</span>
                    </button>
                  </SignInButton>
                )}
                
                <button className="group backdrop-blur-lg bg-white/20 border-2 border-white/50 text-white hover:bg-white/30 hover:border-white/70 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center">
                  <span>Schedule Demo</span>
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}