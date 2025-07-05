import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import TinkerPlatform from '../components/TinkioPlatform';

export default async function HomePage() {
  const user = await currentUser();
  
  // If user is signed in, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }
  
  // If not signed in, show the landing page
  return <TinkerPlatform />;
}

export const metadata = {
  title: 'Tinkerly.io - AI-Powered Development Platform',
  description: 'Transform your ideas into reality with AI-powered project scoping and transparent pricing.',
};