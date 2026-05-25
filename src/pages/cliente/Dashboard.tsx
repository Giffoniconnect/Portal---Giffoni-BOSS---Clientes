import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  FolderOpen, 
  CalendarClock, 
  CreditCard, 
  FileCheck, 
  ArrowUpRight, 
  Video, 
  AlertCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import { getClientBySlug, getDataForClient } from "../../services/mockData";

export default function ClienteDashboard() {
  const { slug } = useParams<{ slug: string }>();
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      const client = getClientBySlug(slug);
      if (client) {
        setClientData(getDataForClient(client.id));
      }
    }
  }, [slug]);

  if (!clientData) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400 font-medium">
        Carregando informações do portal...
      </div>
    );
  }

  const { client, cases, evidence, audiences, expertOpinions, meetings, finance } = clientData;

  const totalCases = cases.length;
  const pendingFilesCount = evidence.filter((e: any) => e.status === "under_review").length;
  const upcomingAudiencesCount = audiences.length;

  // Next meeting or hearing overview
  const nextAudience = audiences[0];
  const nextMeeting = meetings[0];

  return (
    <div className="space-y-8 font-sans">
      {/* Visual greeting card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-[#0c1325] rounded-3xl p-6 sm:p-8 border border-white/5 shadow-xl relative overflow-hidden">
        {/* Decorative ambient blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full filter blur-[80px]" />
        
        <div className="relative">
          <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/15 uppercase font-mono px-3 py-1 rounded-sm font-semibold tracking-wider">
            Portal Corporativo Ativo
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white mt-4 tracking-tight">
            Seja bem-vindo, {client?.name?.split(" ")[0]}!
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Acompanhe o status processual, apresente provas cabíveis, consulte minutas de honorários e interaja com nossa equipe técnica de forma criptografada.
          </p>
        </div>
      </div>

      {/* Grid quick indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0e162d] border border-white/5 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Processos em Trâmite</span>
            <h3 className="text-2xl font-display font-bold text-white mt-1">{totalCases}</h3>
            <span className="text-[11px] text-slate-400 block mt-1">Giffoni Advocacia Ativa</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-400">
            <FolderOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0e162d] border border-white/5 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Minhas Provas Ativas</span>
            <h3 className="text-2xl font-display font-bold text-white mt-1">{evidence.length}</h3>
            <span className="text-[11px] text-slate-400 block mt-1">{pendingFilesCount} sob avaliação</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-amber-500">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0e162d] border border-white/5 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Audiências Próximas</span>
            <h3 className="text-2xl font-display font-bold text-white mt-1">{upcomingAudiencesCount}</h3>
            <span className="text-[11px] text-slate-400 block mt-1">Agendadas na comarca</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/11 flex items-center justify-center text-emerald-400">
            <CalendarClock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0e162d] border border-white/5 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Faturamento Aberto</span>
            <h3 className="text-2xl font-display font-bold text-white mt-1">
              R$ {finance.reduce((sum: number, f: any) => sum + f.remainingAmount, 0).toLocaleString()}
            </h3>
            <span className="text-[11px] text-slate-400 block mt-1">Honorários regulares</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/10 flex items-center justify-center text-rose-400">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main split: left schedules, right processes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Agenda & Contacts) - Span 5 */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0e162d] border border-white/5 p-6 rounded-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-white text-base">Atos e Audiências do Canal</h2>
              <span className="text-[10px] text-[#a855f7] font-mono leading-none">SEU CALENDÁRIO</span>
            </div>

            {nextAudience ? (
              <div className="p-4 rounded-xl bg-[#141f3e] border border-white/5 relative group overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/15 text-amber-400 text-xs font-mono font-bold text-center">
                    {nextAudience.date.split("-")[2]}<br />Jun
                  </div>
                  <div>
                    <span className="text-[10px] bg-amber-500/15 text-amber-400 font-mono px-1.5 py-0.5 rounded font-semibold uppercase">{nextAudience.type}</span>
                    <h3 className="font-bold text-white text-sm mt-1.5 leading-snug">Processo CNJ: {nextAudience.caseNumber}</h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Horário: {nextAudience.time}h — {nextAudience.court}
                    </p>
                  </div>
                </div>

                {nextAudience.link && (
                  <div className="mt-4 pt-3.5 border-t border-white/5 flex">
                    <a
                      href={nextAudience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-amber-400 hover:text-white flex items-center gap-1.5"
                    >
                      <Video className="w-4 h-4 text-amber-500" />
                      Acionar Sala Virtual por Zoom ↗
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 text-center text-slate-500 text-xs">
                Nenhuma audiência agendada no momento.
              </div>
            )}

            {/* Next Meeting or Appointment */}
            {nextMeeting && (
              <div className="p-4 rounded-xl bg-[#111a31] border border-white/5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">Reunião de Alinhamento</span>
                    <h4 className="font-medium text-slate-200 text-xs mt-1 leading-snug">{nextMeeting.subject}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                      Data: {new Date(nextMeeting.date).toLocaleDateString("pt-BR")} às {nextMeeting.time}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (List of active processes) - Span 7 */}
        <div className="lg:col-span-7 bg-[#0e162d] border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <h2 className="font-display font-bold text-white text-base">Histórico de Andamentos Ativos</h2>
                <p className="text-xs text-slate-500 mt-0.5">Clique nas abas laterais para visualizar as provas anexadas.</p>
              </div>
              <Link
                to={`/portal-cliente-giffoni/${slug}/casos`}
                className="text-xs font-bold text-amber-400 hover:text-[#fff]"
              >
                Ver Todos
              </Link>
            </div>

            <div className="divide-y divide-white/5">
              {cases.map((item: any) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">{item.caseNumber}</span>
                    <h4 className="font-bold text-slate-100 text-sm leading-tight">{item.title}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <span>Vara competente: {item.court}</span>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 bg-white/5 border border-white/10 text-slate-300 rounded-lg font-mono tracking-wide shrink-0 font-medium select-none">
                    {item.stage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
