"use client";

import { useEffect, useSyncExternalStore } from "react";

type ThemeMode = "light" | "dark";

const THEME_KEY = "signalboard-theme";
let cachedMode: ThemeMode | null = null;
const listeners = new Set<() => void>();

const getStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  if (cachedMode) return cachedMode;
  const stored = window.localStorage.getItem(THEME_KEY) as ThemeMode | null;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  cachedMode = stored ?? (prefersDark ? "dark" : "light");
  return cachedMode;
};

const setTheme = (next: ThemeMode) => {
  cachedMode = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_KEY, next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useThemeMode() {
  const mode = useSyncExternalStore(subscribe, getStoredTheme, () => "light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", mode === "dark");
    }
  }, [mode]);

  const toggle = () => {
    setTheme(mode === "dark" ? "light" : "dark");
  };

  return { mode, toggle };
}
