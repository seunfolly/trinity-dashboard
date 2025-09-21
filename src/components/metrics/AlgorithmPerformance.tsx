"use client";
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

interface AlgoData {
  date: string;
  multiplier: number;
  discount: number;
}

const AlgorithmPerformance = ({ data }: { data: AlgoData[] | null }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
    <h3 className="text-lg font-semibold text-slate-900 mb-4">
      Algorithm Performance Over Time
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data ?? []}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorMultiplier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDiscount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 12 }} />
        <YAxis yAxisId="left" tick={{ fill: "#64748b", fontSize: 12 }} />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fill: "#64748b", fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: "14px", paddingTop: "10px" }} />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="multiplier"
          stroke="#3B82F6"
          strokeWidth={2}
          fill="url(#colorMultiplier)"
          name="MCD Multiplier"
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="discount"
          stroke="#10B981"
          strokeWidth={2}
          fill="url(#colorDiscount)"
          name="Avg. Discount (%)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default AlgorithmPerformance;
