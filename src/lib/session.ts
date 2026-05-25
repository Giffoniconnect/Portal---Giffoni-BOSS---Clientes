import { SessaoCliente } from "../types";

const PORTAL_SESSION_KEY = "giffoni_client_session";

export const sessionManager = {
  /**
   * Saves a clean client session into sessionStorage.
   * Never stores candidate passwords or full procedural data.
   */
  saveSession(session: SessaoCliente): void {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(PORTAL_SESSION_KEY, JSON.stringify(session));
    }
  },

  /**
   * Retrieves the active client session, if any.
   */
  getSession(): SessaoCliente | null {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const stored = window.sessionStorage.getItem(PORTAL_SESSION_KEY);
      if (stored) {
        try {
          return JSON.parse(stored) as SessaoCliente;
        } catch (e) {
          this.clearSession();
          return null;
        }
      }
    }
    return null;
  },

  /**
   * Clears the active client session safely.
   */
  clearSession(): void {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.removeItem(PORTAL_SESSION_KEY);
    }
  }
};
