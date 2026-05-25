import React, { useState } from "react";
import { FileText, Eye, CheckCircle2, XCircle, AlertCircle, Search, Download } from "lucide-react";
import { MOCK_EVIDENCE, MOCK_CLIENTS } from "../../services/mockData";
import { Evidence } from "../../types";

export default function BossProvas() {
  const [evidences, setEvidences] = useState<Evidence[]>(MOCK_EVIDENCE);
  const [filter, setFilter] = useState<"all" | "under_review" | "approved" | "rejected">("all");
  const [search, setSearch] = useState("");

  const updateStatus = (id: string, nextStatus: "approved" | "rejected" | "under_review") => {
    setEvidences(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const getClientName = (clientId: string) => {
    return MOCK_CLIENTS.find(c => c.id === clientId)?.name || "Cliente Corporativo";
  };

  const filtered = evidences.filter(item => {
    const matchesFilter = filter === "all" || item.status === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          (item.fileName && item.fileName.toLowerCase().includes(search.toLowerCase())) ||
                          getClientName(item.clientId).toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-black text-slate-800 tracking-tight">
          Gestão de Provas e Documentos
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Aprove, indefira ou revise arquivos probatórios enviados pelos clientes ou gerados pela assistência técnica.
        </p>
      </div>

      {/* Filter bar splits */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
        <div className="bg-white border border-slate-200 p-1.5 rounded-xl flex gap-1.5 self-start">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${filter === "all" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"}`}
          >
            Todos ({evidences.length})
          </button>
          <button
            onClick={() => setFilter("under_review")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${filter === "under_review" ? "bg-amber-500 text-slate-950" : "text-slate-500 hover:text-slate-700"}`}
          >
            Pendente Revisão ({evidences.filter(e => e.status === "under_review").length})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${filter === "approved" ? "bg-emerald-600 text-white" : "text-slate-500 hover:text-slate-700"}`}
          >
            Aprovados ({evidences.filter(e => e.status === "approved").length})
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${filter === "rejected" ? "bg-red-650 text-white" : "text-slate-500 hover:text-slate-700"}`}
          >
            Indeferidos ({evidences.filter(e => e.status === "rejected").length})
          </button>
        </div>

        {/* Input Search */}
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-3 md:w-80">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Buscar por arquivo ou cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-slate-700 placeholder-slate-400 focus:ring-0"
          />
        </div>
      </div>

      {/* List items of documents */}
      <div className="grid grid-cols-1 gap-6">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <AlertCircle className="w-12 h-12 text-slate-350 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">Nenhum documento localizado</p>
            <p className="text-xs text-slate-400 mt-1">Refine seus termos de busca ou mude o filtro superior.</p>
          </div>
        ) : (
          filtered.map((item) => {
            let statusIcon = <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />;
            let statusText = "Em análise jurídica";
            let rowStyle = "border-l-4 border-l-amber-500";

            if (item.status === "approved") {
              statusIcon = <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
              statusText = "Aprovado para instrução";
              rowStyle = "border-l-4 border-l-emerald-500";
            } else if (item.status === "rejected") {
              statusIcon = <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
              rowStyle = "border-l-4 border-l-rose-500";
              statusText = "Recusado / Solicitar novo arquivo";
            }

            return (
              <div key={item.id} className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-md transition-all ${rowStyle}`}>
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-800 text-base tracking-tight truncate max-w-sm sm:max-w-md">{item.title}</h3>
                      <span className="text-[10px] bg-slate-150 text-slate-500 font-mono px-2 py-0.5 rounded flex items-center gap-1">
                        {item.fileSize || "1.0 MB"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Cliente: <strong className="text-slate-600 font-semibold">{getClientName(item.clientId)}</strong>
                    </p>

                    <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed max-w-3xl">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2.5 mt-3 text-xs font-medium text-slate-400">
                      <span>Arquivo: <strong className="text-slate-600 font-mono text-[11px]">{item.fileName || "documento.pdf"}</strong></span>
                      <span>•</span>
                      <span>Enviado em: {new Date(item.uploadedAt).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                </div>

                {/* Status indicator and actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0 w-full lg:w-auto">
                  <div className="flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600 px-3 self-start lg:self-auto font-medium">
                    {statusIcon}
                    <span>{statusText}</span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => alert(`Simulando download do arquivo: ${item.fileName}`)}
                      className="flex-1 sm:flex-initial p-2 px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 bg-white transition-all flex items-center justify-center gap-1.5 text-xs font-semibold"
                      title="Fazer download"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar</span>
                    </button>

                    {item.status === "under_review" ? (
                      <>
                        <button
                          onClick={() => updateStatus(item.id, "approved")}
                          className="flex-1 sm:flex-initial p-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all flex items-center justify-center gap-1 text-xs font-semibold"
                        >
                          Aprovar
                        </button>
                        <button
                          onClick={() => updateStatus(item.id, "rejected")}
                          className="flex-1 sm:flex-initial p-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-all flex items-center justify-center gap-1 text-xs font-semibold"
                        >
                          Rejeitar
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => updateStatus(item.id, "under_review")}
                        className="flex-1 sm:flex-initial p-2 px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-all text-xs font-semibold"
                      >
                        Reavaliar documento
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
