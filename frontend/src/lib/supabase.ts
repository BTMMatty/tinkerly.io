
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types (matching new schema with backward compatibility)
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  company?: string;
  
  // NEW Pixie tier system
  pixie_tier: 'fresh' | 'pro' | 'elite' | 'unlimited';
  analyses_used_this_month: number;
  analyses_limit: number;
  billing_cycle_date: string;
  
  // KEEP for backward compatibility during transition
  subscription_tier: 'free' | 'pro' | 'enterprise';
  credits_remaining: number;
  
  // Subscription fields (keep existing)
  subscription_status?: 'active' | 'inactive' | 'canceled' | 'past_due';  
  subscription_period?: 'monthly' | 'annual';  
  stripe_customer_id?: string;  
  subscription_id?: string;  
  subscription_start_date?: string;  
  subscription_end_date?: string;
  
  total_projects: number;
  created_at: string;
  updated_at: string;
}

// Project interface remains unchanged
export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  requirements?: string;
  timeline?: string;
  complexity?: string;
  
  // AI Analysis Results
  ai_analysis?: any; // JSONB field
  complexity_score?: number;
  estimated_hours?: number;
  hourly_rate?: number;
  total_cost?: number;
  
  // Project Status
  status: 'draft' | 'analyzed' | 'payment_pending' | 'in_development' | 'completed' | 'cancelled';
  
  // Payment & Development
  payment_status: 'pending' | 'partial' | 'paid' | 'refunded';
  amount_paid: number;
  
  // Timestamps
  analyzed_at: string;
  created_at: string;
  updated_at: string;
}

// ProjectAsset interface remains unchanged
export interface ProjectAsset {
  id: string;
  project_id: string;
  file_name: string;
  file_url: string;
  file_type?: string;
  file_size?: number;
  uploaded_by: string;
  uploaded_at: string;
}

// UsageAnalytics interface remains unchanged
export interface UsageAnalytics {
  id: string;
  user_id: string;
  project_id?: string;
  event_type: string;
  event_data: any; // JSONB field
  created_at: string;
}

// NEW: Pixie tier configuration
export const PIXIE_TIERS = {
  fresh: {
    name: 'Fresh Pixies',
    analyses_per_month: 3,
    price_monthly: 0,
    price_annual: 0,
    human_support: 'Community Support'
  },
  pro: {
    name: 'Pro Pixies',
    analyses_per_month: 15,
    price_monthly: 39,
    price_annual: 32,
    human_support: 'Weekly Office Hours'
  },
  elite: {
    name: 'Elite Pixies',
    analyses_per_month: 50,
    price_monthly: 99,
    price_annual: 79,
    human_support: 'Dedicated Success Manager'
  },
  unlimited: {
    name: 'Pixies Unlimited',
    analyses_per_month: 999, // Using 999 instead of -1 for DB compatibility
    price_monthly: 299,
    price_annual: 239,
    human_support: 'Personal Project Architect'
  }
};

