"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { logoutUserAction } from "@/actions/login";
import { useRouter } from "next/navigation";

type AppContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  logout: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Synchronize dynamic styles directly against DOM tree
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Security Watchdog: Triggers auto-logout when tab is hidden or idle
  useEffect(() => {
    let idleTimeout: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimeout);
      // Auto logout after 10 minutes of complete structural inactivity (600000 ms)
      idleTimeout = setTimeout(() => {
        handleGlobalLogout();
      }, 600000); 
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Drop session immediately or grace-period delay if they visit another site
        handleGlobalLogout();
      }
    };

    // Bind event listeners to window container
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimeout);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleGlobalLogout = async () => {
    await logoutUserAction();
    router.refresh();
    router.push("/login");
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, logout: handleGlobalLogout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be evaluated within an AppProvider schema wrapper.");
  return context;
}