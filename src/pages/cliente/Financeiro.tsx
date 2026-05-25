import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClientBySlug, getDataForClient } from "../../services/mockData";
import { FinanceItem } from "../../types";
import { CreditCard, CheckCircle2, Clock, AlertTriangle, HelpCircle, FileText } from "lucide-react";

export default function ClienteFinanceiro() {
  const { slug } = useParams<{ slug: string }>();
  const [finances, setFinances] = useState<FinanceItem[]>([]);

  useEffect(() => {
    if (slug) {
      const client = getClientBySlug(slug);
      if (client) {
        const resolved = getDataForClient(client.id);
        setFinances(resolved.finance);
      }
    }
  }, [slug]);

  const getStatusLabelAndColor = (status: "paid" | "pending" | "late") => {
    if (status === "paid") {
      return { label: "Pago", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" };
    }
    if (status === "late") {
      return { label: "Atrasado", style: "bg-rose-500/10 text-rose-450 border-rose-500/10" };
    }
    return { label: "Aguardando Vencimento", style: "bg-amber-500/10 text-amber-400 border-amber-500/10" };
  };

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-display font-black text-white tracking-tight">Financeiro & Honorários</h1>
        <p className="text-slate-400 text-sm mt-1">
          Acompanhe o cronograma de parcelas e faturamento negociados sob termos de assessoria jurídica.
        </p>
      </div>

      <div className="space-y-8">
        {finances.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs bg-[#0e162d] rounded-2xl border border-white/5 space-y-3">
            <CreditCard className="w-10 h-10 text-slate-650 mx-auto" />
            <p className="font-semibold text-slate-400 text-sm">Nenhuma informação de faturamento</p>
            <p className="text-slate-500">Consulte seu advogado para conferir a minuta de honorários.</p>
          </div>
        ) : (
          finances.map((f) => (
            <div key={f.id} className="bg-[#0e162d] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
              {/* Header card metrics summary */}
              <div className="p-6 sm:p-8 bg-[#111a31] border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-wider block">Acordo de Prestação</span>
                  <h3 className="text-white font-display font-bold text-base mt-1">{f.description}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Gestão de pagamentos associada ao seu CNPJ.</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div>
                    <span className="text-[10px] text-slate-505 font-mono uppercase block">Valor Total Contrato</span>
                    <span className="font-display font-medium text-slate-200 text-sm sm:text-base">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(f.totalAmount)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-505 font-mono uppercase block">Total Quitados</span>
                    <span className="font-display font-bold text-emerald-400 text-sm sm:text-base">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(f.paidAmount)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-505 font-mono uppercase block">Restante</span>
                    <span className="font-display font-bold text-amber-500 text-sm sm:text-base">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(f.remainingAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid lists of installments */}
              <div className="p-6">
                <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest block mb-4">Parcelamento e Quitação</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {f.installments.map((inst) => {
                    const badge = getStatusLabelAndColor(inst.status);
                    return (
                      <div key={inst.number} className="p-4 rounded-xl border border-white/5 bg-[#141f3e] flex flex-col justify-between hover:border-white/10 transition-all gap-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="block text-xs font-bold text-slate-400">Parcela nº {inst.number}</span>
                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold font-mono border uppercase tracking-wide ${badge.style}`}>
                              {badge.label}
                            </span>
                          </div>
                          <span className="block text-lg font-display font-bold text-white mt-2">
                            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(inst.amount)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5 pt-3 mt-1 font-mono">
                          <span>Vencimento</span>
                          <span className="text-slate-100 font-semibold">{new Date(inst.dueDate).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
