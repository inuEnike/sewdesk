import crypto from "crypto";
export const generatePaymentReference = (): string => {
  const prefix = "SEWDESK";

  const suffix = crypto.randomUUID();

  const paymentReference = `${prefix}-${suffix}`;
  return paymentReference;
};


