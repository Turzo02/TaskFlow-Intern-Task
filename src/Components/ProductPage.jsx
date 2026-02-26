import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Package,
  Activity,
  Fingerprint,
  ShoppingBag,
  Globe,
  BarChart3,
  Shield,
  ShieldAlertIcon,
} from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://task-api-eight-flax.vercel.app/api/products/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Registry Error")))
      .then(setProduct)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingState />;
  if (error || !product)
    return <ErrorState onBack={() => navigate("/dashboard/products")} />;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 animate-in fade-in zoom-in-95 duration-700">
      {/* Navigation Header */}
      <header className="flex justify-between items-center mb-12 border-b border-surface-base pb-6">
        <button
          onClick={() => navigate("/dashboard/products")}
          className="group flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em]  text-primary-dark transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full border  flex items-center justify-center border-primary-dark">
            <ArrowLeft
              size={14}
            />
          </div>
          Exit Product View
        </button>
        <div className="flex items-center gap-3 text-primary-accent  font-display font-black text-xs tracking-[0.2em]">
          <ShieldAlertIcon size={14} /> ENCRYPTED_DATA // PID-00{product.id}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Identity Card (Primary Focus) */}
        <div className="lg:col-span-5 bg-action-gradient rounded-panel py-12 px-8 text-white relative overflow-hidden shadow-2xl min-h-130 flex flex-col justify-between border border-white/5">

          <div className="relative z-10 space-y-8">
            <div className="w-20 h-20 bg-white/10 rounded-control flex items-center justify-center shadow-inner border border-white/20">
              <ShoppingBag size={36} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-primary-soft/40 font-black uppercase tracking-[0.4em] text-[10px] mb-3">
                Core Asset
              </p>
              <h1 className="text-5xl md:text-6xl font-display font-black tracking-tighter leading-none ">
                {product.name}
              </h1>
            </div>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/10 flex items-center gap-6">
            <div className="p-3 bg-white/5 rounded-inner border border-white/10">
              <Fingerprint size={28} className="text-primary-soft/60" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary-soft/30">
                System Hash
              </p>
              <p className="font-display font-bold tracking-tight text-xl opacity-80">
                VERIFIED_LOG_0{product.id}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Grid (All Gradient Themed) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2 px-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-600">
              <Activity size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Live Metadata
              </span>
            </div>
            <span className="h-px grow mx-6 bg-surface-base" />
          </div>

          <SpecCard
            icon={BarChart3}
            label="Valuation"
            value={`$${product.price.toLocaleString()}`}
            detail="Current list price"
          />
          <SpecCard
            icon={Globe}
            label="Distribution"
            value={product.sales.toLocaleString()}
            detail="Global units sold"
          />

          {/* Classification Banner - Full Width Gradient */}
          <div className="sm:col-span-2 group bg-action-gradient p-10 rounded-panel text-white relative overflow-hidden border border-white/5 shadow-xl transition-all hover:shadow-primary-dark/20">
            <div className="relative z-10 flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-soft/40 mb-2">
                  Category Assignment
                </p>
                <p className="text-5xl font-display font-black  uppercase tracking-tighter text-white">
                  {product.category}
                </p>
                <p className="text-[10px] text-primary-soft/30 font-medium mt-6 leading-relaxed max-w-sm ">
                  Registry entry secured under Protocol-X. Re-classification
                  requires high-level clearance.
                </p>
              </div>
              <Package
                size={300}
                className="absolute -right-20 -top-10 opacity-5 rotate-12 scale-90 group-hover:rotate-0 pointer-events-none group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Unified Gradient Sub-components --- */

const SpecCard = ({ icon: Icon, label, value, detail }) => (
  <div className="bg-action-gradient p-10 rounded-panel text-white border border-white/5 relative group overflow-hidden shadow-lg transition-all hover:shadow-2xl">
    <Icon
      size={100}
      className="absolute -right-6 -bottom-6 rotate-12 opacity-5 scale-0 group-hover:opacity-10 transition-all duration-500 ease-in-out transform group-hover:scale-110 group-hover:-translate-x-12 group-hover:-translate-y-12 group-hover:rotate-0"
    />

    <div className="relative z-10">
      <div className="w-12 h-12 rounded-control bg-white/10 border border-white/10 flex items-center justify-center mb-10 transition-all">
        <Icon size={20} />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-soft/40 mb-1">
        {label}
      </p>
      <p className="text-4xl font-display font-black  tracking-tighter mb-2">
        {value}
      </p>
      <p className="text-[10px] text-primary-soft/30 font-bold uppercase tracking-widest">
        {detail}
      </p>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 animate-pulse">
    <div className="w-20 h-20 border-8 border-primary-soft/20 border-t-primary-accent rounded-full animate-spin" />
    <p className="font-display font-black text-2xl tracking-tighter  text-gray-400 uppercase">
      Accessing Files...
    </p>
  </div>
);

const ErrorState = ({ onBack }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-12">
    <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-panel flex items-center justify-center mb-8 border border-red-500/20">
      <Package size={48} />
    </div>
    <h2 className="text-5xl font-display font-black tracking-tighter mb-4 ">
      Registry Error.
    </h2>
    <button
      onClick={onBack}
      className="bg-action-gradient text-white px-10 py-4 rounded-control font-black text-[10px] uppercase tracking-widest shadow-xl border border-white/10"
    >
      Return to Directory
    </button>
  </div>
);

export default ProductPage;
