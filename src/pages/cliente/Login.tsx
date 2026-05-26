import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Scale, Lock, ShieldCheck, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function ClienteLogin() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { loginClient, logoutClient, session } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user is already authenticated with an active session, check matching slug or redirect
  useEffect(() => {
    if (session && session.autenticado) {
      if (slug && slug !== session.slug) {
        logoutClient();
      } else {
        navigate(`/portal-cliente-giffoni/${session.slug}/dashboard`, { replace: true });
      }
    }
  }, [session, slug, navigate, logoutClient]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    if (!email) {
      setErrorMsg("O e-mail de acesso é obrigatório.");
      return;
    }
    
    if (!password) {
      setErrorMsg("A senha de acesso é obrigatória.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await loginClient(email.trim(), password);
      
      if (res.success && res.session) {
        // After authentication, check if URL slug exists and is different from the session slug
        if (slug && slug !== res.session.slug) {
          logoutClient();
          setErrorMsg("Este login não pertence a este portal.");
          setIsSubmitting(false);
          return;
        }
        // Successful login: Redirect to dedicated slug dashboard
        navigate(`/portal-cliente-giffoni/${res.session.slug}/dashboard`);
      } else {
        // Match expected user error mappings precisely
        switch (res.error) {
          case "CREDENCIAIS_INVALIDAS":
            setErrorMsg("Login ou senha inválidos.");
            break;
          case "ACESSO_BLOQUEADO":
            setErrorMsg("Portal indisponível. Entre em contato com o escritório.");
            break;
          case "CLIENTE_NAO_ENCONTRADO":
            setErrorMsg("Portal não encontrado ou indisponível.");
            break;
          case "PORTAL_INDISPONIVEL":
            setErrorMsg("Portal indisponível. Entre em contato com o escritório.");
            break;
          case "FIRESTORE_INDISPONIVEL":
            setErrorMsg("Não foi possível validar o acesso agora. Tente novamente em instantes.");
            break;
          default:
            setErrorMsg("Login ou senha inválidos.");
            break;
        }
      }
    } catch (err) {
      setErrorMsg("Não foi possível validar o acesso agora. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a13] flex items-center justify-center p-4 sm:p-6 font-sans antialiased text-slate-200">
      <div className="w-full max-w-md bg-[#0d1424] border border-white/5 shadow-2xl rounded-3xl overflow-hidden p-8 space-y-8">
        
        {/* Top Logo */}
        <div className="text-center">
          <div className="inline-flex p-3 bg-amber-500/10 rounded-2xl border border-amber-500/15 mb-4 font-bold">
            <Scale className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-display font-black text-white tracking-tight">
            Giffoni <span className="text-amber-500 font-normal">Connect</span>
          </h1>
          <span className="text-[10px] text-amber-500 font-mono tracking-widest font-bold uppercase block mt-1">
            Portal de Advocacia do Cliente
          </span>
        </div>

        {/* Info Box about entry order */}
        <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-wider block">CONEXÃO SEGURA</span>
          <p className="text-xs text-slate-400 leading-relaxed">
            Insira suas credenciais cadastradas pelo escritório de advocacia para acessar seus processos, provas e faturamento.
          </p>
        </div>

        {/* Input fields */}
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold font-mono uppercase text-slate-400">E-mail Corporativo</label>
            <div className="flex items-center rounded-xl overflow-hidden border border-white/5 bg-[#090e1a] focus-within:border-amber-500/50 transition-colors">
              <span className="px-3.5 text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input 
                type="email"
                required
                placeholder="Ex: cliente@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 pr-4 bg-transparent text-sm focus:outline-none placeholder-slate-600 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold font-mono uppercase text-slate-400">Senha de Acesso</label>
            <div className="flex items-center rounded-xl overflow-hidden border border-white/5 bg-[#090e1a] focus-within:border-amber-500/50 transition-colors">
              <span className="px-3.5 text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input 
                type="password"
                required
                placeholder="Insira sua senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pr-4 bg-transparent text-sm focus:outline-none placeholder-slate-600 font-medium"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs font-semibold text-rose-400 flex gap-2 items-start text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 shadow-md disabled:opacity-50"
          >
            <span>{isSubmitting ? "Autenticando..." : "Autenticar Conexão"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security disclaimer */}
        <div className="border-t border-white/5 pt-5 space-y-2.5 text-center text-xs">
          <div className="flex items-center justify-center gap-1.5 text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Ambiente Auditado de Infraestrutura</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed max-w-xs mx-auto">
            Este terminal é exclusivo de representação legal corporativa. Toda atividade de download e assinatura é auditada.
          </p>
        </div>
      </div>
    </div>
  );
}
