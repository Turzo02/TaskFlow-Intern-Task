import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { User, Mail, Calendar, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://task-api-eight-flax.vercel.app/api/users/${id}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="max-w-2xl mx-auto">
            <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate('/dashboard/users')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Users</span>
        </button>
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate('/dashboard/users')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Users</span>
        </button>
        <div className="max-w-2xl mx-auto text-center text-gray-500">
          User not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/users')}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Users</span>
      </button>

      <div className="max-w-2xl mx-auto">
        {/* User Card */}
        <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <User className="w-10 h-10 text-emerald-600" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-black">{user.name}</h1>
                <p className="text-emerald-100 font-medium">User ID: #{user.id}</p>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4 p-4 bg-emerald-50/50 backdrop-blur-sm rounded-2xl">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-2xl">
                  <Mail className="w-5 h-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-700">Email Address</p>
                  <p className="text-lg font-black text-gray-900">{user.email}</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-4 p-4 bg-emerald-50/50 backdrop-blur-sm rounded-2xl">
                <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-3 rounded-2xl">
                  <CheckCircle className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-700">Account Status</p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 inline-flex text-sm font-black rounded-full ${
                        user.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center space-x-4 p-4 bg-emerald-50/50 backdrop-blur-sm rounded-2xl">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-2xl">
                  <Calendar className="w-5 h-5 text-purple-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-700">Member Since</p>
                  <p className="text-lg font-black text-gray-900">
                    {new Date(user.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;