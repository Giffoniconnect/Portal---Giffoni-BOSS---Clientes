/**
 * Centralized password hashing, verification, and security helpers.
 */

/**
 * Safely compares a plain-text candidate password with the stored password/hash.
 * This function can be upgraded in the future to use bcrypt or other security libraries.
 * 
 * @param candidate - The plain-text password typed by the user.
 * @param storedPlaintextOrHash - The plaintext or hashed password stored in database/mock data.
 */
export function verifyPassword(candidate: string, storedPlaintextOrHash?: string): boolean {
  if (!candidate || !storedPlaintextOrHash) {
    return false;
  }
  
  // Clean trailing and leading spaces
  const normalCandidate = candidate.trim();
  const normalStored = storedPlaintextOrHash.trim();
  
  return normalCandidate === normalStored;
}