// User Service - ENHANCED with debug and RLS handling
export const userService = {
  async syncUser(clerkUser: any): Promise<{ data: User | null; error: any }> {
    try {
      console.log('🔍 STARTING USER SYNC DEBUG');
      console.log('👤 Clerk User Data:', {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        fullName: clerkUser.fullName,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl
      });
      
      // Step 1: Test Supabase connection
      console.log('🔌 Testing Supabase connection...');
      const { data: testData, error: testError } = await supabase
        .from('users')
        .select('count')
        .limit(1);
      
      if (testError) {
        console.error('❌ Supabase connection failed:', testError);
        return { data: null, error: testError };
      }
      console.log('✅ Supabase connection OK');
      
      // Step 2: Try to get existing user
      console.log('🔍 Checking for existing user...');
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', clerkUser.id)
        .single();

      console.log('📊 Existing user query result:', { existingUser, fetchError });

      if (existingUser && !fetchError) {
        // Update existing user - don't overwrite pixie tier data
        console.log('👤 Found existing user, updating...');
        const { data, error } = await supabase
          .from('users')
          .update({
            email: clerkUser.emailAddresses[0]?.emailAddress,
            full_name: clerkUser.fullName || '',
            avatar_url: clerkUser.imageUrl || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', clerkUser.id)
          .select()
          .single();

        if (error) {
          console.error('❌ Error updating existing user:', error);
          return { data: null, error };
        }

        console.log('✅ Existing user updated successfully:', data);
        return { data, error: null };
      } else {
        // Create new Fresh Pixie user
        console.log('✨ Creating new Fresh Pixie user...');
        
        const billingDate = new Date().toISOString().split('T')[0];
        const freshTier = PIXIE_TIERS.fresh;
        
        const newUserData = {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          full_name: clerkUser.fullName || '',
          avatar_url: clerkUser.imageUrl || null,
          
          // NEW Pixie defaults
          pixie_tier: 'fresh' as const,
          analyses_used_this_month: 0,
          analyses_limit: freshTier.analyses_per_month,
          billing_cycle_date: billingDate,
          
          // OLD credit system (for backward compatibility)
          subscription_tier: 'free' as const,
          credits_remaining: 3,
          
          total_projects: 0
        };
        
        console.log('📝 Inserting user with data:', newUserData);
        
        const { data, error } = await supabase
          .from('users')
          .insert(newUserData)
          .select()
          .single();

        if (error) {
          console.error('❌ CRITICAL: User creation failed!', error);
          console.error('Error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          
          // Check if it's an RLS policy error
          if (error.message?.includes('RLS') || error.message?.includes('policy') || error.code === '42501') {
            console.error('🛡️ RLS POLICY ERROR DETECTED!');
            console.error('This suggests the RLS policies are blocking user creation.');
            console.error('Run this SQL in Supabase to fix:');
            console.error(`
              DROP POLICY IF EXISTS "users_insert_own" ON public.users;
              CREATE POLICY "allow_all_insert" ON public.users FOR INSERT WITH CHECK (true);
            `);
          }
          
          return { data: null, error };
        }
        
        console.log('✨ New Fresh Pixie created successfully!', data);
        
        // Immediate verification
        console.log('🔍 Verifying user was created...');
        const { data: verifyUser, error: verifyError } = await supabase
          .from('users')
          .select('*')
          .eq('id', clerkUser.id)
          .single();
          
        console.log('📊 Verification result:', { verifyUser, verifyError });
        
        if (verifyUser) {
          console.log('✅ User verification successful!');
          console.log('🧚‍♀️ Fresh Pixie Details:', {
            pixie_tier: verifyUser.pixie_tier,
            analyses_limit: verifyUser.analyses_limit,
            analyses_used: verifyUser.analyses_used_this_month,
            credits_remaining: verifyUser.credits_remaining
          });
        }
        
        return { data, error: null };
      }
    } catch (error) {
      console.error('💥 SYNC USER CATASTROPHIC FAILURE:', error);
      
      // FIXED: Proper TypeScript error handling
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      } else {
        console.error('Unknown error type:', typeof error);
        console.error('Error details:', error);
      }
      
      return { data: null, error };
    }
  },

  async getUser(clerkUserId: string) {
    try {
      console.log('📖 Getting user:', clerkUserId);
      const result = await supabase
        .from('users')
        .select('*')
        .eq('id', clerkUserId)
        .single();
      
      console.log('📊 GetUser result:', result);
      return result;
    } catch (error) {
      console.error('❌ Error getting user:', error);
      return { data: null, error };
    }
  },

  async updateUser(clerkUserId: string, updates: Partial<User>) {
    try {
      console.log('✏️ Updating user:', clerkUserId, 'with:', updates);
      const result = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', clerkUserId)
        .select()
        .single();
      
      console.log('📊 UpdateUser result:', result);
      return result;
    } catch (error) {
      console.error('❌ Error updating user:', error);
      return { data: null, error };
    }
  },

  // NEW: Pixie tier management
  async upgradePixieTier(clerkUserId: string, newTier: keyof typeof PIXIE_TIERS) {
    const tierConfig = PIXIE_TIERS[newTier];
    
    console.log(`🧚‍♀️ Upgrading user to ${tierConfig.name}`);
    
    return await this.updateUser(clerkUserId, {
      pixie_tier: newTier,
      analyses_limit: tierConfig.analyses_per_month,
      billing_cycle_date: new Date().toISOString().split('T')[0], // Reset billing cycle
      analyses_used_this_month: 0 // Reset usage on upgrade
    });
  },

  // NEW: Use an analysis (with enhanced logging)
  async useAnalysis(clerkUserId: string) {
    try {
      console.log('🧠 Using analysis for user:', clerkUserId);
      
      const { data: user, error: fetchError } = await this.getUser(clerkUserId);
      
      if (!user || fetchError) {
        console.error('❌ User not found for analysis:', fetchError);
        return { data: null, error: fetchError || 'User not found' };
      }

      // Check if billing cycle should reset first
      await this.checkAndResetBillingCycle(clerkUserId);

      // Refresh user data after potential reset
      const { data: refreshedUser } = await this.getUser(clerkUserId);
      if (!refreshedUser) {
        return { data: null, error: 'User not found after refresh' };
      }

      // Unlimited tier always allowed
      if (refreshedUser.pixie_tier === 'unlimited') {
        console.log('✨ Unlimited Pixie power activated!');
        return { data: { canAnalyze: true, remaining: 999 }, error: null };
      }

      // Check if user has analyses remaining
      const pixieTier = refreshedUser.pixie_tier as keyof typeof PIXIE_TIERS;
      const tierConfig = PIXIE_TIERS[pixieTier];
      const remaining = tierConfig.analyses_per_month - refreshedUser.analyses_used_this_month;
      
      console.log('📊 Analysis check:', {
        tier: pixieTier,
        limit: tierConfig.analyses_per_month,
        used: refreshedUser.analyses_used_this_month,
        remaining
      });
      
      if (remaining <= 0) {
        console.log(`🧚‍♀️ No analyses left for ${refreshedUser.pixie_tier} tier`);
        return { 
          data: { canAnalyze: false, remaining: 0 }, 
          error: 'No analyses remaining this month. Upgrade your Pixie tier for more!' 
        };
      }

      // Increment usage
      const { data: updatedUser, error: updateError } = await this.updateUser(clerkUserId, {
        analyses_used_this_month: refreshedUser.analyses_used_this_month + 1
      });

      if (updateError) {
        return { data: null, error: updateError };
      }

      console.log(`✅ Analysis used. ${remaining - 1} remaining this month.`);
      return { 
        data: { 
          canAnalyze: true, 
          remaining: remaining - 1,
          used: refreshedUser.analyses_used_this_month + 1
        }, 
        error: null 
      };
    } catch (error) {
      console.error('❌ Error using analysis:', error);
      return { data: null, error: 'Failed to use analysis' };
    }
  },

  // NEW: Check and reset billing cycle (enhanced)
  async checkAndResetBillingCycle(clerkUserId: string) {
    try {
      const { data: user } = await this.getUser(clerkUserId);
      if (!user) return;

      const today = new Date();
      const billingDate = new Date(user.billing_cycle_date);
      
      // Check if it's been at least a month
      const daysSinceBilling = Math.floor((today.getTime() - billingDate.getTime()) / (1000 * 60 * 60 * 24));
      
      console.log('📅 Billing cycle check:', {
        today: today.toISOString().split('T')[0],
        billingDate: user.billing_cycle_date,
        daysSince: daysSinceBilling
      });
      
      if (daysSinceBilling >= 30) {
        console.log('🔄 Resetting monthly analyses for user');
        await this.updateUser(clerkUserId, {
          analyses_used_this_month: 0,
          billing_cycle_date: today.toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('❌ Error checking billing cycle:', error);
    }
  },

  // DEPRECATED but kept for backward compatibility
  async decrementCredits(clerkUserId: string) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ decrementCredits is deprecated. Use useAnalysis() instead.');
    }
    const { data: user } = await this.getUser(clerkUserId);
    if (user && user.credits_remaining > 0) {
      return await this.updateUser(clerkUserId, {
        credits_remaining: user.credits_remaining - 1
      });
    }
    return { data: null, error: 'No credits remaining' };
  },

  // DEPRECATED but kept for backward compatibility
  async addCredits(clerkUserId: string, creditsToAdd: number) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ addCredits is deprecated. Use upgradePixieTier() instead.');
    }
    const { data: user } = await this.getUser(clerkUserId);
    if (user) {
      return await this.updateUser(clerkUserId, {
        credits_remaining: (user.credits_remaining || 0) + creditsToAdd
      });
    }
    return { data: null, error: 'User not found' };
  }
};

// Project Service - UNCHANGED
export const projectService = {
  async createProject(projectData: Partial<Project>) {
    return await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();
  },

  async updateProject(projectId: string, updates: Partial<Project>) {
    return await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();
  },

  async getUserProjects(userId: string) {
    return await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },

  async getProject(projectId: string) {
    return await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
  },

  async saveAnalysis(projectId: string, analysisData: any) {
    return await supabase
      .from('projects')
      .update({
        ai_analysis: analysisData,
        complexity_score: analysisData.complexity_score || null,
        estimated_hours: analysisData.estimated_hours || null,
        hourly_rate: analysisData.hourly_rate || null,
        total_cost: analysisData.total_cost || null,
        status: 'analyzed',
        analyzed_at: new Date().toISOString()
      })
      .eq('id', projectId)
      .select()
      .single();
  }
};

// Analytics Service - UNCHANGED
export const analyticsService = {
  async trackEvent(eventData: {
    user_id: string;
    project_id?: string;
    event_type: string;
    event_data?: any;
  }) {
    try {
      return await supabase
        .from('usage_analytics')
        .insert({
          user_id: eventData.user_id,
          project_id: eventData.project_id || null,
          event_type: eventData.event_type,
          event_data: eventData.event_data || {}
        });
    } catch (error) {
      console.warn('⚠️ Analytics tracking failed (non-critical):', error);
      return { data: null, error };
    }
  },

  async getUserAnalytics(userId: string, limit = 50) {
    return await supabase
      .from('usage_analytics')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
  }
};

// Assets Service - UNCHANGED
export const assetsService = {
  async uploadAsset(assetData: Partial<ProjectAsset>) {
    return await supabase
      .from('project_assets')
      .insert(assetData)
      .select()
      .single();
  },

  async getProjectAssets(projectId: string) {
    return await supabase
      .from('project_assets')
      .select('*')
      .eq('project_id', projectId)
      .order('uploaded_at', { ascending: false });
  }
};

// Test connection - ENHANCED with debug
export const testConnection = async () => {
  try {
    console.log('🔌 Testing Supabase connection...');
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error) {
      console.error('❌ Supabase connection test failed:', error);
      throw error;
    }
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
};

// NEW: Check user analyses (enhanced with debug)
export const checkUserAnalyses = async (clerkUserId: string) => {
  try {
    console.log('🔍 Checking user analyses for:', clerkUserId);
    
    const { data: user, error } = await userService.getUser(clerkUserId);
    
    if (!user || error) {
      console.warn('⚠️ User not found, returning defaults');
      return {
        canAnalyze: false,
        remaining: 0,
        pixieTier: 'fresh' as 'fresh' | 'pro' | 'elite' | 'unlimited',
        used: 0,
        limit: 3
      };
    }

    // Check for billing cycle reset
    await userService.checkAndResetBillingCycle(clerkUserId);

    // Get fresh user data after potential reset
    const { data: refreshedUser } = await userService.getUser(clerkUserId);
    if (!refreshedUser) {
      console.warn('⚠️ User not found after refresh, returning defaults');
      return {
        canAnalyze: false,
        remaining: 0,
        pixieTier: 'fresh' as 'fresh' | 'pro' | 'elite' | 'unlimited',
        used: 0,
        limit: 3
      };
    }

    const pixieTier = refreshedUser.pixie_tier as keyof typeof PIXIE_TIERS;
    const tierConfig = PIXIE_TIERS[pixieTier];
    const isUnlimited = refreshedUser.pixie_tier === 'unlimited';
    const remaining = isUnlimited ? 999 : tierConfig.analyses_per_month - refreshedUser.analyses_used_this_month;

    const result = {
      canAnalyze: isUnlimited || remaining > 0,
      remaining: Math.max(0, remaining),
      pixieTier: refreshedUser.pixie_tier as keyof typeof PIXIE_TIERS,
      used: refreshedUser.analyses_used_this_month,
      limit: tierConfig.analyses_per_month
    };
    
    console.log('📊 User analyses result:', result);
    return result;
  } catch (error) {
    console.error('❌ Error checking user analyses:', error);
    return {
      canAnalyze: false,
      remaining: 0,
      pixieTier: 'fresh' as 'fresh' | 'pro' | 'elite' | 'unlimited',
      used: 0,
      limit: 3
    };
  }
};

// DEPRECATED: Keep for backward compatibility
export const checkUserCredits = async (clerkUserId: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ checkUserCredits is deprecated. Use checkUserAnalyses() instead.');
  }
  const analyses = await checkUserAnalyses(clerkUserId);
  
  // Map to old format for backward compatibility
  return {
    hasCredits: analyses.canAnalyze,
    creditsRemaining: analyses.remaining,
    subscriptionTier: analyses.pixieTier === 'fresh' ? 'free' : 
                     analyses.pixieTier === 'elite' ? 'enterprise' : 'pro'
  };
};