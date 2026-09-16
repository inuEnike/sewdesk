export interface CreatePaymentDto {
  subscription_id: string;
  amount: number;
  currency: string;
}