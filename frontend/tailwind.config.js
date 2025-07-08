/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Gradient from colors
    'from-emerald-400',
    'from-emerald-500',
    'from-emerald-600',
    'from-teal-400',
    'from-teal-500',
    'from-teal-600',
    'from-cyan-400',
    'from-cyan-500',
    'from-cyan-600',
    'from-green-400',
    'from-blue-400',
    'from-purple-400',
    'from-orange-400',
    'from-indigo-400',
    'from-pink-400',
    'from-red-400',
    'from-yellow-400',
    
    // Gradient to colors
    'to-emerald-500',
    'to-emerald-600',
    'to-emerald-700',
    'to-teal-500',
    'to-teal-600',
    'to-teal-700',
    'to-cyan-500',
    'to-cyan-600',
    'to-cyan-700',
    'to-green-600',
    'to-blue-600',
    'to-purple-600',
    'to-pink-600',
    'to-red-600',
    'to-yellow-600',
    
    // Background opacity colors
    'bg-emerald-500/5',
    'bg-emerald-600/5',
    'bg-teal-500/5',
    'bg-teal-600/5',
    'bg-cyan-500/5',
    'bg-cyan-600/5',
    
    // Shadow colors
    'shadow-emerald-500/50',
    'shadow-emerald-500/20',
    'shadow-teal-500/50',
    'shadow-cyan-500/50',
    
    // Animation utilities
    'animate-pulse',
    'animate-bounce',
    'animate-spin',
    'animate-gradient',
    'animate-float',
    'animate-glow',
    
    // Transition delays
    'delay-0',
    'delay-50',
    'delay-100',
    'delay-150',
    'delay-200',
    'delay-250',
    'delay-300',
    'delay-400',
    'delay-500',
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.6)' },
          '100%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.5)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'emerald': {
          950: '#022c22',
        },
      },
    },
  },
  plugins: [],
}