'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, Brain, Zap, Clock, DollarSign, TrendingUp, 
  Plus, Code, Users, CreditCard, ArrowRight, Loader,
  CheckCircle, AlertCircle, BarChart3, Calendar, Star,
  GitBranch, Target, Rocket, Gift, Trophy
} from 'lucide-react';

export default function DashboardPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalSaved: 0,
    creditsRemaining: 3,
    monthlyProgress: 0
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    } else if (isSignedIn) {
      loadDashboardData();
    }
  }, [isSignedIn, isLoaded, router]);

  const loadDashboardData = async () => {
    try {
      // Load user projects from API
      const response = await fetch('/api/user/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
        setStats(data.stats || stats);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Loading your magic...</h1>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { 
              icon: Brain, 
              label: 'AI Analyses', 
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
              icon: Zap, 
              label: 'Credits Left', 
              value: stats.creditsRemaining, 
              color: 'from-yellow-500 to-orange-500',
              trend: '3/month' 
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
          {/* Left Column - Profile & Actions */}
          <div className="space-y-6">
            {/* Enhanced Profile Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 animate-slide-right">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {user?.firstName?.[0] || 'T'}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{user?.fullName}</h3>
                <p className="text-gray-600 text-sm mt-1">{user?.emailAddresses?.[0]?.emailAddress}</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                    <Zap className="w-3 h-3 mr-1" />
                    {stats.creditsRemaining} Credits
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Free Tier
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Monthly Progress</span>
                  <span className="text-emerald-600 font-medium">{stats.monthlyProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                       style={{ width: `${stats.monthlyProgress}%` }}></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 animate-slide-right" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-emerald-500" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link href="/create" 
                      className="group flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all">
                  <div className="flex items-center">
                    <Plus className="w-5 h-5 mr-3" />
                    <span className="font-medium">New AI Analysis</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link href="/pricing" 
                      className="group flex items-center justify-between p-4 bg-white border border-emerald-200 rounded-xl hover:shadow-lg transition-all">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-3 text-emerald-600" />
                    <span className="font-medium text-gray-900">Get More Credits</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
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
                  Start your first AI-powered project analysis and see the magic happen ✨
                </p>
                <Link href="/create" 
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all">
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

            {/* Insights Card */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  AI Insights
                </h3>
                <Gift className="w-5 h-5 animate-bounce" />
              </div>
              <p className="text-purple-100 mb-4">
                Based on your project history, you save an average of <span className="font-bold">47%</span> in development time using Tinkerly.io!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-purple-100 mb-1">Avg. Project Cost</p>
                  <p className="text-xl font-bold">$12,500</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-purple-100 mb-1">Time Saved</p>
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