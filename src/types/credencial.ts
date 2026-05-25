export interface CredencialCliente {
  id: string;
  clienteId: string;
  slug: string;
  login: string;
  senha?: string;
  password?: string; // fallback matching Firestore mapping
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
  ultimoAcesso?: string;
  tentativasFalhas?: number;
  bloqueadoEm?: string | null;
  observacoes?: string;
}

export interface SessaoCliente {
  autenticado: boolean;
  clienteId: string;
  slug: string;
  login: string;
  nomeCliente: string;
  iniciadoEm: string;
}
