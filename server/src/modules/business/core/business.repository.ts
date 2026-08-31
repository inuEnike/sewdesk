import { type Sql } from "postgres";
import type { Business, Repository } from "./business.types";
import { type businessDTO } from "./business.schema";
import { ErrorLogger } from "../../../../config/errorLog";
import type postgres from "postgres";
import { BAD_REQUST_EXCEPTION } from "../../../../middleware/error.middleware";
import { ENV } from "../../../../utils/env.util";

export class BusinessRepository implements Repository {
  constructor(private readonly sql: Sql) {}

  getBusinessesByBusinessOwnerId = async (
    id: string,
  ): Promise<postgres.RowList<Business[]>> => {
    try {
      const businesses = await this.sql<Business[]>`
        SELECT 
          b.id,
          b.business_name,
          b.address,
          b.business_phone,
          b.whatsapp_number,
          b.business_email,
          b.business_owner_id,
          b.slug,
          b.status,
          b.description,
          b.created_at,
          b.updated_at,

          u.full_name AS owner_full_name,
          u.email AS owner_email,
          u.phone_number AS owner_phone_number,
          u.is_verified AS owner_is_verified,
          u.status AS owner_status

        FROM business.businesses AS b
        INNER JOIN auth.users AS u
          ON b.business_owner_id = u.id

        WHERE b.business_owner_id = ${id}
      `;

      return businesses;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  };

  getBusinessByBusinessIdOwnerId = async (
    id: string,
    userId: string,
  ): Promise<Business | null> => {
    try {
      const [business] = await this.sql<Business[]>`
        SELECT 
          b.id,
          b.business_name,
          b.address,
          b.business_phone,
          b.whatsapp_number,
          b.business_email,
          b.business_owner_id,
          b.slug,
          b.status,
          b.description,
          b.created_at,
          b.updated_at,

          u.full_name AS owner_full_name,
          u.email AS owner_email,
          u.phone_number AS owner_phone_number,
          u.is_verified AS owner_is_verified,
          u.status AS owner_status

        FROM business.businesses AS b
        INNER JOIN auth.users AS u
          ON b.business_owner_id = u.id

        WHERE b.id = ${id}
          AND b.business_owner_id = ${userId}
      `;

      return business ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw new BAD_REQUST_EXCEPTION(
        "Unable to get business, please try again",
      );
    }
  };

  getAllBusinesses = async (): Promise<Business | null> => {
    const [businesses] = await this.sql<Business[]>`
      SELECT *
      FROM business.businesses
      ORDER BY business_name
    `;

    return businesses ?? null;
  };

  getBusinessBySlug = async (slug: string): Promise<Business | null> => {
    try {
      const [business] = await this.sql<Business[]>`
        SELECT 
          b.id,
          b.business_name,
          b.address,
          b.business_phone,
          b.whatsapp_number,
          b.business_email,
          b.business_owner_id,
          b.slug,
          b.status,
          b.description,
          b.created_at,
          b.updated_at,

          u.full_name AS owner_full_name,
          u.email AS owner_email,
          u.phone_number AS owner_phone_number,
          u.is_verified AS owner_is_verified,
          u.status AS owner_status

        FROM business.businesses AS b
        INNER JOIN auth.users AS u
          ON b.business_owner_id = u.id

        WHERE b.slug = ${slug}
      `;

      return business ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  };

  getBusinessByBusinessEmail = async (
    email: string,
  ): Promise<Business | null> => {
    try {
      const [business] = await this.sql<Business[]>`
        SELECT 
          b.id,
          b.business_name,
          b.address,
          b.business_phone,
          b.whatsapp_number,
          b.business_email,
          b.business_owner_id,
          b.slug,
          b.status,
          b.description,
          b.created_at,
          b.updated_at,

          u.full_name AS owner_full_name,
          u.email AS owner_email,
          u.phone_number AS owner_phone_number,
          u.is_verified AS owner_is_verified,
          u.status AS owner_status

        FROM business.businesses AS b
        INNER JOIN auth.users AS u
          ON b.business_owner_id = u.id

        WHERE b.business_email = ${email}
      `;

      return business ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  };

  getBusinessByBusinessId = async (id: string): Promise<Business | null> => {
    try {
      const [business] = await this.sql<Business[]>`
        SELECT *
        FROM business.businesses
        WHERE id = ${id}
      `;

      return business ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw error;
    }
  };

  createBusiness = async (
    data: businessDTO,
    ownerId: string,
  ): Promise<Business | null> => {
    try {
      const [business] = await this.sql<Business[]>`
        INSERT INTO business.businesses (
          business_name,
          address,
          business_phone,
          whatsapp_number,
          business_email,
          business_owner_id,
          slug,
          status,
          description
        )
        VALUES (
          ${data.business_name},
          ${data.address},
          ${data.business_phone},
          ${data.whatsapp_number},
          ${data.business_email},
          ${ownerId},
          ${data.slug},
          ${data.status},
          ${data.description}
        )
        RETURNING *
      `;

      return business ?? null;
    } catch (error) {
      ErrorLogger(error);
      if (ENV.NODE_ENV === "development") {
        throw new BAD_REQUST_EXCEPTION(error as string);
      } else {
        throw new BAD_REQUST_EXCEPTION(
          "Unable to create a business, please try again",
        );
      }
    }
  };

  updateBusiness = async (
    id: string,
    userId: string,
    data: Partial<businessDTO>,
  ): Promise<Business | null> => {
    try {
      const [business] = await this.sql<Business[]>`
        UPDATE business.businesses
          SET
            business_name = COALESCE(${data.business_name ?? null}, business_name),
            address = COALESCE(${data.address ?? null}, address),
            business_phone = COALESCE(${data.business_phone ?? null}, business_phone),
            whatsapp_number = COALESCE(${data.whatsapp_number ?? null}, whatsapp_number),
            business_email = COALESCE(${data.business_email ?? null}, business_email),
            slug = COALESCE(${data.slug ?? null}, slug),
            status = COALESCE(${data.status ?? null}, status),
            description = COALESCE(${data.description ?? null}, description)
            WHERE id = ${id}
            AND business_owner_id = ${userId}

        RETURNING *
      `;

      return business ?? null;
    } catch (error) {
      ErrorLogger(error);
      if (ENV.NODE_ENV === "development") {
        throw new BAD_REQUST_EXCEPTION(error as string);
      } else {
        throw new BAD_REQUST_EXCEPTION("An error occured while updating");
      }
    }
  };
}
