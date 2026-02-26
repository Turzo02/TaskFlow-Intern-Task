import React, { useState, useEffect } from "react";
import { Users, CheckCircle, DollarSign, TrendingUp, AlertCircle } from "lucide-react";

const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/overview")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;

  const stats = [
    { label: "Total Users", val: data.totalUsers.toLocaleString(), icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Active Users", val: data.activeUsers.toLocaleString(), icon: CheckCircle, color: "bg-emerald-50 text-emerald-600" },
    { label: "Revenue", val: `$${data.revenue.toLocaleString()}`, icon: DollarSign, color: "bg-amber-50 text-amber-600" },
    { label: "Growth", val: `${data.growth}%`, icon: TrendingUp, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-5xl font-display font-black tracking-tighter">
          Overview<span className="text-primary-accent">.</span>
        </h1>
        <p className="text-gray-400 font-medium mt-1">Real-time system performance metrics</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  );
};

/* Sub-components for cleaner logic */
const StatCard = ({ label, val, icon: Icon, color }) => (
  <div className="panel-card p-8 flex items-center justify-between group hover:scale-[1.02] transition-all cursor-default">
    <div className="space-y-1">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</p>
      <p className="text-4xl font-display font-black text-content-main tracking-tight">{val}</p>
    </div>
    <div className={`p-4 rounded-control ${color} group-hover:rotate-6 transition-transform duration-300`}>
      <Icon size={28} />
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-12 bg-gray-200 rounded-control w-48" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-white rounded-panel border border-white" />
      ))}
    </div>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="panel-card p-12 text-center border-red-100 max-w-lg mx-auto">
    <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
    <h2 className="text-xl font-display font-bold text-red-900">Sync Failed</h2>
    <p className="text-sm text-red-600/60 mt-2 font-medium">{message}</p>
  </div>
);

export default Overview;