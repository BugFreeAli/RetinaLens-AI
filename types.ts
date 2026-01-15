
export enum AppState {
  LANDING = 'LANDING',
  SCANNING = 'SCANNING',
  RESULT = 'RESULT'
}

export interface AnalysisResult {
  diagnosis: 'Positive' | 'Negative';
  confidence: number;
  conditionName: string;
  summary: string;
  findings: {
    label: string;
    status: string;
    isHighRisk?: boolean;
  }[];
  recommendation: string;
  nextExam: string;
  imageUrl: string;
}

export interface PatientInfo {
  id: string;
  name: string;
  dob: string;
  scanDate: string;
}
