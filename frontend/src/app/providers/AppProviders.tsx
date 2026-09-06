import type { PropsWithChildren } from "react";
import { CompensationProvider } from "../../context/CompensationContext";
import { AuthProvider } from "../../context/AuthContext";
import { DocumentProvider } from "../../context/DocumentContext";
import { ParcelProvider } from "../../context/ParcelContext";
import { ProjectProvider } from "../../context/ProjectContext";
import { RehabilitationProvider } from "../../context/RehabilitationContext";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ProjectProvider>
        <DocumentProvider>
          <ParcelProvider>
            <CompensationProvider>
              <RehabilitationProvider>{children}</RehabilitationProvider>
            </CompensationProvider>
          </ParcelProvider>
        </DocumentProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}
