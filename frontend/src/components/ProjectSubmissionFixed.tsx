'use client';

import React, { useState, useCallback } from 'react';
import { StableProjectForm } from './StableProjectForm';

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  requirements: string;
  timeline: string;
  complexity: string;
}

export const ProjectSubmissionFixed = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Use a single state object for all form data
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: '',
    requirements: '',
    timeline: '',
    complexity: ''
  });

  // Stable update function that won't cause re-renders
  const updateField = useCallback((field: keyof ProjectFormData, value: string) => {
    setFormData(prev => ({
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

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    try {
      // Your existing AI analysis logic here
      // Example using window.claude.complete:
      
      const analysisPrompt = `
        Analyze this project request and provide a detailed breakdown:
        
        Title: ${formData.title}
        Description: ${formData.description}
        Category: ${formData.category}
        Requirements: ${formData.requirements}
        Timeline: ${formData.timeline}
        Complexity: ${formData.complexity}
        
        Provide a JSON response with:
        {
          "estimatedHours": number,
          "hourlyRate": number,
          "totalCost": number,
          "techStack": string[],
          "deliverables": string[],
          "timeline": string,
          "complexity": 1-10,
          "recommendations": string[]
        }
      `;

      const response = await window.claude.complete(analysisPrompt);
      const analysis = JSON.parse(response);
      
      // Store analysis results (you'll want to save this to your state management)
      console.log('Analysis complete:', analysis);
      
      // Navigate to results view or update UI state
      // setShowResults(true) or navigate to results page
      
    } catch (error) {
      console.error('Analysis error:', error);
      // Handle error - show fallback analysis or error message
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Validation logic
  const canProceedToNext = () => {
    if (currentStep === 0) {
      return formData.title.trim() && formData.description.trim();
    }
    if (currentStep === 1) {
      return formData.category;
    }
    return true;
  };

  const canAnalyze = () => {
    return formData.requirements.trim() && formData.timeline && formData.complexity;
  };

  const steps = ['Project Overview', 'Category', 'Requirements'];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`text-sm ${
                  index <= currentStep ? 'text-emerald-400' : 'text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-6">
            Tell Tink What You Think ✨
          </h2>

          {/* Stable Form Component */}
          <StableProjectForm
            formData={formData}
            updateField={updateField}
            currentStep={currentStep}
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg transition-all ${
                currentStep === 0
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              Back
            </button>

            {currentStep < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceedToNext()}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !canAnalyze()}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <span className="animate-spin">⚡</span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    🧚‍♀️ Send the Code Pixies to Work! ✨
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Debug info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-gray-800 rounded text-xs">
            <details>
              <summary className="cursor-pointer text-emerald-400">Debug Form Data</summary>
              <pre className="mt-2 text-gray-300">{JSON.stringify(formData, null, 2)}</pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};