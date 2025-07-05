// app/create/page.tsx - Minimal version that will build
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Create() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Create Your Project ✨
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Get AI-powered project scoping and development estimates.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Tell Tink What You Think!</h2>
          
          <form className="space-y-6">
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Project Title
              </label>
              <input
                type="text"
                placeholder="E.g., AI-Powered Customer Support System"
                className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Project Description
              </label>
              <textarea
                placeholder="Describe what you want to build..."
                className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 resize-none"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Category
              </label>
              <select className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white">
                <option value="" className="text-gray-800">Select category</option>
                <option value="web" className="text-gray-800">Web Application</option>
                <option value="mobile" className="text-gray-800">Mobile App</option>
                <option value="api" className="text-gray-800">API Development</option>
              </select>
            </div>

            <button
              type="button"
              className="w-full bg-white text-emerald-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              🧚‍♀️ Analyze with AI ✨
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Create Project - Tinkerly.io',
  description: 'Start your AI-powered project analysis',
};