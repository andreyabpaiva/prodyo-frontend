"use client";

import { createContext, useState, ReactNode } from "react";
import { AuthContextType, User } from "./types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readLocalStorage() {
  if (typeof window === "undefined") return { token: null, user: null };
  const token = localStorage.getItem("token");
  const raw = localStorage.getItem("user");
  const user = raw ? (JSON.parse(raw) as User) : null;
  return { token, user };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = readLocalStorage();
  const [token, setToken] = useState<string | null>(initial.token);
  const [user, setUser] = useState<User | null>(initial.user);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

