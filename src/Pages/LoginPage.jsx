import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      email: "user1@example.com",
      password: "password123",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://task-api-eight-flax.vercel.app/api/login",
        {
          email: data.email,
          password: data.password,
        },
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", response.data.email);
        toast.success("Welcome back! Login successful."); 
        navigate("/dashboard");
      }
    } catch (error) {
      // Error handling
      setError("root", {
        message:
          error.response?.data?.message || "Invalid credentials. Try again!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-white to-teal-50 px-4 font-sans relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-tr from-green-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md backdrop-blur-xl bg-white/80 shadow-lg rounded-3xl p-10 border border-white/20 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-linear-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-3 tracking-tight">
            TaskFlow Dashboard
          </h1>
          <p className="text-gray-600 font-medium">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.root && (
            <p className="bg-red-50/80 backdrop-blur-sm text-red-700 p-4 rounded-2xl text-sm text-center border border-red-100/50 font-medium">
              {errors.root.message}
            </p>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all backdrop-blur-sm bg-white/70 ${
                errors.email ? "border-red-400 bg-red-50/50" : "border-gray-200/50 hover:border-emerald-300"
              }`}
              placeholder="user1@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-2 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all backdrop-blur-sm bg-white/70 ${
                errors.password ? "border-red-400 bg-red-50/50" : "border-gray-200/50 hover:border-emerald-300"
              }`}
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-2 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-linear-to-r from-emerald-700 to-teal-600 text-white py-4 rounded-2xl font-black hover:from-emerald-800 hover:to-teal-700 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 shadow-xl hover:shadow-2xl disabled:hover:scale-100 relative overflow-hidden group"
          >
            <span className="relative z-10">{isSubmitting ? "Authenticating..." : "Sign In"}</span>
            <div className="absolute inset-0 bg-linear-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500 font-medium">
          Note: Demo credentials are pre-filled for easy testing.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
