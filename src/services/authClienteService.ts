import { CredencialCliente, Cliente, SessaoCliente } from "../types";
import { MOCK_CREDENCIAL_CLIENTE, MOCK_CLIENTS } from "./mockData";
import { 
  getCredencialByLoginFirestore, 
  getClienteByIdFirestore, 
  registrarUltimoAcessoFirestore 
} from "./authCliente.firestore";
import { verifyPassword } from "../lib/password";
import { isFirebaseConfigured } from "./firebase";
import { runWithMockFallback } from "./firestore/firestoreFallback";

export type AuthResult = 
  | { success: true; session: SessaoCliente }
  | { success: false; errorCode: "CREDENCIAIS_INVALIDAS" | "ACESSO_BLOQUEADO" | "CLIENTE_NAO_ENCONTRADO" | "PORTAL_INDISPONIVEL" | "FIRESTORE_INDISPONIVEL" };

export const authClienteService = {
  /**
   * Normalizes, validates, fetches, and signs in a customer workspace space.
   */
  async autenticarCliente(loginRaw: string, senhaRaw: string): Promise<AuthResult> {
    const login = (loginRaw || "").toLowerCase().trim();
    const senha = senhaRaw || "";

    if (!login || !senha) {
      return { success: false, errorCode: "CREDENCIAIS_INVALIDAS" };
    }

    try {
      // 1. Fetch the credential using fallback architecture
      let credential: CredencialCliente | undefined;

      if (isFirebaseConfigured) {
        try {
          credential = await getCredencialByLoginFirestore(login);
        } catch (err) {
          console.warn("Firestore error when querying credential. Trying mock fallback.", err);
          // If Firestore is configured but outright throws (e.g. offline/permission error), we can fall back to mock
          credential = MOCK_CREDENCIAL_CLIENTE.find(c => c.login.toLowerCase() === login);
        }
      } else {
        credential = MOCK_CREDENCIAL_CLIENTE.find(c => c.login.toLowerCase() === login);
      }

      // If no credential can be resolved
      if (!credential) {
        return { success: false, errorCode: "CREDENCIAIS_INVALIDAS" };
      }

      // 2. Compare password securely
      const isPasswordCorrect = verifyPassword(senha, credential.senha || credential.password);
      if (!isPasswordCorrect) {
        return { success: false, errorCode: "CREDENCIAIS_INVALIDAS" };
      }

      // 3. Verify customer credential status (active)
      if (credential.ativo === false) {
        return { success: false, errorCode: "ACESSO_BLOQUEADO" };
      }

      // 4. Fetch the client profile linked to the credential
      let client: Cliente | undefined;
      if (isFirebaseConfigured) {
        try {
          client = await getClienteByIdFirestore(credential.clienteId);
        } catch (err) {
          console.warn("Firestore error when querying client by ID. Trying mock fallback.", err);
          client = MOCK_CLIENTS.find(c => c.id === credential.clienteId);
        }
      } else {
        client = MOCK_CLIENTS.find(c => c.id === credential.clienteId);
      }

      // If no parent client is found
      if (!client) {
        return { success: false, errorCode: "CLIENTE_NAO_ENCONTRADO" };
      }

      // 5. Verify if client status allows portal access
      // Ensure client is active and portal is enabled (portalAtivo !== false)
      const isPortalEnabled = client.portalAtivo !== false && client.status !== "inactive";
      if (!isPortalEnabled) {
        return { success: false, errorCode: "PORTAL_INDISPONIVEL" };
      }

      // 6. Access logging in the background (fire-and-forget, do not block)
      if (isFirebaseConfigured && credential.id) {
        registrarUltimoAcessoFirestore(credential.id).catch(() => {});
      }

      // 7. Success - construct clean session payload (NEVER store password in the session)
      const session: SessaoCliente = {
        autenticado: true,
        clienteId: client.id,
        slug: client.slug,
        login: credential.login,
        nomeCliente: client.name || client.nome,
        iniciadoEm: new Date().toISOString()
      };

      return { success: true, session };

    } catch (generalError) {
      console.error("Critical error in authClienteService:", generalError);
      return { success: false, errorCode: "FIRESTORE_INDISPONIVEL" };
    }
  }
};
