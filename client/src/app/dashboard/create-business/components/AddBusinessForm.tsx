"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Input from "@/component/ui/Input";
import Button from "@/component/ui/Button";
import { BusinessService } from "@/services/business/business.service";
import ErrorState from "@/component/shared/ErrorState";

const AddBusinessForm = () => {
  const [formData, setFormData] = useState({
    business_name: "",
    address: "",
    slug: "",
    business_phone: "",
    business_email: "",
    whatsapp_number: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await BusinessService.createBusiness(formData);
      setIsLoading(false);

      alert("Business Added Successfully");
      router.push("/dashboard/my-businesses");
      setFormData({
        business_name: "",
        address: "",
        slug: "",
        business_phone: "",
        business_email: "",
        whatsapp_number: "",
        description: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let errorMessage = error.response?.data;
        setError(errorMessage.message);
        setTimeout(() => {
          setError(null);
        }, 10000);
      }
      setIsLoading(false);
    }
  };
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="md:my-5 mt-3 bg-white w-full not-md:px-3 py-3 not-md:shadow-xs not-md:rounded-xl"
    >
      <div className="flex gap-2 not-md:block items-center">
        <Input
          htmlFor="business_name"
          label="Business Name"
          placeholder="Stitch & Pattern Studio"
          name="business_name"
          onChange={handleChange}
          value={formData.business_name}
        />
        <Input
          htmlFor="business_phone"
          label="Business Phone Number"
          inputType="tel"
          placeholder="09012345678"
          name="business_phone"
          onChange={handleChange}
          value={formData.business_phone}
        />
      </div>
      <Input
        htmlFor="slug"
        label="Business Slug"
        placeholder="daniel-couture"
        name="slug"
        onChange={handleChange}
        value={formData.slug}
      />

      <div className="flex gap-2 not-md:block items-center">
        <Input
          htmlFor="address"
          label="Address"
          name="address"
          onChange={handleChange}
          value={formData.address}
          placeholder="1042 Garment District, Suite B, New York"
        />
        <Input
          htmlFor="whatsapp_number"
          label="Business Whatsapp Number"
          name="whatsapp_number"
          onChange={handleChange}
          value={formData.whatsapp_number}
          placeholder="+234 701 232 4070"
        />
      </div>
      <Input
        htmlFor="business_email"
        label="Business Email"
        placeholder="danielcouture@gmail.com"
        name="business_email"
        onChange={handleChange}
        value={formData.business_email}
      />

      <Input
        htmlFor=""
        label="Business Description"
        isTextArea
        name="description"
        onChange={handleChange}
        value={formData.description}
        placeholder="Bespoke tailoring specializing in modern menswear, wedding suits, and repairs."
      />
      {error && (
        <ErrorState
          title="Business creation failed"
          message={error}
          onClose={() => setError(null)}
        />
      )}
      <div className="py-2">
        {isLoading ? (
          <Button
            children="Adding Business....."
            variant="sm"
            type="submit"
            disabled
          />
        ) : (
          <Button children="Create Business" variant="sm" type="submit" />
        )}
      </div>
    </form>
  );
};

export default AddBusinessForm;
