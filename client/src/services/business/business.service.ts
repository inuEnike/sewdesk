import { api } from "@/lib/api";
import { ParamValue } from "next/dist/server/request/params";
import { Business, BusinessFormData } from "./validation";

export class BusinessService {
  static async getLoggedInUserBusinesses() {
    const request = await api.get("/business/me");

    if (request.status != 200) {
      console.log(request);
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

  static async createBusiness(data: BusinessFormData) {
    const request = await api.post("/business", data);

    if (request.status != 201) {
      throw new Error(request?.data?.error);
    }
    return request.data;
  }
}
