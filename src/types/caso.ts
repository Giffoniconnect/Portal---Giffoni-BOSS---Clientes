export interface Caso {
  id: string;
  clienteId?: string;
  numeroProcesso?: string;
  titulo?: string;
  area?: string;
  comarca?: string;
  vara?: string;
  tribunal?: string;
  status?: "active" | "suspended" | "closed";
  fase?: string;
  resumo?: string;
  proximoPasso?: string;
  criadoEm?: string;
  atualizadoEm?: string;

  // Compatibility fields for legacy layouts / templates
  clientId?: string;
  clientName?: string;
  caseNumber?: string;
  title?: string;
  court?: string;
  stage?: string;
  description?: string;
  lastUpdate?: string;
}
