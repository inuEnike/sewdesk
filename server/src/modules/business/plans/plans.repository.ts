import type { Sql } from "postgres";
import type { Plan, Repository } from "./plans.types";
import type postgres from "postgres";
import type { PlansDTO } from "./plans.schema";
import { ErrorLogger } from "../../../../config/errorLog";
import { BAD_REQUST_EXCEPTION } from "../../../../middleware/error.middleware";

export class PlanRepository implements Repository {
  private readonly sql: Sql;
  constructor(sql: Sql) {
    this.sql = sql;
  }
  getAllPlans = async (): Promise<Plan | null> => {
    try {
      const [plans] = await this.sql<Plan[]>`
        SELECT * FROM business.plans
        ORDER BY id ASC;
    `;
      return plans ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw new BAD_REQUST_EXCEPTION(
        "Unable to get all plans, please try again",
      );
    }
  };

  getPlanById = async (id: string): Promise<Plan | null> => {
    try {
      const [plan] = await this.sql<Plan[]>`
        SELECT * 
        FROM business.plans
        WHERE id = ${id}
    `;

      return plan ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw new BAD_REQUST_EXCEPTION(
        `Unable to get plan with the id of ${id}, please try again`,
      );
    }
  };

  createPlan = async (data: PlansDTO): Promise<Plan | null> => {
    try {
      const [plan] = await this.sql<Plan[]>`
        INSERT INTO business.plan 
        (name, description, price)
        VALUES 
        (
            ${data.name}, ${data.description}, ${data.price}
        )
        RETURNING *
    `;
      return plan ?? null;
    } catch (error) {
      ErrorLogger(error);
      throw new BAD_REQUST_EXCEPTION("Unable to create plan, please try again");
    }
  };
}
