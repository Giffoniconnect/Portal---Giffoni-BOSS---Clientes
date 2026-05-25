export interface Cliente {
  id: string;
  slug: string;
  nome?: string;
  tipoPessoa?: "PF" | "PJ";
  cpf?: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  status?: "active" | "inactive";
  portalAtivo?: boolean;
  criadoEm?: string;
  atualizadoEm?: string;

  // Compatibility fields for legacy layouts / templates
  name?: string;
  phone?: string;
  address?: string;
  cpfCnpj?: string;
  createdAt?: string;
}
