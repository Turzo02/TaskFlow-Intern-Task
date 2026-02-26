import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Box,
  Tag,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  ArrowLeft,
  ArrowUpRight,
  LayoutDashboard,
  MoreVertical,
  Activity
} from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://task-api-eight-flax.vercel.app/api/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (error || !product) return <ErrorScreen error={error} navigate={navigate} />;

  const revenue = product.price * product.sales;

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <LayoutDashboard size={14} />
              <span>Dashboard</span>
              <span className="text-gray-300">/</span>
              <span className="text-brand-forest">Overview</span>
            </div>
            <h1 className="text-4xl font-display font-extrabold text-text-main">Analytics</h1>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => navigate("/dashboard/products")}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-inner font-bold text-sm hover:bg-gray-50 transition-all shadow-sm"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button className="flex-1 md:flex-none px-6 py-3 bg-brand-forest text-white rounded-inner font-bold text-sm shadow-lg shadow-brand-forest/20 hover:bg-brand-emerald transition-all">
              Export Report
            </button>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Info Box */}
          <div className="bento-card md:col-span-12 lg:col-span-8 p-8 md:p-10 flex flex-col md:flex-row gap-10">
            <div className="w-28 h-28 md:w-36 md:h-36 bg-brand-mint rounded-[28px] flex items-center justify-center flex-shrink-0">
              <Box size={56} className="text-brand-forest" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-emerald-50 text-brand-forest text-[10px] font-black rounded-lg uppercase tracking-wider mb-4 inline-block">
                  Ref: {product.id}
                </span>
                <MoreVertical className="text-gray-300 cursor-pointer" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black leading-tight mb-4 tracking-tight">
                {product.name}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-400">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                  <Tag size={16} /> {product.category}
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                  <Activity size={16} className="text-emerald-500" /> Live Status
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Card (Emerald Gradient) */}
          <div className="md:col-span-6 lg:col-span-4 bg-donezo-gradient rounded-donezo p-10 text-white shadow-xl shadow-brand-forest/20 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <TrendingUp size={24} />
                </div>
                <ArrowUpRight size={24} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <p className="text-emerald-100/60 font-bold text-xs uppercase tracking-widest mb-1">Gross Revenue</p>
              <h3 className="text-5xl font-display font-black tracking-tighter">
                ${revenue.toLocaleString()}
              </h3>
            </div>
            <div className="mt-8 bg-white/10 py-2 px-4 rounded-xl border border-white/10 inline-block text-xs font-bold w-fit relative z-10">
              +14.2% Growth
            </div>
          </div>

          {/* Pricing Stats */}
          <div className="bento-card md:col-span-6 lg:col-span-4 p-8 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <DollarSign size={24} />
              </div>
              <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Pricing</span>
            </div>
            <div>
              <p className="text-4xl font-display font-black text-text-main tracking-tighter">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-xs font-bold text-gray-400 mt-2">Global MSRP Standard</p>
            </div>
          </div>

          {/* Sales Volume Stats */}
          <div className="bento-card md:col-span-6 lg:col-span-4 p-8 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                <ShoppingCart size={24} />
              </div>
              <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Distribution</span>
            </div>
            <div>
              <p className="text-4xl font-display font-black text-text-main tracking-tighter">
                {product.sales.toLocaleString()}
              </p>
              <p className="text-xs font-bold text-gray-400 mt-2">Units Shipped Total</p>
            </div>
          </div>

          {/* Performance Bar */}
          <div className="bento-card md:col-span-6 lg:col-span-4 p-8">
            <div className="flex justify-between items-center mb-10">
              <span className="font-bold text-gray-700">Market Reach</span>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Optimal</span>
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-forest w-[75%] rounded-full transition-all duration-1000" />
              </div>
              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span>Current Velocity</span>
                <span>75%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-12">
    <div className="w-16 h-16 border-4 border-brand-mint border-t-brand-forest rounded-full animate-spin mb-6" />
    <span className="font-display font-black text-brand-forest uppercase tracking-widest text-xs">Synchronizing Data</span>
  </div>
);

const ErrorScreen = ({ error, navigate }) => (
  <div className="min-h-screen flex items-center justify-center p-8">
    <div className="bento-card p-12 max-w-sm text-center">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <Box size={32} />
      </div>
      <h2 className="text-2xl font-display font-black mb-2">Request Failed</h2>
      <p className="text-sm text-gray-400 mb-8 leading-relaxed">{error || "The specified product registry could not be located."}</p>
      <button 
        onClick={() => navigate("/dashboard/products")}
        className="w-full py-4 bg-text-main text-white rounded-inner font-bold text-sm uppercase tracking-widest shadow-xl"
      >
        Back to Dashboard
      </button>
    </div>
  </div>
);

export default ProductPage;