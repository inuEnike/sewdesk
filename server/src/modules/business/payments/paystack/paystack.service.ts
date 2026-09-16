import type { PaystackInitializeResponse } from "../payments.types";

export class PaystackService {
  private readonly baseUrl = "https://api.paystack.co";

  constructor(private readonly secretKey: string) {}

  async initializeTransaction(data: {
    email: string;
    amount: number;
    reference: string;
    currency: string;
  }) {
    const response = await fetch(`${this.baseUrl}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        amount: data.amount,
        reference: data.reference,
        currency: data.currency,
      }),
    });

    const result = (await response.json()) as PaystackInitializeResponse;

    if (!response.ok || !result.status) {
      throw new Error(result.message || "Failed to initialize payment");
    }

    return result.data;
  }
}
