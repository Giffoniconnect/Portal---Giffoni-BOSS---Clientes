/**
 * Formats a numeric value as Brazilian Reais (R$).
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

/**
 * Formats an ISO date string into a readable local date (DD/MM/YYYY).
 */
export function formatDate(isoString: string): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("pt-BR");
  } catch (e) {
    return isoString;
  }
}

/**
 * Formats dirty values into mask-compliant CPF or CNPJ layouts.
 */
export function formatCpfCnpj(value: string): string {
  const clean = value.replace(/\D/g, "");
  if (clean.length === 11) {
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (clean.length === 14) {
    return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
  return value;
}
