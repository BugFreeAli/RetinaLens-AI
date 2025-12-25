
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onNavigateHome?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab = 'Analysis', onNavigateHome }) => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 mesh-grid opacity-50"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      <header className="sticky top-0 z-50 px-4 py-4 md:px-10">
        <div className="mx-auto max-w-7xl glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateHome}>
            <div className="relative flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-2xl">visibility</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight leading-none">RetinaLens AI</h2>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Medical Imaging</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Dashboard', 'Patients', 'Analysis', 'Settings'].map((item) => (
              <a
                key={item}
                href="#"
                className={`text-sm font-semibold transition-colors ${
                  activeTab === item ? 'text-primary bg-primary/5 px-4 py-2 rounded-full' : 'text-slate-500 hover:text-primary'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-50 transition duration-500 blur"></div>
              <div 
                className="relative size-10 rounded-full bg-cover bg-center border-2 border-white dark:border-gray-800 shadow-sm"
                style={{ backgroundImage: 'url("https://picsum.photos/seed/doctor/100/100")' }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex-grow z-10">
        {children}
      </main>

      <footer className="relative py-8 px-6 flex flex-col items-center gap-4 text-slate-400 text-xs">
        <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-[14px] text-primary">auto_awesome</span>
          <p className="font-bold tracking-[0.2em] uppercase">Powered by NeuralOptic Core</p>
        </div>
        <p>RetinaLens AI v4.2.0 • FDA Cleared • &copy; 2024</p>
      </footer>
    </div>
  );
};

export default Layout;
