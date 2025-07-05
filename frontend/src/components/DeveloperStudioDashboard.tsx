// Key changes to fix the dashboard SSR issues
// In DeveloperStudioDashboard.tsx, wrap all window/client-side code:

const analyzeProject = async () => {
  // ... validation code ...

  setIsAnalyzing(true);

  try {
    console.log('🧠 Running AI analysis...');
    
    const analysisPrompt = `...`; // your existing prompt

    // FIX: Check if we're in browser before using window.claude
    if (typeof window !== 'undefined' && window.claude?.complete) {
      const response = await window.claude.complete(analysisPrompt);
      
      try {
        const scopeData = JSON.parse(response);
        // ... rest of your code
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        // Use fallback API instead
        await analyzeWithAPI(analysisPrompt);
      }
    } else {
      // Server-side or no claude available - use API
      await analyzeWithAPI(analysisPrompt);
    }
  } catch (error) {
    console.error('Analysis failed:', error);
  } finally {
    setIsAnalyzing(false);
  }
};

// Add this new function for API-based analysis
const analyzeWithAPI = async (prompt: string) => {
  try {
    const response = await fetch('/api/analyze-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        projectData: projectForm
      })
    });

    if (!response.ok) {
      throw new Error(`Analysis API error: ${response.status}`);
    }

    const analysisResult = await response.json();
    setProjectScope(analysisResult);
    
    // Save to database
    if (savedProject?.id) {
      await projectService.saveAnalysis(savedProject.id, analysisResult);
    }
    
    await loadUserProjects(user.id);
  } catch (error) {
    console.error('API analysis error:', error);
    // Use mock data as last resort
    useMockAnalysis();
  }
};
