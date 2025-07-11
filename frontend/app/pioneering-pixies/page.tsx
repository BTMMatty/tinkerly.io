'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Loader, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function PioneeringPixiesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    contactMethod: '',
    thing1: '',
    thing2: '',
    thing3: '',
    thing4: '',
    thing5: '',
    anythingElse: ''
  });

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzTAgI3-ROVA8w1QncHg1F8tRGbrI44LuLYxGTa1yNVkBdvzjOVn4ToxloOVCbFwOgA/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      });

      setIsSubmitted(true);
      setFormData({
        fullName: '',
        contactMethod: '',
        thing1: '',
        thing2: '',
        thing3: '',
        thing4: '',
        thing5: '',
        anythingElse: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        {/* Simple Header for Public Pages */}
        <header className="bg-white shadow-sm border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Tinkerly.io
                </div>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to the Pixie Pioneers! 🧚‍♀️✨
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your submission has been received. We're excited to learn about your amazing week!
            </p>
            <Link href="/">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Simple Header for Public Pages */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Tinkerly.io
              </div>
            </Link>
          </div>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header with Profile */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500 p-1">
              <div className="w-full h-full rounded-full bg-white p-1">
                <img 
                  src="/images/daft_pixie (1).png"
                  alt="Matty - daft_pixie"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Matty - daft_pixie</h1>
              <p className="text-emerald-600 font-medium">Chief Pixie at Tinkerly.io</p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-emerald-100 border border-emerald-200 rounded-full px-6 py-2 mb-4">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Pioneering Pixies Application</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tell Tinkerly.io 5 things you did last week
            </h2>
            <p className="text-gray-600">
              Share your weekly wins, learnings, and magic moments! 🧚‍♀️
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Your magical name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Best way to contact you *
              </label>
              <input
                type="text"
                required
                value={formData.contactMethod}
                onChange={(e) => handleChange('contactMethod', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Email, Twitter, LinkedIn, or your preferred method"
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your 5 Amazing Things from Last Week ✨
              </h3>
              
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thing #{num} {num <= 2 && '*'}
                  </label>
                  <textarea
                    required={num <= 2}
                    value={formData[`thing${num}` as keyof typeof formData]}
                    onChange={(e) => handleChange(`thing${num}`, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    rows={2}
                    placeholder={`What amazing thing #${num} did you accomplish?`}
                  />
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Anything else we should know?
              </label>
              <textarea
                value={formData.anythingElse}
                onChange={(e) => handleChange('anythingElse', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                rows={4}
                placeholder="Share any additional magic, dreams, or pixie dust..."
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Sending your magic...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit to the Pixie Council 🧚‍♀️
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
          <p className="text-emerald-800">
            <strong>Why we ask:</strong> We want to celebrate your wins and understand how our Pioneering Pixies 
            are changing the world, one magical week at a time! ✨
          </p>
        </div>
      </div>
    </div>
  );
}