import type { PaymentDTO } from "./payments.schema";

export enum PAYMENT_STATUS {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface Payment {
  id: string;
  status: PAYMENT_STATUS;
  subscription_id: string;
  amount: number;
  payment_reference: string;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentRepository {
  create(data: PaymentDTO): Promise<Payment | null>;
  findById(id: string): Promise<Payment | null>;
  findByReference(reference: string): Promise<Payment | null>;
  findByBusinessId(businessId: string): Promise<Payment[]>;
  updateStatus(id: string, status: PAYMENT_STATUS): Promise<Payment | null>;
}

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}
