import type { Sql } from "postgres";
import type { Plan, Repository } from "./plans.types";
import type { PlansDTO } from "./plans.schema";

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

      return plans;
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

      return plan ?? null;
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
          (name, description, price)
        VALUES
          (${data.name}, ${data.description}, ${data.price})
        RETURNING *;
      `;

      return plan ?? null;
    } catch (error) {
      ErrorLogger(error);

      throw new BAD_REQUST_EXCEPTION("Unable to create plan, please try again");
    }
  };

  // UPDATE PLAN
  updatePlanById = async (id: string, data: PlansDTO): Promise<Plan | null> => {
    try {
      const [plan] = await this.sql<Plan[]>`
        UPDATE business.plans
        SET
          name = ${data.name},
          description = ${data.description},
          price = ${data.price}
        WHERE id = ${id}
        RETURNING *;
      `;

      return plan ?? null;
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

      return plan ?? null;
    } catch (error) {
      ErrorLogger(error);

      throw new BAD_REQUST_EXCEPTION(
        `Unable to delete plan with the id of ${id}, please try again`,
      );
    }
  };
}
