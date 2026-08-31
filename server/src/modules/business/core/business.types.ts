import type postgres from "postgres";
import type { businessDTO } from "./business.schema";

export const BUSINESS_STATUS = {
  PENDING: "pending",
  ACTIVE: "active",
  SUSPENDED: "suspended",
} as const;

// const BUSINESS_PLAN = {
//   SEWDESK: "sewdesk",
//   SEWDESK_PRO: "sewdesk_pro",
// };

export type BusinessStatus =
  (typeof BUSINESS_STATUS)[keyof typeof BUSINESS_STATUS];

// export type BusinessPlan = (typeof BUSINESS_PLAN)[keyof typeof BUSINESS_PLAN];

export interface Business {
  id: string;
  business_name: string;
  address: string;
  business_phone: string;
  whatsapp_number: string;
  business_email: string;
  slug: string;
  status: BusinessStatus;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  getLoggedInUserBusinesses: (userId: string) => Promise<Business[]>;
  getBusinessBySlug: (slug: string) => Promise<Business | null>;
  getLoggedInUserBusiness: (id: string, userId: string) => Promise<Business>;
  createBusiness: (
    data: businessDTO,
    ownerId: string,
  ) => Promise<{ message: string }>;
  updateBusiness: (
    id: string,
    userId: string,
    data: businessDTO,
  ) => Promise<{ message: string }>;
}

export interface Repository {
  getBusinessesByBusinessOwnerId: (
    id: string,
  ) => Promise<postgres.RowList<Business[]>>;

  getBusinessByBusinessIdOwnerId: (
    id: string,
    userId: string,
  ) => Promise<Business | null>;

  getAllBusinesses: () => Promise<Business | null>;

  getBusinessBySlug: (slug: string) => Promise<Business | null>;

  getBusinessByBusinessEmail: (email: string) => Promise<Business | null>;

  getBusinessByBusinessId: (id: string) => Promise<Business | null>;

  createBusiness: (
    data: businessDTO,
    ownerId: string,
  ) => Promise<Business | null>;

  updateBusiness: (
    id: string,
    userId: string,
    data: Partial<businessDTO>,
  ) => Promise<Business | null>;
}
