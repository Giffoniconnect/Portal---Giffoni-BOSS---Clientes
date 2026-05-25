export interface Financeiro {
  id: string;
  clienteId: string;
  casoId: string;
  descricao: string;
  valor: number;
  vencimento: string;
  status: "paid" | "pending" | "late";
  formaPagamento: string;
  linkPagamento?: string;
  criadoEm: string;

  // Compatibility fields for legacy layouts / templates
  clientName?: string;
  totalAmount?: number;
  paidAmount?: number;
  remainingAmount?: number;
  dueDate?: string;
  installments?: Array<{
    number: number;
    amount: number;
    dueDate: string;
    status: "paid" | "pending" | "late";
  }>;
}
