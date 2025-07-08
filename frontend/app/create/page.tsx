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
  Loader, 
  CreditCard,
  // New imports for magical UI
  AlertTriangle,
  Layers,
  Server,
  Database,
  TrendingUp,
  Download,
  Share2,
  ChevronDown,
  ChevronUp
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

// 🎨 MAGICAL ANALYSIS RESULTS COMPONENT
function MagicalAnalysisResults({ analysis, projectTitle, creditsRemaining, onProceedToPayment, onStartNewAnalysis }) {
  const [activePhase, setActivePhase] = useState(0);
  const [showAllRisks, setShowAllRisks] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getComplexityColor = (complexity) => {
    switch (complexity?.toLowerCase()) {
      case "simple":
        return "from-green-500 to-emerald-600";
      case "moderate":
        return "from-blue-500 to-indigo-600";
      case "complex":
        return "from-purple-500 to-pink-600";
      case "enterprise":
        return "from-orange-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getRiskColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case "high":
        return "border-red-300 bg-red-50 text-red-800";
      case "medium":
        return "border-yellow-300 bg-yellow-50 text-yellow-800";
      case "low":
        return "border-green-300 bg-green-50 text-green-800";
      default:
        return "border-gray-300 bg-gray-50 text-gray-800";
    }
  };

  return (
    <div className={`space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* Header Section - Dramatic & Readable */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-4 bg-white/10 backdrop-blur rounded-2xl">
                  <Brain className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">AI Analysis Complete</h2>
                  <p className="text-blue-200 text-lg">Project: "{projectTitle}"</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-3 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-colors">
                <Download className="w-5 h-5 text-white" />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Key Metrics - High Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/15 backdrop-blur border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-green-400" />
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getComplexityColor(analysis.complexity)} text-white shadow-lg`}>
                  {analysis.complexity}
                </span>
              </div>
              <p className="text-green-300 text-sm font-medium mb-1">Total Investment</p>
              <p className="text-3xl font-bold text-white">${analysis.total_cost?.toLocaleString()}</p>
              <p className="text-green-200 text-sm mt-2">{analysis.estimated_hours} hours @ ${analysis.hourly_rate}/hr</p>
            </div>

            <div className="bg-white/15 backdrop-blur border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <Clock className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-blue-300 text-sm font-medium mb-1">Delivery Timeline</p>
              <p className="text-3xl font-bold text-white">{analysis.timeline?.accelerated}</p>
              <p className="text-blue-200 text-sm mt-2">50% faster than industry standard</p>
            </div>

            <div className="bg-white/15 backdrop-blur border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <Zap className="w-8 h-8 text-yellow-400 mb-4" />
              <p className="text-yellow-300 text-sm font-medium mb-1">Complexity Score</p>
              <p className="text-3xl font-bold text-white">{analysis.complexity_score}/10</p>
              <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000" 
                     style={{ width: `${analysis.complexity_score / 10 * 100}%` }}></div>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <TrendingUp className="w-8 h-8 text-purple-400 mb-4" />
              <p className="text-purple-300 text-sm font-medium mb-1">ROI Timeline</p>
              <p className="text-3xl font-bold text-white">3-6 months</p>
              <p className="text-purple-200 text-sm mt-2">Typical payback period</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack - Clean & Readable */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center mb-6">
          <Code className="w-6 h-6 text-indigo-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Recommended Tech Stack</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 flex items-center text-lg">
              <Layers className="w-5 h-5 mr-2 text-blue-600" />
              Frontend
            </h4>
            <div className="flex flex-wrap gap-3">
              {analysis.techStack?.frontend?.map((tech, i) => (
                <span key={i} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-xl text-sm font-semibold border border-blue-200 shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 flex items-center text-lg">
              <Server className="w-5 h-5 mr-2 text-green-600" />
              Backend
            </h4>
            <div className="flex flex-wrap gap-3">
              {analysis.techStack?.backend?.map((tech, i) => (
                <span key={i} className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-xl text-sm font-semibold border border-green-200 shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 flex items-center text-lg">
              <Database className="w-5 h-5 mr-2 text-purple-600" />
              Infrastructure
            </h4>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-xl text-sm font-semibold border border-purple-200 shadow-sm">
                {analysis.techStack?.database}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-xl text-sm font-semibold border border-orange-200 shadow-sm">
                {analysis.techStack?.deployment}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Development Timeline - Interactive */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center mb-6">
          <Clock className="w-6 h-6 text-emerald-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Development Timeline</h3>
        </div>
        
        <div className="relative">
          {analysis.phases?.map((phase, i) => (
            <div key={i} className="relative flex items-start mb-8 cursor-pointer transition-all duration-300 hover:scale-102" 
                 onClick={() => setActivePhase(i)}>
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activePhase === i 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 scale-110' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  <span className={`font-bold ${activePhase === i ? 'text-white' : 'text-gray-600'}`}>
                    {i + 1}
                  </span>
                </div>
                {i < analysis.phases.length - 1 && (
                  <div className="w-0.5 h-16 bg-gray-200 absolute left-6 top-12"></div>
                )}
              </div>
              
              <div className="ml-6 flex-1">
                <div className={`rounded-xl p-6 border transition-all duration-300 ${
                  activePhase === i 
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-lg' 
                    : 'bg-gray-50 border-gray-200 hover:border-emerald-300'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg text-gray-900">{phase.name}</h4>
                    <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 font-medium">{phase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.deliverables?.map((deliverable, j) => (
                      <span key={j} className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-300 shadow-sm">
                        <CheckCircle className="w-3 h-3 mr-1 text-emerald-500" />
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features - Beautiful Grid */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features & Deliverables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysis.keyFeatures?.map((feature, i) => (
            <div key={i} className="flex items-center bg-white rounded-xl p-4 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-800">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment - Clear & Actionable */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-amber-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Risk Assessment & Mitigation</h3>
          </div>
          <button onClick={() => setShowAllRisks(!showAllRisks)} 
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center">
            {showAllRisks ? 'Show Less' : 'Show All'}
            {showAllRisks ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
        </div>
        
        <div className="space-y-4">
          {analysis.risks?.slice(0, showAllRisks ? undefined : 2).map((risk, i) => (
            <div key={i} className={`rounded-xl p-6 border-2 ${getRiskColor(risk.impact)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-3">{risk.risk}</h4>
                  <p className="font-medium mb-2">
                    <span className="text-sm font-bold uppercase tracking-wide">Mitigation:</span> {risk.mitigation}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  risk.impact === 'High' ? 'bg-red-200 text-red-800' :
                  risk.impact === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-green-200 text-green-800'
                }`}>
                  {risk.impact} Impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendation - Standout Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
            <Lightbulb className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">AI Expert Recommendation</h3>
            <p className="text-lg text-indigo-100 leading-relaxed font-medium">
              {analysis.whyRecommended}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons - Clear CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={onProceedToPayment} className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Proceed to Payment
          <Sparkles className="w-5 h-5 ml-2 group-hover:animate-pulse" />
        </button>
        
        <button onClick={onStartNewAnalysis} className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center">
          Start New Analysis
          <span className="ml-2 text-sm text-emerald-600">({creditsRemaining} credits left)</span>
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
  const [analysisResults, setAnalysisResults] = useState(null);
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

Estimated Price: ${analysisResults.total_cost?.toLocaleString()}
Timeline: ${analysisResults.timeline?.accelerated}

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

  // Helper function to safely get error message
  const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) return err.message;
    if (typeof err === 'string') return err;
    return 'Analysis failed. Please try again.';
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

    // TEMPORARILY DISABLED FOR TESTING
    // Check if user has credits
    // if (!userCredits.hasCredits && userCredits.subscriptionTier === 'free') {
    //   alert(`You've used all your free analyses! You have ${userCredits.creditsRemaining} credits remaining. Upgrade to Pro for unlimited analyses.`);
    //   router.push('/pricing');
    //   return;
    // }

    setIsAnalyzing(true);
    
    try {
      console.log('🧠 Running AI analysis...');
      
      // 🔧 FIXED: Use proper API call instead of window.claude.complete
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

      const analysisResult = await response.json();
      
      console.log('✅ Analysis complete!', analysisResult);
      
      // TEMPORARILY DISABLED FOR TESTING
      // Deduct credit for free users
      // if (userCredits.subscriptionTier === 'free') {
      //   setUserCredits(prev => ({
      //     ...prev,
      //     creditsRemaining: Math.max(prev.creditsRemaining - 1, 0),
      //     hasCredits: prev.creditsRemaining - 1 > 0
      //   }));
      // }
      
      // Store analysis results to show the beautiful display
      setAnalysisResults(analysisResult.analysis);
      setCurrentStep(3); // Move to analysis results step
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      // 🔧 TEMPORARY FALLBACK: Mock analysis for demo purposes
      console.log('🔄 Using fallback mock analysis for demo...');
      
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
Estimated Cost: ${mockAnalysis.total_cost.toLocaleString()}
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
          /* 🎨 MAGICAL AI Analysis Results */
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
            <p className="text-gray-600 text-sm">Detailed project breakdowns with accurate estimates.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-600 text-sm">Comprehensive analysis in under 60 seconds.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Ready to Build</h3>
            <p className="text-gray-600 text-sm">Complete roadmap to bring your project to life.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}