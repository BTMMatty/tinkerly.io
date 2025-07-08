'use client';

import React from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Brain, Clock, Shield, Heart, ArrowRight, Sparkles } from 'lucide-react';

export default function Page() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const handleStartBuilding = () => {
    if (!isSignedIn) return;
    router.push('/create');
  };

  const handleViewProjects = () => {
    if (!isSignedIn) return;
    router.push('/dashboard');
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 to-emerald-900 text-white overflow-hidden">
        <div className="container mx-auto px-6 pt-32 pb-24">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center bg-emerald-500 bg-opacity-20 backdrop-blur-lg border border-emerald-500 border-opacity-30 rounded-full px-8 py-3 mb-8">
              <Sparkles className="w-5 h-5 mr-2 text-emerald-400" />
              <span className="text-emerald-300 font-semibold text-lg">AI-Powered Development Magic</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Dream Into Reality
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Get AI-powered project scoping, transparent pricing, and 
              <span className="text-emerald-400 font-semibold"> 50% faster delivery</span>. 
              <br className="hidden md:block" />
              From idea to launch, Tinkerly.io makes development magical. ✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              {isSignedIn ? (
                <button
                  onClick={handleStartBuilding}
                  className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500 hover:shadow-opacity-50 transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  <Brain className="w-6 h-6 mr-3" />
                  <span>Start Building</span>
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500 hover:shadow-opacity-50 transition-all duration-300 transform hover:scale-105 flex items-center">
                    <Brain className="w-6 h-6 mr-3" />
                    <span>Start Building</span>
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignInButton>
              )}
              
              {isSignedIn ? (
                <button
                  onClick={handleViewProjects}
                  className="backdrop-blur-lg bg-white bg-opacity-10 border-2 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-20 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center"
                >
                  View Projects
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="backdrop-blur-lg bg-white bg-opacity-10 border-2 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-20 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 flex items-center">
                    View Projects
                  </button>
                </SignInButton>
              )}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-300">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                <span className="font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-teal-400" />
                <span className="font-medium">50% Faster</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-pink-400" />
                <span className="font-medium">3 Free Analyses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              How does Tinkerly.io work?
            </h2>
            <p className="text-gray-600 text-xl md:text-2xl">
              Simple, transparent, and magical ✨
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <Brain className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">AI Analysis</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Describe your project and get instant AI-powered scoping, pricing, and timeline estimation.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Expert Development</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our skilled developers bring your vision to life with clean code and modern best practices.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <ArrowRight className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Get your project delivered 50% faster than industry standard with regular updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 py-32">
        <div className="container mx-auto px-6 text-center">
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
                className="bg-white text-emerald-600 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started - 3 Free Analyses ✨
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-white text-emerald-600 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Get Started - 3 Free Analyses ✨
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}