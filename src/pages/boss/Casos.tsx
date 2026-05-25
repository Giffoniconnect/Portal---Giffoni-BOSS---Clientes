import React, { useState } from "react";
import { Briefcase, Plus, Search, Scale, CalendarClock, BookOpen, AlertCircle } from "lucide-react";
import { MOCK_CASES, MOCK_CLIENTS } from "../../services/mockData";
import { LegalCase } from "../../types";

export default function BossCasos() {
  const [cases, setCases] = useState<LegalCase[]>(MOCK_CASES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");

  const [newCase, setNewCase] = useState({
    clientId: MOCK_CLIENTS[0]?.id || "",
    caseNumber: "",
    title: "",
    court: "",
    stage: "",
    description: "",
    status: "active" as "active" | "suspended" | "closed"
  });

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCase.title || !newCase.caseNumber) return;

    const selectedClient = MOCK_CLIENTS.find(c => c.id === newCase.clientId);
    const created: LegalCase = {
      id: `case_${Date.now()}`,
      clientId: newCase.clientId,
      clientName: selectedClient ? selectedClient.name : "Cliente Desconhecido",
      caseNumber: newCase.caseNumber,
      title: newCase.title,
      court: newCase.court || "Foro da Capital de São Paulo - Juízo Cível",
      stage: newCase.stage || "Fase de Petição Inicial",
      description: newCase.description || "Descrição detalhada do caso no bOSS.",
      status: newCase.status,
      lastUpdate: new Date().toISOString()
    };

    setCases([created, ...cases]);
    setShowAddModal(false);
    setNewCase({
      clientId: MOCK_CLIENTS[0]?.id || "",
      caseNumber: "",
      title: "",
      court: "",
      stage: "",
      description: "",
      status: "active"
    });
  };

  const filtered = cases.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.caseNumber.includes(search) ||
    c.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-800 tracking-tight">
            Casos Jurídicos e Processuais
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Controle e andamento de ações judiciais e procedimentos de arbitragem corporativa.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          Distribuir Novo Caso
        </button>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input 
          type="text" 
          placeholder="Procure por título, número do processo ou nome da corporação..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-6">
        {filtered.map((item) => {
          let statusBadge = "bg-emerald-50 text-emerald-700 border-emerald-100";
          if (item.status === "suspended") statusBadge = "bg-amber-50 text-amber-700 border-amber-100";
          if (item.status === "closed") statusBadge = "bg-slate-100 text-slate-600 border-slate-200";

          return (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-indigo-400/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-indigo-600 font-bold tracking-wide uppercase">
                      Processo Jurídico
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-xs text-slate-400 font-semibold">{item.caseNumber}</span>
                  </div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${statusBadge} self-start`}>
                    {item.status === "active" ? "Em Andamento" : item.status === "suspended" ? "Suspenso" : "Arquivado"}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-display font-bold text-slate-850 text-xl tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Cliente: <strong className="text-slate-700 font-bold">{item.clientName}</strong>
                  </p>
                </div>

                <p className="mt-4 text-slate-600 text-sm leading-relaxed max-w-5xl">
                  {item.description}
                </p>

                {/* Sub-details box */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 mt-6 pt-5 text-sm">
                  <div className="flex items-center gap-2.5">
                    <Scale className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-mono font-semibold">Fórum competente</span>
                      <span className="font-medium text-slate-700 inline-block truncate max-w-[200px]">{item.court}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-mono font-semibold">Andamento atual</span>
                      <span className="font-medium text-slate-700">{item.stage}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <CalendarClock className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-mono font-semibold">Última movimentação</span>
                      <span className="font-mono text-xs text-slate-600 font-medium">
                        {new Date(item.lastUpdate).toLocaleDateString("pt-BR", { hour: "numeric", minute: "numeric" })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show adding modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-150 flex items-center justify-between bg-slate-50">
              <h3 className="font-display font-bold text-slate-800 text-lg">Distribuir Novo Caso</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                Fechar
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Associar Cliente *</label>
                <select
                  required
                  value={newCase.clientId}
                  onChange={(e) => setNewCase({...newCase, clientId: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                >
                  {MOCK_CLIENTS.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Título da Ação Judicial *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Ação Rescisória de Contrato de Mão de Obra"
                  value={newCase.title}
                  onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Número do Processo (CNJ) *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: 0002345-12.2025.8.26.0100"
                  value={newCase.caseNumber}
                  onChange={(e) => setNewCase({...newCase, caseNumber: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Instância ou Tribunal</label>
                  <input 
                    type="text" 
                    placeholder="Ex: 12ª Vara Cível - SP"
                    value={newCase.court}
                    onChange={(e) => setNewCase({...newCase, court: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Fase Processual Atual</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Concluso para Sentença"
                    value={newCase.stage}
                    onChange={(e) => setNewCase({...newCase, stage: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Status Geral</label>
                <select
                  value={newCase.status}
                  onChange={(e) => setNewCase({...newCase, status: e.target.value as any})}
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value="active">Ativo (Em Andamento)</option>
                  <option value="suspended">Suspenso</option>
                  <option value="closed">Arquivado / Baixado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Resumo / Detalhes de bOSS</label>
                <textarea 
                  rows={3}
                  placeholder="Descreva as petições providenciadas, prazos correntes ou informações gerais que o cliente visualizará no dashboard..."
                  value={newCase.description}
                  onChange={(e) => setNewCase({...newCase, description: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-150 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold"
                >
                  Distribuir Ação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
