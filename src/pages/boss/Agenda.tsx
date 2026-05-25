import React, { useState } from "react";
import { Calendar, Clock, Video, Gavel, FileText, Plus, BellRing, Search, ShieldAlert } from "lucide-react";
import { MOCK_AUDIENCES, MOCK_EXPERT_OPINIONS, MOCK_MEETINGS } from "../../services/mockData";

export default function BossAgenda() {
  const [activeTab, setActiveTab] = useState<"audiences" | "opinions" | "meetings">("audiences");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-800 tracking-tight">
            Agenda do Escritório
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Controle integrado de audiências judiciais, perícias técnicas em campo e reuniões corporativas de alinhamento.
          </p>
        </div>
        <button
          onClick={() => alert("Simulando agendamento de um ato processual...")}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          Agendar Compromisso
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex flex-wrap gap-1.5 self-start">
        <button
          onClick={() => setActiveTab("audiences")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "audiences" ? "bg-amber-500 text-slate-950 font-black shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Gavel className="w-4 h-4" />
          Audiências Virtuais / Presenciais ({MOCK_AUDIENCES.length})
        </button>
        <button
          onClick={() => setActiveTab("opinions")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "opinions" ? "bg-amber-500 text-slate-950 font-black shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Search className="w-4 h-4" />
          Perícias Técnicas em Campo ({MOCK_EXPERT_OPINIONS.length})
        </button>
        <button
          onClick={() => setActiveTab("meetings")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "meetings" ? "bg-amber-500 text-slate-950 font-black shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Video className="w-4 h-4" />
          Reuniões por Videoconferência ({MOCK_MEETINGS.length})
        </button>
      </div>

      {/* Conditional layouts based on tab */}
      <div className="space-y-6">
        {activeTab === "audiences" && (
          <div className="grid grid-cols-1 gap-6">
            {MOCK_AUDIENCES.map((aud) => (
              <div key={aud.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-850 flex flex-col justify-center items-center text-white font-mono shrink-0">
                    <span className="text-[10px] leading-none uppercase font-semibold text-amber-500">Jun</span>
                    <span className="text-lg leading-none font-bold mt-1">{aud.date.split("-")[2]}</span>
                  </div>
                  <div>
                    <span className="inline-flex px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-100 text-[10px] font-mono font-bold uppercase tracking-wider">
                      Audiência de {aud.type}
                    </span>
                    <h3 className="font-display font-bold text-slate-850 text-base mt-1.5">
                      Processo: {aud.caseNumber}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Horário: {aud.time}h — Local: {aud.court}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 p-2.5 rounded bg-slate-50 border border-slate-100 max-w-2xl leading-relaxed">
                      <strong>Recomendações:</strong> {aud.notes}
                    </p>
                  </div>
                </div>

                {aud.link && (
                  <a
                    href={aud.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start md:self-auto py-2.5 px-4 rounded-xl border border-slate-200 hover:border-amber-400 text-slate-700 hover:text-amber-800 font-bold bg-white text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Video className="w-4 h-4 text-slate-500" />
                    Entrar na Sala Virtual
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "opinions" && (
          <div className="grid grid-cols-1 gap-6">
            {MOCK_EXPERT_OPINIONS.map((exp) => {
              const dateParts = exp.date.split("-");
              return (
                <div key={exp.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-850 flex flex-col justify-center items-center text-white font-mono shrink-0">
                      <span className="text-[10px] leading-none uppercase font-semibold text-sky-400">
                        {dateParts[1] === "05" ? "Mai" : "Jun"}
                      </span>
                      <span className="text-lg leading-none font-bold mt-1">{dateParts[2]}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f0f9ff] text-[#0369a1] border border-[#bae6fd] uppercase font-mono tracking-wider">
                          Especialidade: {exp.specialty}
                        </span>
                        <span className="text-xs text-indigo-600 font-mono font-bold uppercase">{exp.status === "scheduled" ? "Agendado" : "Concluído"}</span>
                      </div>

                      <h3 className="font-display font-medium text-slate-800 text-base mt-2">
                        Perito: <strong className="font-bold text-slate-900">{exp.expertName}</strong>
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">Processo ref: {exp.caseNumber}</p>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-2xl bg-sky-50/40 p-2.5 rounded-xl border border-sky-100">
                        <strong>Escopo da Perícia:</strong> {exp.notes}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "meetings" && (
          <div className="grid grid-cols-1 gap-6">
            {MOCK_MEETINGS.map((meet) => {
              const dateParts = meet.date.split("-");
              return (
                <div key={meet.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-850 flex flex-col justify-center items-center text-white font-mono shrink-0">
                      <span className="text-[10px] leading-none uppercase font-semibold text-emerald-400">Jun</span>
                      <span className="text-lg leading-none font-bold mt-1">{dateParts[2]}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-mono font-bold uppercase tracking-wider">
                          Videoconferência Google Meet
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Status: {meet.status === "scheduled" ? "Confirmada" : "Concluída"}</span>
                      </div>

                      <h3 className="font-display font-bold text-slate-850 text-base mt-2">
                        {meet.subject}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Cliente corporativo: <strong className="text-slate-700">{meet.clientName}</strong>
                      </p>
                    </div>
                  </div>

                  {meet.link && (
                    <a
                      href={meet.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start md:self-auto py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <Video className="w-4 h-4" />
                      Iniciar Reunião
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
