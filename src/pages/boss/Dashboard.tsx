import React from "react";
import { 
  Users, 
  Briefcase, 
  FileText, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Gavel, 
  FolderLock
} from "lucide-react";
import { MOCK_CLIENTS, MOCK_CASES, MOCK_EVIDENCE, MOCK_AUDIENCES, MOCK_FINANCE } from "../../services/mockData";
import { Link } from "react-router-dom";

export default function BossDashboard() {
  const activeClients = MOCK_CLIENTS.filter(c => c.status === "active").length;
  const totalCases = MOCK_CASES.length;
  const pendingEvidences = MOCK_EVIDENCE.filter(e => e.status === "under_review").length;
  const totalAudiences = MOCK_AUDIENCES.length;

  const totalRevenue = MOCK_FINANCE.reduce((acc, current) => acc + current.totalAmount, 0);
  const totalPaid = MOCK_FINANCE.reduce((acc, current) => acc + current.paidAmount, 0);
  const totalPending = totalRevenue - totalPaid;

  return (
    <div className="space-y-8">
      {/* Title block */}
      <div>
        <h1 className="text-3xl font-display font-black text-slate-800 tracking-tight">
          Painel de Controle bOSS
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Bem-vindo à central de inteligência jurídica da Giffoni Advocacia. Gerencie clientes, mídias e faturamento em tempo real.
        </p>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">Clientes Ativos</span>
            <h3 className="text-3xl font-display font-bold text-slate-800 mt-1">{activeClients}</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">▲ 100% de atividade</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">Processos Ativos</span>
            <h3 className="text-3xl font-display font-bold text-slate-800 mt-1">{totalCases}</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Distribuídos em 3 comarcas</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">Novas Provas</span>
            <h3 className="text-3xl font-display font-bold text-slate-800 mt-1">{pendingEvidences}</h3>
            <p className="text-xs text-rose-600 font-semibold mt-1">Ações pendentes de perícia</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50/70 border border-rose-100 flex items-center justify-center text-rose-600">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">Atos de Agenda</span>
            <h3 className="text-3xl font-display font-bold text-slate-800 mt-1">{totalAudiences}</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Próximos 30 dias</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Financial Quick Glance Row */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div>
          <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest font-bold">Saúde Financeira do bOSS</span>
          <h2 className="text-2xl font-display font-bold text-white mt-1">Receita de Honorários Projetada</h2>
          <p className="text-slate-400 text-xs mt-1">Valores contratados, recolhidos e pendentes em carteira ativa.</p>
        </div>
        <div className="flex flex-wrap gap-8 shrink-0 w-full md:w-auto justify-between md:justify-end">
          <div className="border-l border-slate-800 pl-4 min-w-[100px]">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Total Contratado</span>
            <span className="text-xl font-display font-bold text-slate-100">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalRevenue)}
            </span>
          </div>
          <div className="border-l border-slate-800 pl-4 min-w-[100px]">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Total Recebido</span>
            <span className="text-xl font-display font-bold text-emerald-400">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalPaid)}
            </span>
          </div>
          <div className="border-l border-slate-800 pl-4 min-w-[100px]">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">A Receber</span>
            <span className="text-xl font-display font-bold text-amber-400">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalPending)}
            </span>
          </div>
        </div>
      </div>

      {/* Table: Recent Legal Cases inside Backoffice */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-slate-800 text-lg">Distribuição de Processos Ativos</h2>
            <p className="text-xs text-slate-500">Últimas atualizações processuais registradas.</p>
          </div>
          <Link 
            to="/portal-boss/casos" 
            className="text-xs font-semibold text-amber-600 hover:text-amber-700 bg-amber-500/5 hover:bg-amber-500/10 px-4 py-2 rounded-xl transition-all"
          >
            Ver Todos os Casos
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] font-mono uppercase tracking-wider">
                <th className="py-4 px-6 font-bold">Processo / Unidade</th>
                <th className="py-4 px-6 font-bold">Cliente Inscrito</th>
                <th className="py-4 px-6 font-bold">Instância / Foro</th>
                <th className="py-4 px-6 font-bold">Fase Atual</th>
                <th className="py-4 px-6 font-bold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600 font-sans">
              {MOCK_CASES.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-800">{item.title}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{item.caseNumber}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-slate-800">{item.clientName}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-slate-500">{item.court}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {item.stage}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link 
                      to={`/portal-cliente-giffoni/${MOCK_CLIENTS.find(c => c.id === item.clientId)?.slug || "giffoni-eng"}/dashboard`} 
                      target="_blank"
                      className="text-xs font-semibold text-slate-500 hover:text-amber-600 inline-flex items-center gap-1 transition-colors"
                    >
                      Ver no Portal ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
