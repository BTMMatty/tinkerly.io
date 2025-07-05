'use client';

import dynamic from 'next/dynamic';

// Dynamically import with SSR disabled
const DeveloperStudioDashboard = dynamic(
  () => import('../../src/components/DeveloperStudioDashboard'),
  { ssr: false }
);

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return <DeveloperStudioDashboard />;
}
