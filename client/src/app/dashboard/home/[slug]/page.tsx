"use client";
import { BusinessService } from "@/services/business/business.service";
import { Business } from "@/services/business/validation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
 
  const { slug } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const query = useQuery({
    queryKey: ["business"],
    queryFn: () => BusinessService.getBusinessBySlug(slug),
  });
  useEffect(() => {
    const getBusinessData = async () => {
      const res = await BusinessService.getBusinessBySlug(slug);

      setBusiness(res.data);
    };

    getBusinessData();
  }, [business?.id]);

  return (
    <div>
      <p>address: {business?.address}</p>
      <p>business email: {business?.business_email}</p>
      <p>owner if: {business?.business_owner_id}</p>
    </div>
  );
};

export default Page;
