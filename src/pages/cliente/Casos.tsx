import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClientBySlug, getDataForClient } from "../../services/mockData";
import { Briefcase, Gavel, FileCheck, Landmark, MessageSquareText, ShieldAlert } from "lucide-react";

export default function ClienteCasos() {
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
      <div className="text-slate-400 py-12 text-center text-sm">
        Carregando casos do portal...
      </div>
    );
  }

  const { cases } = clientData;

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-display font-black text-white tracking-tight">Casos e Processos Ativos</h1>
        <p className="text-slate-400 text-sm mt-1">
          Acompanhe o andamento judicial oficial das demandas distribuídas em tribunais competentes.
        </p>
      </div>

      <div className="space-y-6">
        {cases.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs bg-[#0e162d] rounded-2xl border border-white/5">
            Nenhuma demanda judicial registrada para este cliente corporativo.
          </div>
        ) : (
          cases.map((item: any) => (
            <div 
              key={item.id} 
              className="bg-[#0e162d] border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 font-mono px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                      Jurisdição Cível / Federal
                    </span>
                    <span className="text-slate-500 text-xs">•</span>
                    <span className="text-slate-400 font-mono text-xs">{item.caseNumber}</span>
                  </div>
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 self-start sm:self-auto select-none">
                    Status: Ativo
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="font-display font-bold text-white text-xl tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Juízo Arbitral ou Judicial Competente: <strong className="text-slate-200">{item.court}</strong>
                  </p>
                </div>

                <p className="mt-4 text-slate-300 text-sm leading-relaxed max-w-4xl font-normal text-slate-350">
                  {item.description}
                </p>

                {/* Tracking bar representation */}
                <div className="border-t border-white/5 mt-6 pt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <Landmark className="w-4 h-4 text-slate-505" />
                    <div>
                      <span className="block text-[9px] text-slate-550 uppercase tracking-widest font-mono">Último Andamento Registrado</span>
                      <span className="text-slate-200 font-semibold">{item.stage}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MessageSquareText className="w-4 h-4 text-slate-505" />
                    <div>
                      <span className="block text-[9px] text-slate-550 uppercase tracking-widest font-mono">Orientação Legal do Advogado</span>
                      <span className="text-slate-200">Em petição conjunta de renegociação recursal.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
