"use client";
import React from "react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white/90 backdrop-blur-sm border border-slate-300 rounded-lg shadow-lg">
        <p className="label font-bold text-slate-800 mb-2">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-slate-700 font-medium">
            {`${p.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
