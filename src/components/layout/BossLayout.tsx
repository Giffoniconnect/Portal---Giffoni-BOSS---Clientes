import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  Calendar, 
  DollarSign, 
  Menu, 
  X, 
  Scale, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BossLayoutProps {
  children: React.ReactNode;
}

export default function BossLayout({ children }: BossLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/portal-boss", icon: LayoutDashboard },
    { name: "Clientes & Slugs", path: "/portal-boss/clientes", icon: Users },
    { name: "Casos Jurídicos", path: "/portal-boss/casos", icon: Briefcase },
    { name: "Provas & Documentos", path: "/portal-boss/provas", icon: FileText },
    { name: "Agenda do Escritório", path: "/portal-boss/agenda", icon: Calendar },
    { name: "Financeiro", path: "/portal-boss/financeiro", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row antialiased">
      {/* Mobile Header */}
      <header className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 z-50">
        <Link to="/portal-boss" className="flex items-center gap-2">
          <Scale className="w-6 h-6 text-amber-400" />
          <span className="font-display font-bold tracking-tight text-lg">
            Giffoni <span className="text-amber-400">bOSS</span>
          </span>
        </Link>
        <button 
          id="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          className="p-1 text-slate-300 hover:text-white focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-slate-900 text-slate-300 flex flex-col z-50 md:hidden"
            >
              <div className="px-6 py-5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Scale className="w-6 h-6 text-amber-400" />
                  <span className="font-display font-bold tracking-tight text-white text-lg">
                    Giffoni <span className="text-amber-400">bOSS</span>
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-slate-400 hover:text-white focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.path !== "/portal-boss" && location.pathname.startsWith(item.path));
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? "bg-amber-500/10 text-amber-400 border-l-2 border-amber-400 pl-3" 
                          : "hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-xs">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Ambiente Admin bOSS</span>
                </div>
                <p className="text-slate-500">Acesso Restrito Interno</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-slate-900 text-slate-200 border-r border-slate-800 shrink-0 select-none">
        <div className="px-6 py-6 border-b border-slate-800 flex items-center gap-2.5">
          <Scale className="w-7 h-7 text-amber-500" />
          <div>
            <span className="font-display font-bold tracking-tight text-white text-xl block">
              Giffoni <span className="text-amber-500">bOSS</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase block">
              Portal Admin Interno
            </span>
          </div>
        </div>

        {/* User Info Card in Sidebar */}
        <div className="px-4 py-4 mx-3 my-4 rounded-xl bg-slate-850 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-400">
            AD
          </div>
          <div>
            <div className="font-medium text-sm text-slate-100">Administrador bOSS</div>
            <div className="text-xs text-slate-500">direito.rgr@gmail.com</div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // Exact matching for "/" or startsWith check for others to highlight subpaths
            const isActive = location.pathname === item.path || (item.path !== "/portal-boss" && location.pathname.startsWith(item.path));
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-amber-500/10 text-amber-400 border-l-4 border-amber-500 pl-3 font-semibold shadow-sm" 
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isActive ? "scale-110 text-amber-500" : ""}`} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/30">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">Conectado ao Firebase</span>
          </div>
          <div className="text-[10px] text-slate-500 leading-relaxed font-mono">
            Ambiente Visual Corporativo<br />
            v1.2.0-beta
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto">
        {/* Top Header for Desktop */}
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 items-center justify-between px-8 sticky top-0 z-10 shrink-0">
          <div>
            <span className="text-xs text-slate-500 font-mono">FIRESTORE INTEGRATION ONLINE</span>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              to="/portal-cliente-giffoni/giffoni-eng/dashboard" 
              className="text-xs font-semibold text-slate-600 hover:text-amber-600 flex items-center gap-1.5 transition-colors"
            >
              Simular Portal do Cliente (Giffoni)
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Main nested children with subtle fade transitions */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
