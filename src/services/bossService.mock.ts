import { Cliente, Caso, Prova, Audiencia, Pericia, Reuniao, Financeiro, Informacao } from "../types";
import { 
  MOCK_CLIENTS, MOCK_CASES, MOCK_EVIDENCE, MOCK_AUDIENCES, 
  MOCK_EXPERT_OPINIONS, MOCK_MEETINGS, MOCK_FINANCE, MOCK_INFORMACAO 
} from "./mockData";
import { runWithMockFallback } from "./firestore/firestoreFallback";
import {
  getAllClientesFirestore,
  getClienteByIdFirestore,
  getAllCasosFirestore,
  getAllProvasFirestore,
  getAllAudienciasFirestore,
  getAllPericiasFirestore,
  getAllReunioesFirestore,
  getAllFinanceiroFirestore,
  getAllInformacoesFirestore
} from "./firestore/boss.firestore";
import { getCasosByClienteIdFirestore } from "./firestore/cliente.firestore";

export const bossServiceMock = {
  // 1. Fetch all registered corporate or family clients
  getAllClientes: async (): Promise<Cliente[]> => {
    return runWithMockFallback(
      () => getAllClientesFirestore(),
      () => MOCK_CLIENTS,
      "getAllClientes()"
    );
  },

  // 2. Fetch standard details of a specific client by ID
  getClienteById: async (clienteId: string): Promise<Cliente | undefined> => {
    return runWithMockFallback(
      () => getClienteByIdFirestore(clienteId),
      () => MOCK_CLIENTS.find((c) => c.id === clienteId),
      `getClienteById(${clienteId})`
    );
  },

  // 3. Fetch all lawsuits / active administrative litigation
  getAllCasos: async (): Promise<Caso[]> => {
    return runWithMockFallback(
      () => getAllCasosFirestore(),
      () => MOCK_CASES,
      "getAllCasos()"
    );
  },

  // 4. Fetch cases of a client ID for audit lists
  getCasosByClienteId: async (clienteId: string): Promise<Caso[]> => {
    return runWithMockFallback(
      () => getCasosByClienteIdFirestore(clienteId),
      () => MOCK_CASES.filter((c) => c.clienteId === clienteId),
      `getCasosByClienteId(${clienteId})`
    );
  },

  // 5. Fetch all files across cases
  getAllProvas: async (): Promise<Prova[]> => {
    return runWithMockFallback(
      () => getAllProvasFirestore(),
      () => MOCK_EVIDENCE,
      "getAllProvas()"
    );
  },

  // 6. Fetch all hearings
  getAllAudiencias: async (): Promise<Audiencia[]> => {
    return runWithMockFallback(
      () => getAllAudienciasFirestore(),
      () => MOCK_AUDIENCES,
      "getAllAudiencias()"
    );
  },

  // 7. Fetch all pericias
  getAllPericias: async (): Promise<Pericia[]> => {
    return runWithMockFallback(
      () => getAllPericiasFirestore(),
      () => MOCK_EXPERT_OPINIONS,
      "getAllPericias()"
    );
  },

  // 8. Fetch all client consultations
  getAllReunioes: async (): Promise<Reuniao[]> => {
    return runWithMockFallback(
      () => getAllReunioesFirestore(),
      () => MOCK_MEETINGS,
      "getAllReunioes()"
    );
  },

  // 9. Fetch all billings
  getAllFinanceiro: async (): Promise<Financeiro[]> => {
    return runWithMockFallback(
      () => getAllFinanceiroFirestore(),
      () => MOCK_FINANCE,
      "getAllFinanceiro()"
    );
  },

  // 10. Fetch all logs and announcements (public or private)
  getAllInformacoes: async (): Promise<Informacao[]> => {
    return runWithMockFallback(
      () => getAllInformacoesFirestore(),
      () => MOCK_INFORMACAO,
      "getAllInformacoes()"
    );
  }
};
