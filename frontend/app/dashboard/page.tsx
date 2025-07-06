'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

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
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🧚‍♀️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Your Studio, {user?.firstName}!
          </h1>
          <p className="text-lg text-gray-600">
            Your AI-powered workspace for intelligent project development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto">
                  {user?.firstName?.[0] || 'T'}
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  {user?.fullName || 'Tinkerer'}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{user?.emailAddresses?.[0]?.emailAddress}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    ⚡ Free Tier
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <a 
                  href="/create"
                  className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-xl hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="text-xl font-bold mb-2">Create Project</h3>
                  <p className="text-emerald-100">Start a new AI-analyzed project</p>
                </a>
                
                <a 
                  href="/pricing"
                  className="bg-white border border-emerald-200 p-6 rounded-xl hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-3">💰</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">View Pricing</h3>
                  <p className="text-gray-600">Transparent, fair pricing</p>
                </a>
              </div>
              
              <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
                <h3 className="text-lg font-bold text-emerald-800 mb-2">🎯 Coming Soon</h3>
                <ul className="text-emerald-700 space-y-1">
                  <li>• AI-powered project scoping</li>
                  <li>• Real-time collaboration</li>
                  <li>• Milestone-based payments</li>
                  <li>• Knowledge transfer system</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
