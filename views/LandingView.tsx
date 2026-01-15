
import React, { useRef } from 'react';
import Layout from '../components/Layout';

interface LandingViewProps {
  onUpload: (file: File) => void;
  onDemo: (type: 'Positive' | 'Negative') => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onUpload, onDemo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <Layout activeTab="Analysis">
      <div className="flex flex-col items-center justify-center pt-10 px-4">
        <div className="relative w-full max-w-3xl aspect-[1.5/1] flex flex-col items-center justify-center py-10">
          {/* Animated rings */}
          <div className="absolute border border-gray-200/40 dark:border-gray-700/30 rounded-full w-[700px] h-[700px] animate-pulse-slow hidden lg:block"></div>
          <div className="absolute border border-dashed border-primary/20 rounded-full w-[580px] h-[580px] animate-spin-slow hidden md:block"></div>
          <div className="absolute border border-t-primary/40 border-r-transparent border-b-primary/40 border-l-transparent rounded-full w-[500px] h-[500px] animate-spin-reverse opacity-60"></div>
          
          {/* Central Upload Zone */}
          <div 
            onClick={handleClick}
            className="relative z-20 group cursor-pointer"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-spin-slow"></div>
            <div className="relative flex flex-col items-center justify-center size-80 md:size-96 rounded-full glass overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(91,19,236,0.25)]">
              <div className="absolute inset-0 iris-gradient animate-spin-slow opacity-30"></div>
              <div className="relative z-10 flex flex-col items-center gap-5 p-8 text-center w-full max-w-[240px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
                  <div className="relative size-20 rounded-2xl bg-primary/10 border border-white/50 dark:border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:-translate-y-1 text-primary">
                    <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform duration-300">add_a_photo</span>
                  </div>
                </div>
                <div className="space-y-1.5 transition-transform duration-300 group-hover:translate-y-1">
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">Drop Scan Here</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide">Or click to browse files</p>
                </div>
                <div className="flex gap-2 justify-center pt-2">
                  {['DICOM', 'PNG', 'JPG'].map(ext => (
                    <span key={ext} className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700">{ext}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>

        {/* Headline Section */}
        <div className="relative mt-12 md:mt-16 flex flex-col items-center text-center space-y-4 z-30 max-w-2xl">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-primary to-slate-800 dark:from-white dark:via-primary-light dark:to-white drop-shadow-sm">
              Vision Intelligence.
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg font-light tracking-wide max-w-lg leading-relaxed">
              Next-generation diabetic retinopathy screening powered by deep learning algorithms.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2 justify-center">
            <div className="glass px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm transition-transform hover:scale-105 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Neural Engine V.4.0</span>
            </div>
            <div className="glass px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm transition-transform hover:scale-105 cursor-default">
              <span className="material-symbols-outlined text-green-500 text-sm">shield_lock</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">End-to-End Encryption</span>
            </div>
          </div>
        </div>

        {/* Technical Specifications - Bento Grid */}
        <section className="w-full max-w-7xl mx-auto mt-32 mb-20 px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Neural Engine Specifications</h2>
            <p className="text-slate-500 font-medium text-sm mt-1 tracking-wide uppercase">Powered by EfficientNetV2-B2 Architecture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: The Accuracy (The Hero) - Spans 2 columns on large screens */}
            <div className="lg:col-span-2 glass rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 group hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
              <div className="relative size-44 shrink-0">
                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="accGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff6b6b" />
                      <stop offset="100%" stopColor="#5b13ec" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-white/5" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="url(#accGradient)" strokeWidth="8" strokeDasharray="283" 
                          strokeDashoffset={283 - (283 * 96.24 / 100)} 
                          className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">96.24%</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Accuracy</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest">
                  Validation Benchmark
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Exceptional Precision</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md">
                  Validated against 585 unseen clinical samples with an AUC-ROC of 0.98, ensuring highly reliable early detection for diabetic retinopathy.
                </p>
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">0.978</span>
                    <span className="text-[10px] uppercase text-slate-400 font-bold">F1 Score</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">94.1%</span>
                    <span className="text-[10px] uppercase text-slate-400 font-bold">Sensitivity</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Architecture */}
            <div className="glass rounded-[2rem] p-8 space-y-6 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-3xl">hub</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">EfficientNetV2-B2</h3>
                  <span className="px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase">Badge</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Advanced Convolutional Neural Network (CNN) architecture optimized for medical imaging with 9.2M parameters.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Technique</span>
                <p className="text-sm font-bold mt-1 text-primary">Transfer Learning Model</p>
              </div>
            </div>

            {/* Card 3: Dataset */}
            <div className="glass rounded-[2rem] p-8 space-y-6 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
              <div className="size-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-3xl">database</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">APTOS 2019</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Trained on 3,662 ultra-high resolution fundus photographs from Aravind Eye Hospital databases.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Balanced Split</span>
                  <span className="text-[10px] font-bold text-primary">50/50 Ratio</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Card 4: Preprocessing (The Secret Sauce) - Spans 2 columns */}
            <div className="lg:col-span-2 glass rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 group hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
              <div className="size-32 shrink-0 rounded-[2.5rem] bg-gradient-to-br from-primary to-secondary p-1">
                <div className="size-full rounded-[2.3rem] bg-white dark:bg-slate-900 flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-primary animate-pulse">flare</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                  Preprocessing Pipeline
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Ben Graham Processing</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Custom OpenCV pipeline utilizing Gaussian Blur subtraction for "Vein Enhancement" and auto-cropping to isolate the optic disc from background noise.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Normalization', 'Gaussian Filter', 'Auto-Crop', 'Noise Reduction'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Buttons */}
        <div className="fixed bottom-12 right-12 z-40 flex flex-col gap-3">
          <button 
            onClick={() => onDemo('Positive')}
            className="relative overflow-hidden flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 pl-5 pr-6 py-4 rounded-full shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span className="material-symbols-outlined text-2xl text-secondary">warning</span>
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm leading-tight">Run Demo (Positive)</span>
              <span className="text-[10px] opacity-70 font-mono leading-tight">ABNORMAL SCAN</span>
            </div>
          </button>
          <button 
            onClick={() => onDemo('Negative')}
            className="relative overflow-hidden flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 pl-5 pr-6 py-4 rounded-full shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span className="material-symbols-outlined text-2xl text-green-500">check_circle</span>
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm leading-tight">Run Demo (Negative)</span>
              <span className="text-[10px] opacity-70 font-mono leading-tight">HEALTHY SCAN</span>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LandingView;
