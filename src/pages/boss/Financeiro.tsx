import React, { useState } from "react";
import { DollarSign, CheckCircle2, TrendingUp, AlertTriangle, CreditCard, Clock, Sparkles } from "lucide-react";
import { MOCK_FINANCE } from "../../services/mockData";
import { FinanceItem } from "../../types";

export default function BossFinanceiro() {
  const [finances, setFinances] = useState<FinanceItem[]>(MOCK_FINANCE);

  const toggleInstallmentStatus = (financeId: string, installmentNumber: number) => {
    setFinances(prev => prev.map(item => {
      if (item.id === financeId) {
        const nextInstallments = item.installments.map(inst => {
          if (inst.number === installmentNumber) {
            const nextStatus = inst.status === "paid" ? "pending" : "paid";
            return { ...inst, status: nextStatus };
          }
          return inst;
        });

        // Recalculate paid and remaining amounts
        const paidAmount = nextInstallments
          .filter(i => i.status === "paid")
          .reduce((sum, current) => sum + current.amount, 0);
        const remainingAmount = item.totalAmount - paidAmount;
        const status = remainingAmount === 0 ? "paid" : "pending";

        return {
          ...item,
          installments: nextInstallments,
          paidAmount,
          remainingAmount,
          status
        };
      }
      return item;
    }));
  };

  const getStatusBadge = (status: "paid" | "pending" | "late") => {
    if (status === "paid") return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (status === "late") return "bg-rose-50 text-rose-700 border-rose-100";
    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-display font-black text-slate-800 tracking-tight">
          Faturamento e Honorários bOSS
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Acompanhe parcelamentos corporativos, repasses, honorários pro labore e ad êxito negociados com clientes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Receita Recorrente Estimada</span>
            <span className="text-2xl font-display font-bold text-slate-800 block mt-1">R$ 237.000,00</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold">
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Adimplemento em Carteira</span>
            <span className="text-2xl font-display font-bold text-emerald-600 block mt-1">R$ 141.000,00</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Faturas em Aberto</span>
            <span className="text-2xl font-display font-bold text-amber-600 block mt-1">R$ 96.000,00</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Contracts table list */}
      <div className="space-y-6">
        {finances.map((fin) => (
          <div key={fin.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
            {/* Header row of contract row */}
            <div className="p-6 border-b border-slate-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
              <div>
                <span className="text-[10px] text-indigo-600 font-mono font-bold uppercase tracking-wider">Contrato de Assistência</span>
                <h3 className="text-lg font-display font-bold text-slate-800 mt-1">{fin.description}</h3>
                <p className="text-xs text-slate-400">Cliente: <strong className="text-slate-600 font-semibold">{fin.clientName}</strong></p>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Valor Total</span>
                  <span className="font-display font-bold text-slate-800">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(fin.totalAmount)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Pago</span>
                  <span className="font-display font-bold text-emerald-600">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(fin.paidAmount)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block font-bold">Pendência</span>
                  <span className="font-display font-bold text-amber-600">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(fin.remainingAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Installments grid / list inside bOSS */}
            <div className="p-6">
              <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest block mb-4">Parcelas e Recebimento</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {fin.installments.map((inst) => (
                  <div 
                    key={inst.number} 
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50 flex flex-col justify-between hover:border-slate-300 transition-all text-center relative overflow-hidden group"
                  >
                    <div>
                      <span className="block text-xs font-bold text-slate-400">Parcela {inst.number}</span>
                      <span className="block text-sm font-display font-bold text-slate-800 mt-1">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(inst.amount)}
                      </span>
                      <span className="block text-[10px] text-slate-500 font-mono mt-0.5">Venc: {new Date(inst.dueDate).toLocaleDateString("pt-BR")}</span>
                    </div>

                    <div className="mt-3.5">
                      <button
                        onClick={() => toggleInstallmentStatus(fin.id, inst.number)}
                        className={`w-full py-1.5 px-2 rounded-lg text-[10px] font-bold tracking-wider transition-all border ${
                          inst.status === "paid"
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white border-transparent"
                            : "bg-white hover:bg-emerald-50 border-slate-200 text-amber-600 hover:text-emerald-600 hover:border-emerald-200"
                        }`}
                      >
                        {inst.status === "paid" ? "PAGO ✓" : "PENDENTE ⚡"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
