import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ShieldCheck, Mail, Lock, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    defaultValues: { email: "user1@example.com", password: "password123" },
  });

  const onSubmit = async (data) => {
    try {
      const { data: res } = await axios.post("https://task-api-eight-flax.vercel.app/api/login", data);
      
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userEmail", res.email);
        toast.success("Identity Verified. Welcome.");
        navigate("/dashboard");
      }
    } catch (err) {
      setError("root", { message: err.response?.data?.message || "Access Denied. Check credentials." });
    }
  };

  const inputClass = (error) => `
    w-full bg-primary-soft/30 border-2 px-4 py-4 rounded-control outline-none transition-all font-bold text-sm
    ${error ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-primary-dark/20 focus:bg-white"}
  `;

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-6 relative overflow-hidden">
      <Toaster />
      
      {/* Editorial Background Element */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-dark/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-display font-black tracking-tighter mb-2 text-primary-dark">Login<span className="text-primary-dark/80">.</span></h1>
          <p className="text-gray-400 font-medium text-sm">Registry Authentication Required</p>
        </header>

        <main className="panel-card p-8 md:p-10 shadow-2xl shadow-primary-dark/5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {errors.root && (
              <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 animate-in fade-in zoom-in duration-300">
                <ShieldCheck size={16} /> {errors.root.message}
              </div>
            )}

            <Field label="Identity" error={errors.email}>
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input type="email" placeholder="email@enterprise.com" className={`${inputClass(errors.email)} pl-12`} {...register("email", { required: "Email required" })} />
            </Field>

            <Field label="Access Key" error={errors.password}>
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input type="password" placeholder="••••••••" className={`${inputClass(errors.password)} pl-12`} {...register("password", { required: "Password required" })} />
            </Field>

            <button
              disabled={isSubmitting}
              className="w-full bg-action-gradient text-white py-5 rounded-control font-display font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-primary-dark/20 group cursor-pointer"
            >
              {isSubmitting ? "Processing..." : <>Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>
        </main>
        
        <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
           Note: Demo credentials are pre-filled for easy testing.
        </p>
      </div>
    </div>
  );
};

/* Helper Sub-component for cleaner JSX */
const Field = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
    <div className="relative">{children}</div>
    {error && <p className="text-red-500 text-[10px] font-black uppercase ml-1">{error.message}</p>}
  </div>
);

export default LoginPage;