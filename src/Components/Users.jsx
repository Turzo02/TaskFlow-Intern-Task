import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  UserPlus,
  AlertCircle,
  ChevronRight,
  Mail,
  Calendar,
  ShieldCheck,
} from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/users")
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Personnel link severed"),
      )
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Editorial Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-7xl font-display font-black tracking-tighter">
            Directory<span className="text-primary-accent opacity-50">.</span>
          </h1>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mt-3 flex items-center gap-2">
            <ShieldCheck size={14} className="text-primary-accent" /> System
            Personnel Registry
          </p>
        </div>
        <button className="bg-action-gradient text-white px-10 py-5 rounded-control font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary-dark/30 hover:scale-101 cursor-pointer active:scale-95 transition-all flex items-center gap-3">
          <UserPlus size={18} /> Add User
        </button>
      </header>

      {/* Personnel Grid - Constrained to Max 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

/* --- Enhanced User Card (Bigger Text & Max 2 Col Layout) --- */

const UserCard = ({ user }) => (
  <Link
    to={`/dashboard/users/${user.id}`}
    className="bg-action-gradient rounded-panel p-10 text-white flex flex-col justify-between group relative overflow-hidden shadow-2xl shadow-primary-dark/15 transition-all duration-500 border border-white/10"
  >
    {/* Large Background Glyph */}
    <span className="absolute -right-6 -top-10 text-[14rem] font-display font-black opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
      {user.name.charAt(0)}
    </span>

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-10">
        <div className="w-16 h-16 bg-white/10 rounded-control flex items-center justify-center font-display font-black text-2xl shadow-inner border border-white/20">
          {user.name.charAt(0)}
        </div>
        <span
          className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border ${
            user.status === "active"
              ? "bg-emerald-500/30 border-emerald-400/40 text-emerald-100"
              : "bg-red-500/30 border-red-400/40 text-red-100"
          }`}
        >
          {user.status}
        </span>
      </div>

      {/* Increased Typography Scale */}
      <h3 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-6 leading-none group-hover:translate-x-2 transition-transform duration-500">
        {user.name}
      </h3>

      <div className="space-y-4 opacity-80 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
          <Mail size={16} className="text-primary-soft" /> {user.email}
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
          <Calendar size={16} className="text-primary-soft" /> Registry Entry:{" "}
          {new Date(user.joinDate).toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
    </div>

    <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center relative z-10">
      <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50 group-hover:opacity-100 transition-opacity">
        Access Personnel File
      </span>
      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-primary-dark transition-all">
        <ChevronRight size={24} />
      </div>
    </div>
  </Link>
);

const LoadingSkeleton = () => (
  <div className="space-y-12 animate-pulse">
    <div className="h-20 bg-gray-200 rounded-control w-1/3" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="h-80 bg-white rounded-panel shadow-sm border border-surface-base"
        />
      ))}
    </div>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="min-h-[50vh] flex items-center justify-center p-10">
    <div className="panel-card p-16 text-center max-w-xl shadow-2xl border-red-50">
      <AlertCircle className="mx-auto text-red-500 mb-6" size={64} />
      <h2 className="text-4xl font-display font-black tracking-tight mb-4">
        Registry Fault
      </h2>
      <p className="text-gray-400 font-medium text-lg leading-relaxed">
        {message}
      </p>
    </div>
  </div>
);

export default Users;
