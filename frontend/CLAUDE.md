# Tinkerly.io Frontend - Ship TODAY!

## Current Directory Context
You are in the FRONTEND directory of Tink.io monorepo.

## Immediate Tasks
1. Fix create/page.tsx to use proper API routes
2. Add Supabase integration to existing components
3. Make dashboard functional with real data
4. Deploy to Vercel

## Tech Stack (Frontend)
- Next.js 15.3.5 (App Router)
- React 18.2
- TypeScript 5.2.2
- Tailwind CSS 4.1.11
- @clerk/nextjs 6.23.3
- @supabase/supabase-js 2.50.3
- lucide-react for icons

## File Structure
```
frontend/
├── app/
│   ├── api/          # API routes (create these!)
│   ├── create/       # Project creation page
│   ├── dashboard/    # User dashboard
│   ├── pricing/      # Pricing page
│   └── page.tsx      # Landing page
├── components/
│   ├── NavigationHeader.tsx
│   ├── Footer.tsx
│   └── StableProjectForm.tsx
└── lib/
    └── supabase.ts   # Database client
```

## Critical Code Patterns

### API Route Pattern
```typescript
// app/api/*/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  // Implementation
}
```

### Supabase Query Pattern
```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('user_id', userId);
```

## Components That Need API Integration
1. `app/create/page.tsx` - Line 162: Replace mock with real API call
2. `components/DeveloperStudioDashboard.tsx` - Needs credits API
3. `app/dashboard/page.tsx` - Needs projects list API

## Environment Variables Needed
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY= (optional for now)
```

## DO NOT WASTE TIME ON
- Backend integration (separate service)
- Complex animations
- Perfect TypeScript types
- Refactoring working code

## FOCUS ON
- Making existing pages functional
- Connecting to Supabase
- Basic API routes
- DEPLOYING TODAY