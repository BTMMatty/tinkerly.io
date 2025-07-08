'use client';

// Add this import at the top of your create/page.tsx
import AnalysisResults from '@/components/AnalysisResults';

// Then replace the current analysis results section (around line 323 in your current step 3) with:

{currentStep === 3 && analysisResults && (
  <AnalysisResults
    analysis={analysisResults}
    projectTitle={projectData.title}
    creditsRemaining={userCredits.creditsRemaining}
    onProceedToPayment={() => {
      // Handle payment flow
      alert('Payment integration coming soon!');
      // router.push('/payment');
    }}
    onStartNewAnalysis={() => {
      // Reset everything
      setProjectData({
        title: '',
        description: '',
        category: '',
        requirements: '',
        timeline: '',
        complexity: ''
      });
      setAnalysisResults(null);
      setCurrentStep(0);
    }}
  />
)}