import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import type { Role, User } from "../types/domain";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loginAs: (role: Role) => User;
  logout: () => void;
  demoUsers: User[];
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const setStoreUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setStoreUser(user);
  }, [setStoreUser, user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      loginAs: (role: Role) => {
        const nextUser = authService.signIn(role);
        setUser(nextUser);
        return nextUser;
      },
      logout: () => {
        authService.signOut();
        setUser(null);
      },
      demoUsers: authService.getDemoUsers(),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
