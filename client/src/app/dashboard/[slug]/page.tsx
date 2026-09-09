"use client";
import { BusinessService } from "@/services/business/business.service";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { slug } = useParams();
  const getBusinessData = async () => {
    const res = await BusinessService.getBusinessBySlug(slug);

    console.log(res);
  };

  getBusinessData();

  return <div></div>;
};

export default Page;
