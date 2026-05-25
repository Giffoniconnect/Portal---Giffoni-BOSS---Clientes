import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { firestoreMapper } from "./firestoreMapper";
import { handleFirestoreError } from "../../lib/firestoreErrors";
import { OperationType } from "../../types/firestore";
import { Cliente, Caso, Prova, Informacao, Audiencia, Pericia, Reuniao, Financeiro } from "../../types";

/**
 * Fetch all registered corporate or individual clients.
 */
export async function getAllClientesFirestore(): Promise<Cliente[]> {
  const path = "clientes";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Cliente>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Fetch single client details by ID.
 */
export async function getClienteByIdFirestore(clienteId: string): Promise<Cliente | undefined> {
  const path = "clientes";
  try {
    const docRef = doc(db, path, clienteId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return undefined;
    return firestoreMapper.mapDoc<Cliente>(docSnap);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${path}/${clienteId}`);
  }
}

/**
 * Fetch all legal lawsuits.
 */
export async function getAllCasosFirestore(): Promise<Caso[]> {
  const path = "casos";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Caso>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Fetch all documents / evidence records across cases.
 */
export async function getAllProvasFirestore(): Promise<Prova[]> {
  const path = "provas";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Prova>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Fetch all scheduled judicial hearings.
 */
export async function getAllAudienciasFirestore(): Promise<Audiencia[]> {
  const path = "audiencias";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Audiencia>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Fetch all expertise and inspections.
 */
export async function getAllPericiasFirestore(): Promise<Pericia[]> {
  const path = "pericias";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Pericia>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Fetch all client consultation appointments.
 */
export async function getAllReunioesFirestore(): Promise<Reuniao[]> {
  const path = "reunioes";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Reuniao>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Fetch all billing logs / invoices.
 */
export async function getAllFinanceiroFirestore(): Promise<Financeiro[]> {
  const path = "financeiro";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Financeiro>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Fetch all notices / updates (public or private).
 */
export async function getAllInformacoesFirestore(): Promise<Informacao[]> {
  const path = "informacoes";
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.docs.map((doc) => firestoreMapper.mapDoc<Informacao>(doc));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
