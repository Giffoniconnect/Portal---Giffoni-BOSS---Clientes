export interface Audiencia {
  id: string;
  clienteId: string;
  casoId: string;
  data: string;
  horario: string;
  modalidade: string;
  local: string;
  link?: string;
  observacoes: string;
  status: string;

  // Compatibility fields
  caseNumber?: string;
  date?: string;
  time?: string;
  court?: string;
  type?: string;
  notes?: string;
}

export interface Pericia {
  id: string;
  clienteId: string;
  casoId: string;
  data: string;
  horario: string;
  perito: string;
  local: string;
  objeto: string;
  status: "scheduled" | "completed" | "delayed";
  observacoes: string;

  // Compatibility fields
  caseNumber?: string;
  date?: string;
  time?: string;
  expertName?: string;
  specialty?: string;
  notes?: string;
}

export interface Reuniao {
  id: string;
  clienteId: string;
  data: string;
  horario: string;
  assunto: string;
  modalidade: string;
  link?: string;
  responsavel: string;
  status: "scheduled" | "completed" | "canceled";

  // Compatibility fields
  clientName?: string;
  date?: string;
  time?: string;
  subject?: string;
}
