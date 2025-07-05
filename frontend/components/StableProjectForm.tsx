// components/StableProjectForm.tsx
// This component is referenced in your CreateProjectPage but might be missing

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
    'ASAP (Rush job)',
    '1-2 weeks',
    '3-4 weeks',
    '1-2 months',
    '3-6 months',
    'Flexible timeline'
  ];

  const complexityOptions = [
    'Simple (Basic functionality)',
    'Moderate (Standard features)',
    'Complex (Advanced features)',
    'Enterprise (Large-scale)'
  ];

  return (
    <div className="space-y-6">
      {/* Step 0: Project Overview */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="E.g., AI-Powered Customer Support System"
              className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent"
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
              className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 resize-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent"
              rows={4}
            />
          </div>
        </div>
      )}

      {/* Step 1: Category */}
      {currentStep === 1 && (
        <div>
          <label className="block text-white text-sm font-semibold mb-4">
            Project Category *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => updateField('category', category)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  formData.category === category
                    ? 'border-white bg-white bg-opacity-20 text-white'
                    : 'border-white border-opacity-30 text-white hover:border-opacity-50 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <div className="font-medium">{category}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Requirements */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Detailed Requirements *
            </label>
            <textarea
              value={formData.requirements}
              onChange={(e) => updateField('requirements', e.target.value)}
              placeholder="List specific features, integrations, and functionality you need..."
              className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 resize-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Timeline Preference
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => updateField('timeline', e.target.value)}
              className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent"
            >
              <option value="" className="text-gray-800">Select timeline</option>
              {timelineOptions.map((option) => (
                <option key={option} value={option} className="text-gray-800">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Expected Complexity
            </label>
            <select
              value={formData.complexity}
              onChange={(e) => updateField('complexity', e.target.value)}
              className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent"
            >
              <option value="" className="text-gray-800">Select complexity</option>
              {complexityOptions.map((option) => (
                <option key={option} value={option} className="text-gray-800">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};