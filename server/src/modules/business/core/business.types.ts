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
  description: String;
  created_at: string;
  updated_at: string;
}

export interface Repository {
  getBusinessByBusinessOwnerId: (id: string) => Promise<Business | null>;
  getAllBusinesses: () => Promise<Business | null>;
  getBusinessBySlug: (slug: string) => Promise<Business | null>;
}
