'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Shield, Eye, Lock, Globe, Download, Trash2, Edit, UserCheck } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tinker.io
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600 mt-2">GDPR & CCPA/CPRA Compliant • Last Updated: July 4, 2025</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <Globe className="w-4 h-4 inline mr-2" />
                <strong>EU/EEA Residents:</strong> Full GDPR rights and protections
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-purple-800 text-sm">
                <UserCheck className="w-4 h-4 inline mr-2" />
                <strong>California Residents:</strong> CCPA/CPRA rights included
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-emerald-800 mb-2">Introduction</h2>
              <p className="text-emerald-700">
                Tinker.io ("we," "us," "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information in accordance with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act/California Privacy Rights Act (CCPA/CPRA).
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-emerald-600" />
              Information We Collect
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="space-y-3">
                <li><strong>Personal Data:</strong> Name, email address, account credentials, IP address, device information, usage data, payment information.</li>
                <li><strong>Sensitive Data:</strong> Only if necessary and with explicit consent (e.g., for certain enterprise features).</li>
                <li><strong>Cookies & Tracking:</strong> We use cookies and similar technologies for analytics, security, and functionality.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Purposes of Processing</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>To provide and improve our services</li>
              <li>To communicate with users</li>
              <li>For account management and authentication</li>
              <li>For analytics and product development</li>
              <li>For legal compliance</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Bases for Processing (GDPR)</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm">
                  <li>• User consent (for marketing, cookies, etc.)</li>
                  <li>• Performance of a contract (providing services)</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm">
                  <li>• Legitimate interests (improving services, security)</li>
                  <li>• Legal obligations</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories of Sources (CCPA/CPRA)</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Directly from users (account registration, forms)</li>
              <li>Automatically (website/app usage, cookies)</li>
              <li>Third-party integrations (with user consent)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-emerald-600" />
              Data Sharing & Disclosure
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <ul className="space-y-3">
                <li><strong>Service Providers:</strong> Only as necessary for service delivery (e.g., hosting, payment processing).</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations or protect rights.</li>
                <li><strong>No Sale/Sharing:</strong> We do not sell personal information. Users can opt out of any future sale or sharing.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Data is retained only as long as necessary for the purposes stated or as required by law.</li>
              <li>Retention periods are reviewed regularly.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Transfers</h2>
            <p className="mb-6 bg-gray-50 p-4 rounded-lg">
              Data may be transferred outside the EU/EEA or California. We implement appropriate safeguards (e.g., Standard Contractual Clauses).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* GDPR Rights */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  GDPR (EU/EEA Residents)
                </h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-center"><Download className="w-4 h-4 mr-2" />Right to access, rectify, or erase personal data</li>
                  <li className="flex items-center"><Shield className="w-4 h-4 mr-2" />Right to restrict or object to processing</li>
                  <li className="flex items-center"><Download className="w-4 h-4 mr-2" />Right to data portability</li>
                  <li className="flex items-center"><UserCheck className="w-4 h-4 mr-2" />Right to withdraw consent at any time</li>
                  <li className="flex items-center"><Mail className="w-4 h-4 mr-2" />Right to lodge a complaint with a supervisory authority</li>
                </ul>
              </div>

              {/* CCPA Rights */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-bold text-purple-800 mb-4 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2" />
                  CCPA/CPRA (California Residents)
                </h3>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li className="flex items-center"><Eye className="w-4 h-4 mr-2" />Right to know what personal information is collected, used, shared, or sold</li>
                  <li className="flex items-center"><Trash2 className="w-4 h-4 mr-2" />Right to delete personal information (with exceptions)</li>
                  <li className="flex items-center"><Edit className="w-4 h-4 mr-2" />Right to correct inaccurate personal information</li>
                  <li className="flex items-center"><Shield className="w-4 h-4 mr-2" />Right to opt out of sale or sharing of personal information</li>
                  <li className="flex items-center"><UserCheck className="w-4 h-4 mr-2" />Right to non-discrimination for exercising privacy rights</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exercising Your Rights</h2>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
              <p className="text-emerald-700 mb-4">Submit requests via:</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <a href="mailto:privacy@tinker.io" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    privacy@tinker.io
                  </a>
                </div>
                <p className="text-sm text-emerald-600">We will verify your identity and respond within the legally required timeframes.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              We do not knowingly collect data from children under 16 without appropriate consent.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-emerald-600" />
              Security Measures
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm">
                  <li>• Encryption in transit and at rest</li>
                  <li>• Access controls and authentication</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm">
                  <li>• Regular security audits and staff training</li>
                  <li>• Continuous monitoring and updates</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Data Protection Officer</h4>
                  <p className="text-gray-700">Matthew Adams</p>
                  <a href="mailto:matty@tinker.io" className="text-emerald-600 hover:text-emerald-700">
                    matty@tinker.io
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Mailing Address</h4>
                  <p className="text-gray-700">
                    901 Goldie Park Lane<br />
                    Lutz, FL 33548
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates</h2>
            <p className="mb-8">
              This policy is reviewed and updated at least annually. Last updated: July 4, 2025.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <p className="text-emerald-800 font-medium text-center">
                <Shield className="w-5 h-5 inline mr-2" />
                Your privacy matters to us. We're committed to transparency and protecting your personal information. 🧚‍♀️
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}