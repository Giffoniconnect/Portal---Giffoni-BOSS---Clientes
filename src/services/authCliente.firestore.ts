import { collection, query, where, getDocs, limit, doc, updateDoc, getDoc } from "firebase/firestore";
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
    // 1. Try direct getDoc on "clientes" (primary)
    try {
      const docRefCheck = doc(db, pathPrimary, clienteId);
      const directCliente = await getDoc(docRefCheck);
      if (directCliente.exists()) {
        return normalize(firestoreMapper.mapDoc<Cliente>(directCliente));
      }
    } catch (errDirect) {
      console.warn("Direct doc fetch on clientes failed for ID:", clienteId, errDirect);
    }

    // 2. Try direct getDoc on "clients" (fallback)
    try {
      const docRefCheckFallback = doc(db, pathFallback, clienteId);
      const directClient = await getDoc(docRefCheckFallback);
      if (directClient.exists()) {
        return normalize(firestoreMapper.mapDoc<Cliente>(directClient));
      }
    } catch (errDirectFallback) {
      console.warn("Direct doc fetch on clients failed for ID:", clienteId, errDirectFallback);
    }

    // 3. Query fallback on "clientes" (primary)
    let q = query(collection(db, pathPrimary), where("id", "==", clienteId), limit(1));
    let snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return normalize(firestoreMapper.mapDoc<Cliente>(snapshot.docs[0]));
    }

    // 4. Query fallback on "clients" (fallback)
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
