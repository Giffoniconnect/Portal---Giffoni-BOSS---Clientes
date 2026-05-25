import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Info, Scale, ShieldAlert, FileWarning, Eye, Calendar, Bell, ShieldX } from "lucide-react";
import { getClientBySlug } from "../../services/mockData";
import { clienteServiceMock } from "../../services/clienteService.mock";

export default function ClienteInformacoes() {
  const { slug } = useParams<{ slug: string }>();
  const [client, setClient] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    if (slug) {
      const data = getClientBySlug(slug);
      if (data) {
        setClient(data);
        clienteServiceMock.getInformacoesByClienteId(data.id).then(setNotices);
      }
    }
  }, [slug]);

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-display font-black text-white tracking-tight">Informações Úteis & Comunicados</h1>
        <p className="text-slate-400 text-sm mt-1">
          Guia de comportamento em audiências virtuais, comunicados do escritório e avisos do tribunal.
        </p>
      </div>

      {/* CLIENT EXCLUSIVE NOTICES SECTION */}
      <div className="bg-[#0e162d] border border-white/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
          <Bell className="w-5 h-5 text-amber-500" />
          <h2 className="font-display font-bold text-lg text-white">Comunicados Importantes para {client?.nome || client?.name || "sua Empresa"}</h2>
        </div>

        {notices.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-xs bg-[#111a31] rounded-xl border border-white/5">
            Nenhum aviso ou parecer urgente publicado especificamente para este canal de cliente.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {notices.map((n) => (
              <div key={n.id} className="p-5 rounded-xl bg-[#141f3e] border-l-4 border-amber-500 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm sm:text-base">{n.titulo}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(n.criadoEm).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {n.conteudo}
                </p>
                <div className="pt-2 text-[10px] text-indigo-400 font-mono uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block animate-pulse"></span>
                  Documentação Ativa e Visível ao Cliente
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Guideline 1 */}
        <div className="bg-[#0e162d] p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-amber-500">
            <Scale className="w-5 h-5" />
            <h3 className="font-display font-bold text-base text-slate-100">Como se comportar em Audiências Judiciais</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-350 list-disc list-inside leading-relaxed">
            <li>Conecte-se com pelo menos 15 minutos de antecedência na sala digital.</li>
            <li>Certifique-se de que sua câmera e microfone estão funcionando perfeitamente.</li>
            <li>Vista-se com traje formal (esporte fino para representantes corporativos).</li>
            <li>Evite interromper o juiz ou os patronos adversários. Aguarde seu turno de voz.</li>
            <li>Esteja com sua ficha cadastral aberta para confirmar dados básicos de identificação.</li>
          </ul>
        </div>

        {/* Guideline 2 */}
        <div className="bg-[#0e162d] p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-display font-bold text-base text-slate-100">Prazos e Validade de Provas</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-350 list-disc list-inside leading-relaxed">
            <li>As notas fiscais e diários colhidos em campo só são válidos após assinatura do engenheiro.</li>
            <li>O limite recomendado para upload de vídeos de vistoria técnica é de 50MB.</li>
            <li>O prazo máximo para correção de documentos recusados pelos advogados é de 48 horas úteis.</li>
            <li>Fichas logísticas de motoristas e tacógrafos de combustíveis devem vir acompanhadas de relatórios consolidados mensais.</li>
          </ul>
        </div>

        {/* Guideline FAQ */}
        <div className="bg-[#0e162d] p-6 rounded-2xl border border-white/5 md:col-span-2 space-y-4">
          <h3 className="font-display font-bold text-base text-slate-100">Perguntas Frequentes (FAQ)</h3>
          
          <div className="space-y-4 divide-y divide-white/5 pt-2">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-200 text-sm">Como meu advogado bOSS é notificado sobre minhas provas?</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Toda vez que você anexa um diário de obras ou nota fiscal pelo portal, nossa retaguarda administrativa bOSS aciona um sinalizador interno de revisão. Após aprovação, o arquivo é imediatamente qualificado em petição judicial.
              </p>
            </div>

            <div className="space-y-1.5 pt-4">
              <h4 className="font-bold text-slate-200 text-sm">O que ocorre se eu perder o horário da Perícia Técnica de campo?</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                A ausência na vistoria designada pelo perito judicial do tribunal pode acarretar perda do direito de prova de campo. Caso haja algum imprevisto grave, acione os assessores jurídicos em até 24h antes do ato processual.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
