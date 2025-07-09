import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types (matching new schema)
export interface User {
  id: string; // Clerk user ID
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  company?: string;
  subscription_tier: 'free' | 'pro' | 'enterprise';
  credits_remaining: number;
  total_projects: number;
  created_at: string;
  updated_at: string;
}

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

export interface UsageAnalytics {
  id: string;
  user_id: string;
  project_id?: string;
  event_type: string;
  event_data: any; // JSONB field
  created_at: string;
}

// User Service
export const userService = {
  async syncUser(clerkUser: any): Promise<{ data: User | null; error: any }> {
    try {
      console.log('👤 Syncing user with new schema...');
      
      // Try to get existing user
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', clerkUser.id)
        .single();

      if (existingUser) {
        // Update existing user
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

        return { data, error };
      } else {
        // Create new user
        const { data, error } = await supabase
          .from('users')
          .insert({
            id: clerkUser.id, // Direct Clerk ID
            email: clerkUser.emailAddresses[0]?.emailAddress,
            full_name: clerkUser.fullName || '',
            avatar_url: clerkUser.imageUrl || null,
            subscription_tier: 'free',
            credits_remaining: 3,
            total_projects: 0
          })
          .select()
          .single();

        return { data, error };
      }
    } catch (error) {
      console.error('Error syncing user:', error);
      return { data: null, error };
    }
  },

  async getUser(clerkUserId: string) {
    return await supabase
      .from('users')
      .select('*')
      .eq('id', clerkUserId)
      .single();
  },

  async updateUser(clerkUserId: string, updates: Partial<User>) {
    return await supabase
      .from('users')
      .update(updates)
      .eq('id', clerkUserId)
      .select()
      .single();
  },

  async decrementCredits(clerkUserId: string) {
    const { data: user },

  async addCredits(clerkUserId: string, creditsToAdd: number) {
    const { data: user } = await this.getUser(clerkUserId);
    if (user) {
      return await this.updateUser(clerkUserId, {
        credits_remaining: (user.credits_remaining || 0) + creditsToAdd
      });
    }
    return { data: null, error: "User not found" };
  } = await this.getUser(clerkUserId);
    if (user && user.credits_remaining > 0) {
      return await this.updateUser(clerkUserId, {
        credits_remaining: user.credits_remaining - 1
      },

  async addCredits(clerkUserId: string, creditsToAdd: number) {
    const { data: user } = await this.getUser(clerkUserId);
    if (user) {
      return await this.updateUser(clerkUserId, {
        credits_remaining: (user.credits_remaining || 0) + creditsToAdd
      });
    }
    return { data: null, error: "User not found" };
  });
    },

  async addCredits(clerkUserId: string, creditsToAdd: number) {
    const { data: user } = await this.getUser(clerkUserId);
    if (user) {
      return await this.updateUser(clerkUserId, {
        credits_remaining: (user.credits_remaining || 0) + creditsToAdd
      });
    }
    return { data: null, error: "User not found" };
  }
    return { data: null, error: 'No credits remaining' },

  async addCredits(clerkUserId: string, creditsToAdd: number) {
    const { data: user } = await this.getUser(clerkUserId);
    if (user) {
      return await this.updateUser(clerkUserId, {
        credits_remaining: (user.credits_remaining || 0) + creditsToAdd
      });
    }
    return { data: null, error: "User not found" };
  };
  },

  async addCredits(clerkUserId: string, creditsToAdd: number) {
    const { data: user } = await this.getUser(clerkUserId);
    if (user) {
      return await this.updateUser(clerkUserId, {
        credits_remaining: (user.credits_remaining || 0) + creditsToAdd
      });
    }
    return { data: null, error: "User not found" };
  }
};

// Project Service
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

// Analytics Service
export const analyticsService = {
  async trackEvent(eventData: {
    user_id: string;
    project_id?: string;
    event_type: string;
    event_data?: any;
  }) {
    return await supabase
      .from('usage_analytics')
      .insert({
        user_id: eventData.user_id,
        project_id: eventData.project_id || null,
        event_type: eventData.event_type,
        event_data: eventData.event_data || {}
      });
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

// Assets Service
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

// Test connection - SINGLE FUNCTION ONLY
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error) throw error;
    console.log('✅ Supabase connection successful with new schema');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
};

// Helper function to check if user has credits
export const checkUserCredits = async (clerkUserId: string) => {
  const { data: user } = await userService.getUser(clerkUserId);
  return {
    hasCredits: user?.credits_remaining > 0,
    creditsRemaining: user?.credits_remaining || 0,
    subscriptionTier: user?.subscription_tier || 'free'
  };
};
  async addCredits(clerkUserId: string, creditsToAdd: number) {
    const { data: user } = await this.getUser(clerkUserId);
    if (user) {
      return await this.updateUser(clerkUserId, {
        credits_remaining: (user.credits_remaining || 0) + creditsToAdd
      });
    }
    return { data: null, error: 'User not found' };
  },
