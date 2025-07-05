'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 border-t border-emerald-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Tinkerly Studio
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Transform your dreams into reality with AI-powered development. 
              50% faster delivery, transparent pricing, and magical results. ✨
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-emerald-100 font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  Start Building
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-emerald-100 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@tinkerly.io" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="mailto:privacy@tinkerly.io" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  Privacy Requests
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2025 Tinkerly.io Studio. Made with <Heart className="w-4 h-4 inline text-emerald-400" /> for builders worldwide.
            </div>
            <div className="text-gray-300 text-sm">
              🧚‍♀️ Powered by Code Pixies & AI Magic ✨
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;