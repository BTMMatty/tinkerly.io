'use client';

import React from 'react';
import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Sparkles, LogIn, UserPlus } from 'lucide-react';

const AuthHeader = () => {
  const { isSignedIn } = useUser();

  // Don't show auth header if user is already signed in
  if (isSignedIn) return null;

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo and Company Name - Left Side */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Tinkerly Studio
          </div>
        </div>

        {/* Auth Buttons - Right Side */}
        <div className="flex items-center space-x-4">
          <SignInButton mode="modal">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/5">
              <LogIn className="w-4 h-4" />
              <span className="font-medium">Returning for more pixie dust?</span>
            </button>
          </SignInButton>
          
          <SignUpButton mode="modal">
            <button className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">First time, Tinkerbell?</span>
            </button>
          </SignUpButton>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;