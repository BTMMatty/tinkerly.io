'use client'
import { useUser, UserButton, SignInButton } from '@clerk/nextjs'

export default function AuthHeader() {
  const { isSignedIn, user, isLoaded } = useUser()

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-emerald-300 rounded-full animate-pulse"></div>
        <div className="w-24 h-4 bg-emerald-300 rounded animate-pulse"></div>
      </div>
    )
  }

  // User is signed in - show real user info
  if (isSignedIn) {
    return (
      <div className="flex items-center space-x-4">
        {/* Real User Info */}
        <div className="text-right">
          <p className="text-white font-semibold">
            Welcome, {user.firstName || user.emailAddresses[0].emailAddress}! 🧚‍♀️
          </p>
          <p className="text-emerald-200 text-sm">
            ✨ Code Pixies Ready | Credits: 150
          </p>
        </div>
        
        {/* Clerk User Button - handles profile/logout */}
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 rounded-full border-2 border-emerald-400 shadow-lg hover:border-emerald-300 transition-all duration-200",
              userButtonPopoverCard: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl",
              userButtonPopoverText: "text-white",
              userButtonPopoverActionButton: "text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            }
          }}
          afterSignOutUrl="/"
        />
      </div>
    )
  }

  // User is not signed in - show sign in button
  return (
    <div className="flex items-center space-x-4">
      <SignInButton mode="modal">
        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
          <span>✨ Sign In</span>
        </button>
      </SignInButton>
      
      <SignInButton mode="modal">
        <button className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
          <span>🧚‍♀️ Join Magic</span>
        </button>
      </SignInButton>
    </div>
  )
}