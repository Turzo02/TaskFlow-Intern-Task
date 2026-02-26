import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Package, DollarSign, ShoppingCart, Tag } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://task-api-eight-flax.vercel.app/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate totals
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
  const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.sales), 0);
  const avgPrice = products.length > 0 ? (products.reduce((sum, product) => sum + product.price, 0) / products.length).toFixed(2) : 0;
  const totalProducts = products.length;

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-black bg-linear-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-8 tracking-tight">Products</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Total Products</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                {totalProducts}
              </p>
            </div>
            <div className="bg-linear-to-br from-blue-100 to-blue-200 p-4 rounded-2xl">
              <Package className="w-7 h-7 text-blue-700" />
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Total Sales</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                {totalSales.toLocaleString()}
              </p>
            </div>
            <div className="bg-linear-to-br from-emerald-100 to-emerald-200 p-4 rounded-2xl">
              <ShoppingCart className="w-7 h-7 text-emerald-700" />
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Total Revenue</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-linear-to-br from-yellow-100 to-yellow-200 p-4 rounded-2xl">
              <DollarSign className="w-7 h-7 text-yellow-700" />
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Avg Price</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                ${avgPrice}
              </p>
            </div>
            <div className="bg-linear-to-br from-purple-100 to-purple-200 p-4 rounded-2xl">
              <Tag className="w-7 h-7 text-purple-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-xl overflow-hidden border border-white/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50/80 backdrop-blur-sm border-b border-emerald-100/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-emerald-700 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-emerald-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-emerald-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-emerald-700 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-emerald-700 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-emerald-100/30">
              {products.map((product) => {
                const revenue = product.price * product.sales;
                return (
                  <tr key={product.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/dashboard/products/${product.id}`}
                        className="text-sm font-bold text-emerald-700 hover:text-emerald-900 hover:underline transition-colors"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-sm font-black rounded-full ${product.category === 'subscription' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.sales.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        ${revenue.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;