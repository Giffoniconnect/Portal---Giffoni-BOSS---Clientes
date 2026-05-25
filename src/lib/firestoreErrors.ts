import { auth } from "../services/firebase";
import { OperationType, FirestoreErrorInfo } from "../types/firestore";

/**
 * Custom error handler for Firestore operations.
 * Catches permissions or runtime failures and throws a formatted JSON string error.
 */
export function handleFirestoreError(
  error: any,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };

  console.error("Firestore Error Captured:", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
