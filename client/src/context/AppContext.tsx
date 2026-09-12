"use client";
import { AuthService } from "@/services/auth/auth.service";
import { User } from "@/services/auth/validation";
import { BusinessService } from "@/services/business/business.service";
import { Business } from "@/services/business/validation";
import { useParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppContextProp {
  setMe: Dispatch<SetStateAction<User | null>>;
  me: User | null;
}

export const AppContext = createContext<AppContextProp | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<User | null>(null);
  useEffect(() => {
    const getAppData = async () => {
      try {
        const getMe = await AuthService.me();

        setMe(getMe?.data);
      } catch (error) {
        console.error("APP DATA ERROR:", error);
      }
    };

    getAppData();
  }, [me]);

  return <AppContext value={{ me, setMe }}>{children}</AppContext>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppContextProvider");
  }
  return context;
};
