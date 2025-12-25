
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { HEALTHY_RETINA_IMAGE } from '../constants';

const ScanningView: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Neural Engine...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        const inc = Math.random() * 5;
        if (prev > 20) setStatus('Normalizing Pixel Density...');
        if (prev > 45) setStatus('Tracing Vascular Networks...');
        if (prev > 70) setStatus('Verifying Macular Health...');
        if (prev > 90) setStatus('Finalizing Report...');
        return prev + inc;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout activeTab="Analysis">
      <div className="flex flex-col items-center justify-center pt-20 px-4 w-full h-full min-h-[70vh]">
        {/* Floating status dots */}
        <div className="absolute w-full h-full max-w-[800px] pointer-events-none hidden md:block">
           <div className="absolute top-10 left-0 animate-bounce" style={{ animationDuration: '3s' }}>
             <div className="flex h-10 items-center gap-x-3 rounded-full glass pl-3 pr-5 border-primary/10">
               <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
               <div className="flex flex-col leading-none">
                 <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Macula</span>
                 <span className="text-sm font-bold">Verified</span>
               </div>
             </div>
           </div>
           <div className="absolute bottom-20 right-0 animate-bounce" style={{ animationDuration: '4s' }}>
             <div className="flex h-10 items-center gap-x-3 rounded-full glass pl-3 pr-5 border-primary/10">
               <span className="material-symbols-outlined text-secondary text-[20px]">ssid_chart</span>
               <div className="flex flex-col leading-none">
                 <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Vessels</span>
                 <span className="text-sm font-bold">Tracing...</span>
               </div>
             </div>
           </div>
        </div>

        {/* The Lens */}
        <div className="relative group my-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-lg animate-pulse"></div>
          <div className="absolute -inset-[2px] rounded-full border border-dashed border-primary/30 w-[calc(100%+4px)] h-[calc(100%+4px)] animate-[spin_10s_linear_infinite]"></div>
          
          <div className="relative size-64 md:size-80 lg:size-96 rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl bg-black">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-80 scale-110" 
              style={{ backgroundImage: `url("${HEALTHY_RETINA_IMAGE}")` }}
            ></div>
            <div className="absolute inset-0 radar-sweep animate-spin-slow mix-blend-screen"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50">
              <span className="material-symbols-outlined text-4xl font-thin">add</span>
            </div>
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#120d1b] text-white px-4 py-1 rounded-full text-xs font-mono tracking-widest shadow-lg z-20">
            ID: 48291-OD
          </div>
        </div>

        {/* Progress Card */}
        <div className="flex flex-col items-center gap-6 mt-12 w-full max-w-md z-20">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Analysis in Progress</h1>
            <p className="text-gray-500 text-sm font-medium">Neural Engine V.4.2 Running • AI Screening</p>
          </div>
          
          <div className="w-full glass p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-end mb-3">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">Current Task</span>
                <span className="text-primary font-semibold text-sm flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  {status}
                </span>
              </div>
              <span className="text-2xl font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-3 text-xs text-gray-400">
              <span>Est. time remaining: {Math.max(0, Math.ceil((100 - progress) / 10))}s</span>
              <span>Batch: 1/1</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScanningView;
