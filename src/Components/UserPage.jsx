import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { User as UserIcon, Mail, Calendar, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://task-api-eight-flax.vercel.app/api/users/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Personnel record not found');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSkeleton />;
  
  if (error || !user) return (
    <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <AlertCircle size={48} className="text-red-500 mb-4" />
      <h2 className="text-2xl font-display font-black tracking-tight">{error || "User Missing"}</h2>
      <button onClick={() => navigate('/dashboard/users')} className="mt-6 flex items-center gap-2 text-primary-dark font-black uppercase text-xs tracking-widest hover:underline">
        <ArrowLeft size={16} /> Return to Directory
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Editorial Header */}
      <header className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/dashboard/users')}
          className="group flex items-center gap-2 text-gray-400 hover:text-primary-dark transition-colors font-black uppercase text-[10px] tracking-[0.2em]"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Directory
        </button>
      </header>

      <div className="panel-card overflow-hidden border-none shadow-2xl shadow-primary-dark/5">
        {/* Profile Identity Header */}
        <div className="bg-action-gradient p-10 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-panel flex items-center justify-center border border-white/20 shadow-inner">
            <UserIcon size={40} className="text-white" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-display font-black tracking-tighter leading-none mb-2">
              {user.name}
            </h1>
            <p className="text-primary-soft/60 font-black uppercase text-xs tracking-[0.3em]">
              ID Registry: #{user.id.toString().padStart(4, '0')}
            </p>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="p-8 md:p-12 bg-white space-y-4">
          <InfoRow 
            icon={Mail} 
            label="Digital Address" 
            value={user.email} 
            iconBg="bg-blue-50 text-blue-600" 
          />
          <InfoRow 
            icon={ShieldCheck} 
            label="Verification Status" 
            value={user.status} 
            isStatus 
            iconBg="bg-emerald-50 text-emerald-600" 
          />
          <InfoRow 
            icon={Calendar} 
            label="Date of Enrollment" 
            value={new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} 
            iconBg="bg-purple-50 text-purple-600" 
          />
        </div>
      </div>
    </div>
  );
};

/* --- Refined Sub-components --- */

const InfoRow = ({ icon: Icon, label, value, iconBg, isStatus }) => (
  <div className="flex items-center justify-between p-6 rounded-control bg-surface-base/50 border border-transparent hover:border-white hover:bg-white hover:shadow-xl hover:shadow-primary-dark/5 transition-all group">
    <div className="flex items-center gap-5">
      <div className={`p-3 rounded-inner ${iconBg} transition-transform group-hover:scale-110`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-0.5">{label}</p>
        {isStatus ? (
          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            value === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          }`}>
            {value}
          </span>
        ) : (
          <p className="text-lg font-display font-bold text-content-main">{value}</p>
        )}
      </div>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="max-w-3xl mx-auto space-y-8 animate-pulse">
    <div className="h-4 bg-gray-200 w-32 rounded" />
    <div className="panel-card h-[400px] bg-white/50" />
  </div>
);

export default UserPage;