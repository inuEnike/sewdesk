"use client";
import { useAuth } from "@/hooks/authStore";
import { AuthService } from "@/services/auth/auth";
import { User } from "@/services/auth/validation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AppContextProp {
  me: User | null;
}

export const AppContext = createContext<AppContextProp | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<User | null>(null);
  useEffect(() => {
    const getMe = async () => {
      try {
        const { data } = await AuthService.me();
        setMe(data);
      } catch (error) {
        console.error("ME ERROR:", error);
      }
    };

    getMe();
  }, []);

  return <AppContext value={{ me }}>{children}</AppContext>;
};
