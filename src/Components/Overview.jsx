import React, { useState, useEffect } from "react";
import {
  Users,
  CheckCircle,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Activity,
} from "lucide-react";

const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/overview")
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Connection failed"),
      )
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;

  const stats = [
    {
      label: "Total Users",
      val: data.totalUsers.toLocaleString(),
      icon: Users,
    },
    {
      label: "Active Nodes",
      val: data.activeUsers.toLocaleString(),
      icon: CheckCircle,
    },
    {
      label: "Gross Revenue",
      val: `$${data.revenue.toLocaleString()}`,
      icon: DollarSign,
    },
    { label: "Market Growth", val: `${data.growth}%`, icon: TrendingUp },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-display font-black tracking-tighter">
            Overview<span className="text-primary-accent opacity-50">.</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2 flex items-center gap-2">
            <Activity size={12} className="text-primary-accent" /> Live System
            Telemetry
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  );
};

/* --- Refined Sub-components --- */

const StatCard = ({ label, val, icon: Icon }) => (
  <div className="bg-action-gradient rounded-panel p-10 text-white flex items-center justify-between group relative overflow-hidden shadow-2xl shadow-primary-dark/10 hover:scale-[1.01] transition-all duration-500 cursor-pointer">
    {/* Decorative background icon */}
    <Icon
      size={120}
      className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-all duration-500"
    />

    <div className="relative z-10 space-y-2">
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-soft/50 group-hover:text-white transition-colors">
        {label}
      </p>
      <p className="text-5xl font-display font-black tracking-tighter leading-none">
        {val}
      </p>
    </div>

    <div className="relative z-10 p-4 rounded-control shadow-inner bg-white text-primary-dark transition-all duration-500">
      <Icon size={32} strokeWidth={2.5} />
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="space-y-10 animate-pulse p-4">
    <div className="h-16 bg-gray-200 rounded-control w-64" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-44 bg-white rounded-panel border border-surface-base shadow-sm"
        />
      ))}
    </div>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="panel-card p-12 text-center max-w-md border-red-50 shadow-2xl shadow-red-500/5">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-panel flex items-center justify-center mx-auto mb-6 cursor-pointer">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-3xl font-display font-black tracking-tight mb-2">
        Sync Error
      </h2>
      <p className="text-sm text-gray-400 font-medium leading-relaxed">
        {message}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-8 px-8 py-3 bg-primary-dark text-white rounded-control text-[10px] font-black uppercase tracking-[0.2em]"
      >
        Re-establish Link
      </button>
    </div>
  </div>
);

export default Overview;
