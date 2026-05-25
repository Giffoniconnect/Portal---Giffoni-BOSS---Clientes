import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClientBySlug, getDataForClient } from "../../services/mockData";
import { Audience } from "../../types";
import { Calendar, Clock, MapPin, Video, Gavel, FileWarning } from "lucide-react";

export default function ClienteAudiencias() {
  const { slug } = useParams<{ slug: string }>();
  const [audiences, setAudiences] = useState<Audience[]>([]);

  useEffect(() => {
    if (slug) {
      const client = getClientBySlug(slug);
      if (client) {
        const resolved = getDataForClient(client.id);
        setAudiences(resolved.audiences);
      }
    }
  }, [slug]);

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-display font-black text-white tracking-tight">Audiências Judiciais</h1>
        <p className="text-slate-400 text-sm mt-1">
          Consulte o calendário oficial das salas e links de audiência designados pelo tribunal.
        </p>
      </div>

      <div className="space-y-6">
        {audiences.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs bg-[#0e162d] rounded-2xl border border-white/5 space-y-3">
            <FileWarning className="w-10 h-10 text-slate-650 mx-auto" />
            <p className="font-semibold text-slate-400 text-sm">Nenhuma audiência judicial marcada</p>
            <p className="text-slate-500">Seu caso está em fase onde não há audiência programada.</p>
          </div>
        ) : (
          audiences.map((aud) => (
            <div key={aud.id} className="bg-[#0e162d] border border-white/5 rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/10 font-bold font-mono text-center text-xs shrink-0 select-none">
                  VAL <br /> JUN
                </div>
                <div>
                  <span className="inline-flex px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-amber-500/10">
                    Audiência Virtual de {aud.type}
                  </span>
                  <h3 className="font-display font-bold text-white text-base mt-2">
                    Processo nº: {aud.caseNumber}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 text-xs text-slate-400">
                    <p className="flex items-center gap-1.5 font-semibold">
                      <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                      Horário: {aud.time}h (Fuso Legal de Brasília-DF)
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-505 shrink-0" />
                      Tribunal: {aud.court}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 mt-4 leading-relaxed p-3.5 bg-indigo-950/20 rounded-xl border border-[#1e293b]/70 max-w-3xl">
                    <strong>Recomendações dos Advogados Giffoni:</strong> {aud.notes}
                  </p>
                </div>
              </div>

              {aud.link && (
                <a
                  href={aud.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-auto self-start lg:self-auto shrink-0 py-3 px-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-all rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Video className="w-4 h-4" />
                  Entrar na Sala Virtual
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
