export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: "BOSS" | "ADVOGADO" | "SECRETARIA" | "CLIENTE";
  clienteId?: string;
  ativo: boolean;
}

export interface CredencialCliente {
  id: string;
  clienteId: string;
  slug: string;
  login: string;
  senha?: string;
  password?: string; // fallback in case of nomenclature variations
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
  ultimoAcesso?: string;
}

