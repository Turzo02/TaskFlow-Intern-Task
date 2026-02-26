import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { User as UserIcon, Mail, Calendar, ArrowLeft, ShieldCheck, AlertCircle, Fingerprint } from 'lucide-react';

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://task-api-eight-flax.vercel.app/api/users/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject('Personnel record severed'))
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSkeleton />;
  if (error || !user) return <ErrorState onBack={() => navigate('/dashboard/users')} />;

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in zoom-in duration-700">
      <button 
        onClick={() => navigate('/dashboard/users')}
        className="group flex items-center gap-3  text-primary-dark transition-all font-black uppercase text-[10px] tracking-[0.3em] cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full border flex items-center justify-center border-primary-dark transition-colors">
          <ArrowLeft size={14} />
        </div>
        Return to Directory
      </button>

      <div className="panel-card overflow-hidden border-none shadow-2xl shadow-primary-dark/10 bg-white">
        {/* Profile Header */}
        <div className="bg-action-gradient p-12 md:p-16 text-white relative overflow-hidden">
          <UserIcon size={240} className="absolute -right-20 -bottom-20 opacity-10 rotate-12" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-panel flex items-center justify-center shadow-2xl border border-white/20">
              <UserIcon size={56} strokeWidth={1.5} />
            </div>
            
            <div className="text-center md:text-left space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Fingerprint size={14} className="text-primary-soft opacity-60" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-soft/60">System ID: {user.id}</p>
              </div>
              <h1 className="text-6xl md:text-7xl font-display font-black tracking-tight leading-none italic hover:translate-x-2 transition-transform duration-500">
                {user.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Technical Data Breakdown */}
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DataBlock 
            icon={Mail} 
            label="Digital Address" 
            value={user.email} 
          />
          <DataBlock 
            icon={Calendar} 
            label="Enrollment Date" 
            value={new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} 
          />
          
          {/* Access Status - Full Width Gradient Card */}
          <div className="md:col-span-2">
             <div className="flex items-center justify-between p-10 rounded-panel bg-action-gradient text-white border border-white/5 relative overflow-hidden group">
                <div className="flex items-center gap-8 relative z-10">
                  <div className="p-5 rounded-control bg-white/10 backdrop-blur-md text-white border border-white/10 group-hover:scale-[0.9] transition-transform">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-soft/50 mb-1">Access Status</p>
                    <p className="text-4xl font-display font-black tracking-tighter uppercase italic">
                      {user.status}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.6)]" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataBlock = ({ icon: Icon, label, value }) => (
  <div className="p-8 rounded-panel bg-action-gradient text-white border border-white/5 relative group overflow-hidden shadow-lg">
    {/* Subtle icon background for texture */}
    <Icon size={80} className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity" />
    
    <div className="relative z-10">
      <div className="w-10 h-10 rounded-control bg-white/10 flex items-center justify-center mb-6 border border-white/10">
        <Icon size={18} className="text-primary-soft" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-soft/40 mb-2">{label}</p>
      <p className="text-xl font-display font-bold tracking-tight truncate">{value}</p>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-10 p-10 animate-pulse">
    <div className="h-6 bg-gray-200 w-40 rounded-full" />
    <div className="h-125 bg-white rounded-panel shadow-sm" />
  </div>
);

const ErrorState = ({ onBack }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-center">
    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-panel flex items-center justify-center mb-6">
      <AlertCircle size={40} />
    </div>
    <h2 className="text-3xl font-display font-black tracking-tight mb-4">Record Link Severed</h2>
    <button onClick={onBack} className="bg-primary-dark text-white px-8 py-3 rounded-control text-[10px] font-black uppercase tracking-widest hover:bg-primary-accent transition-colors">
      Return to Directory
    </button>
  </div>
);

export default UserPage;