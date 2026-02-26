import React from 'react';
import { useNavigate } from 'react-router';
import { Home, ArrowLeft, Search, LayoutDashboard } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const hasToken = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-base">
      <div className="max-w-xl w-full animate-in fade-in zoom-in duration-500">
        
        {/* Main Card with Green Gradient */}
        <div className="bg-action-gradient rounded-panel p-12 text-white shadow-2xl shadow-primary-dark/20 text-center relative overflow-hidden">
          
          {/* Decorative Background Icon */}
          <Search size={200} className="absolute -top-10 -right-10 opacity-10 rotate-12" />

          <div className="relative z-10">
            {/* Icon Header */}
            <div className="glass-effect w-20 h-20 rounded-control flex items-center justify-center mx-auto mb-8">
              <Search size={40} className="text-white" />
            </div>

            {/* Content */}
            <h1 className="text-9xl font-display font-black tracking-tighter mb-2 opacity-90">
              404
            </h1>
            <h2 className="text-2xl font-display font-bold mb-4 uppercase tracking-widest">
              Lost in Space
            </h2>
            <p className="text-primary-soft/70 font-medium mb-10 max-w-xs mx-auto">
              The entry you are looking for has been moved or purged from the registry.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {hasToken ? (
            <button
                  onClick={() => navigate(-1)}
                  className="flex items-center justify-center gap-2 glass-effect text-primary-dark hover:text-white px-8 py-4 rounded-control font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/20 transition-all cursor-pointer"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </button>
              ) : (
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center justify-center gap-2 glass-effect text-primary-dark hover:text-white px-8 py-4 rounded-control font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/20 transition-all cursor-pointer"
                >
                  <ArrowLeft size={16} /> Go Back
                </button>
              )}
            </div>

            {/* Support Footer */}
            <p className="mt-12 text-[10px] font-bold uppercase tracking-widest opacity-40">
              Report connectivity issue? <span className="underline cursor-pointer ">Contact Support</span>
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NotFound;