import { Prova } from "../types";
import { MOCK_CLIENTS, MOCK_EVIDENCE } from "./mockData";
import { runWithMockFallback } from "./firestore/firestoreFallback";
import { validateSlugAccessFirestore, submitEvidenceFirestore } from "./firestore/portalCliente.firestore";

export const portalClienteServiceMock = {
  // Check if a client space exists and matches perfectly
  validateSlugAccess: async (slug: string): Promise<boolean> => {
    return runWithMockFallback(
      () => validateSlugAccessFirestore(slug),
      () => MOCK_CLIENTS.some((c) => c.slug === slug),
      `validateSlugAccess(${slug})`
    );
  },

  // Simulates uploading an evidence document securely
  submitEvidenceMock: async (
    file: { name: string; size: number },
    clientId: string,
    caseId: string
  ): Promise<Prova> => {
    return runWithMockFallback(
      () => submitEvidenceFirestore(file, clientId, caseId),
      async () => {
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
        
        const newEvidence: Prova = {
          id: `ev_sec_${Date.now()}`,
          clienteId: clientId,
          casoId: caseId,
          nome: file.name.split(".")[0] || "Sem Nome",
          tipo: "Upload Segurado",
          descricao: "Submetido pelo Portal do Cliente via upload seguro corporativo.",
          status: "under_review",
          url: "#",
          title: file.name.split(".")[0] || "Sem Nome",
          description: "Submetido pelo Portal do Cliente via upload seguro corporativo.",
          fileName: file.name,
          fileSize: `${sizeInMB} MB`,
          criadoEm: new Date().toISOString(),
          uploadedAt: new Date().toISOString()
        };

        // Push into our mock dataset for persistence during current run session
        MOCK_EVIDENCE.unshift(newEvidence);
        return newEvidence;
      },
      `submitEvidenceMock(${file.name})`
    );
  }
};
