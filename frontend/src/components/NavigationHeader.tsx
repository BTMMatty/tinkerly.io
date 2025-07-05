'use client';

import React from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { Sparkles, Zap, Plus } from 'lucide-react';

const NavigationHeader: React.FC = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return null;

  return (
    <header className="bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Prevent page reload */}
          <Link href="/dashboard" className="flex items-center space-x-3" prefetch={true}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Tinker.io Studio
            </div>
          </Link>

          {/* Navigation Links - Prevent page reload */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="text-gray-600 hover:text-emerald-600 transition-colors"
              prefetch={true}
            >
              Dashboard
            </Link>
            <Link 
              href="/create" 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
              prefetch={true}
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </Link>
            <Link 
              href="/pricing" 
              className="text-gray-600 hover:text-emerald-600 transition-colors"
              prefetch={true}
            >
              Pricing
            </Link>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <Zap className="w-5 h-5 text-emerald-500" />
              <span className="text-sm text-gray-600">
                Hey, <span className="font-semibold text-emerald-600">{user?.firstName || 'there'}!</span>
              </span>
            </div>
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-full border-2 border-emerald-200 hover:border-emerald-300 transition-colors"
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;