"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Percent, CircleDollarSign, Scale } from "lucide-react";
import { AnalyticsData, TrendData } from "../types/types";
import { StatCard } from "./UISharedComponent";

interface OverviewPanelProps {
  analytics: AnalyticsData | null;
  marketingTrends: TrendData[];
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const OverviewPanel = ({
  analytics,
  marketingTrends,
}: OverviewPanelProps) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="MCD Multiplier"
        value={`${analytics?.currentMCDMultiplier?.toFixed(3) || "1.000"}x`}
        icon={TrendingUp}
        color="bg-blue-100 text-blue-600"
      />
      <StatCard
        title="Avg. Discount"
        value={`${analytics?.customers?.averageDiscount?.toFixed(1) || "0.0"}%`}
        icon={Percent}
        color="bg-green-100 text-green-600"
      />
      <StatCard
        title="Total Revenue (30d)"
        value={`$${analytics?.revenue?.total?.toLocaleString("en-US", { maximumFractionDigits: 0 }) || "0"}`}
        icon={CircleDollarSign}
        color="bg-purple-100 text-purple-600"
      />
      <StatCard
        title="Equilibrium Score"
        value={`${analytics?.equilibriumScore || 0}%`}
        icon={Scale}
        color="bg-amber-100 text-amber-600"
      />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">
          30-Day Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={marketingTrends}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "14px" }} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="marketingSpend"
              stroke="#10B981"
              strokeWidth={2}
              name="Marketing Spend"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">
          Marketing Spend by Platform
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={Object.entries(analytics?.marketing?.byPlatform || {}).map(
                ([name, { amount }]) => ({ name, value: amount })
              )}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {Object.entries(analytics?.marketing?.byPlatform || {}).map(
                (_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                )
              )}
            </Pie>
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Legend wrapperStyle={{ fontSize: "14px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default OverviewPanel;
