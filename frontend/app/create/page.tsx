'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Zap, Brain, ArrowRight, Sparkles, CheckCircle, DollarSign, Clock, Code, Lightbulb, Wand2, Crown, Star } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { StableProjectForm } from '@/components/StableProjectForm';
// 🧚‍♀️ NEW IMPORTS
import { checkUserAnalyses, userService, PIXIE_TIERS } from '@/lib/supabase';

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  requirements: string;
  timeline: string;
  complexity: string;
}

interface AnalysisResult {
  complexity: string;
  complexity_score: number;
  estimated_hours: number;
  hourly_rate: number;
  total_cost: number;
  timeline: {
    industry_standard: string;
    accelerated: string;
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
  pricing?: {
    recommended: string;
  };
}

export default function CreateProjectPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  
  // 🧚‍♀️ UPDATED: Replace credits with analyses
  const [userAnalyses, setUserAnalyses] = useState({ 
    canAnalyze: true, 
    remaining: 3, 
    pixieTier: 'fresh' as 'fresh' | 'pro' | 'elite' | 'unlimited',
    used: 0,
    limit: 3
  });
  
  // Project form state
  const [projectData, setProjectData] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: '',
    requirements: '',
    timeline: '',
    complexity: ''
  });

  // 🧚‍♀️ UPDATED: Check analyses instead of credits
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/');
      return;
    }
    
    const loadAnalyses = async () => {
      if (user?.id) {
        try {
          const analyses = await checkUserAnalyses(user.id);
          setUserAnalyses(analyses);
          console.log('🧚‍♀️ Pixie analyses loaded:', analyses);
        } catch (error) {
          console.error('Error loading analyses:', error);
          // Set defaults on error
          setUserAnalyses({
            canAnalyze: true,
            remaining: 3,
            pixieTier: 'fresh',
            used: 0,
            limit: 3
          });
        }
      }
    };
    
    loadAnalyses();
  }, [isSignedIn, user?.id, router]);

  // Stable update function that won't cause re-renders
  const updateField = React.useCallback((field: keyof ProjectFormData, value: string) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmitProject = async () => {
    if (!analysisResults) {
      alert('No analysis found. Please analyze the project first.');
      return;
    }

    try {
      const totalCost = analysisResults.total_cost || 
        (analysisResults.pricing?.recommended) || 
        'TBD';
      
      const timeline = analysisResults.timeline?.accelerated || 
        'TBD';
      
      const formattedCost = typeof totalCost === 'number' ? 
        '$' + totalCost.toLocaleString() : 
        totalCost;
      
      alert(`🚀 Project "${projectData.title}" submitted successfully!

Estimated Price: ${formattedCost}
Timeline: ${timeline}

Tink will review the AI analysis and contact you within 24 hours to finalize details and process payment.`);
      
      // Reset form and go back to start
      setProjectData({
        title: '',
        description: '',
        category: '',
        requirements: '',
        timeline: '',
        complexity: ''
      });
      setAnalysisResults(null);
      setCurrentStep(0);
      
      // Redirect to dashboard
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Failed to submit project:', error);
      alert('Failed to submit project. Please try again.');
    }
  };

  // 🧚‍♀️ UPDATED: Use analysis instead of credits
  const analyzeProject = async () => {
    if (!projectData.title || !projectData.description || !projectData.category || !projectData.requirements) {
      alert('Please fill in all required fields before analysis');
      return;
    }

    if (!user) {
      alert('Please sign in to analyze projects');
      return;
    }

    // Check if user has analyses remaining
    if (!userAnalyses.canAnalyze && userAnalyses.pixieTier !== 'unlimited') {
      const nextTier = userAnalyses.pixieTier === 'fresh' ? 'Pro Pixies' : 
                       userAnalyses.pixieTier === 'pro' ? 'Elite Pixies' : 
                       'Pixies Unlimited';
      
      alert(`🧚‍♀️ Oh no! You've used all ${userAnalyses.limit} analyses this month. 

Your Pixie powers need recharging! ✨

Upgrade to ${nextTier} for more monthly analyses, or wait for your monthly reset.`);
      
      router.push('/pricing');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // 🧚‍♀️ Use an analysis
      if (user?.id) {
        const { data: useResult, error: useError } = await userService.useAnalysis(user.id);
        
        if (useError || !useResult?.canAnalyze) {
          console.error('Failed to use analysis:', useError);
          alert('Unable to use analysis. Please try again.');
          setIsAnalyzing(false);
          return;
        }
        
        console.log(`✨ Using 1 analysis. ${useResult.remaining} remaining this month.`);
        
        // Update local state
        setUserAnalyses(prev => ({
          ...prev,
          remaining: useResult.remaining,
          used: (useResult.used || prev.used + 1)
        }));
      }
      
      console.log('🧠 Running AI analysis...');
      
      try {
        const response = await fetch('/api/analyze-project', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectData: projectData
          })
        });

        if (!response.ok) {
          throw new Error(`Analysis API error: ${response.status}`);
        }

        const result = await response.json();
        const analysisResult: AnalysisResult = result.analysis || result;
        
        console.log('✅ Analysis complete!', analysisResult);
        
        setAnalysisResults(analysisResult);
        setCurrentStep(3);
        
      } catch (apiError) {
        console.error('API Analysis error:', apiError);
        throw apiError;
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Fallback mock analysis
      console.log('🔄 Using fallback mock analysis for demo...');
      
      const mockAnalysis: AnalysisResult = {
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
      
      setAnalysisResults(mockAnalysis);
      setCurrentStep(3);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Validation logic
  const canProceedToNext = () => {
    if (currentStep === 0) {
      return projectData.title.trim() && projectData.description.trim();
    }
    if (currentStep === 1) {
      return projectData.category;
    }
    return true;
  };

  const canAnalyze = () => {
    return projectData.requirements.trim() && projectData.timeline && projectData.complexity;
  };

  const steps = ['Project Overview', 'Category', 'Requirements', 'Analysis Results'];

  // Show loading while checking auth
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-emerald-600 font-medium">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  // Helper functions
  const formatCurrency = (value: any): string => {
    if (typeof value === 'number') {
      return '$' + value.toLocaleString();
    }
    if (typeof value === 'string' && value.includes('$')) {
      return value;
    }
    return value || 'TBD';
  };

  // 🧚‍♀️ NEW: Get Pixie tier icon
  const getPixieIcon = () => {
    switch(userAnalyses.pixieTier) {
      case 'unlimited': return <Crown className="w-4 h-4 text-purple-600" />;
      case 'elite': return <Star className="w-4 h-4 text-purple-500" />;
      case 'pro': return <Sparkles className="w-4 h-4 text-emerald-600" />;
      default: return <Wand2 className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-emerald-100 border border-emerald-200 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-emerald-600" />
            <span className="text-emerald-700 font-medium">AI-Powered Project Analysis</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tell Tink What You Think ✨
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Get instant AI-powered project scoping, pricing estimates, and development timelines.
            Transform your idea into a detailed project plan in minutes.
          </p>

          {/* 🧚‍♀️ UPDATED: Analyses Display */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Pixie Tier Badge */}
            <div className={`inline-flex items-center rounded-full px-6 py-2 border-2 ${
              userAnalyses.pixieTier === 'unlimited' ? 'bg-gradient-to-r from-purple-100 to-emerald-100 border-purple-300' :
              userAnalyses.pixieTier === 'elite' ? 'bg-purple-50 border-purple-300' :
              userAnalyses.pixieTier === 'pro' ? 'bg-emerald-50 border-emerald-300' :
              'bg-white border-emerald-200'
            }`}>
              {getPixieIcon()}
              <span className={`font-semibold ml-2 ${
                userAnalyses.pixieTier === 'unlimited' ? 'text-purple-700' :
                userAnalyses.pixieTier === 'elite' ? 'text-purple-600' :
                userAnalyses.pixieTier === 'pro' ? 'text-emerald-700' :
                'text-gray-700'
              }`}>
                {PIXIE_TIERS[userAnalyses.pixieTier].name}
              </span>
            </div>

            {/* Analyses Remaining */}
            {userAnalyses.pixieTier !== 'unlimited' ? (
              <div className="inline-flex items-center bg-white border border-emerald-200 rounded-full px-6 py-2">
                <Brain className="w-4 h-4 mr-2 text-emerald-500" />
                <span className="text-gray-700 font-medium">
                  {userAnalyses.remaining} of {userAnalyses.limit} analyses left this month
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-emerald-100 border border-purple-300 rounded-full px-6 py-2">
                <Sparkles className="w-4 h-4 mr-2 text-purple-600 animate-pulse" />
                <span className="text-purple-700 font-medium">
                  ∞ Unlimited Pixie Power! 🧚‍♀️
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`text-sm font-medium ${
                  index <= currentStep ? 'text-emerald-600' : 'text-gray-400'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${Math.min(((currentStep + 1) / steps.length) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Form Card - Beautiful Emerald Container */}
        {currentStep < 3 ? (
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl border border-emerald-400 p-8 text-white">
            <h2 className="text-2xl font-bold text-white mb-6">
              Step {currentStep + 1}: {steps[currentStep]}
            </h2>

            {/* Stable Form Component */}
            <StableProjectForm
              formData={projectData}
              updateField={updateField}
              currentStep={currentStep}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 0
                    ? 'bg-white bg-opacity-20 text-white text-opacity-50 cursor-not-allowed'
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                }`}
              >
                Back
              </button>

              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  className="px-6 py-3 bg-white text-emerald-600 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-semibold"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={analyzeProject}
                  disabled={isAnalyzing || !canAnalyze() || (!userAnalyses.canAnalyze && userAnalyses.pixieTier !== 'unlimited')}
                  className="px-8 py-3 bg-white text-emerald-600 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Analyzing...
                    </>
                  ) : !userAnalyses.canAnalyze && userAnalyses.pixieTier !== 'unlimited' ? (
                    <>
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade for More Analyses
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      🧚‍♀️ Send the Code Pixies to Work! ✨
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* AI Analysis Results */
          analysisResults && (
            <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                  <Brain className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">AI Analysis Complete</h3>
                  <p className="text-gray-600">Intelligent scoping for "{projectData.title}"</p>
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
                    <p><span className="font-medium">Total Cost:</span> {formatCurrency(analysisResults.total_cost)}</p>
                    <p><span className="font-medium">Rate:</span> ${analysisResults.hourly_rate || 100}/hour</p>
                    <p><span className="font-medium">Est. Hours:</span> {analysisResults.estimated_hours || 120}</p>
                    <p><span className="font-medium">Complexity:</span> {analysisResults.complexity || 'Moderate'}</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Timeline Analysis
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Industry Standard:</span> {analysisResults.timeline?.industry_standard || '8 weeks'}</p>
                    <p><span className="font-medium">Our Delivery:</span> {analysisResults.timeline?.accelerated || '4 weeks'}</p>
                    <p><span className="font-medium">Time Saved:</span> 50% faster</p>
                    <p><span className="font-medium">Score:</span> {analysisResults.complexity_score || 6}/10</p>
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
                      {(analysisResults.techStack?.frontend || ['React', 'Next.js']).map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Backend:</p>
                    <div className="flex flex-wrap gap-2">
                      {(analysisResults.techStack?.backend || ['Node.js', 'Express']).map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Database & Deployment:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {analysisResults.techStack?.database || 'PostgreSQL'}
                    </span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                      {analysisResults.techStack?.deployment || 'Vercel'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Phases */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Development Phases</h4>
                <div className="space-y-3">
                  {(analysisResults.phases || []).map((phase, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900">{phase.name || `Phase ${i + 1}`}</h5>
                        <span className="text-sm text-emerald-600 font-medium">{phase.duration || 'TBD'}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{phase.description || 'Phase description'}</p>
                      <div className="flex flex-wrap gap-1">
                        {(phase.deliverables || []).map((deliverable, j) => (
                          <span key={j} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {(analysisResults.keyFeatures || ['Core Features', 'User Interface', 'Backend API']).map((feature, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why This Approach */}
              <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Why This Approach
                </h4>
                <p className="text-sm text-yellow-700">
                  {analysisResults.whyRecommended || 'This approach balances modern technology with proven reliability, ensuring fast development without sacrificing quality.'}
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setCurrentStep(2);
                    setAnalysisResults(null);
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ← Back to Edit
                </button>
                
                <button
                  onClick={handleSubmitProject}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  🚀 Submit Project Request
                </button>
              </div>
            </div>
          )
        )}

        {/* Benefits Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600 text-sm">Get detailed project breakdowns with accurate cost and timeline estimates.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-600 text-sm">Receive comprehensive project analysis in under 60 seconds.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Ready to Build</h3>
            <p className="text-gray-600 text-sm">Get a complete roadmap to bring your project to life.</p>
          </div>
        </div>
      </div>
    </div>
  );
}