import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClientBySlug, getDataForClient } from "../../services/mockData";
import { ExpertOpinion } from "../../types";
import { Search, MapPin, Clock, CalendarCheck, ShieldAlert, Award } from "lucide-react";

export default function ClientePericias() {
  const { slug } = useParams<{ slug: string }>();
  const [opinions, setOpinions] = useState<ExpertOpinion[]>([]);

  useEffect(() => {
    if (slug) {
      const client = getClientBySlug(slug);
      if (client) {
        const resolved = getDataForClient(client.id);
        setOpinions(resolved.expertOpinions);
      }
    }
  }, [slug]);

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-display font-black text-white tracking-tight">Perícias Técnicas em Campo</h1>
        <p className="text-slate-400 text-sm mt-1">
          Acompanhe as vistorias agendadas por peritos judiciais para verificação técnica do objeto do processo.
        </p>
      </div>

      <div className="space-y-6">
        {opinions.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs bg-[#0e162d] rounded-2xl border border-white/5 space-y-3">
            <Search className="w-10 h-10 text-slate-650 mx-auto" />
            <p className="font-semibold text-slate-400 text-sm">Nenhuma perícia técnica agendada</p>
            <p className="text-slate-500">Seu caso atualmente não requer vistoria por auxiliar da Justiça.</p>
          </div>
        ) : (
          opinions.map((exp) => (
            <div key={exp.id} className="bg-[#0e162d] border border-white/5 rounded-2xl p-6 flex flex-col items-start justify-between gap-6 dark:hover:border-white/10 transition-all">
              <div className="flex gap-4 items-start w-full">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/10 font-bold font-mono text-center text-xs shrink-0 select-none">
                  PER <br /> TEC
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-indigo-500/10">
                      Especialidade pericial: {exp.specialty}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Processo ref: {exp.caseNumber}</span>
                  </div>

                  <h3 className="font-display font-bold text-white text-base mt-2.5">
                    Nome do Perito Judicial: <strong className="text-amber-500">{exp.expertName}</strong>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs text-slate-400">
                    <p className="flex items-center gap-1.5 font-semibold">
                      <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                      Horário: {exp.time}h — Data: {new Date(exp.date).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="flex items-center gap-1.5 font-semibold text-indigo-400">
                      <Award className="w-4 h-4 text-indigo-400 shrink-0" />
                      Status: {exp.status === "scheduled" ? "Agendada / Confirmada" : "Inquérito Concluído ✓"}
                    </p>
                  </div>

                  <p className="text-xs text-slate-350 mt-5 leading-relaxed p-4 bg-indigo-950/20 rounded-xl border border-[#1e293b]/50">
                    <strong>Informações Importantes sobre a Vistoria:</strong> {exp.notes}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
