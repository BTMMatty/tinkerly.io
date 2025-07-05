// app/create/page.tsx
// This is the missing file causing your 404 error

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import CreateProjectPage from './CreateProjectPage';

export default async function Create() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return <CreateProjectPage />;
}

export const metadata = {
  title: 'Create Project - Tink.io',
  description: 'Start your AI-powered project analysis with Tink.io',
};