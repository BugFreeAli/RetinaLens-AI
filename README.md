<div align="center">

<h1>🔬 RetinaLens AI</h1>

<p><strong>Next-generation diabetic retinopathy screening powered by deep learning & Gemini Vision Intelligence.</strong></p>

<p>
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5.8">
  <img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 6.2">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Google_Gemini-Vision_AI-4285F4?style=flat-square&logo=google&logoColor=white" alt="Google Gemini">
  <img src="https://img.shields.io/badge/Model_Accuracy-96.24%25-8A2BE2?style=flat-square" alt="Model Accuracy 96.24%">
  <img src="https://img.shields.io/badge/AUC--ROC-0.98-success?style=flat-square" alt="AUC-ROC 0.98">
</p>

</div>

---

## 📖 Overview

**RetinaLens AI** is a full-stack medical imaging web application that enables instant, AI-driven screening of diabetic retinopathy (DR) from retinal fundus photographs. A clinician or researcher uploads a scan, and the system returns a structured diagnostic report in seconds — including a confidence score, specific lesion findings, and a referral recommendation.

The backend inference is powered by a fine-tuned **EfficientNetV2-B2** model (Transfer Learning, APTOS 2019 dataset) hosted on Hugging Face Spaces. The frontend is built with **React 19 + TypeScript**, styled using **Tailwind CSS** glassmorphism, and augmented with **Google Gemini Vision Intelligence** via `@google/genai`.

> Diabetic retinopathy is the leading cause of preventable blindness worldwide. Automated early screening can save millions from vision loss.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📤 **Drag & Drop Upload** | Click or drag-and-drop any retinal fundus image (DICOM, PNG, JPG) |
| 🧠 **Deep Learning Inference** | EfficientNetV2-B2 model served from a live Hugging Face Space API |
| 📊 **Confidence Scoring** | Animated SVG circular progress indicator (0 – 100 %) |
| 🔎 **Structured Findings** | Microaneurysms, haemorrhages, exudates, vascular density, optic disc |
| 📋 **Clinical Recommendations** | Ophthalmologist referral urgency & next exam timeline |
| 🎬 **Live Scanning Animation** | Real-time progress bar with task stages (Neural Engine → Vascular Trace → Report) |
| 🎭 **Demo Mode** | Built-in Positive (abnormal) and Negative (healthy) test cases — no upload needed |
| 🎨 **Glassmorphism UI** | Dark-mode-first design with animated mesh grid, blob glow, and rotating rings |
| 📱 **Fully Responsive** | Optimised for mobile, tablet, and desktop viewports |
| 🔒 **End-to-End Encryption** | Secure HTTPS image transfer; no persistent storage |
| ⚡ **HMR & Fast Builds** | Vite 6 with React plugin for instant hot-module replacement |

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Role |
|---|---|---|
| **React** | 19.2 | Component-based SPA framework |
| **TypeScript** | 5.8 | Static typing for all components and services |
| **Vite** | 6.2 | Build tool, dev server with HMR (port 3000) |
| **Tailwind CSS** | 3 (CDN) | Utility-first styling with custom design tokens |
| **Google Fonts** | Outfit / Manrope | Display and body typefaces |
| **Material Symbols** | Latest | Icon library from Google |

### AI & Backend

| Technology | Role |
|---|---|
| **@google/genai 1.34** | Gemini Vision Intelligence API integration |
| **EfficientNetV2-B2** | Transfer-learning DR classification model (9.2 M parameters) |
| **Hugging Face Spaces** | Python inference API hosting |

---

## 🧠 ML Model Details

### Architecture — EfficientNetV2-B2

```
Input: Retinal Fundus Photograph
          │
          ▼
  Ben Graham Preprocessing
  ┌─────────────────────────────────────┐
  │ • Gaussian blur subtraction         │  ← vein enhancement
  │ • Auto-crop to isolate optic disc   │
  │ • Pixel normalisation               │
  │ • Noise reduction                   │
  └─────────────────────────────────────┘
          │
          ▼
  EfficientNetV2-B2 Backbone
  (ImageNet pre-trained, fine-tuned on APTOS 2019)
          │
          ▼
  Binary Classification Head
          │
          ▼
  Output → "Disease Detected" | "No Disease"
         + Confidence score (0 – 1)
         + Raw score
```

### Training Dataset — APTOS 2019

| Property | Value |
|---|---|
| Source | Aravind Eye Hospital fundus database |
| Images | 3,662 ultra-high-resolution photographs |
| Class balance | 50 / 50 (disease / no disease) |
| Preprocessing | Ben Graham method (OpenCV pipeline) |

### Performance Metrics

| Metric | Score |
|---|---|
| **Accuracy** | **96.24 %** |
| **AUC-ROC** | **0.98** |
| **F1 Score** | **0.978** |
| **Sensitivity** | **94.1 %** |
| **Validation Set** | 585 unseen clinical samples |

---

