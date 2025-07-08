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
    'ASAP (Rush)',
    '2-4 weeks',
    '1-2 months',
    '3-6 months',
    'Flexible timing'
  ];

  const complexityOptions = [
    'Simple (Basic functionality)',
    'Moderate (Standard features)',
    'Complex (Advanced features)',
    'Enterprise (Full-scale solution)'
  ];

  // 🎨 FIXED: Improved input styling with white backgrounds and readable text
  const inputClasses = "w-full p-4 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 focus:outline-none transition-all duration-200 shadow-sm";
  const labelClasses = "block text-white text-sm font-semibold mb-3";
  const selectClasses = "w-full p-4 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 focus:outline-none transition-all duration-200 shadow-sm";

  if (currentStep === 0) {
    return (
      <div className="space-y-6">
        {/* Project Title */}
        <div>
          <label className={labelClasses}>
            Project Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="E.g., Customer Management Dashboard"
            className={inputClasses}
          />
        </div>

        {/* Project Description */}
        <div>
          <label className={labelClasses}>
            Project Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Describe what you want to build and what problem it solves..."
            className={`${inputClasses} resize-none`}
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
          <label className={labelClasses}>
            Project Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value)}
            className={selectClasses}
          >
            <option value="" className="text-gray-500">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category} className="text-gray-900">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Category Description */}
        {formData.category && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-30">
            <h4 className="font-semibold text-white mb-2">About {formData.category}</h4>
            <p className="text-emerald-100 text-sm">
              {getCategoryDescription(formData.category)}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        {/* Requirements */}
        <div>
          <label className={labelClasses}>
            Detailed Requirements *
          </label>
          <textarea
            value={formData.requirements}
            onChange={(e) => updateField('requirements', e.target.value)}
            placeholder="List specific features, integrations, and functionality you need..."
            className={`${inputClasses} resize-none`}
            rows={4}
          />
        </div>

        {/* Timeline */}
        <div>
          <label className={labelClasses}>
            Preferred Timeline *
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => updateField('timeline', e.target.value)}
            className={selectClasses}
          >
            <option value="" className="text-gray-500">Select timeline</option>
            {timelineOptions.map((option, index) => (
              <option key={index} value={option} className="text-gray-900">
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Complexity */}
        <div>
          <label className={labelClasses}>
            Expected Complexity *
          </label>
          <select
            value={formData.complexity}
            onChange={(e) => updateField('complexity', e.target.value)}
            className={selectClasses}
          >
            <option value="" className="text-gray-500">Select complexity level</option>
            {complexityOptions.map((option, index) => (
              <option key={index} value={option} className="text-gray-900">
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Visual Progress Indicator */}
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-30">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
            <span className="text-white font-medium text-sm">Almost ready for AI analysis!</span>
          </div>
          <p className="text-emerald-100 text-xs">
            Complete all fields above to get intelligent project scoping and pricing estimates.
          </p>
        </div>
      </div>
    );
  }

  return null;
};

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    'Web Application': 'Full-featured web applications with modern UI/UX, user authentication, and dynamic functionality.',
    'Mobile App': 'Native or cross-platform mobile applications for iOS and Android with app store deployment.',
    'E-commerce Platform': 'Online stores with payment processing, inventory management, and customer management.',
    'API Development': 'RESTful or GraphQL APIs with documentation, authentication, and scalable architecture.',
    'Database Design': 'Optimized database schemas, migrations, and data modeling for your specific needs.',
    'AI/ML Integration': 'Artificial intelligence and machine learning features integrated into your applications.',
    'Custom Dashboard': 'Analytics dashboards with data visualization, reporting, and real-time updates.',
    'Integration Project': 'Connecting different systems, APIs, and services to work together seamlessly.',
    'Landing Page': 'High-converting landing pages with modern design and performance optimization.',
    'Enterprise Solution': 'Large-scale applications with enterprise features, security, and compliance.'
  };
  
  return descriptions[category] || 'Custom software solution tailored to your specific requirements.';
}