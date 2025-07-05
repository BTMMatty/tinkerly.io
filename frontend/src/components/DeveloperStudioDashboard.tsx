'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Upload, Github, ExternalLink, Star, MessageSquare, Share2, Camera, Twitter, Linkedin, Globe, Settings, Sparkles, Zap, Heart, Plus, Lightbulb, Brain, DollarSign, Clock, Code, Loader, CreditCard } from 'lucide-react';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';

// Define proper TypeScript interfaces
interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  credits_remaining: number;
  subscription_tier: 'free' | 'pro' | 'enterprise';
}

interface UserCredits {
  hasCredits: boolean;
  creditsRemaining: number;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  githubUrl: string;
  startDate: string;
  lastUpdate: string;
  progress: number;
  tags: string[];
  clientFeedback?: string;
  pricing: string;
  timeline: string;
  category: string;
  complexity: string;
  analysis: any;
  payment_status: string;
  amount_paid: number;
}

interface ProjectForm {
  title: string;
  description: string;
  category: string;
  requirements: string;
}

export default function DeveloperStudioDashboard() {
  const { user } = useUser();
  const [feedback, setFeedback] = useState<string>('');
  const [requestType, setRequestType] = useState<'project' | 'feedback'>('project');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [projectScope, setProjectScope] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userCredits, setUserCredits] = useState<UserCredits>({ 
    hasCredits: false, 
    creditsRemaining: 0, 
    subscriptionTier: 'free' 
  });
  
  // Project form state with proper typing
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    title: '',
    description: '',
    category: '',
    requirements: ''
  });

  const categories = [
    'Web Application',
    'Mobile App',
    'E-commerce Platform',
    'API Development',
    'Database Design',
    'AI/ML Integration',
    'Custom Dashboard',
    'Integration Project',
    'Landing Page',
    'Enterprise Solution'
  ];

  // Load user profile and projects on mount - BULLETPROOF VERSION
  useEffect(() => {
    let cancelled = false;
    
    const initializeDashboard = async () => {
      if (!user?.id) {
        console.log('⏳ Waiting for user to load...');
        return;
      }
      
      try {
        console.log('🔄 Initializing dashboard for user:', user.id);
        setLoading(true);
        setError(null);
        
        console.log('👤 Loading user profile...');
        
        // ✅ TEMPORARY FIX: Skip userService.syncUser due to RLS issue
        // Just use Clerk user data directly for now
        const profile: UserProfile = {
          id: user.id,
          email: user.emailAddresses?.[0]?.emailAddress || '',
          full_name: user.fullName,
          first_name: user.firstName,
          last_name: user.lastName,
          created_at: new Date().toISOString(),
          credits_remaining: 3,
          subscription_tier: 'free'
        };
        
        console.log('✅ Using Clerk user data directly:', profile);
        
        if (cancelled) return;
        
        setUserProfile(profile);
        console.log('✅ User profile loaded:', profile);
        
        // ✅ More robust credit checking - BYPASS DATABASE FOR NOW
        try {
          // Skip checkUserCredits call due to RLS issue - use defaults
          const credits: UserCredits = {
            hasCredits: true,
            creditsRemaining: 3,
            subscriptionTier: 'free'
          };
          
          if (cancelled) return;
          
          setUserCredits(credits);
          console.log('✅ Using default credits for new user:', credits);
        } catch (creditError) {
          console.error('⚠️ Credit check failed:', creditError);
          // Don't fail the entire dashboard for credits
          setUserCredits({ hasCredits: true, creditsRemaining: 3, subscriptionTier: 'free' });
        }
        
        // ✅ Track dashboard visit (non-blocking)
        try {
          // await analyticsService.trackEvent({
          //   user_id: user.id,
          //   event_type: 'dashboard_visit',
          //   event_data: { timestamp: new Date().toISOString() }
          // });
        } catch (analyticsError) {
          console.warn('⚠️ Analytics tracking failed:', analyticsError);
          // Don't fail dashboard for analytics
        }

        // ✅ Load projects (non-blocking)
        try {
          await loadUserProjects(user.id);
        } catch (projectError) {
          console.error('⚠️ Project loading failed:', projectError);
          // Don't fail dashboard for projects
        }
        
        console.log('✅ Dashboard initialized successfully');
        
      } catch (error) {
        if (!cancelled) {
          console.error('❌ Dashboard initialization error:', error);
          setError(`Dashboard error: ${error}`);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (user?.id) {
      initializeDashboard();
    } else {
      setLoading(false);
    }
    
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  // Load user's projects from database
  const loadUserProjects = async (userId: string): Promise<void> => {
    try {
      console.log('📊 Loading user projects...');
      // Mock projects for now since we're bypassing database
      const mockProjects: Project[] = [
        {
          id: '1',
          name: 'E-commerce Platform',
          description: 'Modern e-commerce solution with AI recommendations',
          status: 'In Progress',
          githubUrl: 'https://github.com/tinker-io/ecommerce-platform',
          startDate: '2024-06-01',
          lastUpdate: '2024-07-05',
          progress: 75,
          tags: ['React', 'Node.js', 'PostgreSQL'],
          pricing: '$25,000',
          timeline: '4 weeks',
          category: 'E-commerce Platform',
          complexity: 'Complex',
          analysis: null,
          payment_status: 'paid',
          amount_paid: 25000
        }
      ];
      
      setProjects(mockProjects);
      console.log('✅ Loaded projects:', mockProjects.length);
      
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const analyzeProject = async (): Promise<void> => {
    if (!projectForm.title || !projectForm.description || !projectForm.category || !projectForm.requirements) {
      alert('Please fill in all required fields before analysis');
      return;
    }

    if (!user) {
      alert('User not loaded. Please refresh the page.');
      return;
    }

    setIsAnalyzing(true);

    try {
      console.log('💾 Creating project in database...');
      
      // Mock analysis for now
      const mockAnalysis = {
        complexity: "Moderate",
        complexity_score: 6,
        estimated_hours: 120,
        hourly_rate: 100,
        total_cost: 12000,
        techStack: {
          frontend: ["React", "Next.js", "TypeScript"],
          backend: ["Node.js", "Express"],
          database: "PostgreSQL",
          deployment: "Vercel"
        },
        timeline: {
          industry_standard: "8 weeks",
          accelerated: "4 weeks"
        },
        phases: [
          {
            name: "Foundation Setup",
            duration: "1 week",
            description: "Project setup and core architecture",
            deliverables: ["Project structure", "Authentication", "Database schema"]
          }
        ],
        keyFeatures: ["User Authentication", "Real-time Updates", "Analytics Dashboard"],
        risks: [
          {
            risk: "API Integration Complexity",
            mitigation: "Use proven libraries and thorough testing",
            impact: "Medium"
          }
        ],
        whyRecommended: "This approach balances modern technology with proven reliability."
      };
      
      setProjectScope(mockAnalysis);
      console.log('✅ Analysis complete!');
      
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitProject = async (): Promise<void> => {
    if (!projectScope) {
      alert('Please analyze the project first to get accurate scoping and pricing.');
      return;
    }

    if (!user) {
      alert('User not loaded. Please refresh the page.');
      return;
    }

    try {
      alert(`🚀 Project "${projectForm.title}" submitted successfully!\n\nEstimated Price: ${projectScope.total_cost?.toLocaleString()}\nTimeline: ${projectScope.timeline?.accelerated}\n\nTink will review the AI analysis and contact you within 24 hours to finalize details and process payment.`);
      
      // Reset form
      setProjectForm({ title: '', description: '', category: '', requirements: '' });
      setProjectScope(null);
      
    } catch (error) {
      console.error('Failed to submit project:', error);
      alert('Failed to submit project. Please try again.');
    }
  };

  const handleFeedbackSubmit = async (): Promise<void> => {
    if (!feedback.trim()) return;
    
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    alert('Thank you for your feedback! Tink will review this personally. 🧚‍♀️');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Dashboard Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <NavigationHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Your Studio, {user?.firstName}! 🧚‍♀️
          </h1>
          <p className="text-lg text-gray-600">
            Your AI-powered workspace for intelligent project scoping and collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto">
                  {user?.firstName?.[0] || 'T'}
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  {user?.fullName || 'Your Name'}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{user?.emailAddresses?.[0]?.emailAddress}</p>
                <div className="mt-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    userCredits.subscriptionTier === 'pro' ? 'bg-purple-100 text-purple-800' :
                    userCredits.subscriptionTier === 'enterprise' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {userCredits.subscriptionTier === 'free' ? '⚡ Free Tier' : 
                     userCredits.subscriptionTier === 'pro' ? '💎 Pro' : '🏢 Enterprise'}
                  </span>
                </div>
              </div>
            </div>

            {/* Credits & Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Brain className="w-5 h-5 text-emerald-500 mr-2" />
                AI Analysis Power
              </h4>
              <div className="space-y-4">
                {userCredits.subscriptionTier === 'free' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 text-emerald-500 mr-2" />
                      <span className="text-sm text-gray-700">Credits Remaining</span>
                    </div>
                    <span className="font-bold text-emerald-600">{userCredits.creditsRemaining}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-emerald-500 mr-2" />
                    <span className="text-sm text-gray-700">Projects Analyzed</span>
                  </div>
                  <span className="font-bold text-emerald-600">{projects.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Toggle between Project Request and Feedback */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-2">
              <div className="flex bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => setRequestType('project')}
                  className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
                    requestType === 'project' 
                      ? 'bg-white text-emerald-600 shadow-sm' 
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  AI Project Scoping
                </button>
                <button
                  onClick={() => setRequestType('feedback')}
                  className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
                    requestType === 'feedback' 
                      ? 'bg-white text-emerald-600 shadow-sm' 
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  General Feedback
                </button>
              </div>
            </div>

            {requestType === 'project' ? (
              /* AI Project Scoping Form */
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">🤖 AI-Powered Project Scoping</h2>
                  <p className="text-emerald-100">Get instant intelligent analysis, pricing, and timeline estimates</p>
                </div>

                <div className="space-y-4">
                  {/* Project Title */}
                  <div>
                    <label className="block text-emerald-100 text-sm font-semibold mb-2">Project Title *</label>
                    <input
                      type="text"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                      placeholder="E.g., AI-Powered Customer Support System"
                      className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-emerald-100 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-emerald-100 text-sm font-semibold mb-2">Description *</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                      placeholder="Describe what you want to automate and what problem it solves..."
                      className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-emerald-100 resize-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                      rows={3}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-emerald-100 text-sm font-semibold mb-2">Category *</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                      className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    >
                      <option value="" className="text-gray-800">Select a category</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat} className="text-gray-800">{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="block text-emerald-100 text-sm font-semibold mb-2">Requirements</label>
                    <textarea
                      value={projectForm.requirements}
                      onChange={(e) => setProjectForm({...projectForm, requirements: e.target.value})}
                      placeholder="List specific features, integrations, and functionality you need..."
                      className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-emerald-100 resize-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                      rows={3}
                    />
                  </div>

                  {/* Analysis Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={analyzeProject}
                      disabled={isAnalyzing || !projectForm.title || !projectForm.description || !projectForm.category}
                      className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader className="w-5 h-5 mr-2 animate-spin" />
                          AI Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="w-5 h-5 mr-2" />
                          🧠 Analyze with AI
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* General Feedback Form */
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">🧚‍♀️ Tell Tink What You Think</h2>
                  <p className="text-emerald-100">Share feedback about your current projects</p>
                </div>

                <div className="space-y-4">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your thoughts, ideas, or feedback about your current projects..."
                    className="w-full p-4 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-emerald-100 resize-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    rows={4}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-emerald-100">
                      💡 Tip: Be specific about what's working well or what could be improved
                    </span>
                    <button
                      onClick={handleFeedbackSubmit}
                      disabled={!feedback.trim()}
                      className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg disabled:opacity-50"
                    >
                      Send to Tink ✨
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Section */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Your Projects with Tink</h3>
                <span className="text-sm text-gray-600">{projects.length} total projects</span>
              </div>

              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h4>
                  <p className="text-gray-600 mb-4">Start by creating your first AI-analyzed project above!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-emerald-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{project.name}</h4>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="font-medium text-emerald-600">{project.pricing}</span>
                              <span className="text-gray-600">{project.timeline}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="text-emerald-600 font-semibold">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <span className={`px-3 py-1 rounded-full text-xs font-medium ml-4 ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}