import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

let app;
let db: any = null;
let auth: any = null;
let isFirebaseConfigured = false;

// We check if the keys are non-empty strings to verify Firebase is configured.
if (
  firebaseConfig &&
  typeof firebaseConfig.apiKey === "string" &&
  firebaseConfig.apiKey.trim() !== "" &&
  typeof firebaseConfig.projectId === "string" &&
  firebaseConfig.projectId.trim() !== ""
) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    // Use designated database id if present, otherwise default
    const dbId = firebaseConfig.firestoreDatabaseId || undefined;
    db = getFirestore(app, dbId);
    auth = getAuth(app);
    isFirebaseConfigured = true;
    console.log("Firebase initialized successfully. Project:", firebaseConfig.projectId);
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    isFirebaseConfigured = false;
  }
} else {
  console.log("Note: Firebase configuration is empty. Running exclusively in MOCK FALLBACK mode.");
}

export { db, auth, isFirebaseConfigured };
