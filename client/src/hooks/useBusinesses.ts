import { BusinessService } from "@/services/business/business.service";
import { Business } from "@/services/business/validation";
import React, { useEffect, useState } from "react";

export const useBusinesses = () => {
  const [loading, setLoading] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  useEffect(() => {
    const getBusinesses = async () => {
      try {
        setLoading(true);
        const res = await BusinessService.getLoggedInUserBusinesses();
        setBusinesses(res.data ?? []);
        setLoading(false);
      } catch (error) {
        console.error("GET BUSINESSES ERROR:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getBusinesses();
  }, []);

  return {
    loading,
    setLoading,
    businesses,
    setBusinesses,
  };
};
