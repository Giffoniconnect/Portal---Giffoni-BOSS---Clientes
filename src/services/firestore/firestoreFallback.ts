import { isFirebaseConfigured } from "../firebase";

/**
 * Execute a Firestore database query with a safe fallback to mock state.
 * If Firebase is not configured or a database query fails, it silently diverts
 * to the corresponding corporate mock handler and returns standard data.
 */
export async function runWithMockFallback<T>(
  firestoreQuery: () => Promise<T>,
  mockFallback: () => Promise<T> | T,
  operationContext: string
): Promise<T> {
  if (!isFirebaseConfigured) {
    // Quietly run the mock fallback if Firebase is not linked
    return await mockFallback();
  }

  try {
    return await firestoreQuery();
  } catch (error) {
    console.warn(
      `Firestore operation '${operationContext}' failed. Resolving with Mock Fallback.`,
      error
    );
    return await mockFallback();
  }
}
