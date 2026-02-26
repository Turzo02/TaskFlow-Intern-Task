import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Package, Activity, Fingerprint } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://task-api-eight-flax.vercel.app/api/products/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject('Registry Error'))
      .then(setProduct)
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-20 animate-pulse font-display font-black opacity-20 text-4xl">LOADING...</div>;
  if (error || !product) return <div className="p-20 font-display font-black text-red-500">ENTRY NOT FOUND</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Navigation */}
      <button 
        onClick={() => navigate('/dashboard/products')}
        className="mb-12 flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.3em] text-primary-accent hover:opacity-60 transition-opacity"
      >
        <ArrowLeft size={14} /> Close Registry
      </button>

      <div className="flex flex-col md:flex-row gap-12 items-stretch">
        
        {/* Identity Block - Only Name and ID */}
        <div className="md:w-1/2 bg-action-gradient rounded-panel p-10 text-white flex flex-col justify-between shadow-2xl shadow-primary-dark/20">
          <div className="space-y-6">
            <div className="w-16 h-16 glass-effect rounded-control flex items-center justify-center">
              <Package size={32} />
            </div>
            <h1 className="text-6xl font-display font-black tracking-tighter leading-none">
              {product.name}
            </h1>
          </div>
          
          <div className="pt-10 flex items-center gap-4 border-t border-white/10">
            <Fingerprint size={24} className="opacity-40" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Unique Identifier</p>
              <p className="font-display font-bold tracking-tight">PID-00{product.id}</p>
            </div>
          </div>
        </div>

        {/* Technical Data Sheet - Only Price, Sales, Category */}
        <div className="md:w-1/2 flex flex-col justify-center space-y-1">
          <header className="mb-6 px-4">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <Activity size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Active Entry</span>
            </div>
            <h2 className="text-2xl font-display font-black uppercase tracking-tight">Technical Specs</h2>
          </header>

          <SpecItem 
            label="Valuation" 
            value={`$${product.price.toFixed(2)}`} 
            detail="Current market list price per unit."
          />
          <SpecItem 
            label="Market Volume" 
            value={product.sales.toLocaleString()} 
            detail="Total units successfully distributed."
          />
          <SpecItem 
            label="Classification" 
            value={product.category} 
            detail="System categorized asset type."
            isCaps
          />

          <footer className="mt-8 px-4 pt-6 border-t border-gray-200">
            <p className="text-[9px] text-gray-400 font-medium leading-relaxed">
              This data is fetched directly from the secure registry. Any modifications to unit valuation or classification must be authorized by system admins.
            </p>
          </footer>
        </div>

      </div>
    </div>
  );
};

/* Internal UI Component for Minimalist Data Presentation */
const SpecItem = ({ label, value, detail, isCaps }) => (
  <div className="group p-4 rounded-control hover:bg-white hover:shadow-xl hover:shadow-primary-dark/5 transition-all border border-transparent">
    <div className="flex justify-between items-baseline mb-1">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</span>
      <span className={`text-2xl font-display font-black text-primary-dark tracking-tighter ${isCaps ? 'uppercase' : ''}`}>
        {value}
      </span>
    </div>
    <p className="text-[10px] text-gray-400 font-medium italic opacity-0 group-hover:opacity-100 transition-opacity">
      {detail}
    </p>
  </div>
);

export default ProductPage;