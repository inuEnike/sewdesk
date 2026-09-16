import {
  CONFLICT_EXCEPTION,
  NOT_FOUND_EXCEPTION,
  UNAUTHORIZED_EXCEPTION,
} from "../../../../middleware/error.middleware";
import { generatePaymentReference } from "../../../../utils/genPaymentReference";
import type { BusinessRepository } from "../core/business.repository";
import {
  SUBSCRIPTION_STATUS,
  type subscriptionRepository,
} from "../subscription/subscription.types";
import type { PaymentDTO } from "./payments.schema";

import {
  PAYMENT_STATUS,
  type Payment,
  type PaymentRepository,
} from "./payments.types";

import type { PaystackService } from "./paystack/paystack.service";

export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly SubscriptionRepository: subscriptionRepository,
    private readonly BusinessRepository: BusinessRepository,
    private readonly paystackService: PaystackService,
  ) {}

  create = async (data: PaymentDTO, userId: string) => {
    const paymentReference = generatePaymentReference();

    // Check if payment reference already exists
    const existingPayment =
      await this.paymentRepository.findByReference(paymentReference);

    const findSubscriptionById = await this.SubscriptionRepository.findById(
      data.subscription_id,
    );

    if (!findSubscriptionById) {
      throw new NOT_FOUND_EXCEPTION("No subscription found");
    }

    const getBusiness =
      await this.BusinessRepository.getBusinessByBusinessIdOwnerId(
        findSubscriptionById.business_id,
        userId,
      );

    if (!getBusiness) {
      throw new UNAUTHORIZED_EXCEPTION("Not authorized for this request");
    }

    if (existingPayment) {
      throw new CONFLICT_EXCEPTION(
        "Payment with this reference already exists",
      );
    }

    // Create payment in database
    const payment = await this.paymentRepository.create({
      ...data,
      payment_reference: paymentReference,
    });

    if (!payment) {
      throw new NOT_FOUND_EXCEPTION("Failed to create payment");
    }

    // Initialize payment with Paystack
    const paystackResponse = await this.paystackService.initializeTransaction({
      email: getBusiness.business_email,
      amount: data.amount,
      reference: paymentReference,
      currency: data.currency,
    });

    return {
      payment,
      authorization_url: paystackResponse.authorization_url,
      reference: paystackResponse.reference,
    };
  };

  getById = async (id: string): Promise<Payment> => {
    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
      throw new NOT_FOUND_EXCEPTION("Payment not found");
    }

    return payment;
  };

  getByReference = async (reference: string): Promise<Payment> => {
    const payment = await this.paymentRepository.findByReference(reference);

    if (!payment) {
      throw new NOT_FOUND_EXCEPTION("Payment not found");
    }

    return payment;
  };

  getByBusinessId = async (businessId: string): Promise<Payment[]> => {
    return this.paymentRepository.findByBusinessId(businessId);
  };

  updateStatus = async (
    id: string,
    status: PAYMENT_STATUS,
  ): Promise<Payment> => {
    const payment = await this.paymentRepository.updateStatus(id, status);

    if (!payment) {
      throw new NOT_FOUND_EXCEPTION("Payment not found");
    }

    return payment;
  };

  verifyWebhook = async (payment_reference: string) => {
    const payment =
      await this.paymentRepository.findByReference(payment_reference);

    if (!payment) {
      throw new NOT_FOUND_EXCEPTION("Payment not found");
    }

    await this.paymentRepository.updateStatus(
      payment.id,
      PAYMENT_STATUS.COMPLETED,
    );

    const subscription = await this.SubscriptionRepository.findById(
      payment.subscription_id,
    );

    if (subscription?.status === SUBSCRIPTION_STATUS.ACTIVE) {
      throw new CONFLICT_EXCEPTION("Subscription is already active");
    }

    if (!subscription) {
      throw new NOT_FOUND_EXCEPTION("Subscription not found");
    }

    const startedAt = new Date();

    const expiresAt = new Date(startedAt);
    expiresAt.setDate(expiresAt.getDate() + 30);

    const verifyAndUpdate = await this.SubscriptionRepository.activate({
      id: subscription.id,
      startedAt: startedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      status: SUBSCRIPTION_STATUS.ACTIVE,
    });

    return verifyAndUpdate;
  };
}
