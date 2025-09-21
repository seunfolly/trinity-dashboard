"use client";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";

const RevenueImpact = ({ data }: { data: unknown[] }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
    <h3 className="text-lg font-semibold text-slate-900 mb-4">
      Revenue Impact Analysis
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis type="number" tick={{ fill: "#64748b", fontSize: 12 }} />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: "#64748b", fontSize: 12 }}
          width={100}
        />
        <Tooltip
          formatter={(value: number) =>
            `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          }
        />
        <Bar dataKey="value" name="Amount ($)">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                typeof entry === "object" &&
                entry !== null &&
                typeof (entry as { value?: unknown; name?: unknown })?.value === "number" &&
                typeof (entry as { value?: unknown; name?: unknown })?.name === "string"
                  ? (entry as { value: number; name: string }).value > 0
                    ? (entry as { value: number; name: string }).name === "Base Revenue"
                      ? "#a8a29e"
                      : "#22c55e"
                    : "#ef4444"
                  : "#ef4444"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default RevenueImpact;
