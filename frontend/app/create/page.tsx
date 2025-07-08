'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Zap, Brain, ArrowRight, Sparkles, CheckCircle, DollarSign, Clock, Code, Lightbulb, Loader, CreditCard } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { StableProjectForm } from '@/components/StableProjectForm';
import AnalysisResults from '@/components/AnalysisResults';

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  requirements: string;
  timeline: string;
  complexity: string;
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

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, router]);

  // Stable update function
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
      
      if (result.analysis) {
        setAnalysisResults(result.analysis);
        setCurrentStep(3);
        
        // Update credits if returned
        if (result.credits_remaining !== undefined) {
          setUserCredits(prev => ({
            ...prev,
            creditsRemaining: result.credits_remaining,
            hasCredits: result.credits_remaining > 0
          }));
        }
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed. Please try again.');
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

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Redirecting...</p>
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
          </p>

          {/* Credits Display */}
          <div className="inline-flex items-center bg-white border border-emerald-200 rounded-full px-6 py-2 mb-8">
            <Zap className="w-4 h-4 mr-2 text-emerald-500" />
            <span className="text-gray-700 font-medium">
              {userCredits.creditsRemaining} analyses remaining
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        {currentStep < 3 && (
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
        )}

        {/* Form Card */}
        {currentStep < 3 ? (
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl border border-emerald-400 p-8 text-white">
            <h2 className="text-2xl font-bold text-white mb-6">
              Step {currentStep + 1}: {steps[currentStep]}
            </h2>

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
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
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
          /* AI Analysis Results */
          currentStep === 3 && analysisResults && (
            <AnalysisResults
              analysis={analysisResults}
              projectTitle={projectData.title}
              creditsRemaining={userCredits.creditsRemaining}
              onProceedToPayment={() => {
                alert('Payment integration coming soon!');
              }}
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