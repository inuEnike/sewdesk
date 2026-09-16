import type { Sql } from "postgres";

import type { Plan, Repository } from "./plans.types";

import type { PlansDTO, UpdatePlanDTO } from "./plans.schema";

import { ErrorLogger } from "../../../../config/errorLog";

import { BAD_REQUST_EXCEPTION } from "../../../../middleware/error.middleware";

export class PlanRepository implements Repository {
  private readonly sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  // GET ALL PLANS

  getAllPlans = async (): Promise<Plan[] | null> => {
    try {
      const plans = await this.sql<Plan[]>`

        SELECT *

        FROM business.plans

        ORDER BY id ASC;

      `;

      return plans.map((plan) => ({
        ...plan,
        features: JSON.parse(plan.features as unknown as string),
      }));
    } catch (error) {
      ErrorLogger(error);

      throw new BAD_REQUST_EXCEPTION(
        "Unable to get all plans, please try again",
      );
    }
  };

  // GET PLAN BY ID

  getPlanById = async (id: string): Promise<Plan | null> => {
    try {
      const [plan] = await this.sql<Plan[]>`

        SELECT *

        FROM business.plans

        WHERE id = ${id};

      `;

      return plan
        ? {
            ...plan,
            features: JSON.parse(plan.features as unknown as string),
          }
        : null;
    } catch (error) {
      ErrorLogger(error);

      throw new BAD_REQUST_EXCEPTION(
        `Unable to get plan with the id of ${id}, please try again`,
      );
    }
  };

  // CREATE PLAN

  createPlan = async (data: PlansDTO): Promise<Plan | null> => {
    try {
      const [plan] = await this.sql<Plan[]>`

        INSERT INTO business.plans

          (

            name,

            description,

            price,

            period,

            cta,

            highlight,

            badge,

            features

          )

        VALUES

          (

            ${data.name},

            ${data.description},

            ${data.price},

            ${data.period},

            ${data.cta},

            ${data.highlight},

            ${data.badge!},

            ${JSON.stringify(data.features)}

          )

        RETURNING *;

      `;

      return plan
        ? {
            ...plan,
            features: JSON.parse(plan.features as unknown as string),
          }
        : null;
    } catch (error) {
      ErrorLogger(error);

      throw new BAD_REQUST_EXCEPTION("Unable to create plan, please try again");
    }
  };

  // UPDATE PLAN

  updatePlanById = async (
    id: string,

    data: UpdatePlanDTO,
  ): Promise<Plan | null> => {
    try {
      const [plan] = await this.sql<Plan[]>`

      UPDATE business.plans

      SET

        name = COALESCE(${data.name ?? null}, name),

        description = COALESCE(${data.description ?? null}, description),

        price = COALESCE(${data.price ?? null}, price),

        period = COALESCE(${data.period ?? null}, period),

        cta = COALESCE(${data.cta ?? null}, cta),

        highlight = COALESCE(${data.highlight ?? null}, highlight),

        badge = COALESCE(${data.badge ?? null}, badge),

        features = COALESCE(

          ${data.features ? JSON.stringify(data.features) : null},

          features

        )

      WHERE id = ${id}

      RETURNING *;

    `;

      return plan
        ? {
            ...plan,
            features: JSON.parse(plan.features as unknown as string),
          }
        : null;
    } catch (error) {
      ErrorLogger(error);

      throw new BAD_REQUST_EXCEPTION(
        `Unable to update plan with the id of ${id}, please try again`,
      );
    }
  };

  // DELETE PLAN

  deletePlanById = async (id: string): Promise<Plan | null> => {
    try {
      const [plan] = await this.sql<Plan[]>`

        DELETE FROM business.plans

        WHERE id = ${id}

        RETURNING *;

      `;

      return plan
        ? {
            ...plan,
            features: JSON.parse(plan.features as unknown as string),
          }
        : null;
    } catch (error) {
      ErrorLogger(error);

      throw new BAD_REQUST_EXCEPTION(
        `Unable to delete plan with the id of ${id}, please try again`,
      );
    }
  };

  getPlanByPlanName = async (name: string): Promise<Plan | null> => {
    try {
      const [plan] = await this.sql<Plan[]>`

        SELECT *

        FROM business.plans

        WHERE name = ${name}

      `;

      return plan
        ? {
            ...plan,
            features: JSON.parse(plan.features as unknown as string),
          }
        : null;
    } catch (error) {
      ErrorLogger(error);

      throw new BAD_REQUST_EXCEPTION(
        `Unable to get plan with the name of ${name}, please try again`,
      );
    }
  };
}
