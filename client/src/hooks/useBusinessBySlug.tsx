import { BusinessService } from "@/services/business/business.service";
import { Business } from "@/services/business/validation";
import { ParamValue } from "next/dist/server/request/params";
import { useEffect, useState } from "react";

export const useBusinessBySlug = (slug: ParamValue) => {
  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    const getBusinessData = async () => {
      const res = await BusinessService.getBusinessBySlug(slug);

      setBusiness(res.data);
    };

    getBusinessData();
  }, [slug]);

  return {
    business,
    setBusiness,
  };
};
