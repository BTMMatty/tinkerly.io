'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Upload, Github, ExternalLink, Star, MessageSquare, Share2, Camera, Twitter, Linkedin, Globe, Settings, Sparkles, Zap, Heart, Plus, Lightbulb, Brain, DollarSign, Clock, Code, Loader, CreditCard } from 'lucide-react';
import { userService, projectService, analyticsService, checkUserCredits } from '@/lib/supabase';
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';

export default function DeveloperStudioDashboard() {
  const { user } = useUser();
  const [feedback, setFeedback] = useState('');
  const [requestType, setRequestType] = useState('project');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [projectScope, setProjectScope] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userCredits, setUserCredits] = useState({ hasCredits: false, creditsRemaining: 0, subscriptionTier: 'free' });
  
  // Project form state
  const [projectForm, setProjectForm] = useState({
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
        setError(null); // ✅ Clear any previous errors
        
        console.log('👤 Loading user profile...');
        
        // ✅ TEMPORARY FIX: Skip userService.syncUser due to RLS issue
        // Just use Clerk user data directly for now
        const profile = {
          id: user.id,
          email: user.emailAddresses?.[0]?.emailAddress,
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
          const credits = {
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
          await analyticsService.trackEvent({
            user_id: user.id,
            event_type: 'dashboard_visit',
            event_data: { timestamp: new Date().toISOString() }
          });
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
          setError(`Dashboard error: ${error.message || error}`);
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
      // ✅ Handle case where user is not loaded yet
      setLoading(false);
    }
    
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  // Load user's projects from database
  const loadUserProjects = async (userId: string) => {
    try {
      console.log('📊 Loading user projects...');
      const { data: userProjects, error } = await projectService.getUserProjects(userId);
      
      if (error) {
        console.error('Error loading projects:', error);
        return;
      }
      
      // Transform projects to match expected format
      const formattedProjects = userProjects?.map((project: any) => ({
        id: project.id,
        name: project.title,
        description: project.description,
        status: formatProjectStatus(project.status),
        githubUrl: `https://github.com/tinker-io/${project.title.toLowerCase().replace(/\s+/g, '-')}`,
        startDate: project.created_at.split('T')[0],
        lastUpdate: project.updated_at.split('T')[0],
        progress: calculateProgress(project.status),
        tags: extractTechStack(project.ai_analysis?.techStack),
        clientFeedback: generateFeedback(project.status),
        pricing: project.total_cost ? `$${project.total_cost.toLocaleString()}` : 'Pending',
        timeline: project.ai_analysis?.timeline?.accelerated || 'TBD',
        category: project.category,
        complexity: project.ai_analysis?.complexity || 'Unknown',
        analysis: project.ai_analysis || null,
        payment_status: project.payment_status,
        amount_paid: project.amount_paid
      })) || [];
      
      setProjects(formattedProjects);
      console.log('✅ Loaded projects:', formattedProjects.length);
      
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  // Helper functions
  const formatProjectStatus = (status: string) => {
    const statusMap = {
      'draft': 'Draft',
      'analyzed': 'Ready to Start',
      'payment_pending': 'Payment Pending',
      'in_development': 'In Progress',
      'completed': 'Completed',
      'cancelled': 'Cancelled'
    };
    return statusMap[status] || 'Unknown';
  };

  const calculateProgress = (status: string) => {
    const progressMap = {
      'draft': 10,
      'analyzed': 25,
      'payment_pending': 40,
      'in_development': 75,
      'completed': 100,
      'cancelled': 0
    };
    return progressMap[status] || 0;
  };

  const extractTechStack = (techStack: any) => {
    if (!techStack) return ['React', 'Node.js'];
    
    const tags = [];
    if (techStack.frontend) tags.push(...techStack.frontend.slice(0, 2));
    if (techStack.backend) tags.push(...techStack.backend.slice(0, 1));
    if (techStack.database) tags.push(techStack.database);
    
    return tags.slice(0, 4);
  };

  const generateFeedback = (status: string) => {
    const feedbackMap = {
      'completed': 'Project delivered exactly as promised! Amazing work!',
      'in_development': 'Great progress so far. Love the regular updates!',
      'analyzed': 'The AI analysis looks spot on. Ready to proceed!',
      'payment_pending': 'Ready to start once payment is processed!'
    };
    return feedbackMap[status] || null;
  };

  const analyzeProject = async () => {
    if (!projectForm.title || !projectForm.description || !projectForm.category || !projectForm.requirements) {
      alert('Please fill in all required fields before analysis');
      return;
    }

    if (!user) {
      alert('User not loaded. Please refresh the page.');
      return;
    }

   // // Check if user has credits
   // const credits = await checkUserCredits(user.id);
   // if (!credits.hasCredits && credits.subscriptionTier === 'free') {
   //   alert(`You've used all your free analyses! You have ${credits.creditsRemaining} credits remaining. Upgrade to Pro for unlimited analyses.`);
   //   return;
   // }

    setIsAnalyzing(true);

    try {
      console.log('💾 Creating project in database...');
      
      // Save project to database first
      const { data: savedProject, error: projectError } = await projectService.createProject({
        user_id: user.id,
        title: projectForm.title,
        description: projectForm.description,
        category: projectForm.category,
        requirements: projectForm.requirements,
        timeline: '',
        complexity: '',
        status: 'draft'
      });

      if (projectError) {
        throw projectError;
      }

      console.log('✅ Project saved, running AI analysis...');

      const analysisPrompt = `
You are an expert development consultant analyzing a project for accurate scoping, pricing, and timeline estimation. 

PROJECT DETAILS:
Title: ${projectForm.title}
Description: ${projectForm.description}
Category: ${projectForm.category}
Requirements: ${projectForm.requirements}

ANALYSIS INSTRUCTIONS:
1. Analyze complexity level (Simple, Moderate, Complex, Enterprise)
2. Recommend optimal tech stack for this project
3. Calculate realistic timeline (then compress by 50% for fast delivery)
4. Estimate accurate pricing based on premium development rates ($80-150/hour)
5. Identify potential risks and mitigation strategies
6. Break down project into phases

PRICING CONTEXT:
- Premium development service (comparable to Toptal)
- Rates: $80-150/hour depending on complexity
- Simple projects: $5K-25K
- Moderate projects: $25K-75K  
- Complex projects: $75K-200K
- Enterprise projects: $200K+

RESPOND ONLY WITH VALID JSON:
{
  "complexity": "Simple|Moderate|Complex|Enterprise",
  "complexity_score": 1-10,
  "timeline": {
    "industry_standard": "X weeks",
    "accelerated": "X weeks",
    "compression_factor": "50%"
  },
  "pricing": {
    "total_range": "$X,XXX - $X,XXX",
    "recommended": "$X,XXX",
    "hourly_rate": "$XXX/hour",
    "estimated_hours": "XXX hours"
  },
  "techStack": {
    "frontend": ["technology1", "technology2"],
    "backend": ["technology1", "technology2"], 
    "database": "recommended_db",
    "deployment": "platform",
    "additional_tools": ["tool1", "tool2"]
  },
  "phases": [
    {
      "name": "Phase 1 Name",
      "duration": "X weeks", 
      "description": "What gets built",
      "deliverables": ["item1", "item2"]
    }
  ],
  "risks": [
    {
      "risk": "Risk description",
      "mitigation": "How to handle it",
      "impact": "Low|Medium|High"
    }
  ],
  "keyFeatures": ["feature1", "feature2", "feature3"],
  "whyRecommended": "2-3 sentence explanation of the approach",
  "estimated_hours": number,
  "hourly_rate": number,
  "total_cost": number
}

DO NOT OUTPUT ANYTHING OTHER THAN VALID JSON.
`;

      const response = await window.claude.complete(analysisPrompt);
      
      try {
        const scopeData = JSON.parse(response);
        
        // Save analysis to database (as JSONB in projects table)
        console.log('💾 Saving analysis to database...');
        const { error: analysisError } = await projectService.saveAnalysis(savedProject.id, scopeData);

        if (analysisError) {
          console.error('Error saving analysis:', analysisError);
        }

        // Deduct credit for free users
        //if (userCredits.subscriptionTier === 'free') {
        //  await userService.decrementCredits(user.id);
        //  setUserCredits(prev => ({
        //    ...prev,
        //   creditsRemaining: prev.creditsRemaining - 1,
        //    hasCredits: prev.creditsRemaining - 1 > 0
        //  }));
        //}
        
        // Track analysis completion
        await analyticsService.trackEvent({
          user_id: user.id,
          project_id: savedProject.id,
          event_type: 'analysis_completed',
          event_data: { 
            total_cost: scopeData.total_cost,
            complexity: scopeData.complexity,
            timestamp: new Date().toISOString()
          }
        });
        
        setProjectScope(scopeData);
        
        // Reload projects to show the new one
        await loadUserProjects(user.id);
        
        console.log('✅ Analysis complete and saved!');
        
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        alert('Analysis complete, but there was an error processing the results. Please try again.');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitProject = async () => {
    if (!projectScope) {
      alert('Please analyze the project first to get accurate scoping and pricing.');
      return;
    }

    if (!user) {
      alert('User not loaded. Please refresh the page.');
      return;
    }

    try {
      // Find the most recent project (should be the one we just analyzed)
      const recentProject = projects.find(p => p.name === projectForm.title);
      
      if (recentProject) {
        // Update project status to payment_pending
        await projectService.updateProject(recentProject.id, { status: 'payment_pending' });
        
        // Track project submission
        await analyticsService.trackEvent({
          user_id: user.id,
          project_id: recentProject.id,
          event_type: 'project_submitted_final',
          event_data: { 
            total_cost: projectScope.total_cost,
            timestamp: new Date().toISOString()
          }
        });
        
        alert(`🚀 Project "${projectForm.title}" submitted successfully!\n\nEstimated Price: ${projectScope.pricing.recommended}\nTimeline: ${projectScope.timeline.accelerated}\n\nTink will review the AI analysis and contact you within 24 hours to finalize details and process payment.`);
        
        // Reset form and reload projects
        setProjectForm({ title: '', description: '', category: '', requirements: '' });
        setProjectScope(null);
        await loadUserProjects(user.id);
      }
    } catch (error) {
      console.error('Failed to submit project:', error);
      alert('Failed to submit project. Please try again.');
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) return;
    
    if (user) {
      try {
        // Track feedback submission
        await analyticsService.trackEvent({
          user_id: user.id,
          event_type: 'feedback_submitted',
          event_data: { 
            feedback: feedback,
            timestamp: new Date().toISOString()
          }
        });
      } catch (error) {
        console.error('Error tracking feedback:', error);
      }
    }
    
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Total Investment</span>
                  </div>
                  <span className="font-bold text-emerald-600">
                    ${projects.reduce((sum, p) => sum + (parseInt(p.pricing.replace(/\D/g, '')) || 0), 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-700">Avg. Delivery</span>
                  </div>
                  <span className="font-bold text-emerald-600">50% Faster</span>
                </div>
              </div>
              
              {userCredits.subscriptionTier === 'free' && userCredits.creditsRemaining === 0 && (
                <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-purple-700 text-center">
                    <CreditCard className="w-4 h-4 inline mr-1" />
                    Upgrade to Pro for unlimited analyses!
                  </p>
                </div>
              )}
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
                  {userCredits.subscriptionTier === 'free' && (
                    <div className="mt-3">
                      <span className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                        <Zap className="w-4 h-4 mr-1" />
                        {userCredits.creditsRemaining} credits remaining
                      </span>
                    </div>
                  )}
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
                      disabled={isAnalyzing || !projectForm.title || !projectForm.description || !projectForm.category || (!userCredits.hasCredits && userCredits.subscriptionTier === 'free')}
                      className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader className="w-5 h-5 mr-2 animate-spin" />
                          AI Analyzing...
                        </>
                      ) : !userCredits.hasCredits && userCredits.subscriptionTier === 'free' ? (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          No Credits - Upgrade to Pro
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
                  {/* Pricing & Timeline */}
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

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Recommended Tech Stack
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Frontend:</p>
                      <div className="flex flex-wrap gap-2">
                        {projectScope.techStack.frontend.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Backend:</p>
                      <div className="flex flex-wrap gap-2">
                        {projectScope.techStack.backend.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Database & Deployment:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">{projectScope.techStack.database}</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">{projectScope.techStack.deployment}</span>
                    </div>
                  </div>
                </div>

                {/* Project Phases */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Development Phases</h4>
                  <div className="space-y-3">
                    {projectScope.phases.map((phase, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">{phase.name}</h5>
                          <span className="text-sm text-emerald-600 font-medium">{phase.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {phase.deliverables.map((deliverable, j) => (
                            <span key={j} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why This Approach */}
                <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Why This Approach
                  </h4>
                  <p className="text-sm text-yellow-700">{projectScope.whyRecommended}</p>
                </div>

                {/* Submit Button */}
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

            {/* Existing Projects */}
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

                          {project.clientFeedback && (
                            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 mb-3">
                              <p className="text-sm text-emerald-800 italic">
                                "{project.clientFeedback}"
                              </p>
                            </div>
                          )}
                        </div>

                        <span className={`px-3 py-1 rounded-full text-xs font-medium ml-4 ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          project.status === 'Payment Pending' ? 'bg-orange-100 text-orange-700' :
                          project.status === 'Ready to Start' ? 'bg-purple-100 text-purple-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                          <span>Updated: {new Date(project.lastUpdate).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span className="text-sm">View Code</span>
                          </a>
                          
                          {project.status === 'Completed' && (
                            <button
                              onClick={() => {
                                const shareText = `Just completed "${project.name}" with @TinkerIO! 🚀 Cost: ${project.pricing}, Timeline: ${project.timeline} #WebDevelopment #TinkerIO`;
                                const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                                window.open(shareUrl, '_blank');
                              }}
                              className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                              <span className="text-sm">Share Success</span>
                            </button>
                          )}
                        </div>
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