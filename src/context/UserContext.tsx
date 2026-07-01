"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { UserProfile, UserState } from "@/types/user";

const STORAGE_KEY = "shish_user";

interface UserContextValue extends UserState {
  login: (profile: UserProfile) => void;
  logout: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

function loadFromStorage(): UserState {
  if (typeof window === "undefined") return { isLoggedIn: false, profile: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { isLoggedIn: false, profile: null };
    return JSON.parse(raw) as UserState;
  } catch {
    return { isLoggedIn: false, profile: null };
  }
}

function saveToStorage(state: UserState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserState>({ isLoggedIn: false, profile: null });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    setState(loadFromStorage());
    setHydrated(true);
  }, []);

  // Persist every change
  useEffect(() => {
    if (hydrated) saveToStorage(state);
  }, [state, hydrated]);

  const login = useCallback((profile: UserProfile) => {
    setState({ isLoggedIn: true, profile });
  }, []);

  const logout = useCallback(() => {
    setState({ isLoggedIn: false, profile: null });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      profile: prev.profile ? { ...prev.profile, ...patch } : null,
    }));
  }, []);

  const value = useMemo(
    () => ({ ...state, login, logout, updateProfile }),
    [state, login, logout, updateProfile]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
}
