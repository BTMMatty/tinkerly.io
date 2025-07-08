import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

// Safe initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  try {
    // Get current user
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // If no Supabase, return mock data
    if (!supabaseUrl || !supabaseKey) {
      console.log('📊 Running in demo mode - no database');
      return NextResponse.json({
        projects: [],
        stats: {
          totalProjects: 0,
          activeProjects: 0,
          totalSaved: 0,
          creditsRemaining: 3,
          monthlyProgress: 25
        }
      });
    }

    // Initialize Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch user's projects
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json({ 
        projects: [], 
        stats: {
          totalProjects: 0,
          activeProjects: 0,
          totalSaved: 0,
          creditsRemaining: 3,
          monthlyProgress: 0
        }
      });
    }

    // Calculate stats
    const stats = {
      totalProjects: projects?.length || 0,
      activeProjects: projects?.filter(p => 
        p.status === 'in_development' || p.status === 'payment_pending'
      ).length || 0,
      totalSaved: projects?.reduce((sum, p) => {
        // Calculate savings (50% faster = 50% cost savings)
        const estimatedCost = p.total_cost || 0;
        const marketCost = estimatedCost * 2; // We're 50% cheaper
        return sum + (marketCost - estimatedCost);
      }, 0) || 0,
      creditsRemaining: 3, // TODO: Get from users table
      monthlyProgress: Math.min(
        Math.round((projects?.length || 0) / 10 * 100), 
        100
      )
    };

    return NextResponse.json({ 
      projects: projects || [], 
      stats 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      projects: [],
      stats: {
        totalProjects: 0,
        activeProjects: 0,
        totalSaved: 0,
        creditsRemaining: 3,
        monthlyProgress: 0
      }
    }, { status: 500 });
  }
}