import { Usuario } from "../types";

/**
 * Checks if a user has administrative access to the bOSS Backoffice (Admin and Lawyer roles)
 */
export function canAccessBoss(user: Usuario | null | undefined): boolean {
  if (!user) return false;
  return ["BOSS", "ADVOGADO", "SECRETARIA"].includes(user.role);
}

/**
 * Checks if a user is permitted to enter a specific client-facing portal space.
 */
export function canAccessClientePortal(
  user: Usuario | null | undefined, 
  clienteId: string
): boolean {
  if (!user) return false;
  
  // If user is a backoffice staff, they can access any client portal for audit and client care
  if (canAccessBoss(user)) return true;
  
  // A standard client-user can only enter their matching client partition
  return user.role === "CLIENTE" && user.clienteId === clienteId;
}

/**
 * Checks if a user has sufficient read permissions to see documents and cases.
 */
export function canViewClienteData(
  user: Usuario | null | undefined, 
  clienteId: string
): boolean {
  return canAccessClientePortal(user, clienteId);
}

/**
 * Checks if a user has administrative power to write/update records (e.g. creating invoices or cases).
 */
export function canEditClienteData(user: Usuario | null | undefined): boolean {
  if (!user) return false;
  return ["BOSS", "ADVOGADO"].includes(user.role);
}
