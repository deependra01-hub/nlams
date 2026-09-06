import type { PropsWithChildren } from "react";
import { CompensationProvider } from "../../context/CompensationContext";
import { AuthProvider } from "../../context/AuthContext";
import { ParcelProvider } from "../../context/ParcelContext";
import { ProjectProvider } from "../../context/ProjectContext";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ProjectProvider>
        <ParcelProvider>
          <CompensationProvider>{children}</CompensationProvider>
        </ParcelProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}
