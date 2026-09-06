import type { PropsWithChildren } from "react";
import { AuthProvider } from "../../context/AuthContext";
import { ParcelProvider } from "../../context/ParcelContext";
import { ProjectProvider } from "../../context/ProjectContext";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ProjectProvider>
        <ParcelProvider>{children}</ParcelProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}
