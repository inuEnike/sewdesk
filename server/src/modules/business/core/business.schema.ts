import z from "zod";
import { BUSINESS_STATUS } from "./business.types";


export const BusinessSchema = z.object({
  business_name: z.string().min(1),
  address: z.string().min(1),
  business_phone: z.string().min(1),
  whatsapp_number: z.string().min(1),
  business_email: z.email(),
  slug: z.string().min(1),
  status: z.enum(BUSINESS_STATUS),
  description: z.string().optional(),
});
