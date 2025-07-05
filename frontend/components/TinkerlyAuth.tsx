// frontend/components/TinkerlyAuth.tsx
'use client';

import React from 'react';
import { SignIn, SignUp, UserButton } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';

// Simple theme for now - we'll enhance later
export const tinkerlyTheme = {
  elements: {
    card: "bg-white/15 backdrop-blur-xl border border-emerald-400/30 rounded-2xl shadow-2xl",
    headerTitle: "text-2xl font-bold text-white",
    headerSubtitle: "text-emerald-200",
    formButtonPrimary: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl",
    socialButtonsBlockButton: "bg-white/10 border border-white/30 hover:bg-white/20 text-white rounded-xl",
    formFieldInput: "bg-white/10 border border-white/20 text-white placeholder-emerald-200 rounded-lg",
    formFieldLabel: "text-emerald-200 font-medium",
    footerActionText: "text-emerald-200",
    footerActionLink: "text-white hover:text-emerald-300",
    userButtonBox: "rounded-full border-2 border-emerald-300"
  }
};

export const TinkerlySignIn = () => (
  <SignIn appearance={tinkerlyTheme} redirectUrl="/dashboard" />
);

export const TinkerlySignUp = () => (
  <SignUp appearance={tinkerlyTheme} redirectUrl="/dashboard" />
);

export const TinkerlyUserButton = () => (
  <UserButton appearance={tinkerlyTheme} afterSignOutUrl="/" />
);