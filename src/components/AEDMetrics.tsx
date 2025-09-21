"use client";
import React, { memo } from "react";
import MetricCard from "./metrics/MetricCard";
import AlgorithmPerformance from "./metrics/AlgorithmPerformance";
import AdsPerformance from "./metrics/AdsPerformance";
import { AnalyticsData, Config } from "../types/types";
import SystemHealth from "./SystemHealth";
import RevenueImpact from "./RevenueImpact";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  analytics: AnalyticsData | null;
  config: Config;
}

const AedMetricsPanel: React.FC<Props> = ({ analytics }) => {
  if (!analytics) return <div>Loading...</div>;

  // Example dummy datasets
  const algorithmPerformanceData = [
    { date: "2025-09-01", multiplier: 1.2, discount: 15 },
    { date: "2025-09-05", multiplier: 1.5, discount: 12 },
    { date: "2025-09-10", multiplier: 1.8, discount: 18 },
    { date: "2025-09-15", multiplier: 2.0, discount: 20 },
    { date: "2025-09-20", multiplier: 1.7, discount: 14 },
  ];

  const systemHealthScore = 87;

  const revenueImpactData = [
    { name: "Baseline", value: 12000 },
    { name: "AI Optimized", value: 15800 },
  ];

  const adsPerformanceData = [
    { platform: "Facebook", value: 2400 },
    { platform: "Instagram", value: 1800 },
    { platform: "TikTok", value: 3200 },
    { platform: "Google", value: 2900 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <SystemHealth score={systemHealthScore} />
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Active Users"
            value="12,450"
            status={{ text: "+5%", color: "text-green-600", icon: TrendingUp }}
            trendData={[10, 12, 14, 13, 15, 18]}
          />
          <MetricCard
            title="Revenue"
            value="$15,800"
            status={{ text: "+12%", color: "text-green-600", icon: TrendingUp }}
            trendData={[2000, 4000, 5000, 7000, 9000]}
          />
          <MetricCard
            title="Engagement"
            value="68%"
            status={{ text: "-3%", color: "text-red-600", icon: TrendingDown }}
            trendData={[70, 69, 68, 67, 68]}
          />
          <MetricCard
            title="Conversions"
            value="1,230"
            status={{ text: "+8%", color: "text-green-600", icon: TrendingUp }}
            trendData={[200, 400, 600, 800, 1230]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {algorithmPerformanceData && algorithmPerformanceData.length > 0 ? (
          <AlgorithmPerformance data={algorithmPerformanceData} />
        ) : (
          <div className="flex items-center justify-center h-[300px] rounded-lg border border-dashed border-slate-300 text-slate-500">
            Algorithm Performance data not available yet
          </div>
        )}
        <RevenueImpact data={revenueImpactData} />
      </div>

      <AdsPerformance adsData={adsPerformanceData} />
    </div>
  );
};

export default memo(AedMetricsPanel);
