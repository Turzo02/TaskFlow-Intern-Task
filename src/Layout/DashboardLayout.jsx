import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Menu, X, LayoutDashboard, Users, BarChart3, Package, LogOut, Terminal } from "lucide-react";
import toast from "react-hot-toast";

const MENU_ITEMS = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/users", label: "Users", icon: Users },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/products", label: "Products", icon: Package },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="flex max-w-400 mx-auto min-h-screen bg-surface-base font-sans selection:bg-primary-accent/30">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-primary-dark/40 backdrop-blur-md z-40 lg:hidden animate-in fade-in duration-300" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-80 z-50 transition-all duration-500 ease-in-out
        bg-white/90 backdrop-blur-3xl border-r border-white/50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex flex-col h-full p-10">
          <div className="flex items-center justify-between mb-16">
            <h1 className="text-3xl font-display font-black tracking-tighter text-primary-dark flex items-center gap-2">
              <Terminal size={28} className="text-primary-accent" />
              TaskFlow<span className="opacity-30">.</span>
            </h1>
            <button className="lg:hidden p-2 text-gray-400 hover:text-red-500 transition-colors" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-3">
            {MENU_ITEMS.map(({ to, label, icon: Icon }) => {
              const isActive = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-panel transition-all duration-300 group relative overflow-hidden ${
                    isActive 
                      ? "bg-action-gradient text-white shadow-xl shadow-primary-dark/20 font-black" 
                      : "text-gray-400 hover:bg-primary-soft hover:text-primary-dark"
                  }`}
                >
                  <Icon size={20} className={isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
                  <span className="text-xs uppercase tracking-[0.2em]">{label}</span>
                  {isActive && <div className="absolute right-0 w-1 h-full bg-white/20" />}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-4 px-6 py-4 rounded-sm text-red-800 font-black hover:bg-red-50 transition-all group border border-red-900 cursor-pointer"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.4em]">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-6 bg-white/60 backdrop-blur-xl sticky top-0 z-30 border-b border-white">
          <button onClick={() => setSidebarOpen(true)} className="p-3 bg-white rounded-control shadow-sm border border-gray-100 active:scale-95 transition-transform">
            <Menu size={20} className="text-primary-dark" />
          </button>
          <div className="text-[10px] font-black uppercase tracking-widest text-primary-accent">System_Active</div>
        </header>

        <section className="p-8 lg:p-14 w-full mx-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;