// app/api/analyze-project/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

// Type definitions
interface ProjectData {
  title: string;
  description: string;
  category: string;
  requirements: string;
  timeline?: string;
  complexity?: string;
}

interface AnalysisResult {
  complexity: string;
  complexity_score: number;
  estimated_hours: number;
  hourly_rate: number;
  total_cost: number;
  timeline: {
    industry_standard: string;
    accelerated: string;
  };
  techStack: {
    frontend: string[];
    backend: string[];
    database: string;
    deployment: string;
  };
  phases: Array<{
    name: string;
    duration: string;
    description: string;
    deliverables: string[];
    percentage?: number;
  }>;
  milestones: Array<{
    title: string;
    description: string;
    percentage: number;
  }>;
  risks: Array<{
    risk: string;
    mitigation: string;
    impact: string;
  }>;
  keyFeatures: string[];
  whyRecommended: string;
}

// Type for user data from database
interface UserData {
  credits_remaining: number;
  id?: string;
  email?: string;
}

// Environment variables with debug logging
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const anthropicKey = process.env.ANTHROPIC_API_KEY;

console.log('🔧 Environment Check:', {
  hasSupabaseUrl: !!supabaseUrl,
  hasSupabaseKey: !!supabaseKey,
  hasAnthropicKey: !!anthropicKey,
  supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing'
});

// Initialize Supabase with better error handling
let supabase: SupabaseClient | null = null;
try {
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized');
  } else {
    console.warn('⚠️ Supabase environment variables missing. Running in demo mode.');
  }
} catch (error) {
  console.error('❌ Failed to initialize Supabase:', error);
}

// Initialize Anthropic with proper typing
let anthropic: Anthropic | null = null;
try {
  if (anthropicKey) {
    anthropic = new Anthropic({
      apiKey: anthropicKey,
    });
    console.log('✅ Anthropic client initialized');
  } else {
    console.warn('⚠️ Anthropic API key missing. Using fallback algorithm.');
  }
} catch (error) {
  console.error('❌ Failed to initialize Anthropic:', error);
}

// Helper function to safely get error message
const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'Unknown error occurred';
};

