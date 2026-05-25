export interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: "BOSS" | "ADVOGADO" | "SECRETARIA" | "CLIENTE";
  clienteId?: string;
  ativo: boolean;
}
