"use client";
import { AuthService } from "@/services/auth/auth.service";
import { User } from "@/services/auth/validation";
import { BusinessService } from "@/services/business/business.service";
import { Business } from "@/services/business/validation";
import { useParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppContextProp {
  me: User | null;
  businesses: Business[] | null;
  businessBySlug: Business | null;
}

export const AppContext = createContext<AppContextProp | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<User | null>(null);
  const [businesses, setBusinesses] = useState<Business[] | null>(null);
  const [businessBySlug, setBusinessBySlug] = useState<Business | null>(null);
  const { slug } = useParams();
  useEffect(() => {
    const getAppData = async () => {
      try {
        const [meResponse, businessResponse, businessBySlugResponse] =
          await Promise.all([
            AuthService.me(),
            BusinessService.getLoggedInUserBusinesses(),
            BusinessService.getBusinessBySlug(slug),
          ]);

        setMe(meResponse?.data);
        setBusinesses(businessResponse?.data);
        setBusinessBySlug(businessBySlugResponse.data);
      } catch (error) {
        console.error("APP DATA ERROR:", error);
      }
    };

    getAppData();
  }, []);

  return (
    <AppContext value={{ me, businesses, businessBySlug }}>
      {children}
    </AppContext>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppContextProvider");
  }
  return context;
};
