'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { Sparkles, Zap, Plus, Wand2, Crown, Star } from 'lucide-react';
// 🧚‍♀️ NEW IMPORTS
import { checkUserAnalyses, PIXIE_TIERS } from '@/lib/supabase';

// 🧚‍♀️ NEW: Add type for Pixie tier
type PixieTier = 'fresh' | 'pro' | 'elite' | 'unlimited';

const NavigationHeader: React.FC = () => {
  const { isSignedIn, user } = useUser();
  
  // 🧚‍♀️ NEW: Add state for user's pixie tier
  const [userAnalyses, setUserAnalyses] = useState({
    pixieTier: 'fresh' as PixieTier,
    remaining: 3,
    limit: 3
  });

  // 🧚‍♀️ NEW: Load user's pixie tier
  useEffect(() => {
    const loadUserTier = async () => {
      if (user?.id) {
        try {
          const analyses = await checkUserAnalyses(user.id);
          setUserAnalyses({
            pixieTier: analyses.pixieTier,
            remaining: analyses.remaining,
            limit: analyses.limit
          });
        } catch (error) {
          console.error('Error loading user tier:', error);
        }
      }
    };

    if (isSignedIn && user?.id) {
      loadUserTier();
    }
  }, [isSignedIn, user?.id]);

  // 🧚‍♀️ NEW: Get tier icon
  const getTierIcon = () => {
    switch(userAnalyses.pixieTier) {
      case 'unlimited': return <Crown className="w-4 h-4" />;
      case 'elite': return <Star className="w-4 h-4" />;
      case 'pro': return <Sparkles className="w-4 h-4" />;
      default: return <Wand2 className="w-4 h-4" />;
    }
  };

  // 🧚‍♀️ NEW: Get tier colors
  const getTierColors = () => {
    switch(userAnalyses.pixieTier) {
      case 'unlimited':
        return {
          text: 'text-purple-600',
          bg: 'bg-purple-100',
          border: 'border-purple-300',
          gradient: 'from-purple-500 to-pink-500'
        };
      case 'elite':
        return {
          text: 'text-purple-500',
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          gradient: 'from-purple-400 to-indigo-500'
        };
      case 'pro':
        return {
          text: 'text-emerald-600',
          bg: 'bg-emerald-100',
          border: 'border-emerald-300',
          gradient: 'from-emerald-500 to-teal-600'
        };
      default:
        return {
          text: 'text-gray-600',
          bg: 'bg-gray-100',
          border: 'border-gray-300',
          gradient: 'from-gray-400 to-gray-500'
        };
    }
  };

  if (!isSignedIn) return null;

  const tierColors = getTierColors();

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
              Tinkerly.io Studio
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

          {/* 🧚‍♀️ UPDATED User Info */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              {/* Pixie Tier Badge */}
              <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${tierColors.bg} ${tierColors.border} border`}>
                <div className={tierColors.text}>
                  {getTierIcon()}
                </div>
                <span className={`text-sm font-medium ${tierColors.text}`}>
                  {PIXIE_TIERS[userAnalyses.pixieTier].name}
                </span>
                {userAnalyses.pixieTier !== 'unlimited' && (
                  <span className={`text-xs ${tierColors.text} opacity-75`}>
                    ({userAnalyses.remaining}/{userAnalyses.limit})
                  </span>
                )}
              </div>
              
              {/* User Greeting */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Hey, <span className={`font-semibold ${tierColors.text}`}>{user?.firstName || 'there'}!</span>
                </span>
              </div>
            </div>
            
            {/* User Avatar */}
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: `w-10 h-10 rounded-full border-2 ${
                    userAnalyses.pixieTier === 'unlimited' ? 'border-purple-300 hover:border-purple-400' :
                    userAnalyses.pixieTier === 'elite' ? 'border-purple-200 hover:border-purple-300' :
                    userAnalyses.pixieTier === 'pro' ? 'border-emerald-200 hover:border-emerald-300' :
                    'border-gray-200 hover:border-gray-300'
                  } transition-colors`
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