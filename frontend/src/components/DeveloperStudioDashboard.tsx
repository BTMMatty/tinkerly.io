'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Upload, Github, ExternalLink, Star, MessageSquare, Share2, Camera, Twitter, Linkedin, Globe, Settings, Sparkles, Zap, Heart, Plus, Lightbulb, Brain, DollarSign, Clock, Code, Loader, CreditCard } from 'lucide-react';

// Define proper TypeScript interfaces
interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  credits_remaining: number;
  subscription_tier: string;
}

interface UserCredits {
  hasCredits: boolean;
  creditsRemaining: number;
  subscriptionTier: string;
}

interface ProjectForm {
  title: string;
  description: string;
  category: string;
  requirements: string;
}

interface ProjectScope {
  complexity: string;
  complexity_score: number;
  estimated_hours: number;
  hourly_rate: number;
  total_cost: number;
  pricing: {
    recommended: string;
    total_range: string;
    hourly_rate: string;
    estimated_hours: string;
  };
  timeline: {
    industry_standard: string;
    accelerated: string;
    compression_factor: string;
  };
  techStack: {
    frontend: string[];
    backend: string[];
    database: string;
    deployment: string;
  };
  phases: Array<{
    name: string;
    duration: string;
    description: string;
    deliverables: string[];
  }>;
  keyFeatures: string[];
  risks: Array<{
    risk: string;
    mitigation: string;
    impact: string;
  }>;
  whyRecommended: string;
}

// NavigationHeader component
const NavigationHeader = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return null;

  return (
    <header className="bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Tinkerly Studio
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="/dashboard" 
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Dashboard
            </a>
            <a 
              href="/create" 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </a>
            <a 
              href="/pricing" 
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Pricing
            </a>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <Zap className="w-5 h-5 text-emerald-500" />
              <span className="text-sm text-gray-600">
                Hey, <span className="font-semibold text-emerald-600">{user?.firstName}!</span>
              </span>
            </div>
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
              {user?.firstName?.[0] || 'U'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 border-t border-emerald-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Tinkerly Studio
            </div>
          </div>
          <p className="text-gray-300 mb-4 max-w-md mx-auto">
            Transform your dreams into reality with AI-powered development. 
            50% faster delivery, transparent pricing, and magical results. ✨
          </p>
          <div className="text-gray-300 text-sm">
            © 2025 Tinkerly Studio. Made with <Heart className="w-4 h-4 inline text-emerald-400" /> for builders worldwide.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function DeveloperStudioDashboard() {
  const { user } = useUser();
  const [feedback, setFeedback] = useState('');
  const [requestType, setRequestType] = useState('project');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [projectScope, setProjectScope] = useState<ProjectScope | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userCredits, setUserCredits] = useState<UserCredits>({ 
    hasCredits: true, 
    creditsRemaining: 3, 
    subscriptionTier: 'free' 
  });
  
  // Project form state
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

  // Mock data loading - properly typed
  useEffect(() => {
    if (!user?.id) return;
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      setUserProfile({
        id: user.id,
        email: user.emailAddresses?.[0]?.emailAddress || '',
        full_name: user.fullName || '',
        credits_remaining: 3,
        subscription_tier: 'free'
      });
    }, 1000);
  }, [user]);

  const analyzeProject = async () => {
    if (!projectForm.title || !projectForm.description || !projectForm.category || !projectForm.requirements) {
      alert('Please fill in all required fields before analysis');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAnalysis: ProjectScope = {
        complexity: "Moderate",
        complexity_score: 6,
        estimated_hours: 120,
        hourly_rate: 100,
        total_cost: 12000,
        pricing: {
          recommended: "$12,000",
          total_range: "$10,000 - $15,000",
          hourly_rate: "$100/hour",
          estimated_hours: "120 hours"
        },
        timeline: {
          industry_standard: "8 weeks",
          accelerated: "4 weeks",
          compression_factor: "50%"
        },
        techStack: {
          frontend: ["React", "Next.js", "TypeScript"],
          backend: ["Node.js", "Express"],
          database: "PostgreSQL",
          deployment: "Vercel"
        },
        phases: [
          {
            name: "Foundation Setup",
            duration: "1 week",
            description: "Project setup and core architecture",
            deliverables: ["Project structure", "Authentication", "Database schema"]
          },
          {
            name: "Core Development", 
            duration: "2 weeks",
            description: "Main features and functionality",
            deliverables: ["Core features", "API endpoints", "User interface"]
          },
          {
            name: "Polish & Deploy",
            duration: "1 week", 
            description: "Testing, optimization, and deployment",
            deliverables: ["Testing suite", "Performance optimization", "Production deployment"]
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
        whyRecommended: "This approach balances modern technology with proven reliability, ensuring fast development without sacrificing quality."
      };
      
      setProjectScope(mockAnalysis);
      
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitProject = async () => {
    if (!projectScope) {
      alert('Please analyze the project first to get accurate scoping and pricing.');
      return;
    }

    alert(`🚀 Project "${projectForm.title}" submitted successfully!

Estimated Price: ${projectScope.pricing.recommended}
Timeline: ${projectScope.timeline.accelerated}

Tinkerly will review the AI analysis and contact you within 24 hours to finalize details and process payment.`);
    
    // Reset form
    setProjectForm({ title: '', description: '', category: '', requirements: '' });
    setProjectScope(null);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) return;
    
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    alert('Thank you for your feedback! Tink will review this personally. 🧚‍♀️');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <NavigationHeader />
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
        <NavigationHeader />
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-emerald-500 mr-2" />
                    <span className="text-sm text-gray-700">Credits Remaining</span>
                  </div>
                  <span className="font-bold text-emerald-600">{userCredits.creditsRemaining}</span>
                </div>
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
                  <div className="mt-3">
                    <span className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                      <Zap className="w-4 h-4 mr-1" />
                      {userCredits.creditsRemaining} credits remaining
                    </span>
                  </div>
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

            {/* AI Analysis Results */}
            {projectScope && (
              <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Brain className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">AI Analysis Complete</h3>
                    <p className="text-gray-600">Intelligent scoping for "{projectForm.title}"</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-800 mb-3 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Pricing Analysis
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Recommended:</span> {projectScope.pricing.recommended}</p>
                      <p><span className="font-medium">Range:</span> {projectScope.pricing.total_range}</p>
                      <p><span className="font-medium">Rate:</span> {projectScope.pricing.hourly_rate}</p>
                      <p><span className="font-medium">Est. Hours:</span> {projectScope.pricing.estimated_hours}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Timeline Analysis
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Industry Standard:</span> {projectScope.timeline.industry_standard}</p>
                      <p><span className="font-medium">Our Delivery:</span> {projectScope.timeline.accelerated}</p>
                      <p><span className="font-medium">Time Saved:</span> {projectScope.timeline.compression_factor}</p>
                      <p><span className="font-medium">Complexity:</span> {projectScope.complexity}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSubmitProject}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    🚀 Submit Project Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}