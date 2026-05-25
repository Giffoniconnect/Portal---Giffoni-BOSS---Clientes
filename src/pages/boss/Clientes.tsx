import React, { useState } from "react";
import { Users, Plus, Globe, Copy, Check, ShieldCheck, Mail, Phone, MapPin, Search } from "lucide-react";
import { MOCK_CLIENTS } from "../../services/mockData";
import { Client } from "../../types";

export default function BossClientes() {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Form states for temporary Client creation
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cpfCnpj: "",
    slug: ""
  });

  const handleCopyLink = (slug: string) => {
    const fullUrl = `${window.location.origin}/portal-cliente-giffoni/${slug}/dashboard`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.slug) return;

    // clean slug (lowercase, no spaces)
    const formattedSlug = newClient.slug.toLowerCase().trim().replace(/\s+/g, "-");

    const created: Client = {
      id: `cli_${Date.now()}`,
      name: newClient.name,
      email: newClient.email || "contato@empresa.com.br",
      phone: newClient.phone || "(11) 90000-0000",
      address: newClient.address || "Endereço comercial",
      cpfCnpj: newClient.cpfCnpj || "00.000.000/0001-00",
      slug: formattedSlug,
      status: "active",
      createdAt: new Date().toISOString()
    };

    setClients([...clients, created]);
    // reset
    setNewClient({ name: "", email: "", phone: "", address: "", cpfCnpj: "", slug: "" });
    setShowAddModal(false);
  };

  const filtered = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.cpfCnpj.includes(searchQuery)
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-800 tracking-tight flex items-center gap-2">
            Clientes & Slugs Ativos
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Configure e gerencie as portas de entrada exclusivas (slugs de rota) de cada um de seus clientes corporativos.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          Novo Slug de Cliente
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input 
          type="text" 
          placeholder="Procure por nome da empresa, CNPJ ou slug de rota..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-slate-400"
        />
      </div>

      {/* Clients Card Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filtered.map((client) => {
          const clientPortalUrl = `/portal-cliente-giffoni/${client.slug}/login`;
          const clientDashboardUrl = `/portal-cliente-giffoni/${client.slug}/dashboard`;

          return (
            <div key={client.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between hover:border-amber-400/50 transition-all group">
              <div>
                {/* Upper row */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Vínculo Ativo
                    </span>
                    <h3 className="font-display font-bold text-slate-850 text-lg mt-2 group-hover:text-amber-600 transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">CNPJ: {client.cpfCnpj}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-slate-400">
                    <Users className="w-5 h-5 text-slate-600" />
                  </div>
                </div>

                {/* Subinfo cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span className="truncate">{client.address}</span>
                  </div>
                </div>

                {/* Slug display Box */}
                <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-wider">Identificador de Rota (Slug)</span>
                    <span className="text-xs font-mono font-bold text-slate-700">
                      /portal-cliente-giffoni/<strong className="text-amber-650">{client.slug}</strong>/*
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopyLink(client.slug)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-amber-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-1 text-[11px] font-medium"
                      title="Copiar URL Completa"
                    >
                      {copiedSlug === client.slug ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copiar Link</span>
                        </>
                      )}
                    </button>
                    <a
                      href={clientDashboardUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Acessar Portal
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL WINDOWS FOR ADDING NEW CLIENT */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-150 flex items-center justify-between bg-slate-50">
              <h3 className="font-display font-bold text-slate-800 text-lg">Gerar Novo Portal de Cliente</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                Fechar
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Razão Social / Nome de Exibição *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Construtora Real Engenharia"
                  value={newClient.name}
                  onChange={(e) => {
                    const nameVal = e.target.value;
                    // Auto generate slug recommendation
                    const slugVal = nameVal.toLowerCase()
                      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
                      .replace(/[^a-z0-9\s]/g, "") // remove other symbols
                      .trim().replace(/\s+/g, "-");
                    setNewClient({...newClient, name: nameVal, slug: slugVal});
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Slug Único de Rota * (Será usado no link)</label>
                <div className="flex rounded-lg overflow-hidden border border-slate-200 focus-within:border-amber-500">
                  <span className="bg-slate-100 text-slate-400 px-3 py-2.5 text-xs font-mono font-medium flex items-center border-r border-slate-200">
                    /portal-cliente-giffoni/
                  </span>
                  <input 
                    type="text" 
                    required
                    placeholder="empresa-nome"
                    value={newClient.slug}
                    onChange={(e) => setNewClient({...newClient, slug: e.target.value})}
                    className="w-full px-3 py-1 bg-transparent text-sm focus:outline-none font-mono font-bold"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Apenas letras minúsculas, números e traços. Sem espaços.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">CPF ou CNPJ</label>
                  <input 
                    type="text" 
                    placeholder="00.000.000/0001-00"
                    value={newClient.cpfCnpj}
                    onChange={(e) => setNewClient({...newClient, cpfCnpj: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Telefone Comercial</label>
                  <input 
                    type="text" 
                    placeholder="(11) 98765-4321"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Email de Contato</label>
                <input 
                  type="email" 
                  placeholder="contato@empresa.com"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold font-mono text-slate-500 uppercase mb-1.5">Endereço Fiscal</label>
                <input 
                  type="text" 
                  placeholder="Rua, Número, Bairro, Cidade - Estado"
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
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
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold"
                >
                  Registrar e Ativar Slug
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
