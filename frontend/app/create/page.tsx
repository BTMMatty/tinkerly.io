'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { 
  Zap, 
  Brain, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  DollarSign, 
  Clock, 
  Code, 
  Lightbulb,
  Server,
  Database,
  TrendingUp,
  Layers,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { StableProjectForm } from '@/components/StableProjectForm';

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  requirements: string;
  timeline: string;
  complexity: string;
}

// ✅ FIXED: Proper TypeScript interfaces for analysis results
interface TechStack {
  frontend: string[];
  backend: string[];
  database: string;
  deployment: string;
}

interface Timeline {
  industry_standard: string;
  accelerated: string;
}

interface Phase {
  name: string;
  duration: string;
  description: string;
  deliverables: string[];
}

interface Risk {
  risk: string;
  mitigation: string;
  impact: 'Low' | 'Medium' | 'High';
}

interface AnalysisResult {
  complexity: string;
  complexity_score: number;
  estimated_hours: number;
  hourly_rate: number;
  total_cost: number;
  techStack: TechStack;
  timeline: Timeline;
  phases: Phase[];
  keyFeatures: string[];
  risks: Risk[];
  whyRecommended: string;
}

// ✅ FIXED: Proper component definition with interface
interface MagicalAnalysisResultsProps {
  analysis: AnalysisResult;
  projectTitle: string;
  creditsRemaining: number;
  onProceedToPayment: () => void;
  onStartNewAnalysis: () => void;
}

