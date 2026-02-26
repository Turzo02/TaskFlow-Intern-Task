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
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7f6] px-4 font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#1B4332] mb-2">
            TaskFlow Dashboard
          </h1>
          <p className="text-gray-500">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.root && (
            <p className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {errors.root.message}
            </p>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1B4332] outline-none transition-all ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="user1@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1B4332] outline-none transition-all ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1B4332] text-white py-3 rounded-xl font-bold hover:bg-[#081c15] transition-all transform active:scale-95 disabled:opacity-70 shadow-lg"
          >
            {isSubmitting ? "Authenticating..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-gray-400">
          Note: Demo credentials are pre-filled for easy testing.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
