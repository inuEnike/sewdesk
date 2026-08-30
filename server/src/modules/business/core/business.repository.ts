import type { Sql } from "postgres";
import type { Business, Repository } from "./business.types";

export class BookRepository implements Repository {
  constructor(private readonly sql: Sql) {}

  getBusinessByBusinessOwnerId = async (
    id: string,
  ): Promise<Business | null> => {
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
              b.plan,
              b.created_at,
              b.updated_at,

              u.full_name AS owner_full_name,
              u.email AS owner_email,
              u.phone_number AS owner_phone_number,
              u.is_verified AS owner_is_verified,
              u.status AS owner_status
            
            FROM business.businesses as b
              INNER JOIN auth.users as u
              ON b.business_owner_id = u.id
            
              WHERE b.business_owner_id = ${id}
            LIMIT 1
        `;
    return business ?? null;
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
    const [business] = await this.sql<Business[]>`
      SELECT * 
      FROM business.businesses
      WHERE slug=${slug}
    `;
    return business ?? null;
  };
}
