import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase";
import { firestoreMapper } from "./firestoreMapper";
import { handleFirestoreError } from "../../lib/firestoreErrors";
import { OperationType } from "../../types/firestore";
import { Cliente, Caso, Prova, Informacao, Audiencia, Pericia, Reuniao, Financeiro, CredencialCliente } from "../../types";

/**
 * Normalizes common client-related fields to guarantee dual layout compatibility.
 */
function normalizeCommon<T>(doc: any): T {
  if (!doc) return doc;
  
  // Compatibilizar clienteId / clientId
  if (doc.clientId && !doc.clienteId) {
    doc.clienteId = doc.clientId;
  }
  if (doc.clienteId && !doc.clientId) {
    doc.clientId = doc.clienteId;
  }

  // Compatibilizar visivelParaCliente / visibleToClient
  if (doc.visibleToClient === true || doc.visibleToClient === false) {
    if (doc.visivelParaCliente === undefined) {
      doc.visivelParaCliente = doc.visibleToClient;
    }
  }
  if (doc.visivelParaCliente === true || doc.visivelParaCliente === false) {
    if (doc.visibleToClient === undefined) {
      doc.visibleToClient = doc.visivelParaCliente;
    }
  }

  return doc as T;
}

/**
 * Normalizes client fields to prevent translation layouts mismatch.
 */
function normalizeCliente(doc: any): Cliente {
  if (!doc) return doc;
  if (doc.name && !doc.nome) {
    doc.nome = doc.name;
  }
  if (doc.nome && !doc.name) {
    doc.name = doc.nome;
  }
  return doc as Cliente;
}

/**
 * Unified multi-query client-bound document fetcher with fallback paths and local visibility filtering.
 * Evaluates queries matching both field nomenclatures to prevent composite index requirement crashes.
 */
async function fetchDocsByClientIdWithFallback<T>(
  primaryPath: string,
  fallbackPath: string,
  clienteId: string,
  visivelOnly: boolean = false
): Promise<T[]> {
  let docList: T[] = [];
  
  // 1. Try querying primary path
  try {
    const primaryDocs = await queryCollectionForClientByNomenclature<T>(primaryPath, clienteId, visivelOnly);
    if (primaryDocs.length > 0) {
      docList = primaryDocs;
    }
  } catch (err) {
    console.warn(`Error querying primary path ${primaryPath}:`, err);
  }

  // 2. Try querying fallback path if primary collection query yielded empty list
  if (docList.length === 0) {
    try {
      const fallbackDocs = await queryCollectionForClientByNomenclature<T>(fallbackPath, clienteId, visivelOnly);
      if (fallbackDocs.length > 0) {
        docList = fallbackDocs;
      }
    } catch (err) {
      console.warn(`Error querying fallback path ${fallbackPath}:`, err);
    }
  }

  return docList;
}

/**
 * Queries a single collection on either standard field to prevent index dependency failures.
 */
async function queryCollectionForClientByNomenclature<T>(
  colName: string,
  clienteId: string,
  visivelOnly: boolean
): Promise<T[]> {
  const colRef = collection(db, colName);
  const matchedDocsMap = new Map<string, any>();

  // Attempt query under 'clienteId'
  try {
    const q1 = query(colRef, where("clienteId", "==", clienteId));
    const snap1 = await getDocs(q1);
    for (const doc of snap1.docs) {
      const mapped = firestoreMapper.mapDoc<any>(doc);
      matchedDocsMap.set(mapped.id, normalizeCommon<T>(mapped));
    }
  } catch (e) {
    // Fail silently to continue to next nomenclature lookup
  }

  // Attempt query under 'clientId'
  try {
    const q2 = query(colRef, where("clientId", "==", clienteId));
    const snap2 = await getDocs(q2);
    for (const doc of snap2.docs) {
      const mapped = firestoreMapper.mapDoc<any>(doc);
      matchedDocsMap.set(mapped.id, normalizeCommon<T>(mapped));
    }
  } catch (e) {
    // Fail silently
  }

  let finalDocs = Array.from(matchedDocsMap.values());

  // Filter in memory for visivelParaCliente or visibleToClient to avoid indexing errors
  if (visivelOnly) {
    finalDocs = finalDocs.filter(
      (d) => d.visivelParaCliente === true || d.visibleToClient === true
    );
  }

  return finalDocs;
}

/**
 * Find a client credential by login and password
 */
