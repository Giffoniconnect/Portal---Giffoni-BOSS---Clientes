import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Cliente, Caso, Prova, Audiencia, Pericia, Reuniao, Financeiro, TimelineEvent } from "../types";
import { clienteServiceMock } from "../services/clienteService.mock";
import { useAuth } from "./AuthContext";

interface ClientPortalContextType {
  client: Cliente | null;
  cases: Caso[];
  evidence: Prova[];
  audiences: Audiencia[];
  expertOpinions: Pericia[];
  meetings: Reuniao[];
  finance: Financeiro[];
  timeline: TimelineEvent[];
  isLoading: boolean;
  error: string | null;
  loadPortalBySlug: (slug: string) => Promise<boolean>;
}

const ClientPortalContext = createContext<ClientPortalContextType | undefined>(undefined);

export function ClientPortalProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [client, setClient] = useState<Cliente | null>(null);
  const [cases, setCases] = useState<Caso[]>([]);
  const [evidence, setEvidence] = useState<Prova[]>([]);
  const [audiences, setAudiences] = useState<Audiencia[]>([]);
  const [expertOpinions, setExpertOpinions] = useState<Pericia[]>([]);
  const [meetings, setMeetings] = useState<Reuniao[]>([]);
  const [finance, setFinance] = useState<Financeiro[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadPortalBySlug = useCallback(async (slug: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    if (!session) {
      setClient(null);
      setError("unauthorized");
      setIsLoading(false);
      return false;
    }

    if (slug !== session.slug) {
      setClient(null);
      setError("mismatch");
      setIsLoading(false);
      return false;
    }

    try {
      const resolvedClient = await clienteServiceMock.getClienteById(session.clienteId);
      if (!resolvedClient) {
        setClient(null);
        setError("Portal não encontrado ou indisponível.");
        setIsLoading(false);
        return false;
      }

      setClient(resolvedClient);
      
      // Load all associated sub-collections concurrently
      const [
        fetchedCases,
        fetchedEvidence,
        fetchedAudiences,
        fetchedOpinions,
        fetchedMeetings,
        fetchedFinance,
        fetchedTimeline
      ] = await Promise.all([
        clienteServiceMock.getCasosByClienteId(resolvedClient.id),
        clienteServiceMock.getProvasByClienteId(resolvedClient.id),
        clienteServiceMock.getAudienciasByClienteId(resolvedClient.id),
        clienteServiceMock.getPericiasByClienteId(resolvedClient.id),
        clienteServiceMock.getReunioesByClienteId(resolvedClient.id),
        clienteServiceMock.getFinanceiroByClienteId(resolvedClient.id),
        clienteServiceMock.getTimelineByClienteId(resolvedClient.id)
      ]);

      setCases(fetchedCases);
      setEvidence(fetchedEvidence);
      setAudiences(fetchedAudiences);
      setExpertOpinions(fetchedOpinions);
      setMeetings(fetchedMeetings);
      setFinance(fetchedFinance);
      setTimeline(fetchedTimeline);
      
      setIsLoading(false);
      return true;
    } catch (err: any) {
      setError(err?.message || "Erro desconhecido ao carregar os dados cadastrais.");
      setIsLoading(false);
      return false;
    }
  }, [session]);

  return (
    <ClientPortalContext.Provider
      value={{
        client,
        cases,
        evidence,
        audiences,
        expertOpinions,
        meetings,
        finance,
        timeline,
        isLoading,
        error,
        loadPortalBySlug
      }}
    >
      {children}
    </ClientPortalContext.Provider>
  );
}

export function useClientPortal() {
  const context = useContext(ClientPortalContext);
  if (context === undefined) {
    throw new Error("useClientPortal must be used within a ClientPortalProvider");
  }
  return context;
}
