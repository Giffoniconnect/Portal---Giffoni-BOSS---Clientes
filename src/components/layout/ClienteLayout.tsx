import React, { useState, useEffect } from "react";
import { useParams, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Building2, 
  FolderOpen, 
  FileCheck, 
  Info, 
  CalendarClock, 
  Search, 
  Users, 
  CreditCard, 
  LogOut, 
  Menu, 
  X, 
  Scale, 
  LayoutDashboard,
  ShieldCheck,
  PhoneCall,
  AlertOctagon,
  Lock
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useClientPortal } from "../../contexts/ClientPortalContext";
import { motion, AnimatePresence } from "motion/react";

interface ClienteLayoutProps {
  children: React.ReactNode;
}

export default function ClienteLayout({ children }: ClienteLayoutProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { session, logoutClient } = useAuth();
  const { client, error, loadPortalBySlug } = useClientPortal();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!session) {
      navigate("/portal-cliente-giffoni/login", { replace: true });
    }
  }, [session, navigate]);

  // Load client portal data for the slug
  useEffect(() => {
    if (slug) {
      loadPortalBySlug(slug);
    }
  }, [slug, loadPortalBySlug]);

  if (!session) {
    return (
      <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <Lock className="w-12 h-12 text-amber-500 mb-3 animate-pulse" />
        <p className="text-slate-400 text-sm">Redirecionando para login seguro...</p>
      </div>
    );
  }

  // Mismatch error: Authenticated client tries manually editing the URL to see another client's slug
  if (error === "mismatch") {
    return (
      <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <div className="inline-flex p-4 bg-rose-500/10 rounded-3xl border border-rose-500/15 mb-6">
          <AlertOctagon className="w-16 h-16 text-rose-500 animate-pulse" />
        </div>
        <h1 className="text-2xl font-display font-black tracking-tight text-white mb-2">Acesso Negado</h1>
        <p className="text-slate-400 max-w-sm mb-6 text-sm leading-relaxed">
          Sua credencial de e-mail não possui permissão de leitura para o endereço corporativo de terceiros solicitado.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate(`/portal-cliente-giffoni/${session.slug}/dashboard`, { replace: true })}
            className="bg-amber-500 hover:bg-amber-600 outline-none text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-all tracking-wider uppercase font-mono"
          >
            Ir ao Seu Painel Geral
          </button>
          <button 
            onClick={() => {
              logoutClient();
              navigate("/portal-cliente-giffoni/login", { replace: true });
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-3 rounded-xl text-xs transition-all font-mono"
          >
            Sair e Trocar Conta
          </button>
        </div>
      </div>
    );
  }

  // Not found or regular error fallback
  if (!client) {
    return (
      <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <Scale className="w-16 h-16 text-amber-500 mb-4 animate-bounce" />
        <h1 className="text-2xl font-display font-black text-white mb-2">Portal não encontrado ou indisponível</h1>
        <p className="text-slate-400 max-w-md mb-6 text-sm">
          Não localizamos nenhuma empresa correspondente ao ambiente "{slug}". Verifique o endereço digitado ou tente re-autenticar.
        </p>
        <button 
          onClick={() => {
            logoutClient();
            navigate("/portal-cliente-giffoni/login", { replace: true });
          }}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg text-xs tracking-wider uppercase"
        >
          Ir para Login Geral
        </button>
      </div>
    );
  }

  const navItems = [
    { name: "Painel Geral", path: `/portal-cliente-giffoni/${slug}/dashboard`, icon: LayoutDashboard },
    { name: "Meus Dados", path: `/portal-cliente-giffoni/${slug}/dados`, icon: Building2 },
    { name: "Casos & Processos", path: `/portal-cliente-giffoni/${slug}/casos`, icon: FolderOpen },
    { name: "Minhas Provas", path: `/portal-cliente-giffoni/${slug}/provas`, icon: FileCheck },
    { name: "Informações Importantes", path: `/portal-cliente-giffoni/${slug}/informacoes`, icon: Info },
    { name: "Audiências", path: `/portal-cliente-giffoni/${slug}/audiencias`, icon: CalendarClock },
    { name: "Perícias Técnicas", path: `/portal-cliente-giffoni/${slug}/pericias`, icon: Search },
    { name: "Reuniões Agendadas", path: `/portal-cliente-giffoni/${slug}/reunioes`, icon: Users },
    { name: "Financeiro & Faturamento", path: `/portal-cliente-giffoni/${slug}/financeiro`, icon: CreditCard },
  ];

  const handleLogoutAction = () => {
    logoutClient();
    navigate("/portal-cliente-giffoni/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans flex flex-col md:flex-row antialiased">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#090d16] text-white px-4 py-3 flex items-center justify-between border-b border-white/5 z-50">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-500" />
          <span className="font-display font-semibold tracking-tight text-white text-base">
            Giffoni Connect
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Navigation Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
            />
            {/* Side Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-80 bg-[#090f1e] text-slate-300 flex flex-col z-50 md:hidden border-r border-white/10"
            >
              <div className="px-6 py-5 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Scale className="w-6 h-6 text-amber-500" />
                  <span className="font-display font-bold tracking-tight text-white text-lg">
                    Giffoni Connect
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Client Profile Summary */}
              <div className="px-6 py-4 bg-[#0d152c] border-b border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#a855f7]">Portal do Cliente</span>
                <h3 className="font-bold text-white text-sm line-clamp-1 mt-1">{client.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">{client.cpfCnpj}</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                        isActive 
                          ? "bg-amber-500/15 text-amber-400 border-l-2 border-amber-500 pl-3" 
                          : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>

              {/* Drawer footer / logout */}
              <div className="p-4 border-t border-white/5 bg-[#050912]">
                <button
                  onClick={handleLogoutAction}
                  className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-white hover:bg-red-500/10 py-2.5 rounded-lg text-xs font-semibold transition-all border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Sair do Portal
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-72 lg:w-80 bg-[#090f1e] text-slate-200 border-r border-white/5 shrink-0 select-none">
        <div className="px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Scale className="w-7 h-7 text-amber-500 stroke-[1.5]" />
            <div>
              <span className="font-display font-bold tracking-tight text-white text-lg block">
                Giffoni <span className="text-amber-550">Connect</span>
              </span>
              <span className="text-[9px] text-[#a855f7] font-semibold tracking-widest uppercase block mt-0.5">
                Área de Advocacia Exclusiva
              </span>
            </div>
          </div>
        </div>

        {/* Client Business Account details */}
        <div className="px-5 py-4 mx-4 my-4 rounded-xl bg-[#0e162a] border border-white/5 flex flex-col gap-1 shadow-inner">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Identificação do Cliente</span>
          <div className="font-bold text-sm text-slate-100 line-clamp-2 mt-1" title={client.name}>
            {client.name}
          </div>
          <div className="text-xs text-slate-500 font-mono mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            CNPJ: {client.cpfCnpj}
          </div>
        </div>

        {/* Navigation bar to all custom slots */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive 
                    ? "bg-amber-500/10 text-amber-400 border-l-4 border-amber-500 pl-3 font-bold shadow-sm" 
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-100"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isActive ? "scale-110 text-amber-500" : ""}`} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop Sidebar Footer */}
        <div className="p-4 border-t border-white/5 bg-[#050811] flex flex-col gap-3">
          <div className="flex items-center gap-2 px-2">
            <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400 font-medium">Fale Conosco: (11) 98765-4321</span>
          </div>

          <button
            onClick={handleLogoutAction}
            className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white hover:bg-red-500/10 py-2.5 rounded-xl text-xs font-semibold transition-all border border-white/5 hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4 text-red-400/80" />
            Sair do Portal
          </button>
        </div>
      </aside>

      {/* Main Container Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0b1329] overflow-y-auto">
        {/* Top Header for Desktop */}
        <header className="hidden md:flex h-16 bg-[#090f1e] border-b border-white/5 items-center justify-between px-8 sticky top-0 z-10 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono px-2.5 py-1 rounded">
              CONEXÃO CRIPTOGRAFADA SSL
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            <span>Advogado Responsável: <strong className="text-slate-200">Giffoni Advocacia</strong></span>
          </div>
        </header>

        {/* Content container */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-[1500px] w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
