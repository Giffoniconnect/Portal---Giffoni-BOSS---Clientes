import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClientBySlug, getDataForClient } from "../../services/mockData";
import { Meeting } from "../../types";
import { Users, Clock, Video, FileWarning, CalendarRange } from "lucide-react";

export default function ClienteReunioes() {
  const { slug } = useParams<{ slug: string }>();
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    if (slug) {
      const client = getClientBySlug(slug);
      if (client) {
        const resolved = getDataForClient(client.id);
        setMeetings(resolved.meetings);
      }
    }
  }, [slug]);

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-display font-black text-white tracking-tight">Reuniões Agendadas</h1>
        <p className="text-slate-400 text-sm mt-1">
          Calendário de consultas jurídicas e reuniões de alinhamento com seu advogado responsável.
        </p>
      </div>

      <div className="space-y-6">
        {meetings.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs bg-[#0e162d] rounded-2xl border border-white/5 space-y-3">
            <CalendarRange className="w-10 h-10 text-slate-650 mx-auto" />
            <p className="font-semibold text-slate-400 text-sm">Nenhuma reunião corporativa agendada</p>
            <p className="text-slate-500">Contate nosso escritório para abrir um espaço na nossa agenda virtual.</p>
          </div>
        ) : (
          meetings.map((meet) => (
            <div key={meet.id} className="bg-[#0e162d] border border-white/5 rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-lg transition-all">
              <div className="flex gap-4 items-start w-full">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/10 font-bold font-mono text-center text-xs shrink-0 select-none">
                  MEE <br /> MTG
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/10">
                      Consulta Remota Segura
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Status: Confirmada</span>
                  </div>

                  <h3 className="font-display font-bold text-white text-base mt-2.5">
                    Assunto: {meet.subject}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 text-xs text-slate-400 font-medium">
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                      Horário: {meet.time}h — Data: {new Date(meet.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>

              {meet.link && (
                <a
                  href={meet.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-auto shrink-0 py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all rounded-xl text-xs flex items-center justify-center gap-2 shadow-md text-center"
                >
                  <Video className="w-4 h-4" />
                  Conectar via Google Meet
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
