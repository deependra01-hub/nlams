import type { PropsWithChildren } from "react";
import { AuthProvider } from "../../context/AuthContext";

export function AppProviders({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
