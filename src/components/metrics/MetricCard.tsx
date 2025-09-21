"use client";
import React, { memo } from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface MetricCardProps {
  title: string;
  value: string;
  status: { text: string; color: string; icon: React.ElementType };
  trendData?: number[];
}

const MetricCard = memo(
  ({ title, value, status, trendData }: MetricCardProps) => (
    <div className="relative text-center p-4 bg-white/50 border border-slate-200/80 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between overflow-hidden">
      <div className="z-10">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-3xl font-bold text-slate-800 my-2">{value}</p>
        <p
          className={`text-sm font-semibold ${status.color} flex items-center justify-center gap-1`}
        >
          <status.icon className="w-4 h-4" />
          {status.text}
        </p>
      </div>
      {trendData && (
        <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-20">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData.map((v) => ({ v }))}>
              <Area
                type="monotone"
                dataKey="v"
                stroke={status.color.includes("green") ? "#10B981" : "#3B82F6"}
                fill={status.color.includes("green") ? "#10B981" : "#3B82F6"}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
);

MetricCard.displayName = "MetricCard";
export default MetricCard;
