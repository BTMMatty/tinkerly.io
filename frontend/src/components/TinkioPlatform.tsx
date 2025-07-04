'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Code, DollarSign, Book, CheckCircle, ArrowRight, Brain, Shield, Heart, Zap, Users, Target, Calculator, Play, Download, FileText, Video, Award } from 'lucide-react';
import AuthHeader from './AuthHeader';
import Logo from './Logo';

const TinkerPlatform = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    category: '',
    complexity: '',
    requirements: '',
    timeline: ''
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const projectCategories = [
    { id: 'business', name: 'Business Automation', icon: '🏢' },
    { id: 'process', name: 'Process Automation', icon: '⚙️' },
    { id: 'workflow', name: 'Agentic Workflows', icon: '🧬' },
    { id: 'ai-agent', name: 'AI Agents', icon: '🤖' }
  ];

  const complexityLevels = [
    { id: 'simple', name: 'Simple', hours: '8-16', price: '$400-800' },
    { id: 'moderate', name: 'Moderate', hours: '16-40', price: '$800-2000' },
    { id: 'complex', name: 'Complex', hours: '40-80', price: '$2000-4000' },
    { id: 'enterprise', name: 'Enterprise', hours: '80+', price: '$4000+' }
  ];

  const analyzeProject = async () => {
    setIsAnalyzing(true);
    
    // Generate dynamic analysis based on actual project data
    const generateDynamicAnalysis = () => {
      // Base complexity on category and project description length
      let complexity = 5;
      if (projectData.category === 'ai-agent') complexity += 2;
      if (projectData.category === 'workflow') complexity += 1;
      if (projectData.description.length > 100) complexity += 1;
      if (projectData.requirements.length > 50) complexity += 1;
      
      complexity = Math.min(10, Math.max(1, complexity));
      
      const estimatedHours = complexity * 8 + Math.floor(Math.random() * 16);
      const basePrice = estimatedHours * 50;
      
      // Generate tech stack based on category
      const techStacks = {
        'business': ['React.js frontend', 'Node.js backend', 'PostgreSQL database', 'REST APIs'],
        'process': ['Python automation scripts', 'Docker containers', 'Redis cache', 'Webhook integrations'],
        'workflow': ['LangChain framework', 'Vector databases', 'OpenAI API', 'FastAPI backend'],
        'ai-agent': ['LLM integration', 'Vector embeddings', 'Autonomous decision engine', 'Real-time learning']
      };
      
      const selectedTech = techStacks[projectData.category] || techStacks['business'];
      
      return {
        complexity_score: complexity,
        estimated_hours: estimatedHours,
        technical_requirements: [
          ...selectedTech,
          'Secure authentication system',
          'Cloud hosting infrastructure'
        ],
        risk_factors: [
          complexity > 7 ? 'High complexity implementation' : 'Standard implementation risks',
          projectData.category === 'ai-agent' ? 'AI model training requirements' : 'Third-party integrations',
          'User adoption and training'
        ],
        pricing_breakdown: {
          discovery: Math.round(basePrice * 0.15),
          development: Math.round(basePrice * 0.50),
          testing: Math.round(basePrice * 0.20),
          deployment: Math.round(basePrice * 0.10),
          knowledge_transfer: Math.round(basePrice * 0.05),
          total: basePrice
        },
        learning_modules: [
          `${projectData.category.charAt(0).toUpperCase() + projectData.category.slice(1)} Architecture Patterns`,
          'Security Best Practices',
          'Deployment Strategies',
          `${selectedTech[0]} Implementation Guide`
        ],
        milestones: [
          { name: 'Discovery & Planning', percentage: 15, estimated_days: Math.ceil(estimatedHours * 0.15 / 8) },
          { name: 'Core Development', percentage: 50, estimated_days: Math.ceil(estimatedHours * 0.50 / 8) },
          { name: 'Integration & Testing', percentage: 25, estimated_days: Math.ceil(estimatedHours * 0.25 / 8) },
          { name: 'Deployment & Training', percentage: 10, estimated_days: Math.ceil(estimatedHours * 0.10 / 8) }
        ]
      };
    };

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const dynamicAnalysis = generateDynamicAnalysis();
      setAnalysisResult(dynamicAnalysis);
      setCurrentView('analysis');
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900 text-white">
      {/* Header */}
      <header className="p-6 flex justify-between items-center backdrop-blur-lg bg-white/10">
        <div className="flex items-center space-x-3">
          <Logo />
          <span className="text-2xl font-bold">Tinker.io</span>
        </div>
        <div className="flex items-center space-x-4">
          <AuthHeader />
          <button 
            onClick={() => setCurrentView('submit')}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
          >
            Start Building
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Revolutionary Automated Software Development
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
          Ethical pricing, transparent development, and comprehensive knowledge transfer. 
          We don't just build your software – we teach you how it works.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl">
            <Shield className="w-8 h-8 mb-3 text-emerald-400 mx-auto" />
            <h3 className="font-semibold mb-2">Transparent Pricing</h3>
            <p className="text-sm text-gray-300">Every dollar explained</p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl">
            <Brain className="w-8 h-8 mb-3 text-teal-400 mx-auto" />
            <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-sm text-gray-300">Claude 3.5 Sonnet intelligence</p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl">
            <Book className="w-8 h-8 mb-3 text-yellow-400 mx-auto" />
            <h3 className="font-semibold mb-2">Knowledge Transfer</h3>
            <p className="text-sm text-gray-300">Learn while we build</p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl">
            <Heart className="w-8 h-8 mb-3 text-green-400 mx-auto" />
            <h3 className="font-semibold mb-2">Ethical First</h3>
            <p className="text-sm text-gray-300">Fair for everyone</p>
          </div>
        </div>

        <button 
          onClick={() => setCurrentView('submit')}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Transform Your Idea Into Reality
        </button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">How Tinker.io Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">1. Intelligent Scoping</h3>
            <p className="text-gray-300 mb-4">
              Our AI analyzes your project requirements using Claude 3.5 Sonnet to provide 
              detailed technical specifications and complexity assessment.
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Natural language processing</li>
              <li>• Technical requirement analysis</li>
              <li>• Risk factor identification</li>
              <li>• Timeline estimation</li>
            </ul>
          </div>

          <div className="p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6">
              <Calculator className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">2. Transparent Pricing</h3>
            <p className="text-gray-300 mb-4">
              Get detailed pricing breakdowns that reflect actual development effort, 
              not market exploitation. Every hour accounted for.
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Time-based calculations</li>
              <li>• Complexity multipliers explained</li>
              <li>• Milestone-based payments</li>
              <li>• No hidden fees</li>
            </ul>
          </div>

          <div className="p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
              <Book className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">3. Learn & Build</h3>
            <p className="text-gray-300 mb-4">
              Receive comprehensive documentation, interactive tutorials, and 
              step-by-step explanations of your solution.
            </p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Interactive code walkthroughs</li>
              <li>• Architecture explanations</li>
              <li>• Video tutorials</li>
              <li>• Ongoing support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center border-t border-white/10">
        <p className="text-gray-400 text-sm">
          Copyright 2025: Some daft punk in a studio where everything is possible. Always.
        </p>
      </footer>
    </div>
  );

  const ProjectSubmission = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <header className="p-6 flex justify-between items-center backdrop-blur-lg bg-white/10">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('landing')} className="text-emerald-400 hover:text-emerald-300">
            ← Back
          </button>
          <span className="text-2xl font-bold">Tell Tinker What You Think</span>
        </div>
        <div className="text-sm">Step {currentStep} of 4</div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className={currentStep >= 1 ? 'text-emerald-400' : 'text-gray-500'}>Project Overview</span>
              <span className={currentStep >= 2 ? 'text-emerald-400' : 'text-gray-500'}>Requirements</span>
              <span className={currentStep >= 3 ? 'text-emerald-400' : 'text-gray-500'}>Technical Details</span>
              <span className={currentStep >= 4 ? 'text-emerald-400' : 'text-gray-500'}>Review</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Tell Us About Your Project</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <input
                  type="text"
                  value={projectData.title}
                  onChange={(e) => setProjectData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                  placeholder="E.g., Customer Support Chatbot for E-commerce"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Description</label>
                <textarea
                  value={projectData.description}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none h-32"
                  placeholder="Describe what you want to build, who will use it, and what problem it solves..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Category</label>
                <div className="grid grid-cols-2 gap-4">
                  {projectCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setProjectData(prev => ({ ...prev, category: category.id }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        projectData.category === category.id 
                          ? 'border-emerald-500 bg-emerald-500/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="font-semibold">{category.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Project Requirements</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Detailed Requirements</label>
                <textarea
                  value={projectData.requirements}
                  onChange={(e) => setProjectData(prev => ({ ...prev, requirements: e.target.value }))}
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none h-40"
                  placeholder="List specific features, integrations, user roles, and functionality you need..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Timeline</label>
                <select
                  value={projectData.timeline}
                  onChange={(e) => setProjectData(prev => ({ ...prev, timeline: e.target.value }))}
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP (Rush - 25% premium)</option>
                  <option value="1-2weeks">1-2 weeks</option>
                  <option value="2-4weeks">2-4 weeks</option>
                  <option value="1-2months">1-2 months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Expected Complexity</label>
                <div className="grid grid-cols-2 gap-4">
                  {complexityLevels.map(level => (
                    <button
                      key={level.id}
                      onClick={() => setProjectData(prev => ({ ...prev, complexity: level.id }))}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        projectData.complexity === level.id 
                          ? 'border-emerald-500 bg-emerald-500/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="font-semibold">{level.name}</div>
                      <div className="text-sm text-gray-400">{level.hours} hours</div>
                      <div className="text-sm text-emerald-400">{level.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Technical Preferences</h2>
              
              <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-400" />
                  AI-Powered Analysis
                </h3>
                <p className="text-sm text-gray-300">
                  Our AI will analyze your project and recommend the best technology stack, 
                  architecture patterns, and implementation approach based on your requirements.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Technical Requirements</label>
                <textarea
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none h-32"
                  placeholder="Any specific technologies, integrations, or constraints we should know about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Hosting Preferences</label>
                <select className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none">
                  <option value="">Let AI recommend</option>
                  <option value="aws">AWS</option>
                  <option value="vercel">Vercel</option>
                  <option value="netlify">Netlify</option>
                  <option value="heroku">Heroku</option>
                  <option value="self-hosted">Self-hosted</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Review Your Project</h2>
              
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-cyan-400">Project Title</h3>
                  <p>{projectData.title}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-cyan-400">Description</h3>
                  <p className="text-gray-300">{projectData.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-cyan-400">Category</h3>
                  <p>{projectCategories.find(c => c.id === projectData.category)?.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-cyan-400">Timeline</h3>
                  <p>{projectData.timeline}</p>
                </div>
              </div>

              <button
                onClick={analyzeProject}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    AI is analyzing your project...
                  </div>
                ) : (
                  'Get AI Analysis & Pricing'
                )}
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={currentStep === 4 || !projectData.title}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center border-t border-white/10">
        <p className="text-gray-400 text-sm">
          Copyright 2025: Some daft punk in a studio where everything is possible. Always.
        </p>
      </footer>
    </div>
  );

  const AnalysisResults = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <header className="p-6 flex justify-between items-center backdrop-blur-lg bg-white/10">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('submit')} className="text-cyan-400 hover:text-cyan-300">
            ← Back to Edit
          </button>
          <span className="text-2xl font-bold">Project Analysis</span>
        </div>
        <button 
          onClick={() => setCurrentView('payment')}
          className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
        >
          Proceed to Payment
        </button>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Analysis */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-cyan-400" />
                AI Analysis Results
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-cyan-400 mb-2">Complexity Score</h3>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl font-bold">{analysisResult?.complexity_score}/10</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-yellow-500 h-3 rounded-full"
                        style={{ width: `${(analysisResult?.complexity_score / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Moderate complexity project with standard integrations
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-cyan-400 mb-2">Estimated Hours</h3>
                  <div className="text-3xl font-bold">{analysisResult?.estimated_hours}h</div>
                  <p className="text-sm text-gray-400 mt-2">
                    Including development, testing, and documentation
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Requirements */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-purple-400" />
                Recommended Technology Stack
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {analysisResult?.technical_requirements.map((req, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-700 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-yellow-400" />
                Risk Assessment
              </h3>
              <div className="space-y-3">
                {analysisResult?.risk_factors.map((risk, index) => (
                  <div key={index} className="flex items-start p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></div>
                    <span>{risk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Modules */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Book className="w-5 h-5 mr-2 text-green-400" />
                Knowledge Transfer Modules
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {analysisResult?.learning_modules.map((module, index) => (
                  <div key={index} className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{module}</span>
                      <div className="flex space-x-2">
                        <Video className="w-4 h-4 text-purple-400" />
                        <FileText className="w-4 h-4 text-blue-400" />
                        <Play className="w-4 h-4 text-green-400" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Interactive tutorial included</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Pricing */}
          <div className="space-y-6">
            {/* Pricing Breakdown */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-cyan-500/30">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                Transparent Pricing
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Discovery & Planning</span>
                  <span>${analysisResult?.pricing_breakdown.discovery}</span>
                </div>
                <div className="flex justify-between">
                  <span>Core Development</span>
                  <span>${analysisResult?.pricing_breakdown.development}</span>
                </div>
                <div className="flex justify-between">
                  <span>Testing & QA</span>
                  <span>${analysisResult?.pricing_breakdown.testing}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deployment</span>
                  <span>${analysisResult?.pricing_breakdown.deployment}</span>
                </div>
                <div className="flex justify-between">
                  <span>Knowledge Transfer</span>
                  <span>${analysisResult?.pricing_breakdown.knowledge_transfer}</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between text-xl font-bold text-cyan-400">
                  <span>Total</span>
                  <span>${analysisResult?.pricing_breakdown.total}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <p className="text-sm text-blue-300">
                  💡 This price reflects actual development time and effort. 
                  No hidden fees or market exploitation.
                </p>
              </div>
            </div>

            {/* Milestone Timeline */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-400" />
                Project Milestones
              </h3>
              <div className="space-y-4">
                {analysisResult?.milestones.map((milestone, index) => (
                  <div key={index} className="border-l-4 border-cyan-500 pl-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{milestone.name}</span>
                      <span className="text-sm text-gray-400">{milestone.estimated_days} days</span>
                    </div>
                    <div className="text-sm text-cyan-400">{milestone.percentage}% of total</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Why Choose Tinker.io?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-400 mr-2" />
                  <span>Escrow-protected payments</span>
                </div>
                <div className="flex items-center">
                  <Book className="w-4 h-4 text-blue-400 mr-2" />
                  <span>Complete knowledge transfer</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 text-red-400 mr-2" />
                  <span>Ethical pricing practices</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>Quality guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center border-t border-white/10">
        <p className="text-gray-400 text-sm">
          Copyright 2025: Some daft punk in a studio where everything is possible. Always.
        </p>
      </footer>
    </div>
  );

  const PaymentView = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <header className="p-6 flex justify-between items-center backdrop-blur-lg bg-white/10">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('analysis')} className="text-cyan-400 hover:text-cyan-300">
            ← Back to Analysis
          </button>
          <span className="text-2xl font-bold">Secure Payment</span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Ready to Start Building?</h2>
            
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-6 border border-green-500/30 mb-6">
              <h3 className="font-bold text-green-400 mb-2">Milestone-Based Payment Protection</h3>
              <p className="text-sm text-gray-300 mb-4">
                Your payment is held in escrow and released only when each milestone is completed to your satisfaction.
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Initial Payment (Discovery)</span>
                  <span className="text-green-400">${analysisResult?.pricing_breakdown.discovery}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Remaining in escrow</span>
                  <span>${analysisResult?.pricing_breakdown.total - analysisResult?.pricing_breakdown.discovery}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVC</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                    placeholder="123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <button 
              onClick={() => setCurrentView('dashboard')}
              className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
            >
              Start Project - Pay ${analysisResult?.pricing_breakdown.discovery}
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Powered by Stripe. Your payment information is secure and encrypted.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center border-t border-white/10">
        <p className="text-gray-400 text-sm">
          Copyright 2025: Some daft punk in a studio where everything is possible. Always.
        </p>
      </footer>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <header className="p-6 flex justify-between items-center backdrop-blur-lg bg-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Code className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold">Tinker.io Dashboard</span>
        </div>
        <button onClick={() => setCurrentView('landing')} className="text-cyan-400 hover:text-cyan-300">
          ← Back to Home
        </button>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 🚀</h1>
          <p className="text-gray-400">Your project "{projectData.title}" is now in development.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Project Progress</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Discovery & Planning</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Complete</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Core Development</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-cyan-500 rounded-full animate-pulse"></div>
                    <span className="text-cyan-400">In Progress (60%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            {/* Live Code Generation */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Live Development Feed
              </h2>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-2">
                <div className="text-green-400">✓ Generated React component structure</div>
                <div className="text-green-400">✓ Implemented authentication system</div>
                <div className="text-yellow-400 animate-pulse">⚙️ Setting up payment integration...</div>
                <div className="text-gray-500">⏳ Upcoming: Database schema creation</div>
              </div>
            </div>

            {/* Knowledge Transfer */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Book className="w-5 h-5 mr-2 text-blue-400" />
                Your Learning Journey
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">React Architecture</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Learn how your app structure was designed</p>
                  <div className="flex space-x-2">
                    <button className="flex items-center px-3 py-1 bg-blue-600 rounded text-xs">
                      <Video className="w-3 h-3 mr-1" /> Watch
                    </button>
                    <button className="flex items-center px-3 py-1 bg-gray-600 rounded text-xs">
                      <Download className="w-3 h-3 mr-1" /> Download
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Payment Integration</span>
                    <div className="w-5 h-5 border-2 border-purple-500 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Understanding Stripe implementation</p>
                  <div className="text-xs text-purple-400">Available when milestone completes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold mb-4">Project Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Budget:</span>
                  <span className="float-right font-semibold">${analysisResult?.pricing_breakdown.total}</span>
                </div>
                <div>
                  <span className="text-gray-400">Paid:</span>
                  <span className="float-right text-green-400">${analysisResult?.pricing_breakdown.discovery}</span>
                </div>
                <div>
                  <span className="text-gray-400">In Escrow:</span>
                  <span className="float-right text-yellow-400">${analysisResult?.pricing_breakdown.total - analysisResult?.pricing_breakdown.discovery}</span>
                </div>
                <div>
                  <span className="text-gray-400">Timeline:</span>
                  <span className="float-right">13 days</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <button className="w-full p-2 bg-cyan-600 rounded-lg text-sm hover:bg-cyan-700 transition-colors">
                  💬 Chat with Tinkerer
                </button>
                <button className="w-full p-2 bg-gray-600 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                  📚 View Documentation
                </button>
                <button className="w-full p-2 bg-gray-600 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                  🎥 Schedule Call
                </button>
              </div>
            </div>

            {/* Community */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-bold mb-4 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Community
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Join other builders learning and creating with Tinker.io
              </p>
              <button className="w-full p-2 bg-purple-600 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                Join Discord
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Landing View */}
      <div className={currentView === 'landing' ? 'block' : 'hidden'}>
        <LandingPage />
      </div>

      {/* Submit Project View - ALWAYS RENDERED, JUST HIDDEN */}
      <div className={currentView === 'submit' ? 'block' : 'hidden'}>
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900 text-white">
          <header className="p-6 flex justify-between items-center backdrop-blur-lg bg-white/10">
            <div className="flex items-center space-x-3">
              <button onClick={() => setCurrentView('landing')} className="text-emerald-400 hover:text-emerald-300">
                ← Back
              </button>
              <span className="text-2xl font-bold">Tell Tinker What You Think</span>
            </div>
          </header>

          <div className="container mx-auto px-6 py-12">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 space-y-6">
                
                {/* Project Title - THIS WILL WORK! */}
                <div>
                  <label className="block text-emerald-400 mb-2 font-semibold">Project Title *</label>
                  <input
                    type="text"
                    value={projectData.title}
                    onChange={(e) => {
                      setProjectData(prev => ({
                        ...prev,
                        title: e.target.value
                      }));
                    }}
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none text-white"
                    placeholder="E.g., AI-Powered Customer Support System"
                  />
                </div>

                {/* Description - THIS WILL WORK! */}
                <div>
                  <label className="block text-emerald-400 mb-2 font-semibold">Description *</label>
                  <textarea
                    value={projectData.description}
                    onChange={(e) => {
                      setProjectData(prev => ({
                        ...prev,
                        description: e.target.value
                      }));
                    }}
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none text-white"
                    rows={4}
                    placeholder="Describe what you want to automate and what problem it solves..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-emerald-400 mb-2 font-semibold">Category *</label>
                  <select
                    value={projectData.category}
                    onChange={(e) => {
                      setProjectData(prev => ({
                        ...prev,
                        category: e.target.value
                      }));
                    }}
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none text-white"
                  >
                    <option value="">Select a category</option>
                    <option value="business">Business Automation</option>
                    <option value="process">Process Automation</option>
                    <option value="workflow">Agentic Workflows</option>
                    <option value="ai-agent">AI Agents</option>
                  </select>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-emerald-400 mb-2 font-semibold">Requirements</label>
                  <textarea
                    value={projectData.requirements}
                    onChange={(e) => {
                      setProjectData(prev => ({
                        ...prev,
                        requirements: e.target.value
                      }));
                    }}
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none text-white"
                    rows={3}
                    placeholder="List specific features, integrations, and functionality you need..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={analyzeProject}
                  disabled={!projectData.title || !projectData.description || !projectData.category}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      The AI Pixies Are Hard at Work... 🧚‍♀️✨
                    </div>
                  ) : (
                    '🧚‍♀️ Send the Code Pixies to Work! ✨'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Results View */}
      <div className={currentView === 'analysis' ? 'block' : 'hidden'}>
        <AnalysisResults />
      </div>

      {/* Payment View */}
      <div className={currentView === 'payment' ? 'block' : 'hidden'}>
        <PaymentView />
      </div>

      {/* Dashboard View */}
      <div className={currentView === 'dashboard' ? 'block' : 'hidden'}>
        <Dashboard />
      </div>
    </div>
  );
};

export default TinkerPlatform;