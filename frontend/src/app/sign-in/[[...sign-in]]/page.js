import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900 relative overflow-hidden">
      {/* Magical floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-emerald-400 rounded-full animate-bounce opacity-70"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-teal-300 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-green-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-emerald-300 rounded-full animate-bounce opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
            ✨ Welcome Back ✨
          </h1>
          <p className="text-emerald-200 text-lg">
            Your Code Pixies are waiting at Tinker.io! 🧚‍♀️
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <div className="flex justify-center">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200",
                card: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl",
                headerTitle: "text-white text-xl font-semibold",
                headerSubtitle: "text-emerald-200",
                socialButtonsBlockButton: 
                  "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg transition-all duration-200",
                dividerText: "text-emerald-200",
                formFieldLabel: "text-emerald-200",
                formFieldInput: "bg-white/10 border-white/20 text-white placeholder-emerald-300",
                footerActionText: "text-emerald-200",
                footerActionLink: "text-emerald-400 hover:text-emerald-300"
              }
            }}
          />
        </div>

        {/* Magic sparkles */}
        <div className="absolute -top-10 -left-10 text-6xl animate-spin-slow">✨</div>
        <div className="absolute -bottom-10 -right-10 text-4xl animate-bounce">🧚‍♀️</div>
      </div>
    </div>
  )
}