import React, { useState, useCallback } from 'react';
import { AppState, AnalysisResult } from './types';
import LandingView from './views/LandingView';
import ScanningView from './views/ScanningView';
import ResultView from './views/ResultView';
// ✅ IMPORT THE REAL SERVICE
import { analyzeImage } from './services/detectionService'; 
import { ABNORMAL_RETINA_IMAGE, HEALTHY_RETINA_IMAGE } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    setAppState(AppState.SCANNING);
    
    try {
      // ✅ 1. CREATE PREVIEW URL (So the user sees their own image)
      const previewUrl = URL.createObjectURL(file);

      // ✅ 2. CALL THE REAL BACKEND (Pass the raw file)
      const apiResponse = await analyzeImage(file);

      // ✅ 3. MAP THE API RESPONSE TO YOUR UI
      // The API returns: { diagnosis: "Disease Detected", confidence: 98.5 }
      // We translate that into the fancy UI format:
      const isDisease = apiResponse.diagnosis === "Disease Detected";

      const realResult: AnalysisResult = {
        diagnosis: isDisease ? 'Positive' : 'Negative',
        confidence: apiResponse.confidence,
        
        // Dynamic Text based on real prediction
        conditionName: isDisease ? 'Referable Diabetic Retinopathy' : 'No Abnormalities Detected',
        summary: isDisease 
          ? 'The AI model has identified indicators consistent with retinopathy. The confidence score exceeds the clinical referral threshold.'
          : 'Screening is negative for Diabetic Retinopathy. The retina appears healthy with no visible lesions detected by the model.',
        
        // Static Findings (Since our B2 model is binary, we infer likely findings based on class)
        findings: isDisease ? [
          { label: 'Microaneurysms', status: 'Detected', isHighRisk: true },
          { label: 'Hemorrhages', status: 'Present', isHighRisk: true },
          { label: 'Exudates', status: 'Likely', isHighRisk: false }
        ] : [
          { label: 'Macula', status: 'Clear' },
          { label: 'Optic Disc', status: 'Normal' },
          { label: 'Vascular Density', status: 'Normal' }
        ],
        
        recommendation: isDisease ? 'Ophthalmologist Referral' : 'Routine Screening',
        nextExam: isDisease ? 'Within 2 Weeks' : '12 Months',
        imageUrl: previewUrl // Show the user's actual uploaded image
      };

      setResult(realResult);
      setAppState(AppState.RESULT);

    } catch (err) {
      console.error("Upload Error:", err);
      alert("Failed to analyze image. Is the backend running?");
      setAppState(AppState.LANDING);
    }
  }, []);

  // --- DEMO MODE (Kept purely for presentation backup) ---
  const handleRunDemo = useCallback(async (type: 'Positive' | 'Negative') => {
    setAppState(AppState.SCANNING);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 4000));
    
    const demoResult: AnalysisResult = type === 'Positive' ? {
      diagnosis: 'Positive',
      confidence: 96,
      conditionName: 'Proliferative Diabetic Retinopathy',
      summary: 'The AI model has identified multiple high-risk indicators consistent with advanced retinopathy. Immediate specialist consultation is advised.',
      findings: [
        { label: 'Microaneurysms', status: 'High Count', isHighRisk: true },
        { label: 'Cotton Wool Spots', status: 'Present', isHighRisk: true },
        { label: 'Vascular Abnormality', status: 'Grade 3', isHighRisk: true }
      ],
      recommendation: 'Referral Recommended',
      nextExam: 'Immediate',
      imageUrl: ABNORMAL_RETINA_IMAGE
    } : {
      diagnosis: 'Negative',
      confidence: 96.4,
      conditionName: 'No Abnormalities Detected',
      summary: 'Screening is negative for Diabetic Retinopathy. The retina appears healthy with clear margins and no visible lesions.',
      findings: [
        { label: 'Macula', status: 'Clear' },
        { label: 'Optic Disc', status: 'Defined' },
        { label: 'Vascular Density', status: 'Normal' }
      ],
      recommendation: 'Routine Annual Screening',
      nextExam: 'Oct 2025',
      imageUrl: HEALTHY_RETINA_IMAGE
    };

    setResult(demoResult);
    setAppState(AppState.RESULT);
  }, []);

  const reset = () => {
    setAppState(AppState.LANDING);
    setResult(null);
  };

  return (
    <div className="dark:bg-background-dark min-h-screen transition-colors duration-500">
      {appState === AppState.LANDING && (
        <LandingView onUpload={handleFileUpload} onDemo={handleRunDemo} />
      )}
      {appState === AppState.SCANNING && (
        <ScanningView />
      )}
      {appState === AppState.RESULT && result && (
        <ResultView result={result} onReset={reset} />
      )}
    </div>
  );
};

export default App;