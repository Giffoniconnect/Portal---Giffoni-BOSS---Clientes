import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getClientBySlug, getDataForClient } from "../../services/mockData";
import { Evidence } from "../../types";
import { FileText, UploadCloud, AlertCircle, CheckCircle2, XCircle, Search, Trash2 } from "lucide-react";

export default function ClienteProvas() {
  const { slug } = useParams<{ slug: string }>();
  const [client, setClient] = useState<any>(null);
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (slug) {
      const data = getClientBySlug(slug);
      if (data) {
        setClient(data);
        const resolved = getDataForClient(data.id);
        setEvidences(resolved.evidence);
      }
    }
  }, [slug]);

  // Handle Drag Events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAddNewFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleAddNewFile(e.target.files[0]);
    }
  };

  const handleAddNewFile = (file: File) => {
    if (!client) return;

    // Convert file size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);

    const created: Evidence = {
      id: `ev_added_${Date.now()}`,
      clientId: client.id,
      caseId: "case_1",
      title: file.name.split(".")[0],
      description: "Submetido pelo Portal do Cliente via upload seguro corporativo.",
      fileName: file.name,
      fileSize: `${sizeInMB} MB`,
      uploadedAt: new Date().toISOString(),
      status: "under_review"
    };

    setEvidences([created, ...evidences]);
  };

  const handleDelete = (id: string) => {
    setEvidences(prev => prev.filter(e => e.id !== id));
  };

  if (!client) {
    return (
      <div className="text-slate-400 py-12 text-center text-sm">
        Carregando provas do portal...
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-display font-black text-white tracking-tight">Anexos e Documentos Probatórios</h1>
        <p className="text-slate-400 text-sm mt-1">
          Submeta novos mídias e relatórios que servem como prova cível ou justifiquem atrasos contratuais.
        </p>
      </div>

      {/* DRAG AND DROP AREA */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all ${
          dragActive 
            ? "border-amber-400 bg-amber-500/10 scale-[1.01]" 
            : "border-white/10 hover:border-white/20 bg-[#0e162d]"
        }`}
      >
        <input 
          ref={fileInputRef}
          type="file"
          id="evidence-file-input"
          className="hidden" 
          multiple={false}
          onChange={handleFileChange}
        />
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-amber-500 mb-4 shadow-sm">
            <UploadCloud className="w-8 h-8" />
          </div>
          
          <h3 className="text-white font-display font-bold text-base">Arraste seus arquivos para esta área</h3>
          <p className="text-slate-400 text-xs mt-1.5 max-w-sm leading-relaxed">
            Suporta diários de obra, notas fiscais, relatórios técnicos periciais e imagens comprovantes em formatos PDF, ZIP ou PNG.
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-3 px-5 rounded-xl transition-all border border-white/5 shadow-md flex items-center gap-1.5"
          >
            Pesquisar Arquivo Localmente
          </button>
        </div>
      </div>

      {/* CHRONOLOGY OF FILES */}
      <div className="space-y-5">
        <h2 className="font-display font-medium text-slate-300 text-base">Meus Arquivos Registrados</h2>

        <div className="grid grid-cols-1 gap-5">
          {evidences.map((e) => {
            let badgeStyle = "bg-amber-500/10 text-amber-400 border-amber-500/10";
            let desc = "Pendente de validação dos advogados bOSS";

            if (e.status === "approved") {
              badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/15";
              desc = "Documentação oficial aprovada";
            } else if (e.status === "rejected") {
              badgeStyle = "bg-rose-500/10 text-rose-450 border-rose-500/15";
              desc = "Revisão solicitada — Contate o escritório";
            }

            return (
              <div key={e.id} className="bg-[#0e162d] border border-white/5 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 text-slate-300 rounded-xl border border-white/10 shrink-0">
                    <FileText className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-white text-sm sm:text-base leading-snug">{e.title}</h4>
                      <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded leading-none">
                        {e.fileSize}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{e.description}</p>
                    <p className="text-[10px] text-slate-405 font-mono mt-1.5 leading-none">
                      Arquivo: {e.fileName} • {new Date(e.uploadedAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeStyle} text-center`}>
                    {e.status === "approved" ? "Aprovado ✓" : e.status === "rejected" ? "Contatar Suporte ⚠" : "Em análise..."}
                  </span>

                  <button
                    onClick={() => handleDelete(e.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Excluir do feed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
