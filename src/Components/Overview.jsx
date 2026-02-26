import React, { useState, useEffect } from "react";
import { Users, CheckCircle, DollarSign, TrendingUp } from "lucide-react";

const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://task-api-eight-flax.vercel.app/api/overview",
        );
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    // error message
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Overview</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-8 tracking-tight">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Total Users</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                {data.totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl">
              <Users className="w-7 h-7 text-blue-700" />
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Active Users</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                {data.activeUsers.toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-4 rounded-2xl">
              <CheckCircle className="w-7 h-7 text-emerald-700" />
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Revenue</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                ${data.revenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-2xl">
              <DollarSign className="w-7 h-7 text-yellow-700" />
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/80 p-6 rounded-3xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-700">Growth</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                {data.growth}%
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-2xl">
              <TrendingUp className="w-7 h-7 text-purple-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
