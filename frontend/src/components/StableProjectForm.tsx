'use client';

import React from 'react';

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  requirements: string;
  timeline: string;
  complexity: string;
}

interface StableProjectFormProps {
  formData: ProjectFormData;
  updateField: (field: keyof ProjectFormData, value: string) => void;
  currentStep: number;
}

export const StableProjectForm: React.FC<StableProjectFormProps> = ({
  formData,
  updateField,
  currentStep
}) => {
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

  const timelineOptions = [
    '1-2 weeks',
    '3-4 weeks',
    '1-2 months',
    '3-6 months',
    '6+ months'
  ];

  const complexityOptions = [
    'Simple - Basic functionality',
    'Moderate - Standard features',
    'Complex - Advanced features',
    'Enterprise - Full-scale solution'
  ];

  return (
    <div className="space-y-6">
      {/* Step 0: Project Overview */}
      {currentStep === 0 && (
        <>
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="E.g., AI-Powered Customer Support System"
              className="w-full p-4 bg-white border border-emerald-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Project Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe what you want to build and what problem it solves..."
              className="w-full p-4 bg-white border border-emerald-200 rounded-lg text-gray-900 placeholder-gray-500 resize-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-colors"
              rows={4}
            />
          </div>
        </>
      )}

      {/* Step 1: Category */}
      {currentStep === 1 && (
        <div>
          <label className="block text-white text-sm font-semibold mb-2">
            Project Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value)}
            className="w-full p-4 bg-white border border-emerald-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-colors"
          >
            <option value="" className="text-gray-500">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat} className="text-gray-900">
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Step 2: Requirements */}
      {currentStep === 2 && (
        <>
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Requirements & Features
            </label>
            <textarea
              value={formData.requirements}
              onChange={(e) => updateField('requirements', e.target.value)}
              placeholder="List specific features, integrations, and functionality you need..."
              className="w-full p-4 bg-white border border-emerald-200 rounded-lg text-gray-900 placeholder-gray-500 resize-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-colors"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Timeline
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => updateField('timeline', e.target.value)}
              className="w-full p-4 bg-white border border-emerald-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-colors"
            >
              <option value="" className="text-gray-500">Select timeline</option>
              {timelineOptions.map((timeline, index) => (
                <option key={index} value={timeline} className="text-gray-900">
                  {timeline}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Complexity Level
            </label>
            <select
              value={formData.complexity}
              onChange={(e) => updateField('complexity', e.target.value)}
              className="w-full p-4 bg-white border border-emerald-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-colors"
            >
              <option value="" className="text-gray-500">Select complexity</option>
              {complexityOptions.map((complexity, index) => (
                <option key={index} value={complexity} className="text-gray-900">
                  {complexity}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};