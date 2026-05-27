import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  FolderOpen, 
  CalendarClock, 
  CreditCard, 
  FileCheck, 
  ArrowUpRight, 
  Video, 
  AlertCircle, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Scale,
  Calendar,
  Layers,
  FileText,
  User,
  ArrowLeft,
  Info,
  CheckCircle2,
  Lock,
  Search,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { useClientPortal } from "../../contexts/ClientPortalContext";
import { clienteServiceMock } from "../../services/clienteService.mock";
import { Caso, Prova, Audiencia, Reuniao, Financeiro } from "../../types";

export default function ClienteDashboard() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const { 
    client, 
    cases, 
    evidence, 
    audiences, 
    expertOpinions, 
    meetings, 
    finance, 
    timeline,
    isLoading, 
    error,
    loadPortalBySlug 
  } = useClientPortal();

  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // 1. Initial load of client portal by slug
  useEffect(() => {
    if (slug) {
      loadPortalBySlug(slug);
    }
  }, [slug, loadPortalBySlug]);

  // 1.5. Manage auto-selection & timeline fetching
  useEffect(() => {
    if (!isLoading && cases.length === 1) {
      setSelectedCaseId(cases[0].id);
    }
  }, [isLoading, cases]);

  // Read public timeline preloaded from the ClientPortalContext and filter by case in memory
  const timelineEvents = timeline.filter(event => {
    if (selectedCaseId) {
      return event.caseId === selectedCaseId || event.casoId === selectedCaseId;
    }
    return true; // show all for client if none selected
  });

  // --- RENDERING LOADING STATE ---
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-[#0a0f1d] text-slate-100 font-sans select-none">
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-amber-500/10 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-t-4 border-amber-500 animate-spin w-24 h-24" />
          <Scale className="w-8 h-8 text-amber-500" />
        </div>
        <p className="text-sm font-mono uppercase tracking-widest text-[#a855f7] animate-pulse">
          Boutique Giffoni Advocacia
        </p>
        <h2 className="text-xl font-display font-medium text-white mt-2">
          Carregando credenciamento e registros...
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-sm text-center">
          Conectando ao banco de dados segmentado de forma segura e criptografada.
        </p>
      </div>
    );
  }

  // --- RENDERING ERROR STATE ---
  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-[#0a0f1d] text-slate-100 font-sans">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-display font-bold text-white tracking-tight">
          Acesso Temporariamente Indisponível
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-md text-center leading-relaxed">
          {error === "unauthorized" || error === "mismatch" 
            ? "Você não possui permissão para acessar este portal. Por favor, autentique-se novamente."
            : error}
        </p>
        <button
          onClick={() => navigate("/portal-cliente-giffoni/login")}
          className="mt-6 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 border border-amber-500/20 rounded-xl font-bold text-xs uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg"
        >
          Ir para Login do Cliente
        </button>
      </div>
    );
  }

  // --- RENDERING NO CLIENT FOUND STATE ---
  if (!client) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-[#0a0f1d] text-slate-100 font-sans">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6 font-mono font-bold text-lg">
          ?
        </div>
        <h2 className="text-xl font-display font-bold text-white tracking-tight">
          Portal não encontrado ou indisponível.
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-sm text-center leading-relaxed">
          Verifique a URL digitada ou as informações fornecidas por Giffoni Advocacia.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-5 py-2 hover:bg-slate-800 border border-white/5 rounded-xl text-xs text-slate-300 font-mono tracking-wider transition-all"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  // Get active selected case details
  const activeCase = cases.find(c => c.id === selectedCaseId);

  // --- SCENARIO A: CHOOSE CASE (If customer has >1 case & none selected yet) ---
  if (cases.length > 1 && !selectedCaseId) {
    return (
      <div className="space-y-8 font-sans">
        {/* Welcome Block */}
        <div className="bg-gradient-to-r from-[#0c1225] via-indigo-950 to-[#0e162d] rounded-3xl p-6 sm:p-8 border border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full filter blur-[80px]" />
          <div className="relative">
            <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/15 uppercase font-mono px-3 py-1 rounded-sm font-semibold tracking-wider">
              Portal Prime Ativo
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white mt-4 tracking-tight">
              Olá, {client.nome || client.name}!
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
              Você possui múltiplos processos cadastrados em nosso escritório. Selecione abaixo o caso que deseja auditar e gerenciar.
            </p>
          </div>
        </div>

        {/* Case Selection Cards Grid */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase font-mono tracking-wider text-slate-500">Seus Processos Contratados ({cases.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((item) => {
              // Calculate specific case pending tasks to show as notifications on the selection card
              const pendingDocsCount = evidence.filter(
                (e) => (e.casoId === item.id || e.caseId === item.id) && (!e.url && !e.fileUrl)
              ).length;

              const unpaidFinanceCount = finance.filter(
                (f) => (f.casoId === item.id) && (f.status === "late")
              ).length;

              const caseProgress = item.clientExperience?.progressPercentage ?? 10;
              const casePublicStage = item.fase || item.stage || item.status || "Ativo";
              const nextStep = item.proximoPasso || "Aguardando despacho judicial";

              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedCaseId(item.id)}
                  className="bg-[#0e162d] hover:bg-[#111a31] border border-white/5 hover:border-amber-500/30 p-6 rounded-2xl cursor-pointer group flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/[0.02]"
                >
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase">
                          PROCESSO N° {item.numeroProcesso || item.caseNumber || "Em análise"}
                        </span>
                        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors leading-tight">
                          {item.titulo || item.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">{item.court || item.tribunal || ""}</p>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-amber-500/20 group-hover:text-amber-400 transition-colors shrink-0">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Progress tracking bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400 font-semibold">{casePublicStage}</span>
                        <span className="text-amber-400 font-bold">{caseProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${caseProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Next execution step */}
                    <div className="bg-[#15203d] border border-white/[0.03] p-3 rounded-xl flex gap-2 items-center">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Próxima Etapa</span>
                        <p className="text-xs text-slate-300 font-medium line-clamp-1">{nextStep}</p>
                      </div>
                    </div>
                  </div>

                  {/* Badges footer */}
                  <div className="flex items-center gap-2 pt-4 border-t border-white/5 mt-4">
                    {pendingDocsCount > 0 && (
                      <span className="text-[10px] font-mono tracking-wide bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2 shadow-sm py-1 rounded-lg flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                        {pendingDocsCount} prova{pendingDocsCount > 1 ? "s" : ""} pendente{pendingDocsCount > 1 ? "s" : ""}
                      </span>
                    )}
                    {unpaidFinanceCount > 0 && (
                      <span className="text-[10px] font-mono tracking-wide bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-1 rounded-lg flex items-center gap-1">
                        Financeiro em atraso
                      </span>
                    )}
                    {pendingDocsCount === 0 && unpaidFinanceCount === 0 && (
                      <span className="text-[10px] font-mono tracking-wide bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        Trâmite regularizado
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- SCENARIO B: MINI_DASHBOARD FOR THE DETAILED CASE ---
  if (!activeCase) {
    return (
      <div className="py-20 text-center text-slate-400">
        Nenhum caso válido encontrado.
      </div>
    );
  }

  // Establish user preference or custom metrics
  const clientExp = activeCase.clientExperience || {};
  const estimatedDays = clientExp.estimatedDurationDays ?? 120;
  const progressPerc = clientExp.progressPercentage ?? 10;
  const currentFaseLabel = clientExp.currentPhaseLabel || activeCase.fase || activeCase.stage || "Caso em acompanhamento";
  const disclaimerNotice = clientExp.expectationNotice || "O prazo pode variar conforme o Tribunal, volume processual e necessidade de manifestações adicionais.";

  // Roadmap Stages mapping
  const roadmapPhases = [
    "Atendimento inicial",
    "Análise documental",
    "Preparação jurídica",
    "Protocolo / distribuição",
    "Aguardando movimentação judicial",
    "Manifestações / exigências",
    "Decisão / conclusão"
  ];

  // Map case to roadmap index
  function getPhaseIndex(item: Caso): number {
    const custom = item.clientExperience?.currentPhase;
    if (custom) {
      const idx = roadmapPhases.findIndex(
        (p) => p.toLowerCase() === custom.toLowerCase() || p.includes(custom) || custom.includes(p)
      );
      if (idx !== -1) return idx;
    }
    
    const fallbackString = (item.fase || item.stage || item.status || "").toLowerCase();
    
    if (fallbackString.includes("inicial") || fallbackString.includes("atendimento")) return 0;
    if (fallbackString.includes("documento") || fallbackString.includes("análise") || fallbackString.includes("analise")) return 1;
    if (fallbackString.includes("preparação") || fallbackString.includes("jurídica") || fallbackString.includes("petição")) return 2;
    if (fallbackString.includes("protocolo") || fallbackString.includes("distribuição") || fallbackString.includes("distribuido")) return 3;
    if (fallbackString.includes("aguardando") || fallbackString.includes("movimentação") || fallbackString.includes("judicial") || fallbackString.includes("andamento")) return 4;
    if (fallbackString.includes("manifestação") || fallbackString.includes("exigência") || fallbackString.includes("prazo")) return 5;
    if (fallbackString.includes("decisão") || fallbackString.includes("conclusão") || fallbackString.includes("recurso") || fallbackString.includes("encerrado") || fallbackString.includes("closed")) return 6;

    return 3; // Default default protocol
  }

  // Active step in roadmap (0 to 6)
  const currentPhaseIndex = getPhaseIndex(activeCase);

  // TRIAGE ALERTS ("Atenção necessária")
  const urgentAlerts: Array<{ id: string; title: string; desc: string; link: string; actionText: string }> = [];
  const importantAlerts: Array<{ id: string; title: string; desc: string; link: string; actionText: string }> = [];

  // Rules:
  // 1. Provas pendentes
  const thisCaseEvidence = evidence.filter(e => e.casoId === activeCase.id || e.caseId === activeCase.id);
  const pendingEvidence = thisCaseEvidence.filter(e => !e.url && !e.fileUrl);
  if (pendingEvidence.length > 0) {
    urgentAlerts.push({
      id: "urg_proof",
      title: "Solicitação de Prova Pendente",
      desc: `A banca jurídica requereu o envio do documento: "${pendingEvidence[0].nome || "comprovante requerido"}". Sua inércia pode atrasar o processo.`,
      link: `/portal-cliente-giffoni/${slug}/provas`,
      actionText: "Enviar Documento"
    });
  }

  // 2. Informações pendentes
  const noticeList = expertOpinions.filter(p => p.casoId === activeCase.id || p.caseId === activeCase.id);
  // Let's check announcements
  const thisCaseNotices = meetings.filter(m => m.casoId === activeCase.id || m.caseId === activeCase.id);
  // Add simple informational query matching requirements
  if (thisCaseNotices.length > 0) {
    importantAlerts.push({
      id: "imp_reuniao",
      title: "Reunião de Alinhamento Agendada",
      desc: `Agendada reunião virtual sobre "${thisCaseNotices[0].subject || "andamento"}" em ${new Date(thisCaseNotices[0].date).toLocaleDateString("pt-BR")} às ${thisCaseNotices[0].time}h.`,
      link: `/portal-cliente-giffoni/${slug}/reunioes`,
      actionText: "Ver Agenda"
    });
  }

  // 3. Financeiro vencido / pendente
  const thisCaseFinance = finance.filter(f => f.casoId === activeCase.id);
  const lateFinance = thisCaseFinance.filter(f => f.status === "late");
  const pendingFinance = thisCaseFinance.filter(f => f.status === "pending");

  if (lateFinance.length > 0) {
    urgentAlerts.push({
      id: "urg_fin",
      title: "Financeiro em Atraso",
      desc: `Identificamos faturamento vencido no valor de R$ ${lateFinance[0].valor?.toLocaleString()} com vencimento expirado em ${new Date(lateFinance[0].vencimento).toLocaleDateString("pt-BR")}.`,
      link: `/portal-cliente-giffoni/${slug}/financeiro`,
      actionText: "Ver Fatura"
    });
  }

  if (pendingFinance.length > 0) {
    importantAlerts.push({
      id: "imp_fin",
      title: "Faturamento em Aberto",
      desc: `Parcela regular no valor de R$ ${pendingFinance[0].valor?.toLocaleString()} vence em ${new Date(pendingFinance[0].vencimento).toLocaleDateString("pt-BR")}.`,
      link: `/portal-cliente-giffoni/${slug}/financeiro`,
      actionText: "Ver Faturas"
    });
  }

  // 4. Audiência próxima
  const thisCaseAudiences = audiences.filter(a => a.casoId === activeCase.id || a.caseId === activeCase.id || a.caseNumber === activeCase.numeroProcesso || a.caseNumber === activeCase.caseNumber);
  if (thisCaseAudiences.length > 0) {
    // Treat first audience as urgent attention
    urgentAlerts.push({
      id: "urg_aud",
      title: "Ato Judicial / Audiência Designada",
      desc: `Ato de audiência confirmada para dia ${new Date(thisCaseAudiences[0].date).toLocaleDateString("pt-BR")} às ${thisCaseAudiences[0].time}h perante a ${thisCaseAudiences[0].court || "Vara Competente"}.`,
      link: `/portal-cliente-giffoni/${slug}/audiencias`,
      actionText: "Instruções do Ato"
    });
  }

  return (
    <div className="space-y-8 font-sans">
      {/* 1. TOP HEADER INFRASTRUCTURE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {cases.length > 1 && (
            <button
              onClick={() => setSelectedCaseId(null)}
              className="mb-3 text-[11px] font-mono tracking-wider font-bold text-amber-500 hover:text-white flex items-center gap-1.5 transition-colors uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retornar para todos os Casos
            </button>
          )}
          <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/15 uppercase font-mono px-3 py-1 rounded-sm font-semibold tracking-wider">
            Portal Corporativo Ativo
          </span>
          <h1 className="text-2xl font-display font-black text-white mt-3 tracking-tight">
            Seja bem-vindo, {client.nome?.split(" ")[0] || client.name?.split(" ")[0]}!
          </h1>
          <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
            Caso: <strong className="text-slate-200">{activeCase.titulo || activeCase.title}</strong> — Processo CNJ: <strong className="text-slate-200 font-mono text-xs">{activeCase.numeroProcesso || activeCase.caseNumber || "Em confecção inicial"}</strong>
          </p>
        </div>

        {/* Security badge indicator */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <div className="text-left font-mono">
            <span className="text-[9px] block text-slate-500 leading-none">Ambiente Seguro</span>
            <span className="text-[10px] text-emerald-400 font-bold leading-none">Criptografia RSA 256bits</span>
          </div>
        </div>
      </div>

      {/* 2. CASE HEADER OVERALL METRICS & DISCLAIMERS (TOP BANNER) */}
      <div className="bg-gradient-to-r from-slate-900 via-[#10172d] to-[#0c1225] rounded-3xl p-6 sm:p-8 border border-white/5 shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-[100px]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wide">Status Atual Processual</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-tight">
              {currentFaseLabel}
            </h2>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 leading-none">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                Duração Média Estimada: <strong className="text-slate-200 font-bold">{estimatedDays} dias</strong>
              </span>
              <span className="flex items-center gap-1.5 leading-none">
                <Scale className="w-4 h-4 text-indigo-400 shrink-0" />
                Fase: <strong className="text-slate-200 font-medium">{activeCase.court || activeCase.tribunal || "Tribunal competente"}</strong>
              </span>
            </div>

            {/* Premium expectation disclaimer block */}
            <div className="p-3.5 bg-[#141d38] border-l-2 border-amber-500 text-xs text-slate-400 rounded-r-xl leading-relaxed">
              <strong className="text-amber-400 font-medium block mb-1">Aviso de Expectativa Tempos e Prazos:</strong>
              {disclaimerNotice}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
            {/* Visual circular/semi-circular dynamic progress chart */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Double ring SVG */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-slate-800"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-[#f59e0b] transition-all duration-1000 ease-out"
                  strokeWidth="7"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - progressPerc / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-3xl font-black text-white block tracking-tight leading-none">
                  {progressPerc}%
                </span>
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block mt-1">
                  Evolução
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ATENÇÃO NECESSÁRIA (TRIAGE AREA) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h2 className="font-display font-bold text-white text-base">Atenção necessária</h2>
          </div>
          <span className="text-[10px] text-slate-500 font-mono uppercase">Varredura automática em tempo real</span>
        </div>

        {urgentAlerts.length === 0 && importantAlerts.length === 0 ? (
          <div className="p-6 bg-[#0e162d]/40 rounded-2xl border border-white/5 flex items-center gap-4 text-slate-400">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Seu caso está 100% atualizado</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Nenhum ato processual, pagamento em aberto ou pendência técnica jurídica requer sua atenção imediata no momento.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Render Urgent First */}
            {urgentAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="bg-[#1a121e] border border-rose-500/20 p-5 rounded-2xl flex items-start gap-4 hover:border-rose-500/40 hover:bg-[#201524] transition-all relative overflow-hidden group shadow-lg"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/[0.02] rounded-full filter blur-xl" />
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 shrink-0 relative">
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="space-y-3 flex-grow z-10">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-rose-500 font-bold block uppercase leading-none">Urgente</span>
                    <h3 className="font-bold text-white text-sm tracking-tight">{alert.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{alert.desc}</p>
                  </div>
                  <Link 
                    to={alert.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 hover:text-white transition-colors"
                  >
                    {alert.actionText} <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Render Important Seconds */}
            {importantAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="bg-[#0e162d] border border-amber-500/20 p-5 rounded-2xl flex items-start gap-4 hover:border-amber-500/40 hover:bg-[#121c38] transition-all relative overflow-hidden group shadow-lg"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/[0.01] rounded-full filter blur-xl" />
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div className="space-y-3 flex-grow z-10">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-amber-500 font-bold block uppercase leading-none">Importante</span>
                    <h3 className="font-bold text-white text-sm tracking-tight">{alert.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{alert.desc}</p>
                  </div>
                  <Link 
                    to={alert.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-white transition-colors"
                  >
                    {alert.actionText} <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. SEVENTH-STEPS ROADMAP */}
      <div className="bg-[#0e162d] border border-white/5 p-6 rounded-3xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase">Etapas do Processo</span>
            <h2 className="font-display font-bold text-white text-base">Fases e Ciclo de Vida do Caso</h2>
          </div>
          <span className="text-xs text-slate-500 font-mono font-medium">Fase {currentPhaseIndex + 1} de 7</span>
        </div>

        {/* Roadmap Display - Horizontal layout for desktop, vertical for mobile */}
        <div className="relative pt-4 overflow-x-auto pb-4 scrollbar-thin">
          <div className="min-w-[850px] lg:min-w-0 grid grid-cols-7 gap-3 relative z-10">
            {roadmapPhases.map((phase, idx) => {
              const isActive = idx === currentPhaseIndex;
              const isPast = idx < currentPhaseIndex;

              return (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center text-center space-y-2 relative group`}
                >
                  {/* Step Connector Line */}
                  {idx < 6 && (
                    <div 
                      className={`absolute top-4 left-[50%] right-[-50%] h-[2px] transition-colors duration-500 -z-10 ${
                        isPast ? "bg-amber-500" : "bg-slate-700"
                      }`} 
                    />
                  )}

                  {/* Indicator Icon/Badge */}
                  <div 
                    className={`w-9 h-9 rounded-full flex items-center justify-center border font-mono text-xs font-bold transition-all duration-300 ${
                      isActive 
                        ? "bg-amber-500 border-amber-600 text-slate-900 shadow-lg shadow-amber-500/20 scale-110" 
                        : isPast 
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-400" 
                          : "bg-slate-900 border-white/5 text-slate-500"
                    }`}
                  >
                    {isPast ? "✓" : idx + 1}
                  </div>

                  {/* Step text label */}
                  <span 
                    className={`text-[10px] leading-tight font-medium max-w-[110px] block font-sans tracking-tight transition-colors ${
                      isActive 
                        ? "text-amber-400 font-bold" 
                        : isPast 
                          ? "text-slate-300" 
                          : "text-slate-500"
                    }`}
                  >
                    {phase}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. QUICK ACTIONS SHORTCUT PANEL */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase font-mono tracking-wider text-slate-500 border-b border-white/5 pb-1">Ações rápidas e envio seguro</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to={`/portal-cliente-giffoni/${slug}/provas`}
            className="p-4 bg-[#0e162d] hover:bg-[#121c38] border border-white/5 hover:border-amber-500/20 rounded-2xl flex flex-col items-center text-center group transition-colors shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 mb-3 group-hover:scale-105 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <strong className="text-white text-xs font-bold font-sans block">Enviar documento</strong>
            <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">Cargas criptografadas</span>
          </Link>

          <Link 
            to={`/portal-cliente-giffoni/${slug}/informacoes`}
            className="p-4 bg-[#0e162d] hover:bg-[#121c38] border border-white/5 hover:border-amber-500/20 rounded-2xl flex flex-col items-center text-center group transition-colors shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <strong className="text-white text-xs font-bold font-sans block">Responder solicitação</strong>
            <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">Preencher minutas</span>
          </Link>

          <Link 
            to={`/portal-cliente-giffoni/${slug}/financeiro`}
            className="p-4 bg-[#0e162d] hover:bg-[#121c38] border border-white/5 hover:border-amber-500/20 rounded-2xl flex flex-col items-center text-center group transition-colors shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mb-3 group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <strong className="text-white text-xs font-bold font-sans block">Ver financeiro</strong>
            <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">Faturas cadastrais</span>
          </Link>

          <Link 
            to={`/portal-cliente-giffoni/${slug}/reunioes`}
            className="p-4 bg-[#0e162d] hover:bg-[#121c38] border border-white/5 hover:border-amber-500/20 rounded-2xl flex flex-col items-center text-center group transition-colors shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mb-3 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <strong className="text-white text-xs font-bold font-sans block">Solicitar reunião</strong>
            <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">Agenda de alinhamento</span>
          </Link>
        </div>
      </div>

      {/* 6. GRID COLUMN SPLIT: PUBLIC TIMELINE VS CASE PARTICULARS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Timeline Segment (Span 8) */}
        <div className="lg:col-span-8 bg-[#0e162d] border border-white/5 p-6 rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <span className="text-[10px] text-amber-400 font-mono tracking-widest block uppercase">Andamento Público do Caso</span>
                <h2 className="font-display font-bold text-white text-lg">Histórico de Andamentos e Atos</h2>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Visão Exclusiva do Cliente</span>
            </div>

            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center font-mono text-slate-500 text-xs">
                <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-2" />
                Carregando registros da timeline...
              </div>
            ) : timelineEvents.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs font-sans">
                Nenhum ato processual registrado na timeline pública.
              </div>
            ) : (
              <div className="relative pl-6 border-l border-white/5 space-y-6">
                {timelineEvents.map((event) => {
                  // Assign visual iconography based on types
                  const type = (event.type || event.tipo || "").toLowerCase();
                  let IconComponent = FileText;
                  let colorClass = "bg-slate-500/15 text-slate-400 border-slate-500/20";

                  if (type.includes("audiencia") || type.includes("audiência")) {
                    IconComponent = CalendarClock;
                    colorClass = "bg-amber-500/15 text-amber-400 border-amber-500/20";
                  } else if (type.includes("peticao") || type.includes("petição") || type.includes("protocolo")) {
                    IconComponent = FileText;
                    colorClass = "bg-indigo-500/15 text-indigo-400 border-indigo-500/20";
                  } else if (type.includes("decisao") || type.includes("decisão") || type.includes("conclusão")) {
                    IconComponent = CheckCircle2;
                    colorClass = "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
                  } else if (type.includes("manifestacao") || type.includes("manifestação") || type.includes("exigência")) {
                    IconComponent = Sparkles;
                    colorClass = "bg-purple-500/15 text-purple-400 border-purple-500/20";
                  } else if (type.includes("inicial")) {
                    IconComponent = MessageSquare;
                    colorClass = "bg-blue-500/15 text-blue-400 border-blue-500/20";
                  }

                  return (
                    <div key={event.id} className="relative group">
                      {/* Circle node connector with animated halo for the latest */}
                      <div className={`absolute -left-[37px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border ${colorClass} text-[10px]`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-bold text-white text-sm tracking-tight leading-snug">
                            {event.titulo || event.title}
                          </h4>
                          <span className="text-[10px] font-mono font-medium text-slate-500">
                            {event.data || event.date || ""}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                          {event.descricao || event.description || ""}
                        </p>
                        
                        {(event.origem || event.source) && (
                          <span className="inline-block text-[10px] bg-white/5 border border-white/5 font-mono px-2 py-0.5 rounded text-slate-400">
                            Fonte: {event.origem || event.source}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Key Contacts & Schedule Summary (Span 4) */}
        <div className="lg:col-span-4 bg-[#0e162d] border border-white/5 p-6 rounded-3xl space-y-6">
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-4">
              <span className="text-[10px] text-amber-400 font-mono tracking-widest block uppercase">Banca Responsável</span>
              <h2 className="font-display font-bold text-white text-base">Atendimento Especializado</h2>
            </div>

            {/* Dynamic scheduled components mapping */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-black">
                  G
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-none">Banca de Soluções Giffoni</h4>
                  <span className="text-[10px] text-slate-500 font-mono">Advocacia Corporativa & Cível</span>
                  <a 
                    href="https://wa.me/5581900000000" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] font-semibold text-amber-400 hover:text-white block mt-1 underline"
                  >
                    Falar com Assessoria (WhatsApp)
                  </a>
                </div>
              </div>

              {/* Next audiencia layout widget */}
              <div className="border-t border-white/5 pt-4 space-y-3">
                <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">Ato de Agenda Mais Próximo</h3>
                {thisCaseAudiences.length > 0 ? (
                  <div className="p-3.5 rounded-xl bg-[#15203d] border-l-2 border-amber-500 text-xs text-slate-300">
                    <span className="text-[9px] font-mono tracking-widest text-[#a855f7] block uppercase font-bold">
                      {thisCaseAudiences[0].type || "Audiência"}
                    </span>
                    <h5 className="font-bold text-white mt-1 leading-tight mb-1.5">
                      Processo: {thisCaseAudiences[0].caseNumber}
                    </h5>
                    <p className="text-slate-400 font-mono font-medium text-[11px] leading-relaxed">
                      Quorum: {thisCaseAudiences[0].date} @ {thisCaseAudiences[0].time}h — {thisCaseAudiences[0].court}
                    </p>
                    
                    {thisCaseAudiences[0].link && (
                      <a 
                        href={thisCaseAudiences[0].link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold hover:text-white mt-2.5 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" /> Entrar na Sala Zoom ↗
                      </a>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 block">Nenhuma audiência judicial agendada de imediato.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
