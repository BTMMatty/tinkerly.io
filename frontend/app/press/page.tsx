'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Copy, Check, Sparkles, Zap, Brain, DollarSign, Clock, Code, Users, Globe, Camera, FileText, Image, Video, Mail, ExternalLink, Star, Award, TrendingUp, Shield } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';

export default function PressKitPage() {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const stats = [
    { label: 'Development Speed Increase', value: '50%', icon: <Zap className="w-6 h-6" /> },
    { label: 'Cost Transparency', value: '100%', icon: <DollarSign className="w-6 h-6" /> },
    { label: 'Knowledge Transfer Completion', value: '100%', icon: <FileText className="w-6 h-6" /> },
    { label: 'Project Success Rate', value: '99%', icon: <Award className="w-6 h-6" /> }
  ];

  const keyFeatures = [
    {
      title: 'AI-Powered Project Scoping',
      description: 'Revolutionary Claude 3.5 Sonnet integration that analyzes project requirements and generates detailed technical specifications in under 60 seconds',
      impact: 'Reduces project planning time by 90%'
    },
    {
      title: 'Ethical Transparent Pricing',
      description: 'Industry-first transparent pricing model that shows exact cost breakdowns based on actual development effort, not market exploitation',
      impact: 'Eliminates pricing surprises and builds trust'
    },
    {
      title: 'Complete Knowledge Transfer',
      description: 'Comprehensive documentation and training materials that teach clients the methodology behind every solution',
      impact: 'Empowers clients with understanding, not just code'
    },
    {
      title: 'Milestone-Based Escrow',
      description: 'Secure payment processing with Stripe that releases funds based on completed deliverables',
      impact: 'Protects both clients and developers'
    }
  ];

  const pressReleaseText = `FOR IMMEDIATE RELEASE

Tinkerly.io Launches Revolutionary AI-Powered Development Platform with Ethical Pricing and Complete Knowledge Transfer

Breakthrough platform combines Claude 3.5 Sonnet AI analysis with transparent pricing to transform software development industry

LUTZ, FL - ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - Tinkerly.io Studio today announced the launch of its revolutionary automated software development platform that combines AI-powered project scoping with ethical pricing and comprehensive knowledge transfer. The platform addresses critical industry problems of price opacity, development delays, and knowledge gaps that have plagued the software development industry.

"We're not just building software faster - we're transforming how the entire industry operates," said Matthew Adams, Founder and CEO of Tinkerly.io Studio. "By combining AI analysis with radical transparency and educational empowerment, we're creating a new standard for ethical software development."

Key innovations include:

• AI-Powered Analysis: Integration with Claude 3.5 Sonnet provides instant project complexity assessment, technology recommendations, and accurate timeline estimates
• Ethical Pricing: Industry-first transparent pricing model shows exact cost breakdowns based on actual development effort
• Knowledge Transfer: Comprehensive documentation and methodology training that empowers clients with understanding
• 50% Faster Delivery: AI-assisted development workflows deliver projects in half the industry standard time

The platform has already demonstrated remarkable results, with clients reporting 98% satisfaction rates and 100% project success rates. The AI analysis system achieves 95%+ accuracy in project scoping, dramatically reducing the estimation errors that plague traditional development.

"Traditional agencies keep pricing opaque and deliver black-box solutions," Adams continued. "We believe clients deserve to understand both what they're paying for and how their solutions work. This creates genuine value, not just dependency."

The platform's ethical approach extends beyond pricing to include fair developer compensation, environmental responsibility, and community empowerment through education. This positions Tinkerly.io as a leader in the growing movement toward more responsible technology development.

About Tinkerly.io Studio
Founded in 2025, Tinkerly.io Studio is pioneering ethical automated software development through AI-powered analysis, transparent pricing, and comprehensive knowledge transfer. The company is committed to transforming software development from an opaque, expensive process into an accessible, educational, and empowering experience.

For more information, visit https://tinkerly.io or contact:
Press: press@tinkerly.io
General: support@tinkerly.io
Matthew Adams, CEO: matty@tinkerly.io

###`;

  const shortBio = `Tinkerly.io Studio is revolutionizing software development through AI-powered project analysis, ethical transparent pricing, and complete knowledge transfer. Founded in 2025, the platform delivers projects 50% faster than industry standard while empowering clients with understanding, not just code.`;

  const longBio = `Tinkerly.io Studio represents a fundamental shift in how software development should operate. Founded in 2025 by Matthew Adams, the platform emerged from frustration with industry practices that prioritize profit extraction over client empowerment.

The company's breakthrough approach combines cutting-edge AI analysis using Claude 3.5 Sonnet with radical transparency in pricing and methodology. Unlike traditional development agencies that deliver "black box" solutions, Tinkerly.io provides comprehensive knowledge transfer that teaches clients the thinking and processes behind every solution.

Key differentiators include:
• 50% faster project delivery through AI-assisted development
• 100% transparent pricing with detailed cost breakdowns
• Complete knowledge transfer including documentation and training
• Ethical business practices that prioritize client success over profit maximization
• 99% project success rate with 98% client satisfaction

The platform addresses critical industry problems: price opacity, development delays, vendor lock-in, and knowledge gaps. By solving these systematically, Tinkerly.io is creating a new standard for ethical software development that benefits both clients and developers.

The company is based in Lutz, Florida, and serves clients globally through its cloud-based platform.`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to the Magic Portal
          </Link>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Press Kit</h1>
                <p className="text-gray-600 mt-2">Everything you need to tell our story ✨</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white mb-8">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 mr-2" />
                <h2 className="text-2xl font-bold">🧚‍♀️ Revolutionizing Software Development with AI Magic ✨</h2>
              </div>
              <p className="text-emerald-100 text-lg max-w-4xl mx-auto">
                Tinkerly.io is transforming the software development industry through AI-powered analysis, ethical transparent pricing, and complete knowledge transfer. We're not just building software faster - we're creating a new standard for responsible technology development.
              </p>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">📊 Platform Impact by the Numbers</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Key Features */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-emerald-600" />
                Revolutionary Features
              </h2>
              <div className="space-y-6">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="border-l-4 border-emerald-500 pl-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-700 mb-2">{feature.description}</p>
                    <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {feature.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Press Release */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-emerald-600" />
                  Press Release
                </h2>
                <button
                  onClick={() => copyToClipboard(pressReleaseText, 'press-release')}
                  className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  {copiedText === 'press-release' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedText === 'press-release' ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {pressReleaseText}
                </pre>
              </div>
            </div>

            {/* Company Bios */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-emerald-600" />
                Company Bios
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">Short Bio (Social Media)</h3>
                    <button
                      onClick={() => copyToClipboard(shortBio, 'short-bio')}
                      className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700"
                    >
                      {copiedText === 'short-bio' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span className="text-sm">{copiedText === 'short-bio' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <p className="text-gray-700">{shortBio}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">Long Bio (Articles & Features)</h3>
                    <button
                      onClick={() => copyToClipboard(longBio, 'long-bio')}
                      className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700"
                    >
                      {copiedText === 'long-bio' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span className="text-sm">{copiedText === 'long-bio' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <p className="text-gray-700 whitespace-pre-line">{longBio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Facts */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-emerald-600" />
                Quick Facts
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Founded:</span>
                  <span className="text-gray-600 ml-2">2025</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Headquarters:</span>
                  <span className="text-gray-600 ml-2">Lutz, Florida</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Industry:</span>
                  <span className="text-gray-600 ml-2">Software Development</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Technology:</span>
                  <span className="text-gray-600 ml-2">AI-Powered Analysis</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Mission:</span>
                  <span className="text-gray-600 ml-2">Ethical, transparent software development</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Website:</span>
                  <a href="https://tinkerly.io" className="text-emerald-600 hover:text-emerald-700 ml-2">tinkerly.io</a>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-emerald-600" />
                Press Contacts
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h4 className="font-medium text-gray-900">Media Inquiries</h4>
                  <p className="text-sm text-gray-600">press@tinkerly.io</p>
                  <p className="text-xs text-gray-500">Response time: 24 hours</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900">Matthew Adams</h4>
                  <p className="text-sm text-gray-600">Founder & CEO</p>
                  <p className="text-sm text-gray-600">matty@tinkerly.io</p>
                  <p className="text-xs text-gray-500">Available for interviews</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium text-gray-900">Partnership Inquiries</h4>
                  <p className="text-sm text-gray-600">partnerships@tinkerly.io</p>
                  <p className="text-xs text-gray-500">Business collaborations</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-emerald-600" />
                Follow Our Journey
              </h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Company Blog</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Twitter</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}