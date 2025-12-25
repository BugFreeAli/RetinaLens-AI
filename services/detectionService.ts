// services/detectionService.ts

// 🟢 REPLACE THIS WITH YOUR ACTUAL HUGGING FACE URL
const API_URL = "https://bugfreeali-retina_malaika.hf.space/predict";

export interface DetectionResult {
  diagnosis: string;
  confidence: number;
  raw_score: number;
}

export const analyzeImage = async (imageFile: File): Promise<DetectionResult> => {
  const formData = new FormData();
  
  // Your Python Backend expects the field name "file"
  formData.append("file", imageFile);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
