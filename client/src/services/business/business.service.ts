import { api } from "@/lib/api";
import { ParamValue } from "next/dist/server/request/params";

export class BusinessService {
  static async getLoggedInUserBusinesses() {
    const request = await api.get("/business/me");

    if (request.status != 200) {
      throw new Error(request?.data?.error);
    }
    return request.data;
  }

  static async getBusinessBySlug(slug: ParamValue) {
    const request = await api.get(`/business/${slug}`);

    if (request.status != 200) {
      throw new Error(request?.data?.error);
    }
    return request.data;
  }
}
