import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SessaoCliente } from "../types";
import { authClienteService } from "../services/authClienteService";
import { sessionClienteService } from "../services/sessionClienteService";

interface AuthContextType {
  session: SessaoCliente | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginClient: (login: string, senha: string) => Promise<{ success: boolean; error?: string; session?: SessaoCliente }>;
  logoutClient: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessaoCliente | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore session from temporary sessionStorage on initial mount
  useEffect(() => {
    const activeSession = sessionClienteService.obterSessao();
    if (activeSession) {
      setSession(activeSession);
    }
    setIsLoading(false);
  }, []);

  const loginClient = async (
    login: string,
    senha: string
  ): Promise<{ success: boolean; error?: string; session?: SessaoCliente }> => {
    setIsLoading(true);
    try {
      const res = await authClienteService.autenticarCliente(login, senha);
      
      if (!res.success) {
        setIsLoading(false);
        const errorResult = res as { success: false; errorCode: string };
        return { success: false, error: errorResult.errorCode };
      }

      setSession(res.session);
      sessionClienteService.iniciarSessao(res.session);
      setIsLoading(false);
      return { success: true, session: res.session };
    } catch (e) {
      setIsLoading(false);
      return { success: false, error: "FIRESTORE_INDISPONIVEL" };
    }
  };

  const logoutClient = () => {
    setSession(null);
    sessionClienteService.encerrarSessao();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isLoading,
        loginClient,
        logoutClient
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
