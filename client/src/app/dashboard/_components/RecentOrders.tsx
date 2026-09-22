import { orderData } from "@/lib/seed/orderData";
import { FormatCurrency } from "@/lib/utils/FormatCurrency";
import { formattedDate } from "@/lib/utils/formattedDate";
import Link from "next/link";
import React from "react";

const RecentOrders = () => {
  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Active Fashion Orders</h3>
        <Link
          href={"/dashboard/home"}
          className="text-xs text-primary font-semibold"
        >
          View All Orders
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="my-5 w-full border-separsate">
          <thead className="bg-background rounded-md w-full">
            <tr className="text-left text-xs rounded-md!">
              <th className="font-medium py-3 px-2 rounded-lg!">Order Id</th>
              <th className="font-medium py-3 px-2">Customer</th>
              <th className="font-medium py-3 px-2">Garment Style</th>
              <th className="font-medium py-3 px-2">Status</th>
              <th className="font-medium py-3 px-2">Amount</th>
              <th className="font-medium py-3 px-2 rounded-lg!">Due Date</th>
            </tr>
          </thead>
          <thead className="">
            {orderData.slice(0, 5).map((data, key) => (
              <tr className="shadow-xs text-xs" key={key}>
                <td className="py-5 font-semibold px-2 text-xs">
                  {data.orderId}
                </td>
                <td className="py-5 font-light px-2 text-xs">
                  {data.customer}
                </td>
                <td className="py-5 font-semibold text-light-text px-2 text-xs">
                  {data.garmentStyle}
                </td>
                <td className="py-5 font-light text-center px-2 text-xs">
                  <div
                    className={`${data.status === "In Progress" ? "bg-icon-background" : data.status === "Cancelled" ? "bg-icon-background-orange" : data.status === "Pending" ? "bg-icon-background-orange" : "bg-icon-background-check"} p-1 rounded-full`}
                  >
                    <span className="text-xs">

                    {data.status}
                    </span>
                  </div>
                </td>
                <td className="py-5 font-light px-2 text-xs">
                  {data.amountDue && FormatCurrency(data.amountDue)}
                </td>
                <td className="py-5 font-light px-2 text-xs">
                  {data.date && formattedDate(data.date)}
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
