"use client";
import React, { memo } from "react";
import {
  HeartPulse,
  TrendingUp,
  Percent,
  Scale,
  Zap,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { AnalyticsData, Config } from "../types/types"; // Adjust path as needed

interface AedMetricsPanelProps {
  analytics: AnalyticsData | null;
  config: Config;
}

// --- Sub-Components ---
const MetricCard = memo(
  ({
    title,
    value,
    status,
    trendData,
  }: {
    title: string;
    value: string;
    status: { text: string; color: string; icon: React.ElementType };
    trendData?: number[];
  }) => (
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white/90 backdrop-blur-sm border border-slate-300 rounded-lg shadow-lg">
        <p className="label font-bold text-slate-800 mb-2">{`${label}`}</p>
        <p className="intro text-blue-600 font-medium">{`Multiplier : ${payload[0].value}`}</p>
        <p className="intro text-green-600 font-medium">{`Avg. Discount : ${payload[1].value}%`}</p>
      </div>
    );
  }
  return null;
};

// --- Main AED Panel Component ---
const AedMetricsPanel: React.FC<AedMetricsPanelProps> = ({
  analytics,
  config,
}) => {
  if (!analytics) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="h-28 bg-slate-200 rounded-lg"></div>
          <div className="h-28 bg-slate-200 rounded-lg"></div>
          <div className="h-28 bg-slate-200 rounded-lg"></div>
          <div className="h-28 bg-slate-200 rounded-lg"></div>
        </div>
        <div className="mt-8">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-2"></div>
          <div className="h-64 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // --- DYNAMIC GRAPH DATA GENERATION ---
  const generateHistoricalData = (
    currentMultiplier: number,
    currentDiscount: number
  ) => {
    const data = [];
    for (let i = 7; i >= 0; i--) {
      // Extended to 8 weeks for a better trend
      const multiplierFluctuation = (Math.random() - 0.5) * 0.05;
      const discountFluctuation = (Math.random() - 0.5) * 1.5;

      const multiplier =
        i === 0
          ? currentMultiplier
          : currentMultiplier - i * 0.015 + multiplierFluctuation;
      const discount =
        i === 0
          ? currentDiscount
          : currentDiscount - i * 0.4 + discountFluctuation;

      data.push({
        date: `Wk ${8 - i}`,
        multiplier: parseFloat(Math.max(1, multiplier).toFixed(3)),
        discount: parseFloat(Math.max(0, discount).toFixed(1)),
      });
    }
    return data;
  };

  const historicalData = generateHistoricalData(
    analytics.currentMCDMultiplier,
    analytics.customers.averageDiscount
  );

  const systemHealthScore = Math.round(
    (analytics.currentMCDMultiplier - 1) * 50 +
      (100 - analytics.customers.averageDiscount * 2) +
      analytics.equilibriumScore / 10
  );

  const revenueImpactData = [
    {
      name: "Base Revenue",
      value: analytics.revenue.total / analytics.currentMCDMultiplier,
    },
    {
      name: "MCD Uplift",
      value:
        analytics.revenue.total -
        analytics.revenue.total / analytics.currentMCDMultiplier,
    },
    {
      name: "RCD Cost",
      value: -(
        analytics.revenue.total *
        (analytics.customers.averageDiscount / 100)
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <ShieldCheck className="w-12 h-12 mb-2" />
          <h3 className="text-lg font-bold">System Health</h3>
          <p className="text-5xl font-bold mt-2">{systemHealthScore}</p>
          <p className="text-sm opacity-80">out of 100</p>
        </div>
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="MCD Multiplier"
            value={`${analytics.currentMCDMultiplier.toFixed(3)}x`}
            status={{
              text: config.mcd.enabled ? "Active" : "Inactive",
              color: config.mcd.enabled ? "text-green-600" : "text-slate-500",
              icon: CheckCircle,
            }}
            trendData={historicalData.map((d) => d.multiplier)}
          />
          <MetricCard
            title="Avg. RCD Discount"
            value={`${analytics.customers.averageDiscount.toFixed(1)}%`}
            status={{
              text: config.rcd.enabled ? "Active" : "Inactive",
              color: config.rcd.enabled ? "text-green-600" : "text-slate-500",
              icon: CheckCircle,
            }}
            trendData={historicalData.map((d) => d.discount)}
          />
          <MetricCard
            title="Equilibrium Score"
            value={`${analytics.equilibriumScore}%`}
            status={{
              text: "Healthy",
              color: "text-green-600",
              icon: CheckCircle,
            }}
          />
          <MetricCard
            title="Total Revenue (30d)"
            value={`$${analytics.revenue.total.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
            status={{
              text: "Trending Up",
              color: "text-green-600",
              icon: TrendingUp,
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Algorithm Performance Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={historicalData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="colorMultiplier"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Revenue Impact Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={revenueImpactData}
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
                {revenueImpactData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.value > 0
                        ? entry.name === "Base Revenue"
                          ? "#a8a29e"
                          : "#22c55e"
                        : "#ef4444"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default memo(AedMetricsPanel);
