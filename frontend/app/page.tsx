'use client';

import { redirect } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import TinkerlyPlatform from '@/src/components/TinkerlyPlatform';

export default function HomePage() {
  const { isSignedIn } = useUser();
  
  // Show landing page for non-authenticated users
  if (!isSignedIn) {
    return <TinkerlyPlatform />;
  }
  
  // Redirect authenticated users to dashboard
  redirect('/dashboard');
}