import React, { useState, useEffect, useMemo } from "react";
import {
  TrendingUp,
  Eye,
  MousePointer,
  Target,
  AlertCircle,
  BarChart3,
} from "lucide-react";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/analytics")
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Analytics stream severed"),
      )
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const totals = useMemo(() => {
    const sum = (k) => data.reduce((a, c) => a + c[k], 0);
    const v = sum("views"),
      c = sum("clicks"),
      cv = sum("conversions");
    return { v, c, cv, r: c > 0 ? ((cv / c) * 100).toFixed(1) : 0 };
  }, [data]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;

  const metrics = [
    { label: "Total Views", val: totals.v.toLocaleString(), icon: Eye },
    {
      label: "Total Clicks",
      val: totals.c.toLocaleString(),
      icon: MousePointer,
    },
    { label: "Conversions", val: totals.cv.toLocaleString(), icon: Target },
    { label: "Conv. Rate", val: `${totals.r}%`, icon: TrendingUp },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-display font-black  text-primary-accent tracking-tighter ">
            Analytics<span className="text-primary-accent opacity-50"> .</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2 flex items-center gap-2">
            <BarChart3 size={12} className="text-primary-accent" /> Conversion
            Performance Audit
          </p>
        </div>
      </header>

      {/* Action Gradient Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="bg-action-gradient rounded-panel p-8 text-white relative overflow-hidden group shadow-2xl shadow-primary-dark/10 transition-transform cursor-pointer"
          >
            <m.icon
              size={80}
              className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-all group-hover:-rotate-10 group-hover:scale-110 duration-500 ease-in-out group-hover:-translate-x-16 group-hover:-translate-y-16"
            />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-control flex items-center justify-center mb-6 border border-white/10 transition-all duration-500 ease-in-out">
                <m.icon size={20} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-soft/50 mb-1">
                {m.label}
              </p>
              <p className="text-4xl font-display font-black tracking-tighter ">
                {m.val}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Technical Data Sheet */}
      <div className="panel-card overflow-hidden border-none bg-white shadow-2xl shadow-primary-dark/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-base">
                {[
                  "Reporting Date",
                  "Views",
                  "Clicks",
                  "Conversions",
                  "Ratio",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-10 py-6 text-[10px] font-black uppercase tracking-wider text-primary-dark"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-base">
              {data.map((item) => (
                <AnalyticsRow key={item.date} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* --- Refined Sub-components --- */

const AnalyticsRow = ({ item }) => {
  const rate = item.clicks > 0 ? (item.conversions / item.clicks) * 100 : 0;
  const status =
    rate >= 5
      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
      : rate >= 3
        ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
        : "bg-red-500/10 text-red-600 border-red-500/20";

  return (
    <tr className="group hover:bg-primary-soft/30 transition-colors">
      <td className="px-10 py-6 text-lg font-black text-primary-dark font-display">
        {new Date(item.date).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>
      <td className="px-10 py-6 text-sm font-bold text-gray-400">
        {item.views.toLocaleString()}
      </td>
      <td className="px-10 py-6 text-sm font-bold text-gray-400">
        {item.clicks.toLocaleString()}
      </td>
      <td className="px-10 py-6 text-sm font-bold text-gray-400">
        {item.conversions.toLocaleString()}
      </td>
      <td className="px-10 py-6">
        <span
          className={`px-4 py-2 rounded-md text-sm font-black  text-primary-dark tracking-widest uppercase border ${status}`}
        >
          {rate.toFixed(1)}%
        </span>
      </td>
    </tr>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-12 animate-pulse">
    <div className="h-16 bg-gray-200 rounded-control w-1/4" />
    <div className="grid grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-40 bg-white rounded-panel" />
      ))}
    </div>
    <div className="h-64 bg-white rounded-panel shadow-sm" />
  </div>
);

const ErrorState = ({ message }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-center">
    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-panel flex items-center justify-center mb-6">
      <AlertCircle size={40} />
    </div>
    <h2 className="text-3xl font-display font-black tracking-tight mb-2">
      Registry Fault
    </h2>
    <p className="text-gray-400 font-medium max-w-sm">{message}</p>
  </div>
);

export default Analytics;
