import Button from "@/component/ui/Button";
import OutlineButton from "@/component/ui/OutlineButton";
import React from "react";
import { IconType } from "react-icons";
import { LuCircleCheck } from "react-icons/lu";
import { PiShieldCheckFill } from "react-icons/pi";

type PricingCardProps = {
  title: string;
  description: string;
  price: number;
  period: string;
  cta: string;
  badge?: string;
  features: string[];
};

const PricingCard = ({
  title,
  description,
  price,
  period,
  cta,
  badge,
  features,
}: PricingCardProps) => {
  return (
    <div className="bg-white border border-border rounded-xl p-4 self-start">
      {badge && (
        <span className="bg-primary rounded-full px-4 py-1 text-background font-bold text-xs">
          {badge}
        </span>
      )}

      <div className="py-4 flex flex-col gap-3">
        <h3 className="font-extrabold text-xl">{title}</h3>

        <div>
          <span className="text-3xl font-extrabold text-sidebar">
            {price === 0 ? "Free" : `₦${price}`}
          </span>
          <span className="text-sm text-light-text"> / {period}</span>
        </div>
        <p className="text-xs text-light-text font-light">{description}</p>

        <ul className="flex flex-col gap-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <LuCircleCheck className="text-emerald-primary" />
              <span className="text-xs text-light-text"> {feature}</span>
            </li>
          ))}
        </ul>
        {title === "Freemium" || title === "SewDesk Pro" ? (
          <OutlineButton children={cta} variant="full" />
        ) : (
          <Button children={cta} variant="full" />
        )}
      </div>
    </div>
  );
};

export default PricingCard;
