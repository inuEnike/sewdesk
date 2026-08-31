import type { Sql } from "postgres";
import type { Business, Repository, Service } from "./business.types";
import {
  BAD_REQUST_EXCEPTION,
  CONFLICT_EXCEPTION,
  NOT_FOUND_EXCEPTION,
} from "../../../../middleware/error.middleware";
import type { businessDTO } from "./business.schema";
import { logger } from "../../../../config/logger";

export class BusinessService implements Service {
  private readonly repository: Repository;
  constructor(repository: Repository) {
    this.repository = repository;
  }

  getLoggedInUserBusinesses = async (userId: string): Promise<Business[]> => {
    // find business by user id
    const businesses =
      await this.repository.getBusinessesByBusinessOwnerId(userId);

    // if there are no business, spit out an exception
    if (businesses.length === 0) {
      throw new NOT_FOUND_EXCEPTION("No businesses found");
    }

    // return the business
    return businesses;
  };

  createBusiness = async (
    data: businessDTO,
    userId: string,
  ): Promise<{ message: string }> => {
    // check for existing business by email
    const existingBusinessWithTheEmail =
      await this.repository.getBusinessByBusinessEmail(data.business_email);

    if (existingBusinessWithTheEmail) {
      throw new CONFLICT_EXCEPTION("Business with that email already exists");
    }

    // check for business with the slug name
    const existingBusinessWithTheSlug = await this.repository.getBusinessBySlug(
      data.slug,
    );

    if (existingBusinessWithTheSlug) {
      throw new CONFLICT_EXCEPTION("Slug URL already taken");
    }

    // create the business
    await this.repository.createBusiness(data, userId);
    return {
      message: "Business created successfully",
    };
  };

  getLoggedInUserBusiness = async (
    id: string,
    userId: string,
  ): Promise<Business> => {
    const business = await this.repository.getBusinessByBusinessIdOwnerId(
      id,
      userId,
    );

    // if there is not business, spit out an exception
    if (!business) {
      throw new NOT_FOUND_EXCEPTION("No business found");
    }

    return business;
  };

  getBusinessBySlug = async (slug: string): Promise<Business> => {
    // get business by slug
    const business = await this.repository.getBusinessBySlug(slug);

    if (!business) {
      throw new NOT_FOUND_EXCEPTION("Business with the slug not found ");
    }

    // send the business
    return business;
  };

  updateBusiness = async (
    id: string,
    userId: string,
    data: Partial<businessDTO>,
  ): Promise<{ message: string }> => {
    if (!id) {
      throw new NOT_FOUND_EXCEPTION("Id not found");
    }

    const existingBusiness = await this.repository.getBusinessByBusinessEmail(
      data.business_email as string,
    );

    if (existingBusiness && existingBusiness.id !== id) {
      throw new CONFLICT_EXCEPTION("Business with this email already exists");
    }
    await this.repository.updateBusiness(id, userId, data);

    return {
      message: "Business updated successfully",
    };
  };
}
