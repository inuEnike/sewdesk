import { api } from "@/lib/api";
import { CreatePaymentDto } from "./payment.type";

export class PaymentService {
  static async initialize(data: CreatePaymentDto) {
    const plans = await api.post("/payment/initialize", data);

    if (plans.status != 201) {
      throw new Error(plans?.data?.error);
    }
    return plans.data;
  }
}
