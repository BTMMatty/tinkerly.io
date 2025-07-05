\// app/api/analyze-project/route.js
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    console.log('🧠 AI Analysis API called');
    
    // Validate API key
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('❌ Missing ANTHROPIC_API_KEY');
      return Response.json({ error: 'AI service configuration error' }, { status: 500 });
    }

    const { projectData } = await request.json();
    
    if (!projectData || !projectData.title || !projectData.description) {
      return Response.json({ error: 'Missing required project data' }, { status: 400 });
    }

    console.log('📊 Analyzing project:', projectData.title);

    const analysisPrompt = `You are an expert software development consultant analyzing a project for Tinkerly - a platform that delivers projects 50% faster than traditional agencies with transparent pricing.

PROJECT TO ANALYZE:
Title: ${projectData.title}
Description: ${projectData.description}
Category: ${projectData.category || 'Not specified'}
Requirements: ${projectData.requirements || 'Basic requirements'}

ANALYSIS INSTRUCTIONS:
1. Assess complexity on 1-10 scale (consider technical difficulty, integration needs, custom features)
2. Recommend optimal tech stack for this specific project
3. Calculate realistic timeline then apply 50% speed improvement
4. Estimate pricing based on premium development rates ($100-150/hour)
5. Identify potential risks and mitigation strategies
6. Break down into clear development milestones
7. Specify developer skill requirements

PRICING CONTEXT:
- Premium development service (Tinkerly brand)
- Rates: $100-150/hour depending on complexity
- Simple projects (1-3): $5K-15K
- Moderate projects (4-6): $15K-40K  
- Complex projects (7-8): $40K-80K
- Enterprise projects (9-10): $80K+

RESPOND WITH ONLY VALID JSON IN THIS EXACT FORMAT:
{
  "complexity": "Simple|Moderate|Complex|Enterprise",
  "complexity_score": 1-10,
  "estimated_hours": number,
  "hourly_rate": number,
  "total_cost": number,
  "timeline": {
    "industry_standard": "X weeks",
    "accelerated": "X weeks"
  },
  "techStack": {
    "frontend": ["technology1", "technology2"],
    "backend": ["technology1", "technology2"],
    "database": "recommended_db",
    "deployment": "platform",
    "additional": ["tool1", "tool2"]
  },
  "phases": [
    {
      "name": "Phase Name",
      "duration": "X weeks",
      "description": "What gets built",
      "deliverables": ["deliverable1", "deliverable2"],
      "developer_types": ["Frontend Dev", "Backend Dev"]
    }
  ],
  "keyFeatures": ["feature1", "feature2", "feature3"],
  "risks": [
    {
      "risk": "Risk description",
      "mitigation": "How to handle it",
      "impact": "Low|Medium|High",
      "probability": "Low|Medium|High"
    }
  ],
  "resources": [
    {
      "type": "Documentation|Tool|Service",
      "name": "Resource name",
      "purpose": "Why needed",
      "cost": "Free|Paid|$X/month"
    }
  ],
  "team_composition": {
    "project_manager": 1,
    "frontend_developers": number,
    "backend_developers": number,
    "devops_engineer": number,
    "designer": number,
    "total_team_size": number
  },
  "whyRecommended": "2-3 sentence explanation of the approach and why it's optimal for this project"
}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      temperature: 0.3,
      messages: [{
        role: 'user',
        content: analysisPrompt
      }]
    });

    const responseText = message.content[0].text;
    console.log('🤖 Raw AI response length:', responseText.length);

    try {
      const analysisResult = JSON.parse(responseText);
      console.log('✅ AI analysis successful for:', projectData.title);
      
      return Response.json(analysisResult);
      
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError);
      console.log('Raw response:', responseText);
      
      // Return fallback with error info
      return Response.json({ 
        error: 'AI analysis completed but formatting failed',
        raw_response: responseText.substring(0, 500)
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ AI Analysis error:', error);
    
    return Response.json({ 
      error: 'AI analysis failed',
      details: error.message 
    }, { status: 500 });
  }
}