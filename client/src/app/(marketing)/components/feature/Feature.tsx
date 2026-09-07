import Heading from "@/component/shared/Heading";
import React from "react";
import FeatureCard from "./FeatureCard";
import { LuClipboardPen } from "react-icons/lu";
import { TfiRulerPencil } from "react-icons/tfi";
import { BsCashCoin } from "react-icons/bs";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { GiExpense } from "react-icons/gi";
import { IoStatsChartSharp } from "react-icons/io5";

const Feature = () => {
  return (
    <section className="bg-background-secondary">
      <div className="h-auto xl:h-195 py-20 not-lg:px-5 w-full lg:w-[85%] xl:w-[70%] m-auto">
        <Heading
          eyebrow="Why Tailors Choose SewDesk"
          title="Tailoring is fine art. Managing it shouldn't be hard work."
        />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 xl:gap-7 py-5">
          <FeatureCard
            icon={LuClipboardPen}
            description="Never mix up fabric, delivery dates, or Aso-Ebi requirements again. Keep track of cutting, sewing, and delivery status."
            title="Order Management"
          />
          <FeatureCard
            icon={TfiRulerPencil}
            description="Save secure, detailed measurement cards for your clients. Reference them instantly on your phone during cutting sessions."
            title="Customer Measurements"
          />
          <FeatureCard
            icon={LiaSwatchbookSolid}
            description="Easily schedule fittings and consultations. Avoid overbooking, especially during high-demand wedding and holiday seasons."
            title="Booking & Scheduler"
          />
          <FeatureCard
            icon={BsCashCoin}
            description="Send professional Naira invoices. Record upfront deposits and send automatic SMS reminders for outstanding balances."
            title="Payment Tracking"
          />
          <FeatureCard
            icon={GiExpense}
            description="Monitor your overheads. Track money spent on expensive threads, accessories, embroidery, and power fueling."
            title="Expense Management"
          />
          <FeatureCard
            icon={IoStatsChartSharp}
            description="Gain total clarity on your profit margins. Discover which outfits make you the most money whether Agbadas, Suits, or Dresses."
            title="Reports and Insights"
          />
        </section>
      </div>
    </section>
  );
};

export default Feature;
