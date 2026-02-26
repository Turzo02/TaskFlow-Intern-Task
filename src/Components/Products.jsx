import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import {
  Package,
  DollarSign,
  ShoppingCart,
  Tag,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Performance: Memoize calculations to prevent re-runs on unrelated state changes
  const stats = useMemo(() => {
    if (!products.length) return { sales: 0, revenue: 0, avg: 0, count: 0 };
    const sales = products.reduce((sum, p) => sum + p.sales, 0);
    const revenue = products.reduce((sum, p) => sum + p.price * p.sales, 0);
    const avg = products.reduce((sum, p) => sum + p.price, 0) / products.length;
    return { sales, revenue, avg, count: products.length };
  }, [products]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;

  const summaryData = [
    {
      label: "Total Inventory",
      val: stats.count,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Gross Sales",
      val: stats.sales.toLocaleString(),
      icon: ShoppingCart,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Total Revenue",
      val: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Average Price",
      val: `$${stats.avg.toFixed(2)}`,
      icon: Tag,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-5xl font-display font-black tracking-tighter">
          Inventory<span className="text-primary-accent">.</span>
        </h1>
        <p className="text-gray-400 font-medium mt-1">
          Global product performance and stock metrics
        </p>
      </header>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaryData.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Data Table */}
      <div className="panel-card overflow-hidden border-none shadow-2xl shadow-primary-dark/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-base">
                {[
                  "Product Details",
                  "Category",
                  "Unit Price",
                  "Units Sold",
                  "Revenue",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-base">
              {products.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* --- Sub-Components --- */

const StatCard = ({ label, val, icon: Icon, color }) => (
  <div className="panel-card p-6 flex items-center justify-between group hover:scale-[1.01] transition-all cursor-default">
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-3xl font-display font-black text-content-main tracking-tighter">
        {val}
      </p>
    </div>
    <div
      className={`p-4 rounded-control ${color} group-hover:rotate-12 transition-transform`}
    >
      <Icon size={24} />
    </div>
  </div>
);

const ProductRow = ({ product }) => (
  <tr className="group hover:bg-primary-soft/30 transition-colors">
    <td className="px-8 py-5">
      <Link
        to={`/dashboard/products/${product.id}`}
        className="font-display font-bold text-content-main hover:text-primary-accent transition-colors"
      >
        {product.name}
      </Link>
    </td>
    <td className="px-8 py-5">
      <span
        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider ${
          product.category === "subscription"
            ? "bg-primary-accent text-white"
            : "bg-emerald-100 text-emerald-700"
        }`}
      >
        {product.category}
      </span>
    </td>
    <td className="px-8 py-5 text-sm font-medium text-gray-500">
      ${product.price.toFixed(2)}
    </td>
    <td className="px-8 py-5 text-sm font-medium text-gray-500">
      {product.sales.toLocaleString()}
    </td>
    <td className="px-8 py-5 text-sm font-bold text-content-main">
      ${(product.price * product.sales).toLocaleString()}
    </td>
    <td className="px-8 py-5 text-right">
      <ChevronRight
        size={18}
        className="inline text-gray-300 group-hover:text-primary-dark group-hover:translate-x-1 transition-all"
      />
    </td>
  </tr>
);

const LoadingSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-12 bg-gray-200 rounded-control w-64" />
    <div className="grid grid-cols-2 gap-6">
      <div className="h-28 bg-white rounded-panel col-span-4 lg:col-span-1" />
    </div>
    <div className="panel-card h-80 bg-white/50" />
  </div>
);

const ErrorState = ({ message }) => (
  <div className="panel-card p-12 text-center max-w-lg mx-auto border-red-100">
    <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
    <h2 className="text-xl font-display font-bold">Catalog Sync Error</h2>
    <p className="text-sm text-gray-400 mt-2">{message}</p>
  </div>
);

export default Products;
