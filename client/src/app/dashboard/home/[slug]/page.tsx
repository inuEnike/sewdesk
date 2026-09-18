"use client";
import ErrorState from "@/component/shared/ErrorState";
import { BusinessService } from "@/services/business/business.service";
import { Business } from "@/services/business/validation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { slug } = useParams();
  const router = useRouter();
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

  if (business?.status === "pending") {
    return (
      <ErrorState
        onClose={() => router.push("/dashboard/my-businesses")}
        message="Trial Expired, Please subscribe"
        title="Trial Expired"
      />
    );
  }

  return (
    <div>
      <p>address: {business?.address}</p>
      <p>business email: {business?.business_email}</p>
      <p>owner id: {business?.business_owner_id}</p>

      {/* <p>{query.data.address}</p> */}
    </div>
  );
};

export default Page;
