import type { Sql } from "postgres";

import type {
  Payment,
  PAYMENT_STATUS,
  PaymentRepository as PaymentRepositoryInterface,
} from "./payments.types";

import type { PaymentDTO } from "./payments.schema";
import { ErrorLogger } from "../../../../config/errorLog";

export class PaymentRepositoryImpl implements PaymentRepositoryInterface {
  constructor(private readonly db: Sql) {}

  async create(data: PaymentDTO): Promise<Payment | null> {
    try {
      const [payment] = await this.db<Payment[]>`
        INSERT INTO business.payments 
            (
                subscription_id,
                amount,
                currency,
                payment_reference,
                status
            )
        VALUES 
        (
            ${data.subscription_id},
            ${data.amount},
            ${data.currency},
            ${data.payment_reference!},
            ${data.status!}
        )
        RETURNING *
    `;

      return payment ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  }

  async findById(id: string): Promise<Payment | null> {
    try {
      const [payment] = await this.db<Payment[]>`
      SELECT *
      FROM business.payments
      WHERE id = ${id}
      LIMIT 1
    `;

      return payment ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  }

  async findByReference(reference: string): Promise<Payment | null> {
    try {
      const [payment] = await this.db<Payment[]>`
      SELECT *
      FROM business.payments
      WHERE payment_reference = ${reference}
      LIMIT 1
    `;

      return payment ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  }

  async findByBusinessId(businessId: string): Promise<Payment[]> {
    try {
      const payments = await this.db<Payment[]>`
      SELECT *
      FROM business.payments p
      INNER JOIN subscriptions s
        ON p.subscription_id = s.id
      WHERE s.business_id = ${businessId}
      ORDER BY p.created_at DESC
    `;

      return payments;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  }

  async updateStatus(
    id: string,
    status: PAYMENT_STATUS,
  ): Promise<Payment | null> {
    try {
      const [payment] = await this.db<Payment[]>`
      UPDATE business.payments
      SET
        status = ${status},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

      return payment ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  }
}
