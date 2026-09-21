import Link from "next/link";
import React from "react";

const FittingsCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-border row-span-[0.5fr]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Fittings & Appointments</h3>
        <Link
          href={"/dashboard/home"}
          className="text-xs text-primary font-semibold"
        >
          View All
        </Link>
      </div>
      <div className="flex items-center gap-4 pt-5">
        <div className="bg-icon-background p-2 rounded-lg">
          <p className="text-xs text-primary font-semibold">09:30 AM</p>
        </div>
        <div className="">
          <p className="text-sm font-semibold">Aisha Mohammed</p>
          <p className="text-text-light-small text-xs font-light">
            First fitting • Wedding Gown
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 pt-5">
        <div className="bg-icon-background p-2 rounded-lg">
          <p className="text-xs text-primary font-semibold">09:30 AM</p>
        </div>
        <div className="">
          <p className="text-sm font-semibold">Oluwaseun Adeyemi</p>
          <p className="text-text-light-small text-xs font-light">
            Consultation & Measurement
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 pt-5">
        <div className="bg-icon-background p-2 rounded-lg">
          <p className="text-xs text-primary font-semibold">09:30 AM</p>
        </div>
        <div className="">
          <p className="text-sm font-semibold">Segun Alabi</p>
          <p className="text-text-light-small text-xs font-light">
            Final Fitting • Senator Suit
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 pt-5">
        <div className="bg-icon-background p-2 rounded-lg">
          <p className="text-xs text-primary font-semibold">09:30 AM</p>
        </div>
        <div className="">
          <p className="text-sm font-semibold">Aisha Mohammed</p>
          <p className="text-text-light-small text-xs font-light">
            First fitting • Wedding Gown
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 pt-5">
        <div className="bg-icon-background p-2 rounded-lg">
          <p className="text-xs text-primary font-semibold">09:30 AM</p>
        </div>
        <div className="">
          <p className="text-sm font-semibold">Aisha Mohammed</p>
          <p className="text-text-light-small text-xs font-light">
            First fitting • Wedding Gown
          </p>
        </div>
      </div>
    </div>
  );
};

export default FittingsCard;
