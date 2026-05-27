import { Cliente, Caso, Prova, Audiencia, Pericia, Reuniao, Financeiro, Informacao, CredencialCliente, TimelineEvent } from "../types";
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
  autenticarClientePorLoginSenhaFirestore,
  getCaseTimelineByClienteIdFirestore,
  getTimelineByClienteIdFirestore
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
  },

  // 9. Get timeline events for a client/case
  getCaseTimelineByClienteId: async (clienteId: string, caseId?: string): Promise<any[]> => {
    return runWithMockFallback(
      () => getCaseTimelineByClienteIdFirestore(clienteId, caseId),
      () => {
        const mockTimeline = [
          {
            id: "tl1",
            clienteId,
            caseId: caseId || "c1",
            titulo: "Audiência de Conciliação Designada",
            descricao: "Audiência cadastrada no sistema judiciário e sala virtual agendada com sucesso.",
            data: "2026-05-24",
            tipo: "audiencia",
            origem: "Giffoni Advocacia",
            publicVisible: true
          },
          {
            id: "tl2",
            clienteId,
            caseId: caseId || "c1",
            titulo: "Petição Inicial Protocolada",
            descricao: "Ação judicial distribuída eletronicamente junto ao Tribunal de Justiça.",
            data: "2026-05-18",
            tipo: "peticao",
            origem: "PJe - Tribunal de Justiça",
            publicVisible: true
          },
          {
            id: "tl3",
            clienteId,
            caseId: caseId || "c1",
            titulo: "Atendimento de Alinhamento",
            descricao: "Conclusão da análise detalhada dos documentos e assinatura do contrato de honorários.",
            data: "2026-05-10",
            tipo: "inicial",
            origem: "Giffoni Advocacia",
            publicVisible: true
          }
        ];
        if (caseId) {
          return mockTimeline.filter(t => t.caseId === caseId);
        }
        return mockTimeline;
      },
      `getCaseTimelineByClienteId(${clienteId}, ${caseId})`
    );
  },

  // 10. Get timeline events for Client Portal Context
  getTimelineByClienteId: async (clienteId: string): Promise<TimelineEvent[]> => {
    return runWithMockFallback(
      () => getTimelineByClienteIdFirestore(clienteId),
      () => {
        const mockTimeline: TimelineEvent[] = [
          {
            id: "tl1",
            clientId: clienteId,
            caseId: "c1",
            title: "Audiência de Conciliação Designada",
            description: "Audiência cadastrada no sistema judiciário e sala virtual agendada com sucesso com a banca jurídica.",
            eventDate: "2026-05-24",
            eventType: "audiencia",
            originType: "Giffoni Advocacia",
            publicVisible: true,
            automatic: false,
            editedByBoss: true,
            priority: "important",
            icon: "calendar",
            color: "amber"
          },
          {
            id: "tl2",
            clientId: clienteId,
            caseId: "c1",
            title: "Petição Inicial Protocolada",
            description: "Ação judicial distribuída eletronicamente junto ao Tribunal de Justiça local.",
            eventDate: "2026-05-18",
            eventType: "peticao",
            originType: "PJe - Tribunal de Justiça",
            publicVisible: true,
            automatic: true,
            editedByBoss: false,
            priority: "informative",
            icon: "file-text",
            color: "indigo"
          },
          {
            id: "tl3",
            clientId: clienteId,
            caseId: "c1",
            title: "Atendimento de Alinhamento Inicial",
            description: "Conclusão da análise detalhada dos documentos e assinatura eletrônica do contrato de honorários.",
            eventDate: "2026-05-10",
            eventType: "inicial",
            originType: "Giffoni Advocacia",
            publicVisible: true,
            automatic: false,
            editedByBoss: true,
            priority: "informative",
            icon: "user",
            color: "blue"
          }
        ];
        return mockTimeline;
      },
      `getTimelineByClienteId(${clienteId})`
    );
  }
};
