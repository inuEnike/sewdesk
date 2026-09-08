import { PlanComparisonData } from "@/lib/utils/planComparisonData";
import React from "react";
import { FaCheckDouble } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

const PlanComparisonTable = () => {
  const columns = Object.keys(PlanComparisonData[0]);

  return (
    <section>
      <div className="py-5">
        <h3 className="text-2xl font-extrabold">
          Detailed Plan Feature Comparison
        </h3>
      </div>

      <section className="overflow-x-auto w-full">
        <table className="w-full shadow-md border border-border rounded-3xl border-separate border-spacing-0 overflow-hidden">
          <thead>
            <tr className="bg-icon-background text-left w-full">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-5 text-sm font-bold text-ferra capitalize"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {PlanComparisonData.map((data, rowKey) => {
              return (
                <tr key={rowKey} className="border-border last:border-b-0">
                  {columns.map((col, colKey) => {
                    const value = data[col as keyof typeof data];
                    return (
                      <td key={colKey} className="p-4 text-sm text-slate-600">
                        {value && value === true ? (
                          <FaCheckDouble className="font-semibold text-lg text-emerald-primary" />
                        ) : value === false ? (
                          <IoCloseCircle className="font-semibold text-xl text-danger" />
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default PlanComparisonTable;
