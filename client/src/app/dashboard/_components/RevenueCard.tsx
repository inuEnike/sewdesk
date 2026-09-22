import { revenueData } from "@/lib/seed/revenueData";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const RevenueCard = () => {
  return (
    <div className="bg-white w-auto h-auto rounded-xl border-border border p-6 shadow-xs">
      {/* Header */}
      <div className="flex not-sm:flex-col not-sm:gap-3 justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">Your Revenue Overview</h3>
          <p className="text-xs text-light-text mt-0.5">
            Bespoke & Alteration earnings last 6 months
          </p>
        </div>
        <div>
          <p className="text-primary font-bold text-md">₦24,850 Total</p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64 mt-2">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className={"outline-0!"}
          style={{ outline: "none !important" }}
        >
          <LineChart
            data={revenueData}
            style={{ outline: "none!important", border: 0 }}
            className="focus:outline-0! outline-none! ring-0!"
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            {/* Horizontal Dashed Grid Lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />

            {/* X-Axis Setup */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
              dy={10}
            />

            <Tooltip />

            {/* Blue Line with Dots */}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ fill: "#2563EB", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueCard;
