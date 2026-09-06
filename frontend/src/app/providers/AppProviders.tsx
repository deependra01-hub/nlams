import type { PropsWithChildren } from "react";
import { CompensationProvider } from "../../context/CompensationContext";
import { AuthProvider } from "../../context/AuthContext";
import { ParcelProvider } from "../../context/ParcelContext";
import { ProjectProvider } from "../../context/ProjectContext";
import { RehabilitationProvider } from "../../context/RehabilitationContext";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ProjectProvider>
        <ParcelProvider>
          <CompensationProvider>
            <RehabilitationProvider>{children}</RehabilitationProvider>
          </CompensationProvider>
        </ParcelProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}
