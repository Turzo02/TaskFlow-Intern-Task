import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { Package, DollarSign, ShoppingCart, Tag, AlertCircle, ChevronRight, Activity } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/products")
      .then((res) => res.ok ? res.json() : Promise.reject("Inventory link severed"))
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    return products.reduce((acc, p) => ({
      sales: acc.sales + p.sales,
      revenue: acc.revenue + (p.price * p.sales),
      totalPrice: acc.totalPrice + p.price,
      count: acc.count + 1
    }), { sales: 0, revenue: 0, totalPrice: 0, count: 0 });
  }, [products]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;

  const summary = [
    { label: "Total Assets", val: stats.count, icon: Package },
    { label: "Gross Units Sold", val: stats.sales.toLocaleString(), icon: ShoppingCart },
    { label: "Total Revenue", val: `$${stats.revenue.toLocaleString()}`, icon: DollarSign },
    { label: "Avg Unit Value", val: `$${(stats.totalPrice / (stats.count || 1)).toFixed(2)}`, icon: Tag },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <header>
        <h1 className="text-6xl font-display font-black tracking-tighter text-primary-accent">
          Inventory<span className="text-primary-accent opacity-50">.</span>
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2 flex items-center gap-2">
          <Activity size={12} className="text-primary-accent" /> Global Stock Performance
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summary.map((s, i) => (
          <div key={i} className="bg-action-gradient rounded-panel p-10 text-white flex items-center justify-between group relative overflow-hidden shadow-2xl shadow-primary-dark/10 transition-transform cursor-pointer">
            <s.icon size={120} className="absolute -right-4 rotate-45 opacity-5 scale-0 group-hover:opacity-10 transition-all group-hover:scale-[1] duration-500 ease-in-out group-hover:-translate-x-32 group-hover:rotate-0" />
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-soft/50 mb-1">{s.label}</p>
              <p className="text-4xl font-display font-black tracking-tighter leading-none">{s.val}</p>
            </div>
            <div className="relative z-10 p-4 bg-white rounded-control border border-white/10  text-primary-dark transition-all duration-400 ease-in-out">
              <s.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="panel-card overflow-hidden border-none bg-white shadow-2xl shadow-primary-dark/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-base">
                {["Product Identity", "Classification", "Unit Price", "Volume", "Total Value", ""].map((h) => (
                  <th key={h} className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-primary-dark">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-base">
              {products.map((p) => <ProductRow key={p.id} p={p} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProductRow = ({ p }) => (
  <tr className="group hover:bg-primary-soft/30 transition-colors">
    <td className="px-6 py-6 font-display font-bold text-lg text-primary-dark">
      <Link to={`/dashboard/products/${p.id}`} className="hover:text-primary-accent transition-colors">{p.name}</Link>
    </td>
    <td className="px-6 py-6 text-center">
      <span className={`px-4 py-3 rounded-md text-[10px] font-black uppercase tracking-widest border ${
        p.category === "subscription" ? "bg-action-gradient text-white border-primary" : "bg-green-500/10 text-primary-dark border-emerald-900/30"
      }`}>
        {p.category}
      </span>
    </td>
    <td className="px-6 py-6 text-sm font-bold text-gray-400">${p.price.toFixed(2)}</td>
    <td className="px-6 py-6 text-sm font-bold text-gray-400 text-center">{p.sales.toLocaleString()}</td>
    <td className="px-6 py-6 text-sm font-black text-primary-dark font-display text-center">${(p.price * p.sales).toLocaleString()}</td>
    <td className="px-6 py-6 text-right">
      <ChevronRight size={20} className="inline text-gray-300 group-hover:text-primary-dark group-hover:translate-x-1 transition-all" />
    </td>
  </tr>
);

const LoadingSkeleton = () => (
  <div className="space-y-12 animate-pulse">
    <div className="h-16 bg-gray-200 rounded-control w-1/4" />
    <div className="grid grid-cols-2 gap-6">
      {[...Array(2)].map((_, i) => <div key={i} className="h-40 bg-white rounded-panel" />)}
    </div>
    <div className="h-96 bg-white rounded-panel shadow-sm" />
  </div>
);

const ErrorState = ({ message }) => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
    <AlertCircle className="text-red-500 mb-6 shadow-xl shadow-red-500/20" size={64} />
    <h2 className="text-4xl font-display font-black tracking-tight mb-2">Registry Fault</h2>
    <p className="text-gray-400 font-medium">{message}</p>
  </div>
);

export default Products;