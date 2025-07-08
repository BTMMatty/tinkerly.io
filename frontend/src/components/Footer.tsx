'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, MessageCircle, Users, Github, Twitter, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 border-t border-emerald-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Tinkerly.io
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Transform your dreams into reality with AI-powered development. 
              50% faster delivery, transparent pricing, and magical results. ✨
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-emerald-100 font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/story" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  The Pixie Post
                </Link>
              </li>
              <li>
                <a 
                  href="https://soon.tinkerly.io" 
                  className="text-gray-300 hover:text-emerald-200 transition-colors flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Beta Waitlist
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-emerald-100 font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://discord.gg/AGvXAn9yxJ" 
                  className="text-gray-300 hover:text-emerald-200 transition-colors flex items-center group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-purple-400 group-hover:text-purple-300" />
                  Tinkerland Discord
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/BTMMatty/tinkerly.io" 
                  className="text-gray-300 hover:text-emerald-200 transition-colors flex items-center group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2 text-gray-400 group-hover:text-white" />
                  GitHub
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-emerald-100 font-semibold mb-4">Legal & Support</h3>
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
                <Link href="/press" className="text-gray-300 hover:text-emerald-200 transition-colors">
                  Press Kit
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:hello@tinkerly.io" 
                  className="text-gray-300 hover:text-emerald-200 transition-colors flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="mailto:media@tinkerly.io" 
                  className="text-gray-300 hover:text-emerald-200 transition-colors"
                >
                  Media Relations
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Discord Highlight Section */}
        <div className="border-t border-emerald-800 pt-8 mt-8">
          <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-400/20 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-300">Join Tinkerland Discord! 🏰</h3>
                  <p className="text-purple-200 text-sm">Connect with fellow tinkerers, get support, and shape the future</p>
                </div>
              </div>
              <a 
                href="https://discord.gg/AGvXAn9yxJ"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Users className="w-5 h-5" />
                <span>Join Server</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-800 pt-6">
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