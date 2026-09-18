"use client";

import Button from "@/component/ui/Button";
import Logo from "@/component/ui/Logo";
import { PlanService } from "@/services/business/plan/plan.service";
import { SubscriptionService } from "@/services/business/subscription/subscription.service";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LuChevronDown, LuListChecks } from "react-icons/lu";
import ErrorState from "./ErrorState";

type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  cta: string;
  badge?: string;
  features: string[];
  isPopular?: boolean;
};

const Price = () => {
  const router = useRouter();
  const { id } = useParams();

  const businessId = typeof id === "string" ? id : "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["plans"],
    queryFn: PlanService.getAllPlans,
  });

  const plans: Plan[] = data?.data ?? [];

  const [selectedId, setSelectedId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedId),
    [plans, selectedId],
  );
  const handleContinue = async () => {
    if (!selectedId || !businessId) return;

    try {
      setIsSubmitting(true);

      const response = await SubscriptionService.create({
        business_id: businessId,
        plan_id: selectedId,
      });

      const subscription = response.data;

      if (
        subscription.status === "trialing" &&
        subscription.trial_ends_at &&
        new Date(subscription.trial_ends_at) > new Date()
      ) {
        router.push("/dashboard/my-businesses");
        return;
      }

      if (subscription.status === "active") {
        router.push("/dashboard/my-businesses");
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred";

        setMessage(message);
      } else {
        setMessage("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-10">
      {message && message ? (
        <ErrorState
          onClose={() => setMessage("")}
          message={message}
          title="Something occurred"
        />
      ) : null}
      <div className="w-full max-w-md rounded-2xl border border-border/70 bg-white p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <Logo />

          <h1 className="text-xl font-bold text-sidebar">Choose your plan</h1>

          <p className="mt-1 text-xs font-semibold text-light-text">
            Choose a plan to start your 14-day free trial.
          </p>
        </div>

        {/* Plan selection */}
        <div className="mt-6">
          <label
            htmlFor="plan"
            className="mb-1.5 block text-sm font-medium text-sidebar"
          >
            Select a plan
          </label>

          {isLoading ? (
            <div className="h-12 w-full animate-pulse rounded-lg border border-border/60 bg-border/20" />
          ) : isError ? (
            <p className="text-sm text-light-text">
              Couldn't load plans right now. Try refreshing the page.
            </p>
          ) : plans.length === 0 ? (
            <p className="text-sm text-light-text">
              No plans available right now.
            </p>
          ) : (
            <div className="relative">
              <select
                id="plan"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                disabled={isSubmitting}
                className="w-full appearance-none rounded-lg border border-border/70 bg-white px-3.5 py-3 pr-10 text-sm font-medium text-sidebar outline-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="" disabled>
                  Select a plan
                </option>

                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} —{" "}
                    {plan.price === 0
                      ? "Free"
                      : `₦${plan.price.toLocaleString()}/${plan.period}`}
                  </option>
                ))}
              </select>

              <LuChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-light-text" />
            </div>
          )}
        </div>

        {/* Selected plan */}
        {selectedPlan && (
          <div className="mt-4 rounded-lg border border-border/60 bg-border/10 p-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-semibold text-sidebar">
                {selectedPlan.name}
              </span>

              <span className="text-sm font-semibold tabular-nums text-sidebar">
                {selectedPlan.price === 0
                  ? "Free"
                  : `₦${selectedPlan.price.toLocaleString()}/${selectedPlan.period}`}
              </span>
            </div>

            <p className="mt-1 text-xs leading-5 text-light-text">
              {selectedPlan.description}
            </p>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-light-text">
              <LuListChecks className="h-3.5 w-3.5 shrink-0" />

              <span>{selectedPlan.features.length} features included</span>
            </div>
          </div>
        )}

        {/* Continue */}
        <div className="mt-6">
          <Button
            onClick={handleContinue}
            disabled={!selectedId || !businessId || isSubmitting}
            children={
              isSubmitting ? "Creating subscription..." : "Proceed to payment"
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Price;
