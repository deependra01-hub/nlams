import type { PropsWithChildren } from "react";
import { AuthProvider } from "../../context/AuthContext";
import { ProjectProvider } from "../../context/ProjectContext";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ProjectProvider>{children}</ProjectProvider>
    </AuthProvider>
  );
}
