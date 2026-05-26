import { collection, query, where, getDocs, limit, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { firestoreMapper } from "./firestore/firestoreMapper";
import { handleFirestoreError } from "../lib/firestoreErrors";
import { OperationType } from "../types/firestore";
import { CredencialCliente, Cliente } from "../types";

/**
 * Fetch client credential by login from Firestore.
 */
export async function getCredencialByLoginFirestore(login: string): Promise<CredencialCliente | undefined> {
  const path = "credenciaisCliente";
  try {
    const q = query(collection(db, path), where("login", "==", login), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return undefined;
    return firestoreMapper.mapDoc<CredencialCliente>(snapshot.docs[0]);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${path}/login/${login}`);
    return undefined;
  }
}

/**
 * Fetch client info from Firestore.
 */
export async function getClienteByIdFirestore(clienteId: string): Promise<Cliente | undefined> {
  const pathPrimary = "clientes";
  const pathFallback = "clients";
  
  const normalize = (doc: any): Cliente => {
    if (!doc) return doc;
    if (doc.name && !doc.nome) {
      doc.nome = doc.name;
    }
    if (doc.nome && !doc.name) {
      doc.name = doc.nome;
    }
    return doc as Cliente;
  };

  try {
    // 1. Try clientes (primary)
    let q = query(collection(db, pathPrimary), where("id", "==", clienteId), limit(1));
    let snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return normalize(firestoreMapper.mapDoc<Cliente>(snapshot.docs[0]));
    }

    // 2. Try clients (fallback)
    q = query(collection(db, pathFallback), where("id", "==", clienteId), limit(1));
    snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return normalize(firestoreMapper.mapDoc<Cliente>(snapshot.docs[0]));
    }

    return undefined;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${pathPrimary}/id/${clienteId}`);
    return undefined;
  }
}

/**
 * Record last access timestamp for a customer credential in Firestore.
 */
export async function registrarUltimoAcessoFirestore(id: string): Promise<void> {
  const path = "credenciaisCliente";
  try {
    const docRef = doc(db, path, id);
    await updateDoc(docRef, {
      ultimoAcesso: new Date().toISOString()
    });
  } catch (error) {
    // Fail silently to prevent crashing login flow upon access logging fail
    console.warn("Failed to log last access time in Firestore:", error);
  }
}
