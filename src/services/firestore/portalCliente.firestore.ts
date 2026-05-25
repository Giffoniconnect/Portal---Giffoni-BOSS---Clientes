import { collection, query, where, getDocs, limit, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { firestoreMapper } from "./firestoreMapper";
import { handleFirestoreError } from "../../lib/firestoreErrors";
import { OperationType } from "../../types/firestore";
import { Prova } from "../../types";

/**
 * Validates whether a specific customer portal space URL slug exists on Firestore.
 */
export async function validateSlugAccessFirestore(slug: string): Promise<boolean> {
  const path = "clientes";
  try {
    const q = query(collection(db, path), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${path}/validate/${slug}`);
  }
}

/**
 * Creates a new evidence document entry on Firestore.
 */
export async function submitEvidenceFirestore(
  file: { name: string; size: number },
  clientId: string,
  caseId: string
): Promise<Prova> {
  const path = "provas";
  const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);

  const data: Partial<Prova> = {
    clienteId: clientId,
    casoId: caseId,
    nome: file.name.split(".")[0] || "Sem Nome",
    tipo: "Upload Seguro",
    descricao: "Documento enviado de forma segura via Portal do Cliente.",
    status: "under_review",
    url: "#",
    title: file.name.split(".")[0] || "Sem Nome",
    description: "Documento enviado de forma segura via Portal do Cliente.",
    fileName: file.name,
    fileSize: `${sizeInMB} MB`,
    criadoEm: new Date().toISOString(),
    uploadedAt: new Date().toISOString()
  };

  try {
    const docRef = await addDoc(collection(db, path), data);
    return { id: docRef.id, ...data } as Prova;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
