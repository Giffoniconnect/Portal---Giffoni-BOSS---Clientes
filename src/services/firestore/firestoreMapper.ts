/**
 * Maps Firestore document snapshots to strongly-typed internal data models,
 * transforming Timestamps to ISO date strings.
 */
export const firestoreMapper = {
  /**
   * Safely converts any stored date or Firebase Timestamp to an ISO string
   */
  mapDate(value: any): string {
    if (!value) return "";
    if (typeof value.toDate === "function") {
      return value.toDate().toISOString();
    }
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === "string") {
      return value;
    }
    return String(value);
  },

  /**
   * Maps a document snapshot into a clean object with mapped fields
   */
  mapDoc<T>(doc: { id: string; data: () => any }): T {
    const id = doc.id;
    const data = doc.data() || {};
    const result: any = { id, ...data };

    // Traverse keys and convert any Timestamp-like objects to ISO strings
    for (const key of Object.keys(result)) {
      const val = result[key];
      if (val && typeof val === "object") {
        if (typeof val.toDate === "function") {
          result[key] = val.toDate().toISOString();
        } else if (val.seconds !== undefined && val.nanoseconds !== undefined) {
          // If we have plain objects that represent timestamp seconds/nanoseconds
          result[key] = new Date(val.seconds * 1000).toISOString();
        }
      }
    }

    return result as T;
  }
};
