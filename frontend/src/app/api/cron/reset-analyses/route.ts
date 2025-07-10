import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  // Verify this is from your cron job (add auth)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Reset analyses for users whose billing cycle is today
    const today = new Date().getDate();
    
    const { data, error } = await supabase
      .rpc('reset_monthly_analyses');

    if (error) {
      console.error('Error resetting analyses:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('✨ Monthly analyses reset complete!');
    return NextResponse.json({ success: true, message: 'Analyses reset' });

  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}