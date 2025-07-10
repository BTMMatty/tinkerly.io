'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, Brain, Zap, Clock, DollarSign, TrendingUp, 
  Plus, Code, Users, CreditCard, ArrowRight, Loader,
  CheckCircle, AlertCircle, BarChart3, Calendar, Star,
  GitBranch, Target, Rocket, Gift, Trophy, Wand2, Crown
} from 'lucide-react';
// 🧚‍♀️ NEW IMPORTS
import { checkUserAnalyses, PIXIE_TIERS } from '@/lib/supabase';

// Add this interface to define the Project type
interface Project {
  id: string;
  title: string;
  description: string;
  created_at: string;
  total_cost?: number;
  status: string;
  ai_analysis?: {
    timeline?: {
      accelerated?: string;
    };
    techStack?: {
      frontend?: string[];
    };
  };
}

// 🧚‍♀️ NEW: Add Pixie tier type
type PixieTier = 'fresh' | 'pro' | 'elite' | 'unlimited';

export default function DashboardPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // 🧚‍♀️ UPDATED: Add pixie tier to stats
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalSaved: 0,
    analysesRemaining: 3,
    analysesLimit: 3,
    analysesUsed: 0,
    pixieTier: 'fresh' as PixieTier,
    monthlyProgress: 0
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    } else if (isSignedIn && user?.id) {
      loadDashboardData();
    }
  }, [isSignedIn, isLoaded, router, user?.id]);

  const loadDashboardData = async () => {
    try {
      // 🧚‍♀️ Load analyses data
      if (user?.id) {
        const analyses = await checkUserAnalyses(user.id);
        
        // Load user projects from API
        const response = await fetch('/api/user/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects || []);
          
          // 🧚‍♀️ Update stats with new Pixie data
          setStats({
            ...data.stats,
            analysesRemaining: analyses.remaining,
            analysesLimit: analyses.limit,
            analysesUsed: analyses.used,
            pixieTier: analyses.pixieTier,
            monthlyProgress: Math.round((analyses.used / analyses.limit) * 100)
          });
        }
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🧚‍♀️ NEW: Get tier color scheme
  const getTierColors = (tier: PixieTier) => {
    switch(tier) {
      case 'unlimited':
        return {
          gradient: 'from-purple-500 to-pink-500',
          bg: 'bg-purple-100',
          text: 'text-purple-800',
          border: 'border-purple-300'
        };
      case 'elite':
        return {
          gradient: 'from-purple-400 to-indigo-500',
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          border: 'border-purple-200'
        };
      case 'pro':
        return {
          gradient: 'from-emerald-500 to-teal-600',
          bg: 'bg-emerald-100',
          text: 'text-emerald-800',
          border: 'border-emerald-300'
        };
      default:
        return {
          gradient: 'from-gray-400 to-gray-500',
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          border: 'border-gray-300'
        };
    }
  };

  // 🧚‍♀️ NEW: Get tier icon
  const getTierIcon = (tier: PixieTier) => {
    switch(tier) {
      case 'unlimited': return <Crown className="w-4 h-4" />;
      case 'elite': return <Star className="w-4 h-4" />;
      case 'pro': return <Sparkles className="w-4 h-4" />;
      default: return <Wand2 className="w-4 h-4" />;
    }
  };

  const tierColors = getTierColors(stats.pixieTier);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Loading your pixie magic... 🧚‍♀️</h1>
        </div>
      </div>
    );
  }

  if (!isSignedIn) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Animated Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center animate-float">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{user?.firstName}</span>! ✨
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your AI-powered development studio is ready to create magic
          </p>
        </div>

        {/* 🧚‍♀️ UPDATED Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { 
              icon: Brain, 
              label: 'Total Analyses', 
              value: stats.totalProjects, 
              color: 'from-purple-500 to-pink-500',
              trend: '+12%' 
            },
            { 
              icon: Rocket, 
              label: 'Active Projects', 
              value: stats.activeProjects, 
              color: 'from-emerald-500 to-teal-500',
              trend: '+5%' 
            },
            { 
              icon: DollarSign, 
              label: 'Total Saved', 
              value: `$${stats.totalSaved.toLocaleString()}`, 
              color: 'from-green-500 to-emerald-500',
              trend: '+18%' 
            },
            { 
              icon: Brain, 
              label: 'Analyses Left', 
              value: stats.pixieTier === 'unlimited' ? '∞' : stats.analysesRemaining, 
              color: tierColors.gradient,
              trend: stats.pixieTier === 'unlimited' ? 'Unlimited!' : `${stats.analysesRemaining}/${stats.analysesLimit}` 
            },
            { 
              icon: Trophy, 
              label: 'Success Rate', 
              value: '98%', 
              color: 'from-blue-500 to-indigo-500',
              trend: 'Top 5%' 
            },
          ].map((stat, i) => (
            <div key={i} className="group relative animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl"
                   style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-emerald-600 mt-2 font-medium">{stat.trend}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🧚‍♀️ UPDATED Left Column - Profile & Actions */}
          <div className="space-y-6">
            {/* Enhanced Profile Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 animate-slide-right">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {user?.firstName?.[0] || 'T'}
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br ${tierColors.gradient} rounded-full flex items-center justify-center`}>
                    {getTierIcon(stats.pixieTier)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{user?.fullName}</h3>
                <p className="text-gray-600 text-sm mt-1">{user?.emailAddresses?.[0]?.emailAddress}</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  {/* 🧚‍♀️ Pixie Tier Badge */}
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r ${tierColors.gradient} text-white shadow-lg`}>
                    {getTierIcon(stats.pixieTier)}
                    <span className="ml-1">{PIXIE_TIERS[stats.pixieTier].name}</span>
                  </span>
                </div>
                
                {/* 🧚‍♀️ Analyses Usage */}
                {stats.pixieTier !== 'unlimited' && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">
                      {stats.analysesRemaining} of {stats.analysesLimit} analyses remaining
                    </p>
                  </div>
                )}
              </div>

              {/* 🧚‍♀️ UPDATED Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Monthly Usage</span>
                  <span className={`font-medium ${tierColors.text}`}>
                    {stats.pixieTier === 'unlimited' ? '∞' : `${stats.monthlyProgress}%`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${tierColors.gradient} rounded-full transition-all duration-1000`}
                       style={{ width: stats.pixieTier === 'unlimited' ? '100%' : `${stats.monthlyProgress}%` }}></div>
                </div>
              </div>
            </div>

            {/* 🧚‍♀️ UPDATED Quick Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 animate-slide-right" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-emerald-500" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link href="/create" 
                      className={`group flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all ${
                        stats.analysesRemaining === 0 && stats.pixieTier !== 'unlimited' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}>
                  <div className="flex items-center">
                    <Plus className="w-5 h-5 mr-3" />
                    <span className="font-medium">New AI Analysis</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                {/* 🧚‍♀️ Show upgrade button if not unlimited */}
                {stats.pixieTier !== 'unlimited' && (
                  <Link href="/pricing" 
                        className="group flex items-center justify-between p-4 bg-white border border-emerald-200 rounded-xl hover:shadow-lg transition-all">
                    <div className="flex items-center">
                      <Crown className="w-5 h-5 mr-3 text-purple-600" />
                      <span className="font-medium text-gray-900">Upgrade Pixie Powers</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>

            {/* 🧚‍♀️ NEW: Upgrade prompt if out of analyses */}
            {stats.analysesRemaining === 0 && stats.pixieTier !== 'unlimited' && (
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white animate-slide-right" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center mb-3">
                  <Sparkles className="w-6 h-6 mr-2" />
                  <h3 className="text-lg font-bold">Pixie Power Depleted!</h3>
                </div>
                <p className="text-purple-100 mb-4">
                  You've used all {stats.analysesLimit} analyses this month. Upgrade to keep the magic flowing! ✨
                </p>
                <Link href="/pricing" 
                      className="block w-full text-center bg-white text-purple-600 font-bold py-3 rounded-xl hover:bg-purple-50 transition-all">
                  Upgrade Now
                </Link>
              </div>
            )}
          </div>

          {/* Middle Column - Recent Projects */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projects Header */}
            <div className="flex items-center justify-between animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Code className="w-6 h-6 mr-2 text-emerald-500" />
                Your Projects
              </h2>
              <Link href="/create" 
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Projects List */}
            {projects.length === 0 ? (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-12 text-center animate-slide-up">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No projects yet!</h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                  Start your first AI-powered project analysis and see the pixie magic happen 🧚‍♀️
                </p>
                <Link href="/create" 
                      className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all ${
                        stats.analysesRemaining === 0 && stats.pixieTier !== 'unlimited' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Project
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project, i) => (
                  <div key={project.id} 
                       className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all animate-slide-up"
                       style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(project.created_at).toLocaleDateString()}
                          </span>
                          <span className="flex items-center text-emerald-600 font-medium">
                            <DollarSign className="w-4 h-4 mr-1" />
                            ${project.total_cost?.toLocaleString() || 'TBD'}
                          </span>
                          <span className="flex items-center text-blue-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {project.ai_analysis?.timeline?.accelerated || 'TBD'}
                          </span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' ? 'bg-green-100 text-green-700' :
                        project.status === 'in_development' ? 'bg-blue-100 text-blue-700' :
                        project.status === 'analyzed' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status.replace('_', ' ').charAt(0).toUpperCase() + project.status.slice(1)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.ai_analysis?.techStack?.frontend?.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 🧚‍♀️ UPDATED Insights Card */}
            <div className={`bg-gradient-to-br ${tierColors.gradient} rounded-2xl shadow-xl p-6 text-white animate-slide-up`} style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Pixie Insights ✨
                </h3>
                <Gift className="w-5 h-5 animate-bounce" />
              </div>
              <p className="text-white/90 mb-4">
                {stats.pixieTier === 'unlimited' ? 
                  `With unlimited power, you're unstoppable! You've completed ${stats.totalProjects} amazing projects.` :
                  `You've used ${stats.analysesUsed} of ${stats.analysesLimit} analyses this month. Keep creating magic!`
                }
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-white/80 mb-1">Avg. Project Cost</p>
                  <p className="text-xl font-bold">$12,500</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-white/80 mb-1">Time Saved</p>
                  <p className="text-xl font-bold">3.5 weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; opacity: 0; }
        .animate-slide-right { animation: slide-right 0.6s ease-out forwards; opacity: 0; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}