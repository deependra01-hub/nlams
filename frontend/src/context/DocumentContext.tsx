import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { documentService } from "../services/document.service";
import type { DocumentRecord, DocumentStatus } from "../types/document.types";

interface DocumentContextValue {
  documents: DocumentRecord[];
  activeDocumentId: string | null;
  activeDocument: DocumentRecord | null;
  setActiveDocumentId: (documentId: string | null) => void;
  getDocumentById: (documentId: string) => DocumentRecord | null;
  getDocumentsByStatus: (status?: DocumentStatus) => DocumentRecord[];
  stats: ReturnType<typeof documentService.getDocumentStats>;
}

const DocumentContext = createContext<DocumentContextValue | undefined>(undefined);

export function DocumentProvider({ children }: PropsWithChildren) {
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const documents = documentService.getDocuments();
  const stats = documentService.getDocumentStats();
  const activeDocument = documents.find((document) => document.id === activeDocumentId) ?? null;

  const value = useMemo<DocumentContextValue>(
    () => ({
      documents,
      activeDocumentId,
      activeDocument,
      setActiveDocumentId,
      getDocumentById: documentService.getDocumentById,
      getDocumentsByStatus: (status?: DocumentStatus) => documentService.listDocuments(status),
      stats,
    }),
    [activeDocument, activeDocumentId, documents, stats],
  );

  return <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>;
}

export function useDocumentsContext() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocumentsContext must be used within DocumentProvider");
  }
  return context;
}