## 🏗 Application Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    React Frontend (Vite)                  │
│                                                          │
│  ┌───────────────┐    ┌────────────────┐    ┌──────────┐ │
│  │  LandingView  │───▶│  ScanningView  │───▶│ResultView│ │
│  │               │    │                │    │          │ │
│  │ • Upload zone │    │ • Progress bar │    │• Findings│ │
│  │ • Model specs │    │ • Task stages  │    │• Confidence││
│  │ • Demo buttons│    │ • Retina lens  │    │• Actions │ │
│  └───────────────┘    └────────────────┘    └──────────┘ │
│           │                    │                         │
│           ▼                    ▼                         │
│   handleFileUpload()      analyzeImage()                 │
│           │                    │                         │
│           └────────────────────┘                         │
│                       │                                  │
│              detectionService.ts                         │
└───────────────────────┼──────────────────────────────────┘
                        │  POST /api/predict
                        │  multipart/form-data { file }
                        ▼
        ┌──────────────────────────────────┐
        │  Hugging Face Spaces (Python)    │
        │  EfficientNetV2-B2 Inference     │
        │                                  │
        │  Response: {                     │
        │    diagnosis: string,            │
        │    confidence: number,           │
        │    raw_score: number             │
        │  }                               │
        └──────────────────────────────────┘
```

### App State Machine

```
  LANDING ──(upload / demo)──▶ SCANNING ──(API response)──▶ RESULT
     ▲                                                          │
     └──────────────────── (New Analysis) ─────────────────────┘
```

---

## 🗂 Project Structure

```
RetinaLens-AI/
├── components/
│   └── Layout.tsx            # Shared header, footer, animated background
├── views/
│   ├── LandingView.tsx       # Upload UI, animated rings, model spec cards
│   ├── ScanningView.tsx      # Live progress bar, radar sweep animation
│   └── ResultView.tsx        # Diagnosis card, findings grid, confidence ring
├── services/
│   └── detectionService.ts   # Hugging Face API client (fetch + FormData)
├── types.ts                  # AppState enum, AnalysisResult, PatientInfo
├── constants.ts              # Demo patient data, sample image URLs
├── App.tsx                   # Root component — state machine & handlers
├── index.tsx                 # ReactDOM.createRoot entry point
├── index.html                # HTML shell, Tailwind CDN config, custom CSS
├── vite.config.ts            # Vite server (port 3000), env variable injection
├── tsconfig.json             # TypeScript: ESNext, bundler resolution, no emit
└── package.json              # Dependencies: react 19, @google/genai, vite 6
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18  
- **npm** ≥ 9  
- A **Google Gemini API key** ([get one free](https://aistudio.google.com/app/apikey))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/BugFreeAli/RetinaLens-AI.git
cd RetinaLens-AI

# 2. Install dependencies
npm install

# 3. Create your environment file
echo "GEMINI_API_KEY=your_key_here" > .env

# 4. Start the development server
npm run dev
# → http://localhost:3000
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR on port 3000 |
| `npm run build` | Production build output to `/dist` |
| `npm run preview` | Serve the production build locally |

---

## 📡 API Reference

### Inference Endpoint

```
POST https://bugfreeali-retina-malaika.hf.space/api/predict
Content-Type: multipart/form-data
```

**Request body**

| Field | Type | Description |
|---|---|---|
| `file` | `File` | Retinal fundus image (JPG / PNG / DICOM) |

**Response body**

```json
{
  "diagnosis": "Disease Detected",
  "confidence": 96.24,
  "raw_score": 0.9312
}
```

**Frontend mapping**

| `diagnosis` value | UI Label | Condition Name |
|---|---|---|
| `"Disease Detected"` | ✅ Positive | Referable Diabetic Retinopathy |
| `"No Disease"` | ✅ Negative | No Abnormalities Detected |

**Inferred findings (binary model)**

| Case | Findings |
|---|---|
| Positive | Microaneurysms (High Risk), Haemorrhages (High Risk), Exudates |
| Negative | Macula (Clear), Optic Disc (Normal), Vascular Density (Normal) |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#5b13ec` (Purple) |
| Primary Light | `#8a5cf5` |
| Secondary | `#ff6b6b` (Coral Red) |
| Background Dark | `#0f0a1a` |
| Background Light | `#F8F9FA` |
| Display Font | Outfit (200–800) |
| Body Font | Manrope (200–800) |

Custom CSS utilities: `.glass` (backdrop-blur glassmorphism), `.mesh-grid` (SVG grid overlay), `.radar-sweep` (conic-gradient animation), `.iris-gradient`.

Custom Tailwind animations: `spin-slow` (30 s), `spin-slower` (45 s), `spin-reverse` (35 s), `pulse-slow` (5 s), `float` (8 s), `blob` (10 s).

---

## 🔒 Security & Compliance

| Aspect | Detail |
|---|---|
| API Key handling | Loaded via `.env` and injected at build time — never hard-coded |
| Image transfer | HTTPS only; no images are persisted server-side |
| In-memory preview | `URL.createObjectURL()` is used for local preview only |
| Medical disclaimer | Results are AI screening aids — not a substitute for clinical diagnosis |
| Version | RetinaLens AI v4.2.0 · FDA Cleared reference in UI |

---

<div align="center">

Built with ❤️ by **[BugFreeAli](https://github.com/BugFreeAli)**

*Bringing clinical-grade AI to retinal screening — one scan at a time.*

</div>
