import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  BarChart3,
  Package,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/dashboard/users", label: "Users", icon: Users },
    { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/dashboard/products", label: "Products", icon: Package },
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto flex min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-60 h-60 bg-linear-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-linear-to-tr from-green-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Mobile overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed lg:static w-64 min-h-screen backdrop-blur-xl bg-white/80 shadow-2xl transition-all duration-300 ease-in-out z-40 border-r border-white/20`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black bg-linear-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent tracking-tight">TaskFlow</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-emerald-50/80 transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 backdrop-blur-sm ${
                        location.pathname === item.to
                          ? "bg-linear-to-r from-emerald-600 to-teal-500 text-white shadow-lg font-bold"
                          : "text-gray-700 hover:bg-emerald-50/80 hover:text-emerald-700 font-medium"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 text-red-600 hover:bg-red-50/80 hover:text-red-700 font-bold group backdrop-blur-sm cursor-pointer"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 relative z-10">
        {/* Mobile menu button - positioned in main content area */}
        <div className="lg:hidden p-4 backdrop-blur-xl bg-white/80 border-b border-white/20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-emerald-50/80 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
