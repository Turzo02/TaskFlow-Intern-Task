import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { UserPlus, Search, AlertCircle, ChevronRight } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-5xl font-display font-black tracking-tighter">
            Directory<span className="text-primary-accent">.</span>
          </h1>
          <p className="text-gray-400 font-medium mt-1">Manage and audit system personnel</p>
        </div>
        <button className="bg-action-gradient text-white px-6 py-3 rounded-control font-display font-black text-xs uppercase tracking-widest shadow-lg shadow-primary-dark/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
          <UserPlus size={18} /> Add User
        </button>
      </header>

      <div className="panel-card overflow-hidden border-none shadow-2xl shadow-primary-dark/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-base">
                {["Personnel", "Contact", "Status", "Joined", ""].map((h) => (
                  <th key={h} className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-base">
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* --- Sub-components --- */

const UserRow = ({ user }) => (
  <tr className="group hover:bg-primary-soft/30 transition-colors">
    <td className="px-8 py-5">
      <Link to={`/dashboard/users/${user.id}`} className="flex items-center gap-3 group/link">
        <div className="w-10 h-10 rounded-full bg-primary-dark text-white flex items-center justify-center font-display font-bold text-sm">
          {user.name.charAt(0)}
        </div>
        <span className="font-display font-bold text-content-main group-hover/link:text-primary-accent transition-colors">
          {user.name}
        </span>
      </Link>
    </td>
    <td className="px-8 py-5 text-sm font-medium text-gray-500">{user.email}</td>
    <td className="px-8 py-5">
      <span className={`
        px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
        ${user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}
      `}>
        {user.status}
      </span>
    </td>
    <td className="px-8 py-5 text-sm font-bold text-gray-400">
      {new Date(user.joinDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
    </td>
    <td className="px-8 py-5 text-right">
      <ChevronRight className="inline-block text-gray-300 group-hover:text-primary-dark group-hover:translate-x-1 transition-all" size={20} />
    </td>
  </tr>
);

const LoadingSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-12 bg-gray-200 rounded-control w-64" />
    <div className="panel-card h-96 bg-white/50" />
  </div>
);

const ErrorState = ({ message }) => (
  <div className="panel-card p-12 text-center max-w-lg mx-auto border-red-100">
    <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
    <h2 className="text-xl font-display font-bold">Access Interrupted</h2>
    <p className="text-sm text-gray-400 mt-2">{message}</p>
  </div>
);

export default Users;