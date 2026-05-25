import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClientBySlug } from "../../services/mockData";
import { Building2, Save, Mail, Phone, MapPin, CheckCircle2, Copy } from "lucide-react";

export default function ClienteDados() {
  const { slug } = useParams<{ slug: string }>();
  const [client, setClient] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const data = getClientBySlug(slug);
      setClient(data || null);
    }
  }, [slug]);

  if (!client) {
    return (
      <div className="text-slate-400 py-12 text-center text-sm">
        Carregando dados da empresa...
      </div>
    );
  }

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-display font-black text-white tracking-tight">Meus Dados Cadastrais</h1>
        <p className="text-slate-400 text-sm mt-1">
          Revise as informações de sua empresa fornecidas para qualificação processual jurídica.
        </p>
      </div>

      <div className="max-w-3xl bg-[#0e162d] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-[#111a31]">
          <Building2 className="w-5 h-5 text-amber-500" />
          <h2 className="font-display font-bold text-slate-100 text-base">Ficha de Qualificação Cadastral</h2>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Info Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">Nome de Exibição</span>
              <div className="text-slate-200 font-bold mt-1 text-base">{client.name}</div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">CPF ou CNPJ de Contrato</span>
              <div className="text-slate-200 font-mono font-semibold mt-1 text-sm flex items-center gap-2">
                <span>{client.cpfCnpj}</span>
                <button
                  onClick={() => handleCopy(client.cpfCnpj, "cnpj")}
                  className="p-1 rounded hover:bg-white/5 text-slate-500 hover:text-amber-400 transition-colors"
                  title="Copiar CNPJ"
                >
                  <span className="text-[10px] font-bold font-sans">
                    {copiedField === "cnpj" ? "Copiado!" : "Copiar"}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">Endereço de Correspondência</span>
              <div className="text-slate-300 font-medium mt-1 leading-relaxed text-xs sm:text-sm">{client.address}</div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">Telefone de Contato Principal</span>
              <div className="text-slate-300 font-semibold mt-1 text-xs sm:text-sm">{client.phone}</div>
            </div>

            <div className="sm:col-span-2">
              <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">Email Fiscal / Faturamento</span>
              <div className="text-slate-300 font-semibold mt-1 text-xs sm:text-sm">{client.email}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-slate-400 leading-relaxed max-w-2xl">
            <p>
              <strong>Atenção à qualificação:</strong> Para alteração cadastral que impacte a distribuição processual, favor entrar em contato diretamente com o escritório ligando no suporte para emissão de petição corretiva.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
