import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase";
import { firestoreMapper } from "./firestoreMapper";
import { handleFirestoreError } from "../../lib/firestoreErrors";
import { OperationType } from "../../types/firestore";
import { Cliente, Caso, Prova, Informacao, Audiencia, Pericia, Reuniao, Financeiro, CredencialCliente } from "../../types";

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
  }
}

/**
 * Fetch a single client by physical ID.
 */
export async function getClienteByIdFirestore(clienteId: string): Promise<Cliente | undefined> {
  const path = "clientes";
  try {
    const q = query(collection(db, path), where("id", "==", clienteId), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return undefined;
    return firestoreMapper.mapDoc<Cliente>(snapshot.docs[0]);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${path}/id/${clienteId}`);
  }
}

/**
 * Fetch a single client by slug.
 */
export async function getClienteBySlugFirestore(slug: string): Promise<Cliente | undefined> {
  const path = "clientes";
  try {
    const q = query(collection(db, path), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return undefined;
    return firestoreMapper.mapDoc<Cliente>(snapshot.docs[0]);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${path}/slug/${slug}`);
  }
}

/**
 * Fetch cases for a specific client.
 */
export async function getCasosByClienteIdFirestore(clienteId: string): Promise<Caso[]> {
  const path = "casos";
  try {
    const q = query(collection(db, path), where("clienteId", "==", clienteId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Caso>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${path}?clienteId=${clienteId}`);
  }
}

/**
 * Fetch evidence documents for a client.
 */
export async function getProvasByClienteIdFirestore(clienteId: string): Promise<Prova[]> {
  const path = "provas";
  try {
    const q = query(collection(db, path), where("clienteId", "==", clienteId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Prova>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${path}?clienteId=${clienteId}`);
  }
}

/**
 * Fetch notices visible to the client.
 */
export async function getInformacoesByClienteIdFirestore(
  clienteId: string
): Promise<Informacao[]> {
  const path = "informacoes";
  try {
    const q = query(
      collection(db, path),
      where("clienteId", "==", clienteId),
      where("visivelParaCliente", "==", true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Informacao>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${path}?clienteId=${clienteId}`);
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
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Audiencia>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${path}?clienteId=${clienteId}`);
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
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Pericia>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${path}?clienteId=${clienteId}`);
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
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Reuniao>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${path}?clienteId=${clienteId}`);
  }
}

/**
 * Fetch billing invoices for a client.
 */
export async function getFinanceiroByClienteIdFirestore(
  clienteId: string
): Promise<Financeiro[]> {
  const path = "financeiro";
  try {
    const q = query(collection(db, path), where("clienteId", "==", clienteId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Financeiro>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${path}?clienteId=${clienteId}`);
  }
}