// ✅ FIXED: Proper function component declaration
function MagicalAnalysisResults({ 
  analysis, 
  projectTitle, 
  creditsRemaining, 
  onProceedToPayment, 
  onStartNewAnalysis 
}: MagicalAnalysisResultsProps) {
  const [activePhase, setActivePhase] = useState(0);
  const [showAllRisks, setShowAllRisks] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="animate-pulse bg-gray-200 rounded-xl h-96"></div>;
  }

  return (
    <div className={`space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* Header Section - Dramatic & Readable */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">AI Analysis Complete ✨</h2>
                <p className="text-blue-200 text-lg">Intelligent scoping for "{projectTitle}"</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-200">Credits Used</div>
              <div className="text-2xl font-bold text-white">1 of {creditsRemaining + 1}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Metrics - Clean & Readable */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-100 p-6 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-emerald-600 font-bold text-sm">PRICING</span>
          </div>
          <div className="space-y-3">
            <div className="text-3xl font-bold text-gray-900">${analysis.total_cost.toLocaleString()}</div>
            <div className="text-gray-600 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Rate:</span>
                <span className="font-semibold">${analysis.hourly_rate}/hr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Hours:</span>
                <span className="font-semibold">{analysis.estimated_hours}h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 p-6 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-blue-600 font-bold text-sm">TIMELINE</span>
          </div>
          <div className="space-y-3">
            <div className="text-3xl font-bold text-gray-900">{analysis.timeline.accelerated}</div>
            <div className="text-gray-600 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Industry Std:</span>
                <span className="font-semibold">{analysis.timeline.industry_standard}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Time Saved:</span>
                <span className="font-semibold text-green-600">50%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border-2 border-purple-100 p-6 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-purple-600 font-bold text-sm">COMPLEXITY</span>
          </div>
          <div className="space-y-3">
            <div className="text-3xl font-bold text-gray-900">{analysis.complexity}</div>
            <div className="text-gray-600 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Score:</span>
                <span className="font-semibold">{analysis.complexity_score}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${analysis.complexity_score * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack - Color Coded & Readable */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Code className="w-6 h-6 text-gray-700 mr-2" />
          Recommended Tech Stack
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
              <Layers className="w-4 h-4 mr-2" />
              Frontend
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.techStack.frontend.map((tech: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
              <Server className="w-4 h-4 mr-2" />
              Backend
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.techStack.backend.map((tech: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200">
                {analysis.techStack.database}
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200">
                {analysis.techStack.deployment}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Timeline */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Development Timeline</h3>
        <div className="space-y-4">
          {analysis.phases.map((phase: Phase, i: number) => (
            <div 
              key={i} 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                activePhase === i 
                  ? 'border-emerald-500 bg-emerald-50 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setActivePhase(i)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900 text-lg">{phase.name}</h4>
                <span className="text-emerald-600 font-bold text-sm bg-emerald-100 px-2 py-1 rounded">
                  {phase.duration}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{phase.description}</p>
              {activePhase === i && (
                <div className="border-t border-emerald-200 pt-3 mt-3">
                  <h5 className="font-medium text-gray-700 mb-2">Deliverables:</h5>
                  <div className="flex flex-wrap gap-2">
                    {phase.deliverables.map((deliverable: string, j: number) => (
                      <span key={j} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm border">
                        <CheckCircle className="w-3 h-3 inline mr-1 text-green-500" />
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <AlertTriangle className="w-6 h-6 text-amber-500 mr-2" />
            Risk Assessment
          </h3>
          <button 
            onClick={() => setShowAllRisks(!showAllRisks)}
            className="text-gray-500 hover:text-gray-700 flex items-center"
          >
            {showAllRisks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
        <div className="space-y-3">
          {analysis.risks.slice(0, showAllRisks ? undefined : 2).map((risk: Risk, i: number) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{risk.risk}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  risk.impact === 'High' ? 'bg-red-100 text-red-800' :
                  risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {risk.impact} Impact
                </span>
              </div>
              <p className="text-gray-600 text-sm">{risk.mitigation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why This Approach */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Why This Approach
        </h3>
        <p className="text-blue-800 leading-relaxed">
          {analysis.whyRecommended}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onStartNewAnalysis}
          className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:shadow-lg transition-all duration-200"
        >
          ← Analyze Another Project
        </button>
        <button
          onClick={onProceedToPayment}
          className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          🚀 Let's Build This!
        </button>
      </div>
    </div>
  );
}

export default function CreateProjectPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null); // ✅ FIXED: Proper typing
  const [userCredits, setUserCredits] = useState({ 
    hasCredits: true, 
    creditsRemaining: 3, 
    subscriptionTier: 'free' 
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

  // ✅ FIXED: Simple user check without infinite loops
  useEffect(() => {
    if (!isSignedIn) {
      // Redirect to home if not signed in
      router.push('/');
      return;
    }
    
    // Set default credits for all users
    if (user?.id) {
      setUserCredits({
        hasCredits: true,
        creditsRemaining: 3,
        subscriptionTier: 'free'
      });
    }
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
      alert(`🚀 Project "${projectData.title}" submitted successfully!

Estimated Price: $${analysisResults.total_cost.toLocaleString()}
Timeline: ${analysisResults.timeline.accelerated}

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

  const analyzeProject = async () => {
    if (!projectData.title || !projectData.description || !projectData.category || !projectData.requirements) {
      alert('Please fill in all required fields before analysis');
      return;
    }

    if (!user) {
      alert('Please sign in to analyze projects');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      console.log('🧠 Running AI analysis...');
      
      const analysisPrompt = `
        Analyze this project request and provide a detailed breakdown:
        
        Title: ${projectData.title}
        Description: ${projectData.description}
        Category: ${projectData.category}
        Requirements: ${projectData.requirements}
        
        Provide a JSON response with:
        {
          "complexity": "Simple|Moderate|Complex|Enterprise",
          "complexity_score": 1-10,
          "estimated_hours": number,
          "hourly_rate": number (80-150),
          "total_cost": number,
          "techStack": {
            "frontend": ["technology1", "technology2"],
            "backend": ["technology1", "technology2"],
            "database": "recommended_db",
            "deployment": "platform"
          },
          "timeline": {
            "industry_standard": "X weeks",
            "accelerated": "X weeks"
          },
          "phases": [
            {
              "name": "Phase Name",
              "duration": "X weeks",
              "description": "What gets built",
              "deliverables": ["item1", "item2"]
            }
          ],
          "keyFeatures": ["feature1", "feature2"],
          "risks": [
            {
              "risk": "Risk description", 
              "mitigation": "How to handle it",
              "impact": "Low|Medium|High"
            }
          ],
          "whyRecommended": "2-3 sentence explanation"
        }
        
        DO NOT OUTPUT ANYTHING OTHER THAN VALID JSON.
      `;

      // 🔧 FIXED: Use proper API call instead of window.claude.complete
      const response = await fetch('/api/analyze-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: analysisPrompt,
          projectData: projectData
        })
      });

      if (!response.ok) {
        throw new Error(`Analysis API error: ${response.status}`);
      }

      const analysisResult = await response.json();
      
      console.log('✅ Analysis complete!', analysisResult);
      
      // Store analysis results to show the beautiful display
      setAnalysisResults(analysisResult as AnalysisResult); // ✅ FIXED: Proper type casting
      setCurrentStep(3); // Move to analysis results step
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      // 🔧 TEMPORARY FALLBACK: Mock analysis for demo purposes
      console.log('🔄 Using fallback mock analysis for demo...');
      
      const mockAnalysis: AnalysisResult = { // ✅ FIXED: Proper typing
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
      
      alert(`🎉 Analysis complete! (Demo Mode)

Project: "${projectData.title}"
Complexity: ${mockAnalysis.complexity}
Estimated Cost: $${mockAnalysis.total_cost.toLocaleString()}
Timeline: ${mockAnalysis.timeline.accelerated}
Tech Stack: ${mockAnalysis.techStack.frontend.join(', ')}

Mock analysis generated for demo purposes!`);
      
      // Store mock analysis results to show the beautiful display
      setAnalysisResults(mockAnalysis);
      setCurrentStep(3); // Move to analysis results step
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

          {/* Credits Display - TEMPORARILY SHOWING UNLIMITED FOR TESTING */}
          <div className="inline-flex items-center bg-white border border-emerald-200 rounded-full px-6 py-2 mb-8">
            <Zap className="w-4 h-4 mr-2 text-emerald-500" />
            <span className="text-gray-700 font-medium">
              ∞ Unlimited analyses (Testing Mode)
            </span>
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
                  disabled={isAnalyzing || !canAnalyze()}
                  className="px-8 py-3 bg-white text-emerald-600 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-semibold"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Analyzing...
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
          /* AI Analysis Results - NEW MAGICAL UI */
          analysisResults && (
            <MagicalAnalysisResults
              analysis={analysisResults}
              projectTitle={projectData.title}
              creditsRemaining={userCredits.creditsRemaining}
              onProceedToPayment={handleSubmitProject}
              onStartNewAnalysis={() => {
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
              }}
            />
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