export async function autenticarClientePorLoginSenhaFirestore(
  login: string,
  senha: string
): Promise<CredencialCliente | undefined> {
  const path = "credenciaisCliente";
  try {
    const q = query(collection(db, path), where("login", "==", login), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return undefined;
    const cred = firestoreMapper.mapDoc<CredencialCliente>(snapshot.docs[0]);
    if (cred.senha === senha || cred.password === senha) {
      return cred;
    }
    return undefined;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${path}/login/${login}`);
    return undefined;
  }
}

/**
 * Fetch a single client by physical ID.
 */
export async function getClienteByIdFirestore(clienteId: string): Promise<Cliente | undefined> {
  const pathPrimary = "clientes";
  const pathFallback = "clients";
  try {
    // 1. Try clientes
    let q = query(collection(db, pathPrimary), where("id", "==", clienteId), limit(1));
    let snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return normalizeCliente(firestoreMapper.mapDoc<Cliente>(snapshot.docs[0]));
    }
    
    // 2. Try clients
    q = query(collection(db, pathFallback), where("id", "==", clienteId), limit(1));
    snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return normalizeCliente(firestoreMapper.mapDoc<Cliente>(snapshot.docs[0]));
    }
    return undefined;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${pathPrimary}/id/${clienteId}`);
    return undefined;
  }
}

/**
 * Fetch a single client by slug.
 */
export async function getClienteBySlugFirestore(slug: string): Promise<Cliente | undefined> {
  const pathPrimary = "clientes";
  const pathFallback = "clients";
  try {
    // 1. Try clientes
    let q = query(collection(db, pathPrimary), where("slug", "==", slug), limit(1));
    let snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return normalizeCliente(firestoreMapper.mapDoc<Cliente>(snapshot.docs[0]));
    }
    
    // 2. Try clients
    q = query(collection(db, pathFallback), where("slug", "==", slug), limit(1));
    snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return normalizeCliente(firestoreMapper.mapDoc<Cliente>(snapshot.docs[0]));
    }
    return undefined;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${pathPrimary}/slug/${slug}`);
    return undefined;
  }
}

/**
 * Fetch cases for a specific client.
 */
export async function getCasosByClienteIdFirestore(clienteId: string): Promise<Caso[]> {
  const pathPrimary = "casos";
  const pathFallback = "cases";
  try {
    return await fetchDocsByClientIdWithFallback<Caso>(pathPrimary, pathFallback, clienteId, false);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${pathPrimary}?clienteId=${clienteId}`);
    return [];
  }
}

/**
 * Fetch evidence documents for a client.
 */
export async function getProvasByClienteIdFirestore(clienteId: string): Promise<Prova[]> {
  const pathPrimary = "provas";
  const pathFallback = "caseEvidenceRequests";
  try {
    return await fetchDocsByClientIdWithFallback<Prova>(pathPrimary, pathFallback, clienteId, false);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${pathPrimary}?clienteId=${clienteId}`);
    return [];
  }
}

/**
 * Fetch notices visible to the client.
 */
export async function getInformacoesByClienteIdFirestore(
  clienteId: string
): Promise<Informacao[]> {
  const pathPrimary = "informacoes";
  const pathFallback = "caseInformationRequests";
  try {
    return await fetchDocsByClientIdWithFallback<Informacao>(pathPrimary, pathFallback, clienteId, true);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${pathPrimary}?clienteId=${clienteId}`);
    return [];
  }
}

/**
 * Fetch hearings for a client.
 */
export async function getAudienciasByClienteIdFirestore(
  clienteId: string
): Promise<Audiencia[]> {
  const path = "audiencias";
  try {
    const q = query(collection(db, path), where("clienteId", "==", clienteId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => normalizeCommon<Audiencia>(firestoreMapper.mapDoc<Audiencia>(doc)));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${path}?clienteId=${clienteId}`);
    return [];
  }
}

/**
 * Fetch expertise / field checks for a client.
 */
export async function getPericiasByClienteIdFirestore(clienteId: string): Promise<Pericia[]> {
  const path = "pericias";
  try {
    const q = query(collection(db, path), where("clienteId", "==", clienteId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => normalizeCommon<Pericia>(firestoreMapper.mapDoc<Pericia>(doc)));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${path}?clienteId=${clienteId}`);
    return [];
  }
}

/**
 * Fetch meetings schedule for a client.
 */
export async function getReunioesByClienteIdFirestore(clienteId: string): Promise<Reuniao[]> {
  const path = "reunioes";
  try {
    const q = query(collection(db, path), where("clienteId", "==", clienteId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => normalizeCommon<Reuniao>(firestoreMapper.mapDoc<Reuniao>(doc)));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${path}?clienteId=${clienteId}`);
    return [];
  }
}

/**
 * Fetch billing invoices for a client.
 */
export async function getFinanceiroByClienteIdFirestore(
  clienteId: string
): Promise<Financeiro[]> {
  const pathPrimary = "financeiro";
  const pathFallback = "caseFinancials";
  try {
    return await fetchDocsByClientIdWithFallback<Financeiro>(pathPrimary, pathFallback, clienteId, false);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${pathPrimary}?clienteId=${clienteId}`);
    return [];
  }
}
