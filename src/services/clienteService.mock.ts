import { Cliente, Caso, Prova, Audiencia, Pericia, Reuniao, Financeiro, Informacao, CredencialCliente } from "../types";
import { 
  MOCK_CLIENTS, MOCK_CASES, MOCK_EVIDENCE, MOCK_AUDIENCES, 
  MOCK_EXPERT_OPINIONS, MOCK_MEETINGS, MOCK_FINANCE, MOCK_INFORMACAO, MOCK_CREDENCIAL_CLIENTE
} from "./mockData";
import { runWithMockFallback } from "./firestore/firestoreFallback";
import {
  getClienteBySlugFirestore,
  getClienteByIdFirestore,
  getCasosByClienteIdFirestore,
  getProvasByClienteIdFirestore,
  getInformacoesByClienteIdFirestore,
  getAudienciasByClienteIdFirestore,
  getPericiasByClienteIdFirestore,
  getReunioesByClienteIdFirestore,
  getFinanceiroByClienteIdFirestore,
  autenticarClientePorLoginSenhaFirestore
} from "./firestore/cliente.firestore";

export const clienteServiceMock = {
  // 0. Authenticate client by login and password
  autenticarClientePorLoginSenha: async (login: string, senha: string): Promise<CredencialCliente | undefined> => {
    return runWithMockFallback(
      () => autenticarClientePorLoginSenhaFirestore(login, senha),
      () => MOCK_CREDENCIAL_CLIENTE.find((c) => c.login === login && (c.senha === senha || c.password === senha)),
      `autenticarClientePorLoginSenha(${login})`
    );
  },

  // 0.5. Get client info by ID
  getClienteById: async (clienteId: string): Promise<Cliente | undefined> => {
    return runWithMockFallback(
      () => getClienteByIdFirestore(clienteId),
      () => MOCK_CLIENTS.find((c) => c.id === clienteId),
      `getClienteById(${clienteId})`
    );
  },

  // 1. Get client info by slug (URL entry point validation)
  getClienteBySlug: async (slug: string): Promise<Cliente | undefined> => {
    return runWithMockFallback(
      () => getClienteBySlugFirestore(slug),
      () => MOCK_CLIENTS.find((c) => c.slug === slug),
      `getClienteBySlug(${slug})`
    );
  },

  // 2. Get cases linked to the authenticated clientId
  getCasosByClienteId: async (clienteId: string): Promise<Caso[]> => {
    return runWithMockFallback(
      () => getCasosByClienteIdFirestore(clienteId),
      () => MOCK_CASES.filter((c) => c.clienteId === clienteId),
      `getCasosByClienteId(${clienteId})`
    );
  },

  // 3. Get safe evidence documents
  getProvasByClienteId: async (clienteId: string): Promise<Prova[]> => {
    return runWithMockFallback(
      () => getProvasByClienteIdFirestore(clienteId),
      () => MOCK_EVIDENCE.filter((e) => e.clienteId === clienteId),
      `getProvasByClienteId(${clienteId})`
    );
  },

  // 4. Get active public announcements where visivelParaCliente is true
  getInformacoesByClienteId: async (clienteId: string): Promise<Informacao[]> => {
    return runWithMockFallback(
      () => getInformacoesByClienteIdFirestore(clienteId),
      () => MOCK_INFORMACAO.filter((i) => i.clienteId === clienteId && i.visivelParaCliente === true),
      `getInformacoesByClienteId(${clienteId})`
    );
  },

  // 5. Get scheduled judicial/conciliation hearings
  getAudienciasByClienteId: async (clienteId: string): Promise<Audiencia[]> => {
    return runWithMockFallback(
      () => getAudienciasByClienteIdFirestore(clienteId),
      () => MOCK_AUDIENCES.filter((a) => a.clienteId === clienteId),
      `getAudienciasByClienteId(${clienteId})`
    );
  },

  // 6. Get perito vistorias / field checks
  getPericiasByClienteId: async (clienteId: string): Promise<Pericia[]> => {
    return runWithMockFallback(
      () => getPericiasByClienteIdFirestore(clienteId),
      () => MOCK_EXPERT_OPINIONS.filter((e) => e.clienteId === clienteId),
      `getPericiasByClienteId(${clienteId})`
    );
  },

  // 7. Get lawyer virtual appointments
  getReunioesByClienteId: async (clienteId: string): Promise<Reuniao[]> => {
    return runWithMockFallback(
      () => getReunioesByClienteIdFirestore(clienteId),
      () => MOCK_MEETINGS.filter((m) => m.clienteId === clienteId),
      `getReunioesByClienteId(${clienteId})`
    );
  },

  // 8. Get installment lists and invoices
  getFinanceiroByClienteId: async (clienteId: string): Promise<Financeiro[]> => {
    return runWithMockFallback(
      () => getFinanceiroByClienteIdFirestore(clienteId),
      () => MOCK_FINANCE.filter((f) => f.clienteId === clienteId),
      `getFinanceiroByClienteId(${clienteId})`
    );
  }
};
