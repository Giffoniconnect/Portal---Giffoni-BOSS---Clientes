import { MOCK_CLIENTS } from "../services/mockData";
import { Cliente } from "../types";

/**
 * Converts a text (like a client company name) into a URL-friendly, safe slug.
 * E.g., "Maria Regina" -> "maria-regina"
 */
export function normalizeSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD") // split accented characters into base letters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove diacritical marks
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid characters
    .replace(/[\s_]+/g, "-") // replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // remove leading/trailing hyphens
}

/**
 * Validates whether a slug conforms to basic URL-friendly criteria (lowercase alphanumeric and dash).
 */
export function isValidSlug(slug: string): boolean {
  const regex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  return regex.test(slug);
}

/**
 * Finds a client from the mock system containing this exact slug.
 */
export function findClienteBySlug(slug: string): Cliente | undefined {
  return MOCK_CLIENTS.find(c => c.slug === slug);
}

/**
 * Checks if a slug is globally unique or already used.
 */
export function checkSlugUniqueness(slug: string): boolean {
  return !MOCK_CLIENTS.some(c => c.slug === slug);
}
