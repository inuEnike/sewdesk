import { FormatCurrency } from "@/lib/utils/FormatCurrency";
import React from "react";

const OutstandingPayments = () => {
  return (
    <div className="bg-white p-6 rounded-xl self-start">
      <h3 className="text-lg font-bold">Outstanding Payments</h3>
      <div className="flex items-center gap-4 pt-5 justify-between">
        <div className="">
          <p className="text-sm font-semibold">Tunder Alabi</p>
          <p className="text-text-light-small text-xs font-light">
            Agbada Suit
          </p>
        </div>
        <div className="">
          <p className="text-xs text-danger font-semibold">
            {FormatCurrency(80000)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 pt-5 justify-between">
        <div className="">
          <p className="text-sm font-semibold">Chioma Nneze</p>
          <p className="text-text-light-small text-xs font-light">Lace Gown</p>
        </div>
        <div className="">
          <p className="text-xs text-danger font-semibold">
            {FormatCurrency(150000)}
          </p>
        </div>
      </div>{" "}
      <div className="flex items-center gap-4 pt-5 justify-between">
        <div className="">
          <p className="text-sm font-semibold">Alhaji Ibrahim</p>
          <p className="text-text-light-small text-xs font-light">
            GBark Senetor Pack
          </p>
        </div>
        <div className="">
          <p className="text-xs text-danger font-semibold">
            {FormatCurrency(220000)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OutstandingPayments;
