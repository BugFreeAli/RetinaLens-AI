
import React from 'react';
import Layout from '../components/Layout';
import { AnalysisResult } from '../types';
import { DEMO_PATIENT } from '../constants';

interface ResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  const isPositive = result.diagnosis === 'Positive';

  return (
    <Layout activeTab="Analysis" onNavigateHome={onReset}>
      <div className="flex flex-col max-w-7xl mx-auto px-6 py-10 gap-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium">
          <a onClick={onReset} className="text-slate-400 hover:text-primary cursor-pointer">Patients</a>
          <span className="material-symbols-outlined text-slate-300 text-xs">chevron_right</span>
          <span className="text-slate-400">{DEMO_PATIENT.name}</span>
          <span className="material-symbols-outlined text-slate-300 text-xs">chevron_right</span>
          <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">Diagnosis Result</span>
        </nav>

        {/* Main Result Card */}
        <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/80 dark:border-white/10 overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Imagery Pane */}
            <div className="relative lg:w-1/2 bg-slate-900 overflow-hidden group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url("${result.imageUrl}")` }}
              ></div>
              
              {/* Heatmap overlay for positive result */}
              {isPositive && (
                <div className="absolute inset-0 opacity-60 mix-blend-overlay animate-pulse" 
                     style={{ background: 'radial-gradient(circle at 40% 40%, rgba(255, 0, 0, 0.5) 0%, rgba(255, 100, 0, 0.3) 40%, transparent 70%)' }}>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              
              <div className="absolute top-6 left-6 right-6 flex justify-between">
                <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white/90 text-xs font-mono">
                  SCAN ID: #R-{DEMO_PATIENT.id}
                </div>
                <div className="size-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <span className="material-symbols-outlined text-white text-sm">open_in_full</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-50"></span>
                  </span>
                  <span className="text-white/90 text-xs font-bold tracking-widest uppercase">Analysis Complete</span>
                </div>
                {isPositive && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Detection Zones Highlighted
                  </div>
                )}
                <p className="text-white/70 text-sm max-w-[80%]">Retinal fundus scan analyzed via NeuralOptic V4.2 Core.</p>
              </div>
            </div>

            {/* Right Results Pane */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col gap-10">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b dark:border-white/10 pb-8">
                <div>
                  <h2 className="text-2xl font-display font-bold mb-1">Diagnosis Result</h2>
                  <p className="text-slate-500 text-sm">Generated on {DEMO_PATIENT.scanDate}</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3 px-5 border dark:border-white/10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Patient</span>
                    <span className="text-sm font-bold">{DEMO_PATIENT.name}</span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Patient ID</span>
                    <span className="text-sm font-bold">#{DEMO_PATIENT.id}</span>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className={`rounded-2xl p-6 flex items-start gap-4 shadow-sm border ${
                isPositive ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30' : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30'
              }`}>
                <div className={`rounded-full p-2 shrink-0 ${
                  isPositive ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                }`}>
                  <span className="material-symbols-outlined">{isPositive ? 'warning' : 'verified_user'}</span>
                </div>
                <div>
                  <h3 className={`font-bold text-lg leading-tight mb-1 ${isPositive ? 'text-red-900 dark:text-red-100' : 'text-emerald-900 dark:text-emerald-100'}`}>
                    {result.recommendation}
                  </h3>
                  <p className={`text-sm font-medium ${isPositive ? 'text-red-800/80 dark:text-red-200/80' : 'text-emerald-800/80 dark:text-emerald-200/80'}`}>
                    {result.conditionName}
                  </p>
                </div>
              </div>

              {/* Confidence & Summary */}
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="relative size-36 shrink-0">
                  <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-white/5" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="283" 
                            strokeDashoffset={283 - (283 * result.confidence / 100)} 
                            className={`${isPositive ? 'text-secondary' : 'text-primary'} transition-all duration-1000 ease-out`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{result.confidence}%</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Confidence</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold">AI Analysis Summary</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {result.summary}
                  </p>
                </div>
              </div>

              {/* Findings */}
              <div className="flex-grow">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Specific Findings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                  {result.findings.map((f, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-white/5">
                      <span className="text-slate-600 dark:text-slate-400 text-sm font-medium flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${isPositive ? 'bg-secondary' : 'bg-primary'}`}></span>
                        {f.label}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        f.isHighRisk ? 'bg-red-50 dark:bg-red-900/30 text-red-600' : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400'
                      }`}>
                        {f.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto pt-8 border-t dark:border-white/10 flex flex-wrap gap-4 justify-between items-center">
                <button 
                  onClick={onReset}
                  className="px-6 py-3 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">restart_alt</span>
                  New Analysis
                </button>
                <div className="flex gap-4">
                  <button className="px-6 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 font-bold text-sm shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">print</span>
                    Print
                  </button>
                  <button className={`px-8 py-3 rounded-full text-white font-bold text-sm shadow-xl transition-all flex items-center gap-2 ${
                    isPositive ? 'bg-secondary hover:bg-red-500 shadow-secondary/30' : 'bg-primary hover:bg-indigo-700 shadow-primary/30'
                  }`}>
                    <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                    Export Full Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-400">
           <p>Next Exam Recommended: <span className="font-bold text-slate-600 dark:text-slate-300">{result.nextExam}</span></p>
           <div className="flex gap-6">
             <a href="#" className="hover:text-primary">Medical Compliance</a>
             <a href="#" className="hover:text-primary">Data Protection</a>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResultView;
