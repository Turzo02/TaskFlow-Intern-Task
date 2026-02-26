import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Menu, X, LayoutDashboard, Users, BarChart3, Package, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const menuItems = [
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
    toast.success("Session Terminated");
    navigate("/");
  };

  const NavItem = ({ to, label, icon: Icon }) => {
    const isActive = pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-3.5 rounded-control transition-all duration-300 group ${
          isActive 
            ? "bg-action-gradient text-white shadow-lg shadow-primary-dark/20 font-bold" 
            : "text-gray-500 hover:bg-primary-soft hover:text-primary-dark"
        }`}
      >
        <Icon size={20} className={isActive ? "" : "group-hover:scale-110 transition-transform"} />
        <span className="text-sm tracking-tight">{label}</span>
      </Link>
    );
  };

  return (
    <div className="flex max-w-7xl mx-auto min-h-screen bg-surface-base font-sans">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-primary-dark/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar Overlay/Static */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 z-50 transition-transform duration-500 ease-in-out
        bg-white/80 backdrop-blur-2xl border-r border-white shadow-2xl lg:shadow-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-display font-black tracking-tighter">
              TaskFlow<span className="text-primary-accent">.</span>
            </h1>
            <button className="lg:hidden p-2 text-gray-400 cursor-pointer" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => <NavItem key={item.to} {...item} />)}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-4 rounded-control text-red-500 font-bold hover:bg-red-50 transition-colors group cursor-pointer"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-widest font-black">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center p-6 bg-white/50 backdrop-blur-md sticky top-0 z-30 border-b border-white">
          <button onClick={() => setSidebarOpen(true)} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <Menu size={20} className="text-primary-dark" />
          </button>
        </header>

        <section className="p-6 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;