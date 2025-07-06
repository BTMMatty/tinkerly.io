'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Shield, Wand2, Heart, Scale, Users, Zap, Star, Lock, Globe, AlertTriangle, CheckCircle, FileText, Mail } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      setActiveSection(sectionId);
    }
  };

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'services', title: 'Our Magical Services', icon: <Wand2 className="w-5 h-5" /> },
    { id: 'accounts', title: 'User Accounts', icon: <Users className="w-5 h-5" /> },
    { id: 'pricing', title: 'Pricing & Payments', icon: <Scale className="w-5 h-5" /> },
    { id: 'intellectual', title: 'Intellectual Property', icon: <Shield className="w-5 h-5" /> },
    { id: 'prohibited', title: 'Prohibited Uses', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'privacy', title: 'Privacy & Data', icon: <Lock className="w-5 h-5" /> },
    { id: 'termination', title: 'Termination', icon: <FileText className="w-5 h-5" /> },
    { id: 'liability', title: 'Limitation of Liability', icon: <Globe className="w-5 h-5" /> },
    { id: 'contact', title: 'Contact Us', icon: <Mail className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <NavigationHeader />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Magical Header */}
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
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center relative">
                <Scale className="w-10 h-10 text-white" />
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">⚖️</div>
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Terms of Service</h1>
                <p className="text-gray-600 mt-2">Last Updated: July 6, 2025 • Effective Immediately</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white mb-8">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 mr-2" />
                <h2 className="text-2xl font-bold">🧚‍♀️ Welcome to tinkerly.io's Legal Pixie Dust ✨</h2>
              </div>
              <p className="text-emerald-100 text-lg max-w-4xl mx-auto">
                We've crafted these terms with the same care we put into your code - transparent, ethical, and designed to protect both you and our magical developer community. No legal jargon tricks, just honest agreements between friends building amazing things together.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 ${
                      activeSection === section.id
                        ? 'bg-emerald-100 text-emerald-700 font-medium'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <span className="text-emerald-500">{section.icon}</span>
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-8">
              <div className="prose prose-gray max-w-none">
                
                {/* Section 1: Acceptance of Terms */}
                <section id="acceptance" className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-0">1. Acceptance of Terms</h2>
                      <p className="text-gray-600 text-sm">The foundation of our magical partnership</p>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-emerald-800 mb-2">🤝 Our Magical Agreement</h3>
                    <p className="text-emerald-700">
                      By accessing or using tinkerly.io ("the Platform," "our Service"), you ("User," "you," "Client") enter into a legally binding agreement with tinkerly.io Studio ("Company," "we," "us"). These Terms of Service ("Terms") constitute a contract between you and our company.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border-l-4 border-emerald-500 pl-4">
                      <p className="font-semibold text-gray-900">Binding Agreement:</p>
                      <p className="text-gray-700">By using our Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="font-semibold text-gray-900">Capacity to Contract:</p>
                      <p className="text-gray-700">You represent that you are at least 18 years old and have the legal capacity to enter into this agreement. If you're using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms.</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p className="font-semibold text-gray-900">Modifications:</p>
                      <p className="text-gray-700">We may update these Terms periodically. We'll notify you of material changes via email or platform notifications at least 30 days before they take effect. Continued use after notification constitutes acceptance of new Terms.</p>
                    </div>
                  </div>
                </section>

                {/* Section 2: Our Magical Services */}
                <section id="services" className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                      <Wand2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-0">2. Our Magical Services</h2>
                      <p className="text-gray-600 text-sm">What our code pixies deliver</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-bold text-blue-800 mb-2">🤖 AI-Powered Analysis</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Project complexity assessment</li>
                        <li>• Technology stack recommendations</li>
                        <li>• Timeline and cost estimation</li>
                        <li>• Risk factor identification</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-2">⚡ Development Services</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Custom software development</li>
                        <li>• Web and mobile applications</li>
                        <li>• API development and integration</li>
                        <li>• Database design and optimization</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-bold text-yellow-800 mb-2 flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Service Guarantees & Limitations
                    </h3>
                    <div className="text-yellow-700 space-y-2">
                      <p><strong>Quality Commitment:</strong> We provide services with reasonable skill and care consistent with industry standards.</p>
                      <p><strong>No Warranty:</strong> While we strive for perfection, software is provided "as is" without warranties of merchantability or fitness for particular purposes.</p>
                      <p><strong>Beta Features:</strong> Some Platform features may be in beta testing. These are clearly marked and provided without guarantees.</p>
                    </div>
                  </div>
                </section>

                {/* Section 3: User Accounts */}
                <section id="accounts" className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-0">3. User Accounts & Responsibilities</h2>
                      <p className="text-gray-600 text-sm">Managing your magical identity</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-bold text-gray-900 mb-3">Account Creation & Security</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• You must provide accurate, current, and complete information during registration</li>
                        <li>• You're responsible for maintaining the confidentiality of your account credentials</li>
                        <li>• You must notify us immediately of any unauthorized account access</li>
                        <li>• One person or entity may not maintain multiple accounts without our written consent</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-bold text-red-800 mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Account Restrictions
                      </h4>
                      <div className="text-red-700 space-y-2">
                        <p>Your account may be suspended or terminated if you:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Provide false or misleading information</li>
                          <li>Violate these Terms or applicable laws</li>
                          <li>Engage in fraudulent or abusive behavior</li>
                          <li>Attempt to circumvent security measures</li>
                          <li>Use the Platform for illegal activities</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 4: Pricing & Payments */}
                <section id="pricing" className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                      <Scale className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-0">4. Pricing & Payment Terms</h2>
                      <p className="text-gray-600 text-sm">Transparent, ethical pricing</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white mb-6">
                    <h3 className="font-bold text-white mb-2 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Our Ethical Pricing Commitment
                    </h3>
                    <p className="text-emerald-100">
                      We believe in transparent, fair pricing based on actual development effort, not market exploitation. Every price is justified and explainable.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-900">Payment Structure</h4>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <ul className="text-blue-700 space-y-2">
                          <li><strong>Project Analysis:</strong> Free for first 3 analyses, then credit-based</li>
                          <li><strong>Development Work:</strong> Fixed-price based on AI analysis</li>
                          <li><strong>Milestone Payments:</strong> 50% upfront, 50% on delivery</li>
                          <li><strong>Optional Tips:</strong> Support our pixies with additional contributions</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-900">Payment Terms</h4>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <ul className="text-green-700 space-y-2">
                          <li><strong>Payment Methods:</strong> Credit cards, PayPal, bank transfers</li>
                          <li><strong>Currency:</strong> USD unless otherwise specified</li>
                          <li><strong>Refunds:</strong> 30-day satisfaction guarantee</li>
                          <li><strong>Disputes:</strong> Resolved through good-faith negotiation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
                    <h4 className="font-bold text-yellow-800 mb-2">Payment Processing</h4>
                    <p className="text-yellow-700">
                      Payments are processed securely through Stripe. We don't store payment card information. 
                      All transactions are subject to Stripe's terms and conditions. Failed payments may result in service suspension.
                    </p>
                  </div>
                </section>

                {/* Section 5: Intellectual Property */}
                <section id="intellectual" className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-0">5. Intellectual Property Rights</h2>
                      <p className="text-gray-600 text-sm">Who owns what in our magical creations</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                      <h4 className="font-bold text-emerald-800 mb-3">✨ Your Magical Ownership Rights</h4>
                      <div className="text-emerald-700 space-y-2">
                        <p><strong>Custom Code:</strong> You own all custom code developed specifically for your project.</p>
                        <p><strong>Documentation:</strong> Training materials and documentation created for your project belong to you.</p>
                        <p><strong>Project Assets:</strong> All deliverables specified in your project agreement become your property upon full payment.</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">🛡️ Platform Rights</h4>
                      <div className="text-blue-700 space-y-2">
                        <p><strong>Platform Technology:</strong> tinkerly.io retains ownership of the Platform, AI models, and core technology.</p>
                        <p><strong>Methodologies:</strong> Development methodologies and processes remain our intellectual property.</p>
                        <p><strong>Improvements:</strong> Enhancements to Platform capabilities derived from projects remain ours.</p>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h4 className="font-bold text-purple-800 mb-3">🤝 Shared Knowledge</h4>
                      <div className="text-purple-700 space-y-2">
                        <p><strong>Open Source Components:</strong> Third-party open source code retains original licensing.</p>
                        <p><strong>General Knowledge:</strong> Publicly available information and general programming knowledge remains public.</p>
                        <p><strong>Attribution:</strong> We may showcase completed projects in our portfolio with your permission.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 6: Prohibited Uses */}
                <section id="prohibited" className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-0">6. Prohibited Uses</h2>
                      <p className="text-gray-600 text-sm">What our pixies won't help with</p>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-red-800 mb-4">🚫 Absolutely Forbidden</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">Illegal Activities:</h5>
                        <ul className="text-red-600 text-sm space-y-1">
                          <li>• Malware, viruses, or harmful code</li>
                          <li>• Hacking tools or exploits</li>
                          <li>• Copyright infringement tools</li>
                          <li>• Fraudulent financial systems</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">Harmful Content:</h5>
                        <ul className="text-red-600 text-sm space-y-1">
                          <li>• Adult content platforms</li>
                          <li>• Harassment or doxxing tools</li>
                          <li>• Discrimination-enabling systems</li>
                          <li>• Violence-promoting applications</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h4 className="font-bold text-orange-800 mb-2">⚠️ Requires Special Review</h4>
                    <p className="text-orange-700">
                      Projects involving cryptocurrency, gambling, political campaigns, or healthcare data require additional compliance review and may incur extra fees for legal consultation.
                    </p>
                  </div>
                </section>

                {/* Section 7: Privacy & Data */}
                <section id="privacy" className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                      <Lock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-0">7. Privacy & Data Protection</h2>
                      <p className="text-gray-600 text-sm">How we protect your magical secrets</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-emerald-800 mb-2">🔒 Our Privacy Commitment</h3>
                    <p className="text-emerald-700">
                      Your privacy is sacred to us. We follow GDPR and CCPA requirements, use minimal data collection, and never sell your information. 
                      For complete details, see our <Link href="/privacy" className="text-emerald-600 hover:text-emerald-500 underline">Privacy Policy</Link>.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="font-semibold text-gray-900">Data Collection:</p>
                      <p className="text-gray-700">We collect only information necessary to provide services: contact details, project requirements, and usage analytics.</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="font-semibold text-gray-900">Data Security:</p>
                      <p className="text-gray-700">All data is encrypted in transit and at rest. We use industry-standard security measures and regular security audits.</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p className="font-semibold text-gray-900">Your Rights:</p>
                      <p className="text-gray-700">You can access, correct, delete, or export your data at any time. Contact us at privacy@tinkerly.io for data requests.</p>
                    </div>
                  </div>
                </section>

                {/* Section 8: Termination */}
                <section id="termination" className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-0">8. Termination</h2>
                      <p className="text-gray-600 text-sm">When the magic must end</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-bold text-blue-800 mb-3">Your Right to Leave</h4>
                      <div className="text-blue-700 space-y-2">
                        <p>You may terminate your account at any time by:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Contacting our support team</li>
                          <li>Using account deletion tools in your dashboard</li>
                          <li>Sending written notice to matty@tinkerly.io</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="font-bold text-orange-800 mb-3">Our Right to Terminate</h4>
                      <div className="text-orange-700 space-y-2">
                        <p>We may suspend or terminate accounts for:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Terms of Service violations</li>
                          <li>Fraudulent or abusive behavior</li>
                          <li>Non-payment of fees</li>
                          <li>Legal or regulatory requirements</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
                    <h4 className="font-bold text-yellow-800 mb-2">Effect of Termination</h4>
                    <p className="text-yellow-700">
                      Upon termination, your access ceases immediately. You retain ownership of delivered work. 
                      We'll provide 30 days to download your data. Unpaid fees remain due. 
                      Confidentiality obligations survive termination.
                    </p>
                  </div>
                </section>

                {/* Section 9: Limitation of Liability */}
                <section id="liability" className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <Globe className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-0">9. Limitation of Liability</h2>
                      <p className="text-gray-600 text-sm">Legal protections for both parties</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-purple-800 mb-2">⚖️ Liability Limitations</h3>
                    <p className="text-purple-700 mb-4">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, tinkerly.IO'S TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.
                    </p>
                    <p className="text-purple-700">
                      We are not liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or business interruption.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">What We Don't Cover:</h5>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Third-party service outages or failures</li>
                        <li>• User error or misuse of delivered software</li>
                        <li>• Changes in technology or platform requirements</li>
                        <li>• Business losses due to implementation delays</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-semibold text-green-800 mb-2">What We Do Cover:</h5>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Defects in delivered code for 90 days</li>
                        <li>• Failure to deliver agreed-upon functionality</li>
                        <li>• Security vulnerabilities in our custom code</li>
                        <li>• Documentation errors or omissions</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 10: Contact & Disputes */}
                <section id="contact" className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-0">10. Contact & Dispute Resolution</h2>
                      <p className="text-gray-600 text-sm">How to reach our legal pixies</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-emerald-800 mb-4">📧 Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-emerald-700 mb-2">General Inquiries:</h5>
                        <p className="text-emerald-600">support@tinkerly.io</p>
                        
                        <h5 className="font-semibold text-emerald-700 mb-2 mt-4">Legal Matters:</h5>
                        <p className="text-emerald-600">legal@tinkerly.io</p>
                        
                        <h5 className="font-semibold text-emerald-700 mb-2 mt-4">Privacy Requests:</h5>
                        <p className="text-emerald-600">privacy@tinkerly.io</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-emerald-700 mb-2">Mailing Address:</h5>
                        <div className="text-emerald-600">
                          <p>tinkerly.io Studio</p>
                          <p>901 Goldie Park Lane</p>
                          <p>Lutz, FL 33548</p>
                          <p>United States</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-bold text-blue-800 mb-3">🤝 Dispute Resolution</h4>
                    <div className="text-blue-700 space-y-2">
                      <p><strong>Step 1:</strong> Contact us directly to resolve issues in good faith.</p>
                      <p><strong>Step 2:</strong> If unresolved, we'll engage in mediation through a mutually agreed mediator.</p>
                      <p><strong>Step 3:</strong> Final disputes subject to binding arbitration under American Arbitration Association rules.</p>
                      <p><strong>Governing Law:</strong> These Terms are governed by Florida state law and U.S. federal law.</p>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white text-center">
                  <h3 className="font-bold text-white mb-2 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Thank You for Reading Our Terms! 
                    <Sparkles className="w-5 h-5 ml-2" />
                  </h3>
                  <p className="text-emerald-100 mb-4">
                    We believe in building technology with transparency, ethics, and a touch of magic. 
                    These terms protect both of us while we create amazing things together.
                  </p>
                  <p className="text-emerald-200 text-sm">
                    Questions? Email us at <a href="mailto:legal@tinkerly.io" className="text-white underline">legal@tinkerly.io</a> 
                    - we actually read and respond to every message! 🧚‍♀️✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}