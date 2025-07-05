'use client';

import React from 'react';

// Define proper TypeScript interfaces
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
    '2-4 weeks',
    '1-2 months',
    '2-3 months',
    '3+ months'
  ];

  const complexityOptions = [
    'Simple (Basic functionality)',
    'Moderate (Standard features)',
    'Complex (Advanced features)',
    'Enterprise (Complex integrations)'
  ];

  if (currentStep === 0) {
    return (
      <div className="space-y-6">
        {/* Project Title */}
        <div>
          <label className="block text-emerald-100 text-sm font-semibold mb-2">
            Project Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="E.g., AI-Powered Customer Support System"
            className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-emerald-100 focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-emerald-100 text-sm font-semibold mb-2">
            Project Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Describe what you want to build and what problem it solves..."
            className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-emerald-100 resize-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            rows={4}
          />
        </div>
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <div className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-emerald-100 text-sm font-semibold mb-2">
            Project Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value)}
            className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            <option value="" className="text-gray-800">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat} className="text-gray-800">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-4">
          <p className="text-emerald-100 text-sm">
            💡 <strong>Tip:</strong> Choosing the right category helps our AI provide more accurate estimates and recommendations.
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        {/* Requirements */}
        <div>
          <label className="block text-emerald-100 text-sm font-semibold mb-2">
            Detailed Requirements *
          </label>
          <textarea
            value={formData.requirements}
            onChange={(e) => updateField('requirements', e.target.value)}
            placeholder="List specific features, integrations, and functionality you need..."
            className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-emerald-100 resize-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            rows={4}
          />
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-emerald-100 text-sm font-semibold mb-2">
            Preferred Timeline *
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => updateField('timeline', e.target.value)}
            className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            <option value="" className="text-gray-800">Select timeline</option>
            {timelineOptions.map((option, index) => (
              <option key={index} value={option} className="text-gray-800">
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Complexity */}
        <div>
          <label className="block text-emerald-100 text-sm font-semibold mb-2">
            Expected Complexity *
          </label>
          <select
            value={formData.complexity}
            onChange={(e) => updateField('complexity', e.target.value)}
            className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            <option value="" className="text-gray-800">Select complexity</option>
            {complexityOptions.map((option, index) => (
              <option key={index} value={option} className="text-gray-800">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return null;
};