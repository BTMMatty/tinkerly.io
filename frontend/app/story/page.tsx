'use client';

import { ArrowLeft, Clock, Users, DollarSign, Code, Zap, Brain, Heart, Target, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white">
      {/* Navigation */}
      <nav className="px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Tinkerly.io
            </div>
          </Link>
          
          <Link 
            href="/"
            className="flex items-center space-x-2 text-emerald-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-500/20 border border-emerald-400/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <Clock className="w-5 h-5 mr-2 text-emerald-400" />
            <span className="text-emerald-300 font-medium">The 72-Hour Revolution</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Tinkerly.io</span> Story
          </h1>
          
          <p className="text-2xl text-emerald-200 mb-8 max-w-4xl mx-auto">
            72 Hours That Changed Everything
          </p>
          
          <div className="text-xl text-emerald-300 font-medium">
            A Receipt for the AI Revolution
          </div>
        </div>

        {/* Opening Statement */}
        <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 border border-emerald-400/20">
          <div className="text-center text-xl md:text-2xl text-emerald-100 leading-relaxed space-y-6">
            <p>
              <strong className="text-emerald-300">Three days. 72 hours. One developer. One AI assistant.</strong>
            </p>
            <p>
              What used to require a team of 8-12 developers working for 3-6 months just emerged from a weekend sprint. Not a prototype. Not a proof of concept. <strong className="text-teal-300">A fully functional, production-ready SaaS platform</strong> with AI-powered project scoping, secure authentication, payment processing, and GDPR compliance.
            </p>
          </div>
        </div>

        {/* The Math */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-red-900/20 border border-red-400/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-red-300 mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3" />
              Traditional Development
            </h3>
            <div className="space-y-4 text-red-100">
              <div className="flex justify-between">
                <span>Cost:</span>
                <span className="font-bold">$150,000 - $300,000</span>
              </div>
              <div className="flex justify-between">
                <span>Timeline:</span>
                <span className="font-bold">12-24 weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Team:</span>
                <span className="font-bold">8-12 professionals</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900/30 border border-emerald-400/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-emerald-300 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3" />
              Tinkerly.io Reality
            </h3>
            <div className="space-y-4 text-emerald-100">
              <div className="flex justify-between">
                <span>Cost:</span>
                <span className="font-bold">72 hours + Claude subscription</span>
              </div>
              <div className="flex justify-between">
                <span>Timeline:</span>
                <span className="font-bold">3 days</span>
              </div>
              <div className="flex justify-between">
                <span>Team:</span>
                <span className="font-bold">1 human + AI</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <p className="text-2xl text-emerald-200 font-bold">
            The math is staggering. This isn't about celebrating fast development. 
            <br />
            <span className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              This is a wake-up call.
            </span>
          </p>
        </div>

        {/* The Problem */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            The Problem We're Solving
          </h2>
          
          <div className="bg-yellow-900/20 border border-yellow-400/20 rounded-2xl p-8 mb-8">
            <div className="text-lg text-yellow-100 space-y-4">
              <p>
                Every day, businesses pay <strong className="text-yellow-300">$50,000 for websites that take 20 hours to build</strong>. Consultants charge $10,000 for automations that Claude can design in minutes. "AI experts" sell $5,000 courses teaching what anyone can learn from a well-crafted prompt.
              </p>
              <p>
                <strong className="text-yellow-300">The development industry is built on artificial scarcity.</strong> Gatekeepers profit from complexity. Knowledge is hoarded, not shared. Clients pay for time, not value. And in an age where AI can 10x human productivity, these inflated prices aren't just unfair—they're unethical.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              We built Tinkerly.io to burn down these gates. 🔥
            </p>
          </div>
        </section>

        {/* What We Built */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            What We Built in 72 Hours
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Technical Architecture */}
            <div className="bg-blue-900/20 border border-blue-400/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-blue-300 mb-6 flex items-center">
                <Code className="w-6 h-6 mr-3" />
                Technical Architecture
              </h3>
              <ul className="space-y-3 text-blue-100">
                <li><strong>Frontend:</strong> Next.js 15 with TypeScript, Tailwind CSS, Framer Motion</li>
                <li><strong>Authentication:</strong> Clerk integration with social login, MFA, session management</li>
                <li><strong>Database:</strong> Supabase with PostgreSQL, real-time subscriptions, Row Level Security</li>
                <li><strong>AI Integration:</strong> Claude 3.5 Sonnet for project analysis and estimation</li>
                <li><strong>Payments:</strong> Stripe-ready architecture with credit-based billing</li>
                <li><strong>Compliance:</strong> GDPR/CCPA compliant with cookie consent, data handling</li>
                <li><strong>Analytics:</strong> Usage tracking, project metrics, performance monitoring</li>
              </ul>
            </div>

            {/* Feature Set */}
            <div className="bg-purple-900/20 border border-purple-400/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-3" />
                Feature Set
              </h3>
              <ul className="space-y-3 text-purple-100">
                <li><strong>AI Project Scoping:</strong> Natural language to technical specification in seconds</li>
                <li><strong>Dynamic Pricing:</strong> Transparent, complexity-based estimates</li>
                <li><strong>Credit System:</strong> 3 free analyses, then pay-as-you-go</li>
                <li><strong>Developer Dashboard:</strong> Project tracking, analytics, feedback loops</li>
                <li><strong>Knowledge Transfer:</strong> Every project includes "how we built it" documentation</li>
                <li><strong>Ethical Framework:</strong> Pricing based on value, not exploitation</li>
              </ul>
            </div>
          </div>

          {/* The Numbers */}
          <div className="bg-emerald-900/30 border border-emerald-400/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-emerald-300 mb-6 text-center flex items-center justify-center">
              <TrendingUp className="w-6 h-6 mr-3" />
              The Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-400">15,000+</div>
                <div className="text-emerald-200">Lines of Code</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400">50+</div>
                <div className="text-emerald-200">Components Built</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400">8</div>
                <div className="text-emerald-200">Database Tables</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400">12</div>
                <div className="text-emerald-200">API Endpoints</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400">15</div>
                <div className="text-emerald-200">UI/UX Screens</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400">5</div>
                <div className="text-emerald-200">Integrations</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-xl text-emerald-100">
                In the traditional world, this is a <strong className="text-emerald-300">$150k project minimum</strong>. 
                <br />
                <strong className="text-2xl text-emerald-400">We built it over a long weekend.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* The Deeper Truth */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            The Deeper Truth
          </h2>
          
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 text-lg text-emerald-100 space-y-6">
            <p>
              But here's what really matters: <strong className="text-emerald-300">This wasn't superhuman effort. This was human + AI collaboration.</strong>
            </p>
            <p>
              No sleepless nights. No debugging marathons. No team coordination overhead. Just a clear vision, an AI partner, and the willingness to challenge every assumption about how software gets built.
            </p>
            <p>
              The same senior developers charging $150/hour for hand-coding what AI can generate in seconds. The same agencies marking up 300% on work they're already accelerating with AI. The same consultants selling "expertise" that's one Google search away.
            </p>
            <p className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              The jig is up.
            </p>
          </div>
        </section>

        {/* Our Manifesto */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            Our Manifesto
          </h2>
          
          <div className="text-center mb-8">
            <p className="text-xl text-emerald-200">
              Tinkerly.io stands for radical transparency in an industry built on obfuscation:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-900/30 border border-emerald-400/20 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-emerald-400 mr-3" />
                <h3 className="text-2xl font-bold text-emerald-300">1. Speed Without Sacrifice</h3>
              </div>
              <p className="text-emerald-100">
                We deliver in days what others quote in months. Not through shortcuts, but through AI-powered efficiency that eliminates waste, not quality.
              </p>
            </div>

            <div className="bg-teal-900/30 border border-teal-400/20 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <DollarSign className="w-8 h-8 text-teal-400 mr-3" />
                <h3 className="text-2xl font-bold text-teal-300">2. Transparent Pricing</h3>
              </div>
              <p className="text-teal-100">
                Every quote shows exactly what you're paying for. No mysterious "project management" fees. No inflated hours. Just honest pricing for honest work.
              </p>
            </div>

            <div className="bg-cyan-900/30 border border-cyan-400/20 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-cyan-400 mr-3" />
                <h3 className="text-2xl font-bold text-cyan-300">3. Value-Based Development</h3>
              </div>
              <p className="text-cyan-100">
                You pay for outcomes, not effort. If AI can build it in 2 hours, you shouldn't pay for 20. Period.
              </p>
            </div>

            <div className="bg-purple-900/30 border border-purple-400/20 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-purple-400 mr-3" />
                <h3 className="text-2xl font-bold text-purple-300">4. Education, Not Exploitation</h3>
              </div>
              <p className="text-purple-100">
                Every project includes complete documentation on how we built it. We're not gatekeepers—we're teachers. Our success comes from empowering you, not creating dependencies.
              </p>
            </div>
          </div>
        </section>

        {/* The Math of Disruption */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            The Math of Disruption
          </h2>
          
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-lg text-emerald-100 mb-6">
              From "The Everything Always Project," I calculated that AI could make one developer as productive as a traditional team of 10. Tinkerly.io is the receipt on that claim:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-red-300 mb-4">Traditional Agency Quote for Tinkerly.io:</h4>
                <div className="space-y-2 text-red-100">
                  <div>2 Frontend Developers × 12 weeks × $150/hr = $115,200</div>
                  <div>2 Backend Developers × 12 weeks × $150/hr = $115,200</div>
                  <div>1 DevOps Engineer × 8 weeks × $175/hr = $56,000</div>
                  <div>1 UI/UX Designer × 6 weeks × $125/hr = $30,000</div>
                  <div>1 Project Manager × 12 weeks × $125/hr = $60,000</div>
                  <div className="border-t border-red-400/20 pt-2 font-bold text-xl">
                    Total: $376,400
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-emerald-300 mb-4">Tinkerly.io Reality:</h4>
                <div className="space-y-2 text-emerald-100">
                  <div>1 Developer + Claude</div>
                  <div>72 hours</div>
                  <div className="border-t border-emerald-400/20 pt-2 font-bold text-xl">
                    Total cost: Less than a nice dinner
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                That's not a 10x improvement. That's a 1000x paradigm shift.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12">
            <div className="text-6xl mb-6">🧚‍♀️</div>
            <h2 className="text-4xl font-bold text-white mb-6">Join the Revolution</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              We're not asking you to believe in our vision. We're showing you the receipt. Tinkerly.io exists. It works. It was built in 72 hours by one person with AI.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">For Developers</h3>
                <p className="text-emerald-100 text-sm">Join us in building the future of ethical development</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">For Businesses</h3>
                <p className="text-emerald-100 text-sm">Experience what honest, AI-powered development looks like</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">For Investors</h3>
                <p className="text-emerald-100 text-sm">Bet on humans using AI to democratize development</p>
              </div>
            </div>
            
            <div className="text-2xl text-white font-bold mb-4">
              The old world is ending. The new one is being built at the speed of thought.
            </div>
            
            <Link 
              href="https://soon.tinkerly.io"
              className="inline-flex items-center bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Join the Beta Waitlist
            </Link>
          </div>
        </section>

        {/* Footer Quote */}
        <div className="text-center py-12 border-t border-emerald-400/20">
          <p className="text-2xl text-emerald-200 font-medium mb-4">
            Welcome to Tinkerly.io. Where magic is just sufficiently advanced transparency.
          </p>
          <p className="text-lg text-emerald-300">
            Built with ❤️ and Claude in 72 hours that shook the development world.
          </p>
          <p className="text-3xl mt-4">🧚‍♀️ Let's build the future together.</p>
        </div>
      </div>
    </div>
  );
}
