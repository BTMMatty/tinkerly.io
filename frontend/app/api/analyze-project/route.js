import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

export async function POST(request) {
  try {
    // Check authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { prompt, projectData } = await request.json();

    // Validate required fields
    if (!projectData?.title || !projectData?.description || !projectData?.category || !projectData?.requirements) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, description, category, requirements' 
      }, { status: 400 });
    }

    console.log('🧠 Analyzing project:', projectData.title);

    // Generate intelligent analysis based on project data
    const analysis = generateProjectAnalysis(projectData);

    console.log('✅ Analysis completed for:', projectData.title);
    
    return NextResponse.json(analysis);

  } catch (error) {
    console.error('❌ Analysis API error:', error);
    return NextResponse.json({ 
      error: 'Analysis failed. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

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
    whyRecommended: generateRecommendation(category, complexity)
  };
}

function determineComplexity(category, requirements, description) {
  let score = 0;
  
  // Category-based scoring
  const categoryScores = {
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
  
  // Requirements complexity
  const reqLength = requirements.length;
  if (reqLength > 1000) score += 3;
  else if (reqLength > 500) score += 2;
  else if (reqLength > 200) score += 1;
  
  // Keyword analysis
  const complexKeywords = [
    'real-time', 'ai', 'ml', 'machine learning', 'payment', 'authentication',
    'integration', 'api', 'database', 'scalable', 'enterprise', 'security',
    'microservices', 'cloud', 'mobile', 'responsive'
  ];
  
  const text = (requirements + ' ' + description).toLowerCase();
  const keywordCount = complexKeywords.filter(keyword => text.includes(keyword)).length;
  score += Math.min(keywordCount, 5);
  
  // Convert to complexity level
  if (score <= 3) return 'Simple';
  if (score <= 6) return 'Moderate';
  if (score <= 9) return 'Complex';
  return 'Enterprise';
}

function getComplexityScore(complexity) {
  const scores = {
    'Simple': Math.floor(Math.random() * 3) + 1, // 1-3
    'Moderate': Math.floor(Math.random() * 3) + 4, // 4-6
    'Complex': Math.floor(Math.random() * 2) + 7, // 7-8
    'Enterprise': Math.floor(Math.random() * 2) + 9 // 9-10
  };
  return scores[complexity];
}

function calculateHours(complexity, requirements) {
  const baseHours = {
    'Simple': 20,
    'Moderate': 60,
    'Complex': 140,
    'Enterprise': 300
  };
  
  const base = baseHours[complexity];
  const reqFactor = Math.min(requirements.length / 100, 3); // Max 3x multiplier
  
  return Math.round(base * (1 + reqFactor * 0.2));
}

function getHourlyRate(complexity) {
  const rates = {
    'Simple': 80,
    'Moderate': 100,
    'Complex': 125,
    'Enterprise': 150
  };
  return rates[complexity];
}

function getTechStack(category) {
  const stacks = {
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

function calculateTimeline(hours) {
  const weeks = Math.ceil(hours / 40);
  const acceleratedWeeks = Math.ceil(weeks * 0.6); // 40% faster
  
  return {
    industry_standard: `${weeks} week${weeks > 1 ? 's' : ''}`,
    accelerated: `${acceleratedWeeks} week${acceleratedWeeks > 1 ? 's' : ''}`
  };
}

function generatePhases(complexity, totalHours) {
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

function extractKeyFeatures(category, requirements) {
  const commonFeatures = {
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
  const additionalFeatures = [];
  
  if (text.includes('real-time')) additionalFeatures.push('Real-time Updates');
  if (text.includes('mobile')) additionalFeatures.push('Mobile Responsive');
  if (text.includes('payment')) additionalFeatures.push('Payment Integration');
  if (text.includes('social')) additionalFeatures.push('Social Features');
  if (text.includes('search')) additionalFeatures.push('Advanced Search');
  
  return [...baseFeatures, ...additionalFeatures].slice(0, 6);
}

function assessRisks(complexity, category) {
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

function generateRecommendation(category, complexity) {
  const recommendations = {
    'Simple': 'This approach focuses on rapid delivery while maintaining code quality. Perfect for MVP or proof-of-concept projects.',
    'Moderate': 'Balanced approach combining modern technologies with proven patterns. Ideal for production applications with room for growth.',
    'Complex': 'Enterprise-grade architecture designed for scalability and maintainability. Best for applications expecting significant growth.',
    'Enterprise': 'Cutting-edge solution with advanced features and robust architecture. Suitable for mission-critical applications.'
  };
  
  return recommendations[complexity];
}