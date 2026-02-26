import React from 'react';
import { useNavigate } from 'react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl p-12 border border-white/20">
          {/* 404 Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-6 rounded-3xl">
              <Search className="w-16 h-16 text-emerald-700" />
            </div>
          </div>

          {/* Error Code */}
          <div className="text-center mb-6">
            <h1 className="text-8xl font-black bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-3">
              Page Not Found
            </h2>
            <p className="text-gray-600 font-medium">
              Oops! The page you're looking for seems to have vanished into the digital void.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {localStorage.getItem("token") && (
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-2xl font-black hover:from-emerald-700 hover:to-teal-600 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              <Home className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </button>
            )}
            {!localStorage.getItem("token") && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center space-x-2 bg-white border-2 border-emerald-200 text-emerald-700 px-6 py-3 rounded-2xl font-black hover:bg-emerald-50 transition-all duration-300 hover:scale-[1.02]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-medium">
              If you believe this is an error, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
