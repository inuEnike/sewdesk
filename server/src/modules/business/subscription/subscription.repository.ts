import type { Sql } from "postgres";
import type { Repository } from "./subscription.types";

export class SubscriptionRepository implements Repository {
  private readonly sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }


  
}
