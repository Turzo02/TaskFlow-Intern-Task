import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Eye, MousePointer, Target, AlertCircle } from 'lucide-react';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://task-api-eight-flax.vercel.app/api/analytics')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Memoized totals to prevent recalculation on every render
  const totals = useMemo(() => {
    const sum = (key) => data.reduce((acc, curr) => acc + curr[key], 0);
    const views = sum('views');
    const clicks = sum('clicks');
    const conv = sum('conversions');
    return {
      views, clicks, conv,
      rate: clicks > 0 ? ((conv / clicks) * 100).toFixed(1) : 0
    };
  }, [data]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;

  const metrics = [
    { label: "Total Views", val: totals.views.toLocaleString(), icon: Eye, color: "bg-blue-50 text-blue-600" },
    { label: "Total Clicks", val: totals.clicks.toLocaleString(), icon: MousePointer, color: "bg-emerald-50 text-emerald-600" },
    { label: "Conversions", val: totals.conv.toLocaleString(), icon: Target, color: "bg-purple-50 text-purple-600" },
    { label: "Conversion Rate", val: `${totals.rate}%`, icon: TrendingUp, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-5xl font-display font-black tracking-tighter">
          Analytics<span className="text-primary-accent">.</span>
        </h1>
        <p className="text-gray-400 font-medium mt-1">Conversion tracking and traffic performance</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((m, i) => <MetricCard key={i} {...m} />)}
      </div>

      <div className="panel-card overflow-hidden border-none shadow-2xl shadow-primary-dark/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-base">
                {["Reporting Date", "Views", "Clicks", "Conversions", "Ratio"].map((h) => (
                  <th key={h} className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-base">
              {data.map((item) => <AnalyticsRow key={item.date} item={item} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* --- Refined Sub-components --- */

const MetricCard = ({ label, val, icon: Icon, color }) => (
  <div className="panel-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-default group">
    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${color} group-hover:rotate-12 transition-transform`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-3xl font-display font-black text-content-main tracking-tighter">{val}</p>
    </div>
  </div>
);

const AnalyticsRow = ({ item }) => {
  const rate = item.clicks > 0 ? (item.conversions / item.clicks) * 100 : 0;
  const statusColor = rate >= 5 ? "text-emerald-600 bg-emerald-50" : rate >= 3 ? "text-amber-600 bg-amber-50" : "text-red-600 bg-red-50";

  return (
    <tr className="hover:bg-primary-soft/30 transition-colors group">
      <td className="px-8 py-5 text-sm font-bold text-content-main">
        {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
      </td>
      <td className="px-8 py-5 text-sm font-medium text-gray-500">{item.views.toLocaleString()}</td>
      <td className="px-8 py-5 text-sm font-medium text-gray-500">{item.clicks.toLocaleString()}</td>
      <td className="px-8 py-5 text-sm font-medium text-gray-500">{item.conversions.toLocaleString()}</td>
      <td className="px-8 py-5">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${statusColor}`}>
          {rate.toFixed(1)}%
        </span>
      </td>
    </tr>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-12 bg-gray-200 rounded-control w-64" />
    <div className="grid grid-cols-4 gap-6"><div className="h-32 bg-white rounded-panel col-span-4" /></div>
    <div className="panel-card h-64 bg-white/50" />
  </div>
);

const ErrorState = ({ message }) => (
  <div className="panel-card p-12 text-center max-w-lg mx-auto border-red-100">
    <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
    <h2 className="text-xl font-display font-bold">Data Stream Interrupted</h2>
    <p className="text-sm text-gray-400 mt-2">{message}</p>
  </div>
);

export default Analytics;