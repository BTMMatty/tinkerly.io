'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function DeveloperStudioDashboard() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading Dashboard...</h1>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  const analyzeProject = async () => {
    setIsAnalyzing(true);
    
    try {
      console.log('🧠 Running AI analysis...');
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        alert('🧚‍♀️ AI Analysis complete! This is a demo - full functionality coming soon!');
      }, 2000);
    } catch (error) {
      console.error('Analysis error:', error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Your Studio, {user?.firstName}!
          </h1>
          <p className="text-lg text-gray-600">
            Your AI-powered workspace for intelligent project development
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Create Your First Project</h2>
          
          <button
            onClick={analyzeProject}
            disabled={isAnalyzing}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyzing...' : '🧠 Try AI Analysis (Demo)'}
          </button>
        </div>
      </div>
    </div>
  );
}
