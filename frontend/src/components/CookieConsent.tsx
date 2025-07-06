'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Settings, Check, Shield, Eye, Zap } from 'lucide-react';

const BeautifulCookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('tink-cookie-consent');
    if (!hasConsented) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      try {
        const savedPrefs = JSON.parse(localStorage.getItem('tink-cookie-preferences') || '{}');
        setPreferences(prev => ({ ...prev, ...savedPrefs }));
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    
    setPreferences(allAccepted);
    localStorage.setItem('tink-cookie-consent', 'true');
    localStorage.setItem('tink-cookie-preferences', JSON.stringify(allAccepted));
    setShowBanner(false);
    
    console.log('🍪 All cookies accepted');
  };

  const acceptSelected = () => {
    localStorage.setItem('tink-cookie-consent', 'true');
    localStorage.setItem('tink-cookie-preferences', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
    
    console.log('🍪 Selected cookies accepted:', preferences);
  };

  const rejectNonEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    
    setPreferences(essentialOnly);
    localStorage.setItem('tink-cookie-consent', 'true');
    localStorage.setItem('tink-cookie-preferences', JSON.stringify(essentialOnly));
    setShowBanner(false);
    
    console.log('🍪 Only essential cookies accepted');
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Beautiful Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-emerald-900 to-gray-900 text-white shadow-2xl border-t border-emerald-600/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto p-6">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Cookie className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold mb-3 text-emerald-200">🍪 We value your privacy & make cookies magical</h3>
              <p className="text-emerald-100 text-sm mb-6 max-w-3xl leading-relaxed">
                We use cookies to enhance your experience, analyze site traffic, and serve personalized content. 
                Our cookies are as carefully crafted as our code - no nasty surprises, just smooth functionality. 
                You're in complete control of your data.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={acceptAll}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Accept All & Continue
                </button>
                
                <button
                  onClick={rejectNonEssential}
                  className="bg-gray-700/80 hover:bg-gray-600/80 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-gray-600/50"
                >
                  <Shield className="w-4 h-4 mr-2 inline" />
                  Essential Only
                </button>
                
                <button
                  onClick={() => setShowSettings(true)}
                  className="border border-emerald-400/50 hover:border-emerald-300 text-emerald-200 hover:text-emerald-100 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center backdrop-blur-sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </button>
              </div>
              
              <div className="text-xs text-emerald-300/80 flex items-center space-x-4">
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  Learn more in our{' '}
                  <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline ml-1">
                    Privacy Policy
                  </Link>
                </span>
                <span className="flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 underline">
                    Terms of Service
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-emerald-200">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Cookie Preferences</h2>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-emerald-600" />
                      Essential Cookies
                    </h3>
                    <div className="bg-emerald-500 rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Required for basic site functionality, security, and user authentication. These cookies are essential 
                    for the website to function properly and cannot be disabled.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-blue-600" />
                      Analytics Cookies
                    </h3>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.analytics ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-lg ${
                          preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Help us understand how visitors interact with our website to improve performance, user experience, 
                    and optimize our development platform.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-purple-600" />
                      Functional Cookies
                    </h3>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, functional: !prev.functional }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.functional ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-lg ${
                          preferences.functional ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Enable enhanced functionality like chat widgets, forms, personalized user experiences, 
                    and AI-powered project recommendations.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-orange-600" />
                      Marketing Cookies
                    </h3>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.marketing ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-lg ${
                          preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Track visits across websites to show relevant ads, measure campaign effectiveness, 
                    and provide personalized development service recommendations.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={acceptSelected}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold shadow-lg transform hover:scale-105"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BeautifulCookieConsent;