export type Business = {
  id: string;
  business_name: string;
  address: string;
  business_phone: string;
  whatsapp_number: string;
  business_email: string;
  business_owner_id: string;
  slug: string;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
  owner_full_name: string;
  owner_email: string;
  owner_phone_number: string;
  owner_is_verified: boolean;
  owner_status: string;
};

import { z } from "zod";

export const businessSchema = z.object({
  business_name: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name is too long"),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address is too long"),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(100, "Slug is too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    ),

  business_phone: z
    .string()
    .min(7, "Enter a valid business phone number")
    .max(20, "Phone number is too long"),

  business_email: z.string().email("Enter a valid business email"),

  whatsapp_number: z
    .string()
    .min(7, "Enter a valid WhatsApp number")
    .max(20, "WhatsApp number is too long"),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});

export type BusinessFormData = z.infer<typeof businessSchema>;
