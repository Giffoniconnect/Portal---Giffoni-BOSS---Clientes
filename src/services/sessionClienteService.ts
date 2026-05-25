import { SessaoCliente } from "../types";
import { sessionManager } from "../lib/session";

export const sessionClienteService = {
  /**
   * Commits the authenticated customer session to temporary storage.
   */
  iniciarSessao(session: SessaoCliente): void {
    sessionManager.saveSession(session);
  },

  /**
   * Restores the existing secure customer session from local state.
   */
  obterSessao(): SessaoCliente | null {
    return sessionManager.getSession();
  },

  /**
   * Destroys the existing session to perform a complete sign-out.
   */
  encerrarSessao(): void {
    sessionManager.clearSession();
  },

  /**
   * Checks if an authenticated session currently exists.
   */
  possuiSessaoAtiva(): boolean {
    const sess = this.obterSessao();
    return sess !== null && sess.autenticado === true;
  }
};
