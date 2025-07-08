import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for server-side
);

// Initialize Anthropic
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    // Check authentication using currentUser for API routes
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectData } = await request.json();

    // Validate required fields
    if (!projectData?.title || !projectData?.description || !projectData?.category || !projectData?.requirements) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, description, category, requirements' 
      }, { status: 400 });
    }

    console.log('🧠 Analyzing project:', projectData.title);

    // Check user credits
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('credits_remaining')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      console.error('User fetch error:', userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (userData.credits_remaining <= 0) {
      return NextResponse.json({ 
        error: 'No credits remaining', 
        credits_remaining: 0 
      }, { status: 403 });
    }

    // Create project in database
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
      console.error('Project creation error:', projectError);
      return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }

    // Get AI analysis from Anthropic
    let analysis;
    
    if (process.env.ANTHROPIC_API_KEY) {
      // Use real Anthropic AI
      analysis = await analyzeWithAnthropic(projectData);
    } else {
      // Fallback to your smart algorithm if no API key
      console.log('⚠️ No Anthropic API key found, using intelligent algorithm');
      analysis = generateProjectAnalysis(projectData);
    }

    // Update project with analysis
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
      .eq('id', project.id);

    if (updateError) {
      console.error('Failed to update project:', updateError);
    }

    // Create milestones if included in analysis
    if (analysis.milestones && analysis.milestones.length > 0) {
      const milestones = analysis.milestones.map((m, index) => ({
        project_id: project.id,
        title: m.title || m.name,
        description: m.description,
        amount: Math.round(analysis.total_cost * ((m.percentage || 33) / 100)),
        sequence_order: index + 1,
        due_date: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toISOString()
      }));

      const { error: milestoneError } = await supabase
        .from('milestones')
        .insert(milestones);

      if (milestoneError) {
        console.error('Failed to create milestones:', milestoneError);
      }
    }

    // Deduct credit
    await supabase
      .from('users')
      .update({ credits_remaining: userData.credits_remaining - 1 })
      .eq('id', user.id);

    // Track usage
    await supabase.from('usage_analytics').insert({
      user_id: user.id,
      project_id: project.id,
      event_type: 'project_analyzed',
      event_data: {
        complexity: analysis.complexity,
        total_cost: analysis.total_cost,
        credits_used: 1,
        ai_model: process.env.ANTHROPIC_API_KEY ? 'claude-3-opus' : 'algorithm'
      }
    });

    console.log('✅ Analysis completed for:', projectData.title);
    
    return NextResponse.json({
      project_id: project.id,
      analysis: analysis,
      credits_remaining: userData.credits_remaining - 1
    });

  } catch (error) {
    console.error('❌ Analysis API error:', error);
    return NextResponse.json({ 
      error: 'Analysis failed. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

async function analyzeWithAnthropic(projectData) {
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
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
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
    const responseText = message.content[0].text;
    const analysis = JSON.parse(responseText);
    
    return analysis;
  } catch (error) {
    console.error('Anthropic API error:', error);
    // Fallback to algorithmic analysis
    return generateProjectAnalysis(projectData);
  }
}

// Keep your existing generateProjectAnalysis function and all helper functions below...
// [All your existing functions remain the same - they're your fallback!]

function generateProjectAnalysis(projectData) {
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

function generateMilestones(totalCost, hours) {
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

// [Include all your other helper functions here - they stay the same!]
function determineComplexity(category, requirements, description) {
  // ... your existing code ...
}

function getComplexityScore(complexity) {
  // ... your existing code ...
}

function calculateHours(complexity, requirements) {
  // ... your existing code ...
}

function getHourlyRate(complexity) {
  // ... your existing code ...
}

function getTechStack(category) {
  // ... your existing code ...
}

function calculateTimeline(hours) {
  // ... your existing code ...
}

function generatePhases(complexity, totalHours) {
  // ... your existing code ...
}

function extractKeyFeatures(category, requirements) {
  // ... your existing code ...
}

function assessRisks(complexity, category) {
  // ... your existing code ...
}

function generateRecommendation(category, complexity) {
  // ... your existing code ...
}