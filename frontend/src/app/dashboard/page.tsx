import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DeveloperStudioDashboard from '../../components/DeveloperStudioDashboard';

export default async function Dashboard() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return <DeveloperStudioDashboard />;
}

export const metadata = {
  title: 'Developer Studio - Tinker.io',
  description: 'Your personal developer workspace with Tinker.io',
};