export interface Prova {
  id: string;
  clienteId?: string;
  casoId?: string;
  nome?: string;
  tipo?: string;
  descricao?: string;
  status?: "under_review" | "approved" | "rejected";
  url?: string;
  criadoEm?: string;

  // Compatibility fields for legacy layouts / templates
  clientId?: string;
  caseId?: string;
  title?: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
}
