'use client';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
          <p className="text-xl text-gray-600">Transparent, fair, and magical ✨</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Free</h3>
            <div className="text-4xl font-bold text-emerald-600 mb-4">$0</div>
            <p className="text-gray-600 mb-6">Perfect for trying out Tinkerly</p>
            <ul className="text-left space-y-2 mb-8">
              <li className="flex items-center">
                <span className="text-emerald-600 mr-2">✓</span>
                3 AI project analyses
              </li>
              <li className="flex items-center">
                <span className="text-emerald-600 mr-2">✓</span>
                Basic project scoping
              </li>
              <li className="flex items-center">
                <span className="text-emerald-600 mr-2">✓</span>
                Community support
              </li>
            </ul>
            <a 
              href="/sign-up" 
              className="block bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Get Started Free
            </a>
          </div>
          
          {/* Pro Tier */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg p-8 text-center text-white transform scale-105">
            <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <div className="text-4xl font-bold mb-4">$99<span className="text-lg">/month</span></div>
            <p className="text-emerald-100 mb-6">For serious builders</p>
            <ul className="text-left space-y-2 mb-8">
              <li className="flex items-center">
                <span className="text-white mr-2">✓</span>
                Unlimited AI analyses
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">✓</span>
                Priority development queue
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">✓</span>
                Direct developer contact
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">✓</span>
                Priority support
              </li>
            </ul>
            <a 
              href="/sign-up" 
              className="block bg-white text-emerald-600 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Start Pro Trial
            </a>
          </div>
          
          {/* Enterprise Tier */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
            <div className="text-4xl font-bold text-emerald-600 mb-4">$299</div>
            <p className="text-gray-600 mb-6">For teams and larger projects</p>
            <ul className="text-left space-y-2 mb-8">
              <li className="flex items-center">
                <span className="text-emerald-600 mr-2">✓</span>
                Everything in Pro
              </li>
              <li className="flex items-center">
                <span className="text-emerald-600 mr-2">✓</span>
                Dedicated project manager
              </li>
              <li className="flex items-center">
                <span className="text-emerald-600 mr-2">✓</span>
                Custom development team
              </li>
              <li className="flex items-center">
                <span className="text-emerald-600 mr-2">✓</span>
                SLA guarantees
              </li>
            </ul>
            <a 
              href="/sign-up" 
              className="block bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
