import React, { useState, useEffect } from 'react';
import { TrendingUp, Eye, MousePointer, Target } from 'lucide-react';

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('https://task-api-eight-flax.vercel.app/api/analytics');
        const data = await response.json();
        setAnalytics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Calculate totals
  const totalViews = analytics.reduce((sum, item) => sum + item.views, 0);
  const totalClicks = analytics.reduce((sum, item) => sum + item.clicks, 0);
  const totalConversions = analytics.reduce((sum, item) => sum + item.conversions, 0);
  const avgConversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : 0;

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
        <h1 className="text-2xl font-bold mb-4">Analytics</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-black bg-linear-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-8 tracking-tight">Analytics</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Total Views</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                {totalViews.toLocaleString()}
              </p>
            </div>
            <div className="bg-linear-to-br from-blue-100 to-blue-200 p-4 rounded-2xl">
              <Eye className="w-7 h-7 text-blue-700" />
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Total Clicks</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                {totalClicks.toLocaleString()}
              </p>
            </div>
            <div className="bg-linear-to-br from-emerald-100 to-emerald-200 p-4 rounded-2xl">
              <MousePointer className="w-7 h-7 text-emerald-700" />
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Conversions</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                {totalConversions.toLocaleString()}
              </p>
            </div>
            <div className="bg-linear-to-br from-purple-100 to-purple-200 p-4 rounded-2xl">
              <Target className="w-7 h-7 text-purple-700" />
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Conversion Rate</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                {avgConversionRate}%
              </p>
            </div>
            <div className="bg-linear-to-br from-yellow-100 to-yellow-200 p-4 rounded-2xl">
              <TrendingUp className="w-7 h-7 text-yellow-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
     <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-xl overflow-hidden border border-white/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50/80 backdrop-blur-sm border-b border-emerald-100/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-emerald-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-emerald-700 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-emerald-700 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-emerald-700 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-emerald-700 uppercase tracking-wider">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-emerald-100/30">
              {analytics.map((item) => {
                const rate = item.clicks > 0 ? ((item.conversions / item.clicks) * 100).toFixed(1) : 0;
                return (
                  <tr key={item.date} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.clicks.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.conversions.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-sm font-black rounded-full ${
                        parseFloat(rate) >= 5 ? 'bg-emerald-100 text-emerald-800' : 
                        parseFloat(rate) >= 3 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {rate}%
                      </span>
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

export default Analytics;