import type { Sql } from "postgres";

import {
  type Subscription,
  type subscriptionRepository as SubscriptionRepositoryInterface,
  SUBSCRIPTION_STATUS,
  type activateDTO,
} from "./subscription.types";

import type { SubscriptionDTO } from "./subscrition.schema";

import { ErrorLogger } from "../../../../config/errorLog";

export class SubscriptionRepositoryImpl implements SubscriptionRepositoryInterface {
  private readonly sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  create = async (data: SubscriptionDTO): Promise<Subscription | null> => {
    try {
      const [subscription] = await this.sql<Subscription[]>`
        INSERT INTO business.subscription (
          business_id,
          plan_id
        )
        VALUES (
          ${data.business_id},
          ${data.plan_id}
        )
        RETURNING *
      `;

      return subscription ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  };

  findById = async (id: string): Promise<Subscription | null> => {
    try {
      const [subscription] = await this.sql<Subscription[]>`
        SELECT
          s.id,
          s.business_id,
          s.plan_id,
          s.status,
          s.started_at,
          s.expires_at,
          s.created_at,
          s.updated_at,

          b.business_name,
          b.address,
          b.business_phone,
          b.whatsapp_number,
          b.business_email,
          b.business_owner_id,
          b.slug,
          b.description,

          p.name,
          p.price,
          p.name AS plan_name,
          p.price AS plan_price,
          b.business_name,
          p.name AS plan_name,
          p.price AS plan_price
        FROM business.subscription AS s
        INNER JOIN business.businesses AS b
          ON s.business_id = b.id
        INNER JOIN business.plans AS p
          ON s.plan_id = p.id
        WHERE s.id = ${id}
        LIMIT 1
      `;

      return subscription ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  };

  findByBusinessId = async (
    businessId: string,
  ): Promise<Subscription | null> => {
    try {
      const [subscription] = await this.sql<Subscription[]>`
         SELECT *
      FROM business.subscription
      WHERE business_id = ${businessId}
      LIMIT 1
      `;

      return subscription ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  };

  findByBusinessAndPlan = async (
    businessId: string,
    planId: string,
  ): Promise<Subscription | null> => {
    try {
      const [subscription] = await this.sql<Subscription[]>`
        SELECT *
        FROM business.subscription
        WHERE business_id = ${businessId}
          AND plan_id = ${planId}
        LIMIT 1
      `;

      return subscription ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  };

  updateStatus = async (
    id: string,
    status: SUBSCRIPTION_STATUS,
  ): Promise<Subscription | null> => {
    try {
      const [subscription] = await this.sql<Subscription[]>`
        UPDATE business.subscription
        SET
          status = ${status},
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      return subscription ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  };

  activate = async ({
    id,
    startedAt,
    expiresAt,
    status,
  }: activateDTO): Promise<Subscription | null> => {
    try {
      const [subscription] = await this.sql<Subscription[]>`
        UPDATE business.subscription
        SET
          status = ${status},
          started_at = ${startedAt},
          expires_at = ${expiresAt},
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      return subscription ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  };
}
