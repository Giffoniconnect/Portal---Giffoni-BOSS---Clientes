import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CredencialCliente } from "../types";
import { clienteServiceMock } from "../services/clienteService.mock";

interface AuthContextType {
  clientCred: CredencialCliente | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginClient: (login: string, senha: string) => Promise<{ success: boolean; error?: string; cred?: CredencialCliente }>;
  logoutClient: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [clientCred, setClientCred] = useState<CredencialCliente | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore session from localStorage if existing
  useEffect(() => {
    const saved = localStorage.getItem("giffoni_client_credential");
    if (saved) {
      try {
        setClientCred(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem("giffoni_client_credential");
      }
    }
    setIsLoading(false);
  }, []);

  const loginClient = async (login: string, senha: string): Promise<{ success: boolean; error?: string; cred?: CredencialCliente }> => {
    setIsLoading(true);
    try {
      const cred = await clienteServiceMock.autenticarClientePorLoginSenha(login, senha);
      if (!cred) {
        setIsLoading(false);
        return { success: false, error: "invalid_credentials" };
      }

      if (!cred.ativo) {
        setIsLoading(false);
        return { success: false, error: "inactive" };
      }

      setClientCred(cred);
      localStorage.setItem("giffoni_client_credential", JSON.stringify(cred));
      setIsLoading(false);
      return { success: true, cred };
    } catch (e) {
      setIsLoading(false);
      return { success: false, error: "server_error" };
    }
  };

  const logoutClient = () => {
    setClientCred(null);
    localStorage.removeItem("giffoni_client_credential");
  };

  return (
    <AuthContext.Provider
      value={{
        clientCred,
        isAuthenticated: !!clientCred,
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