export async function POST(request: NextRequest) {
  console.log('🚀 API Request received');

  try {
    // 1. Check authentication
    const user = await currentUser();
    if (!user) {
      console.log('❌ No authenticated user');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('✅ User authenticated:', user.id);

    // 2. Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('❌ Body parse error:', parseError);
      return NextResponse.json({ 
        error: 'Invalid request body' 
      }, { status: 400 });
    }

    const { projectData } = body;

    // Validate required fields
    if (!projectData?.title || !projectData?.description || !projectData?.category || !projectData?.requirements) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, description, category, requirements' 
      }, { status: 400 });
    }

    console.log('🧠 Analyzing project:', projectData.title);

    // 3. Demo mode handling - if no Supabase
    if (!supabase) {
      console.log('📊 Running in demo mode (no database)');
      
      let analysis: AnalysisResult;
      if (anthropic) {
        try {
          analysis = await analyzeWithAnthropic(projectData, anthropic);
        } catch (aiError) {
          console.log('⚠️ AI failed, using algorithm:', aiError);
          analysis = generateProjectAnalysis(projectData);
        }
      } else {
        analysis = generateProjectAnalysis(projectData);
      }
      
      return NextResponse.json({
        analysis: analysis,
        credits_remaining: 3,
        demo_mode: true,
        message: 'Analysis completed in demo mode. Database features disabled.'
      });
    }

    // 4. Get or create user data with proper error handling
    let userData: UserData;
    try {
      userData = await getOrCreateUserData(supabase, user);
      console.log('✅ User data ready:', userData);
    } catch (userError) {
      console.error('❌ User processing failed:', userError);
      // Continue in demo mode if user creation fails
      console.log('🔄 Falling back to demo mode due to user error');
      
      let analysis: AnalysisResult;
      if (anthropic) {
        try {
          analysis = await analyzeWithAnthropic(projectData, anthropic);
        } catch (aiError) {
          analysis = generateProjectAnalysis(projectData);
        }
      } else {
        analysis = generateProjectAnalysis(projectData);
      }
      
      return NextResponse.json({
        analysis: analysis,
        credits_remaining: 3,
        demo_mode: true,
        message: 'Analysis completed in demo mode. User database setup needed.'
      });
    }

    // 5. Check credits
    if (userData.credits_remaining <= 0) {
      console.log('❌ No credits remaining');
      return NextResponse.json({ 
        error: 'No credits remaining', 
        credits_remaining: 0 
      }, { status: 403 });
    }

    // 6. Create project in database with error handling
    let projectId: string = 'demo-' + Date.now();
    try {
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          title: projectData.title,
          description: projectData.description,
          category: projectData.category,
          requirements: projectData.requirements,
          timeline: projectData.timeline || '',
          complexity: projectData.complexity || '',
          status: 'analyzing'
        })
        .select()
        .single();

      if (projectError || !project) {
        console.error('⚠️ Project creation error:', projectError);
        throw new Error('Failed to create project');
      }

      projectId = project.id;
      console.log('✅ Project created:', projectId);
    } catch (projectError) {
      console.log('⚠️ Project creation failed, continuing with analysis...');
    }

    // 7. Get AI analysis
    let analysis: AnalysisResult;
    
    if (anthropic) {
      try {
        console.log('🤖 Using Anthropic AI...');
        analysis = await analyzeWithAnthropic(projectData, anthropic);
        console.log('✅ AI analysis complete');
      } catch (aiError) {
        console.log('⚠️ AI analysis failed, using algorithm:', aiError);
        analysis = generateProjectAnalysis(projectData);
      }
    } else {
      console.log('🔧 Using intelligent algorithm...');
      analysis = generateProjectAnalysis(projectData);
    }

    // 8. Update project with analysis (if we have a real project ID)
    if (projectId !== `demo-${Date.now()}` && projectId.startsWith('demo-') === false) {
      try {
        const { error: updateError } = await supabase
          .from('projects')
          .update({
            ai_analysis: analysis,
            complexity_score: analysis.complexity_score,
            estimated_hours: analysis.estimated_hours,
            hourly_rate: analysis.hourly_rate,
            total_cost: analysis.total_cost,
            status: 'analyzed',
            analyzed_at: new Date().toISOString()
          })
          .eq('id', projectId);

        if (updateError) {
          console.error('⚠️ Failed to update project:', updateError);
        }

        // Create milestones if included in analysis
        if (analysis.milestones && analysis.milestones.length > 0) {
          const milestones = analysis.milestones.map((m, index) => ({
            project_id: projectId,
            title: m.title,
            description: m.description,
            amount: Math.round(analysis.total_cost * ((m.percentage || 33) / 100)),
            sequence_order: index + 1,
            due_date: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toISOString()
          }));

          const { error: milestoneError } = await supabase
            .from('milestones')
            .insert(milestones);

          if (milestoneError) {
            console.error('⚠️ Failed to create milestones:', milestoneError);
          }
        }
      } catch (updateError) {
        console.log('⚠️ Project update failed:', updateError);
      }
    }

    // 9. Deduct credit and track usage
    let finalCredits = userData.credits_remaining - 1;
    try {
      await supabase
        .from('users')
        .update({ credits_remaining: finalCredits })
        .eq('id', user.id);

      // Track usage
      await supabase.from('usage_analytics').insert({
        user_id: user.id,
        project_id: projectId,
        event_type: 'project_analyzed',
        event_data: {
          complexity: analysis.complexity,
          total_cost: analysis.total_cost,
          credits_used: 1,
          ai_model: anthropic ? 'claude-3.5-sonnet' : 'algorithm'
        }
      });
    } catch (trackingError) {
      console.log('⚠️ Credit/tracking update failed:', trackingError);
    }

    console.log('🎉 Analysis completed successfully for:', projectData.title);
    
    return NextResponse.json({
      project_id: projectId,
      analysis: analysis,
      credits_remaining: finalCredits
    });

  } catch (error) {
    console.error('💥 Unhandled error:', error);
    const errorMessage = getErrorMessage(error);
    
    // Better error responses based on error type
    if (error && typeof error === 'object' && 'status' in error) {
      return NextResponse.json({ 
        error: 'AI service temporarily unavailable. Please try again.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }, { status: 503 });
    }
    
    return NextResponse.json({ 
      error: 'Analysis failed. Please try again.',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      demo_mode: !supabase || !anthropic
    }, { status: 500 });
  }
}

// Enhanced user data function with better error handling
async function getOrCreateUserData(supabase: SupabaseClient, user: any): Promise<UserData> {
  try {
    // Try to get existing user
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('credits_remaining, id, email')
      .eq('id', user.id)
      .single();

    if (existingUser && !userError) {
      console.log('✅ Found existing user');
      return existingUser;
    }

    // User doesn't exist or there was an error
    if (userError?.code === 'PGRST116') {
      console.log('👤 Creating new user...');
      // User not found, create new user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.emailAddresses?.[0]?.emailAddress || '',
          full_name: user.fullName || user.firstName || 'User',
          credits_remaining: 3,
          subscription_tier: 'free',
          avatar_url: user.imageUrl || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('credits_remaining, id, email')
        .single();

      if (createError || !newUser) {
        console.error('❌ User creation failed:', createError);
        throw new Error('Failed to create user');
      }

      console.log('✅ Created new user');
      return newUser;
    }

    // Some other error occurred
    console.error('❌ User fetch error:', userError);
    throw new Error('Failed to fetch user data');
  } catch (error) {
    console.error('❌ User data processing error:', error);
    throw error;
  }
}

async function analyzeWithAnthropic(projectData: ProjectData, anthropicClient: Anthropic): Promise<AnalysisResult> {
  const { title, description, category, requirements } = projectData;
  
  const prompt = `You are an expert software project estimator. Analyze this project and provide detailed estimates.

Project Details:
- Title: ${title}
- Description: ${description}
- Category: ${category}
- Requirements: ${requirements}

Provide a comprehensive analysis in JSON format:
{
  "complexity": "Simple|Moderate|Complex|Enterprise",
  "complexity_score": 1-10,
  "estimated_hours": number,
  "hourly_rate": number (80-150 based on complexity),
  "total_cost": number,
  "timeline": {
    "industry_standard": "X weeks",
    "accelerated": "X weeks (50% faster)"
  },
  "techStack": {
    "frontend": ["React", "Next.js", ...],
    "backend": ["Node.js", ...],
    "database": "PostgreSQL|MongoDB|etc",
    "deployment": "Vercel|AWS|etc"
  },
  "phases": [
    {
      "name": "Phase 1: Foundation",
      "duration": "1 week",
      "description": "Setup, authentication, database",
      "deliverables": ["item1", "item2"],
      "percentage": 25
    }
  ],
  "milestones": [
    {
      "title": "Milestone 1",
      "description": "Description",
      "percentage": 25
    }
  ],
  "risks": [
    {
      "risk": "Description",
      "mitigation": "How to handle",
      "impact": "Low|Medium|High"
    }
  ],
  "keyFeatures": ["Feature 1", "Feature 2", ...],
  "whyRecommended": "2-3 sentences of expert advice"
}

Base your estimates on these guidelines:
- Simple projects (1-3 complexity): 40-80 hours, $3-8k
- Moderate projects (4-6 complexity): 80-200 hours, $8-25k
- Complex projects (7-8 complexity): 200-500 hours, $25-75k
- Enterprise projects (9-10 complexity): 500+ hours, $75k+

Be realistic and detailed. Consider modern development practices.
Respond ONLY with valid JSON, no additional text.`;

  try {
    // 🔥 CRITICAL FIX: Use type assertion to bypass TypeScript SDK issues
    const message = await (anthropicClient as any).messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      temperature: 0.7,
      system: "You are an expert software project estimator. Always respond with valid JSON only.",
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Parse the response
    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';
    
    try {
      const analysis = JSON.parse(responseText);
      return analysis;
    } catch (parseError) {
      console.error('❌ Failed to parse Anthropic response:', parseError);
      console.log('Raw response:', responseText);
      // Fallback to algorithmic analysis
      throw new Error('Failed to parse AI response');
    }
  } catch (error) {
    console.error('❌ Anthropic API error:', error);
    throw error;
  }
}

// [Keep all your existing helper functions exactly as they are]
function generateProjectAnalysis(projectData: ProjectData): AnalysisResult {
  const { title, description, category, requirements } = projectData;
  
  // Determine complexity based on multiple factors
  const complexity = determineComplexity(category, requirements, description);
  const complexityScore = getComplexityScore(complexity);
  const estimatedHours = calculateHours(complexity, requirements);
  const hourlyRate = getHourlyRate(complexity);
  const totalCost = estimatedHours * hourlyRate;

  return {
    complexity,
    complexity_score: complexityScore,
    estimated_hours: estimatedHours,
    hourly_rate: hourlyRate,
    total_cost: totalCost,
    techStack: getTechStack(category),
    timeline: calculateTimeline(estimatedHours),
    phases: generatePhases(complexity, estimatedHours),
    keyFeatures: extractKeyFeatures(category, requirements),
    risks: assessRisks(complexity, category),
    whyRecommended: generateRecommendation(category, complexity),
    milestones: generateMilestones(totalCost, estimatedHours)
  };
}

function generateMilestones(totalCost: number, hours: number) {
  const milestones = [];
  
  if (hours <= 80) {
    // Simple project - 2 milestones
    milestones.push(
      {
        title: "Project Kickoff & Core Development",
        description: "Initial setup and main features",
        percentage: 60
      },
      {
        title: "Testing & Deployment",
        description: "Final testing and go-live",
        percentage: 40
      }
    );
  } else if (hours <= 200) {
    // Moderate project - 3 milestones
    milestones.push(
      {
        title: "Foundation & Setup",
        description: "Architecture and core setup",
        percentage: 25
      },
      {
        title: "Core Feature Development",
        description: "Main functionality implementation",
        percentage: 50
      },
      {
        title: "Polish & Launch",
        description: "Testing, optimization, and deployment",
        percentage: 25
      }
    );
  } else {
    // Complex project - 4 milestones
    milestones.push(
      {
        title: "Architecture & Planning",
        description: "Detailed planning and setup",
        percentage: 20
      },
      {
        title: "Core Development Phase 1",
        description: "Primary features",
        percentage: 30
      },
      {
        title: "Core Development Phase 2",
        description: "Advanced features",
        percentage: 30
      },
      {
        title: "Testing & Deployment",
        description: "QA, optimization, and launch",
        percentage: 20
      }
    );
  }
  
  return milestones;
}

function determineComplexity(category: string, requirements: string, description: string): string {
  let score = 0;
  
  const categoryScores: Record<string, number> = {
    'Landing Page': 1,
    'Web Application': 3,
    'Mobile App': 4,
    'E-commerce Platform': 6,
    'API Development': 4,
    'Database Design': 3,
    'AI/ML Integration': 8,
    'Custom Dashboard': 5,
    'Integration Project': 6,
    'Enterprise Solution': 9
  };
  
  score += categoryScores[category] || 3;
  
  const reqLength = requirements.length;
  if (reqLength > 1000) score += 3;
  else if (reqLength > 500) score += 2;
  else if (reqLength > 200) score += 1;
  
  const complexKeywords = [
    'real-time', 'ai', 'ml', 'machine learning', 'payment', 'authentication',
    'integration', 'api', 'database', 'scalable', 'enterprise', 'security',
    'microservices', 'cloud', 'mobile', 'responsive'
  ];
  
  const text = (requirements + ' ' + description).toLowerCase();
  const keywordCount = complexKeywords.filter(keyword => text.includes(keyword)).length;
  score += Math.min(keywordCount, 5);
  
  if (score <= 3) return 'Simple';
  if (score <= 6) return 'Moderate';
  if (score <= 9) return 'Complex';
  return 'Enterprise';
}

function getComplexityScore(complexity: string): number {
  const scores: Record<string, number> = {
    'Simple': Math.floor(Math.random() * 3) + 1,
    'Moderate': Math.floor(Math.random() * 3) + 4,
    'Complex': Math.floor(Math.random() * 2) + 7,
    'Enterprise': Math.floor(Math.random() * 2) + 9
  };
  return scores[complexity];
}

function calculateHours(complexity: string, requirements: string): number {
  const baseHours: Record<string, number> = {
    'Simple': 20,
    'Moderate': 60,
    'Complex': 140,
    'Enterprise': 300
  };
  
  const base = baseHours[complexity];
  const reqFactor = Math.min(requirements.length / 100, 3);
  
  return Math.round(base * (1 + reqFactor * 0.2));
}

function getHourlyRate(complexity: string): number {
  const rates: Record<string, number> = {
    'Simple': 80,
    'Moderate': 100,
    'Complex': 125,
    'Enterprise': 150
  };
  return rates[complexity];
}

function getTechStack(category: string) {
  const stacks: Record<string, any> = {
    'Web Application': {
      frontend: ['React', 'Next.js', 'TypeScript'],
      backend: ['Node.js', 'Express'],
      database: 'PostgreSQL',
      deployment: 'Vercel'
    },
    'Mobile App': {
      frontend: ['React Native', 'TypeScript'],
      backend: ['Node.js', 'Express'],
      database: 'PostgreSQL',
      deployment: 'Expo'
    },
    'E-commerce Platform': {
      frontend: ['Next.js', 'TypeScript', 'Stripe'],
      backend: ['Node.js', 'Express'],
      database: 'PostgreSQL',
      deployment: 'Vercel'
    },
    'AI/ML Integration': {
      frontend: ['React', 'Next.js', 'TypeScript'],
      backend: ['Python', 'FastAPI', 'OpenAI API'],
      database: 'PostgreSQL',
      deployment: 'Railway'
    },
    'API Development': {
      frontend: ['Documentation Site'],
      backend: ['Node.js', 'Express', 'OpenAPI'],
      database: 'PostgreSQL',
      deployment: 'Railway'
    },
    'Custom Dashboard': {
      frontend: ['React', 'Next.js', 'Chart.js'],
      backend: ['Node.js', 'Express'],
      database: 'PostgreSQL',
      deployment: 'Vercel'
    },
    'Enterprise Solution': {
      frontend: ['React', 'Next.js', 'TypeScript'],
      backend: ['Node.js', 'Express', 'Redis'],
      database: 'PostgreSQL',
      deployment: 'AWS'
    }
  };
  
  return stacks[category] || stacks['Web Application'];
}

function calculateTimeline(hours: number) {
  const weeks = Math.ceil(hours / 40);
  const acceleratedWeeks = Math.ceil(weeks * 0.6);
  
  return {
    industry_standard: `${weeks} week${weeks > 1 ? 's' : ''}`,
    accelerated: `${acceleratedWeeks} week${acceleratedWeeks > 1 ? 's' : ''}`
  };
}

function generatePhases(complexity: string, totalHours: number) {
  const phases = [];
  
  if (complexity === 'Simple') {
    phases.push(
      {
        name: 'Setup & Development',
        duration: '1-2 weeks',
        description: 'Project setup and core development',
        deliverables: ['Project structure', 'Core features', 'Basic testing']
      },
      {
        name: 'Polish & Deploy',
        duration: '0.5-1 week',
        description: 'Final testing and deployment',
        deliverables: ['Testing', 'Deployment', 'Documentation']
      }
    );
  } else if (complexity === 'Moderate') {
    phases.push(
      {
        name: 'Planning & Setup',
        duration: '1 week',
        description: 'Architecture planning and project setup',
        deliverables: ['Technical spec', 'Project structure', 'Database design']
      },
      {
        name: 'Core Development',
        duration: '2-3 weeks',
        description: 'Main feature development',
        deliverables: ['Core features', 'API endpoints', 'User interface']
      },
      {
        name: 'Integration & Testing',
        duration: '1 week',
        description: 'Integration testing and deployment',
        deliverables: ['Testing suite', 'Deployment', 'Documentation']
      }
    );
  } else {
    phases.push(
      {
        name: 'Architecture & Planning',
        duration: '1-2 weeks',
        description: 'Detailed architecture and technical planning',
        deliverables: ['Architecture docs', 'Technical specs', 'Database design']
      },
      {
        name: 'Core Development',
        duration: '3-6 weeks',
        description: 'Main application development',
        deliverables: ['Core features', 'APIs', 'User interfaces']
      },
      {
        name: 'Advanced Features',
        duration: '2-4 weeks',
        description: 'Complex features and integrations',
        deliverables: ['Advanced features', 'Third-party integrations', 'Security implementation']
      },
      {
        name: 'Testing & Deployment',
        duration: '1-2 weeks',
        description: 'Comprehensive testing and production deployment',
        deliverables: ['Testing suite', 'Performance optimization', 'Production deployment']
      }
    );
  }
  
  return phases;
}

function extractKeyFeatures(category: string, requirements: string): string[] {
  const commonFeatures: Record<string, string[]> = {
    'Web Application': ['User Authentication', 'Responsive Design', 'Database Integration'],
    'Mobile App': ['Native Performance', 'Push Notifications', 'Offline Support'],
    'E-commerce Platform': ['Payment Processing', 'Inventory Management', 'Order Tracking'],
    'AI/ML Integration': ['Machine Learning Models', 'Data Processing', 'Predictive Analytics'],
    'API Development': ['RESTful APIs', 'Authentication', 'Rate Limiting'],
    'Custom Dashboard': ['Data Visualization', 'Real-time Updates', 'User Management'],
    'Enterprise Solution': ['Scalable Architecture', 'Security Compliance', 'Integration APIs']
  };
  
  const baseFeatures = commonFeatures[category] || ['Custom Features', 'Modern UI', 'Secure Backend'];
  
  // Add features based on requirements
  const text = requirements.toLowerCase();
  const additionalFeatures: string[] = [];
  
  if (text.includes('real-time')) additionalFeatures.push('Real-time Updates');
  if (text.includes('mobile')) additionalFeatures.push('Mobile Responsive');
  if (text.includes('payment')) additionalFeatures.push('Payment Integration');
  if (text.includes('social')) additionalFeatures.push('Social Features');
  if (text.includes('search')) additionalFeatures.push('Advanced Search');
  
  return [...baseFeatures, ...additionalFeatures].slice(0, 6);
}

function assessRisks(complexity: string, category: string) {
  const risks = [];
  
  if (complexity === 'Complex' || complexity === 'Enterprise') {
    risks.push({
      risk: 'Technical complexity may require additional research',
      mitigation: 'Prototype complex features early and get stakeholder feedback',
      impact: 'Medium'
    });
  }
  
  if (category.includes('Integration') || category.includes('API')) {
    risks.push({
      risk: 'Third-party API dependencies',
      mitigation: 'Test integrations early and have fallback options',
      impact: 'Medium'
    });
  }
  
  if (category === 'AI/ML Integration') {
    risks.push({
      risk: 'AI model performance variability',
      mitigation: 'Extensive testing with diverse datasets',
      impact: 'High'
    });
  }
  
  risks.push({
    risk: 'Scope creep during development',
    mitigation: 'Clear requirements documentation and change management process',
    impact: 'Low'
  });
  
  return risks.slice(0, 3);
}

function generateRecommendation(category: string, complexity: string): string {
  const recommendations: Record<string, string> = {
    'Simple': 'This approach focuses on rapid delivery while maintaining code quality. Perfect for MVP or proof-of-concept projects.',
    'Moderate': 'Balanced approach combining modern technologies with proven patterns. Ideal for production applications with room for growth.',
    'Complex': 'Enterprise-grade architecture designed for scalability and maintainability. Best for applications expecting significant growth.',
    'Enterprise': 'Cutting-edge solution with advanced features and robust architecture. Suitable for mission-critical applications.'
  };
  
  return recommendations[complexity];
}