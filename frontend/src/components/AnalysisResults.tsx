import React, { useState, useEffect } from 'react';
import { 
  Brain, DollarSign, Clock, Code, Zap, Shield, 
  CheckCircle, AlertTriangle, TrendingUp, Layers,
  Calendar, Users, Sparkles, ArrowRight, Download,
  Share2, CreditCard, ChevronDown, ChevronUp
} from 'lucide-react';

interface AnalysisResultsProps {
  analysis: any;
  projectTitle: string;
  creditsRemaining: number;
  onProceedToPayment: () => void;
  onStartNewAnalysis: () => void;
}

export default function AnalysisResults({ 
  analysis, 
  projectTitle, 
  creditsRemaining,
  onProceedToPayment,
  onStartNewAnalysis 
}: AnalysisResultsProps) {
  const [activePhase, setActivePhase] = useState(0);
  const [showAllRisks, setShowAllRisks] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const getRiskColor = (impact: string) => {
    switch (impact?.toLowerCase()) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getComplexityGradient = (complexity: string) => {
    switch (complexity?.toLowerCase()) {
      case 'simple': return 'from-green-400 to-emerald-600';
      case 'moderate': return 'from-blue-400 to-indigo-600';
      case 'complex': return 'from-purple-400 to-pink-600';
      case 'enterprise': return 'from-orange-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className={`space-y-8 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* Hero Section with Key Metrics */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-white/10 backdrop-blur rounded-xl">
                  <Brain className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">AI Analysis Complete</h2>
                  <p className="text-emerald-200">Project: {projectTitle}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-3 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-emerald-400" />
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getComplexityGradient(analysis.complexity)} text-white`}>
                  {analysis.complexity}
                </span>
              </div>
              <p className="text-sm text-emerald-200 mb-1">Total Investment</p>
              <p className="text-3xl font-bold">${analysis.total_cost?.toLocaleString()}</p>
              <p className="text-xs text-emerald-300 mt-2">
                {analysis.estimated_hours} hours @ ${analysis.hourly_rate}/hr
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
              <Clock className="w-8 h-8 text-blue-400 mb-4" />
              <p className="text-sm text-blue-200 mb-1">Delivery Timeline</p>
              <p className="text-3xl font-bold">{analysis.timeline?.accelerated}</p>
              <p className="text-xs text-blue-300 mt-2">
                50% faster than industry standard
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
              <Zap className="w-8 h-8 text-yellow-400 mb-4" />
              <p className="text-sm text-yellow-200 mb-1">Complexity Score</p>
              <p className="text-3xl font-bold">{analysis.complexity_score}/10</p>
              <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(analysis.complexity_score / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
              <TrendingUp className="w-8 h-8 text-green-400 mb-4" />
              <p className="text-sm text-green-200 mb-1">ROI Timeline</p>
              <p className="text-3xl font-bold">3-6 months</p>
              <p className="text-xs text-green-300 mt-2">
                Typical payback period
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Visualization */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center mb-6">
          <Code className="w-6 h-6 text-emerald-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Recommended Tech Stack</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-blue-500" />
              Frontend
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.techStack?.frontend?.map((tech: string, i: number) => (
                <span key={i} className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              Backend
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.techStack?.backend?.map((tech: string, i: number) => (
                <span key={i} className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-xl text-sm font-medium border border-green-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
              Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-xl text-sm font-medium border border-purple-200">
                {analysis.techStack?.database}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 rounded-xl text-sm font-medium border border-orange-200">
                {analysis.techStack?.deployment}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Development Phases Timeline */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center mb-6">
          <Calendar className="w-6 h-6 text-emerald-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Development Timeline</h3>
        </div>
        
        <div className="relative">
          {analysis.phases?.map((phase: any, index: number) => (
            <div
              key={index}
              className={`relative flex items-start mb-8 cursor-pointer transition-all duration-300 ${
                activePhase === index ? 'scale-105' : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => setActivePhase(index)}
            >
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activePhase === index 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30' 
                    : 'bg-gray-200'
                }`}>
                  <span className={`font-bold ${activePhase === index ? 'text-white' : 'text-gray-600'}`}>
                    {index + 1}
                  </span>
                </div>
                {index < analysis.phases.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 absolute left-6 top-12" />
                )}
              </div>
              
              <div className="ml-6 flex-1">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg text-gray-900">{phase.name}</h4>
                    <span className="text-sm font-medium text-emerald-600">{phase.duration}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{phase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.deliverables?.map((deliverable: string, i: number) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200">
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

      {/* Key Features */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features & Deliverables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysis.keyFeatures?.map((feature: string, i: number) => (
            <div key={i} className="flex items-center bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-800">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Risk Assessment & Mitigation</h3>
          </div>
          <button
            onClick={() => setShowAllRisks(!showAllRisks)}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
          >
            {showAllRisks ? 'Show Less' : 'Show All'}
            {showAllRisks ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
        </div>
        
        <div className="space-y-4">
          {analysis.risks?.slice(0, showAllRisks ? undefined : 2).map((risk: any, i: number) => (
            <div key={i} className={`rounded-xl p-6 border ${getRiskColor(risk.impact)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{risk.risk}</h4>
                  <p className="text-gray-600 text-sm">{risk.mitigation}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  risk.impact === 'High' ? 'bg-red-100 text-red-700' :
                  risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {risk.impact} Impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Recommendation */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
            <Brain className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3">AI Expert Recommendation</h3>
            <p className="text-lg text-purple-100 leading-relaxed">
              {analysis.whyRecommended}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onProceedToPayment}
          className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Proceed to Payment
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <button
          onClick={onStartNewAnalysis}
          className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
        >
          Start New Analysis
          <span className="ml-2 text-sm text-gray-500">({creditsRemaining} credits left)</span>
        </button>
      </div>
    </div>
  );
}