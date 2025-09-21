"use client";
import dynamic from "next/dynamic";
import { RefreshCw, Download, Zap } from "lucide-react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ReportPDF } from "./ReportPDF";
import { Config, AnalyticsData } from "../types/types";
import { SectionCard } from "./UISharedComponent";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

interface LiveMonitoringPanelProps {
  config: Config;
  analytics: AnalyticsData | null;
  handleRefresh: () => void;
  refreshStatus: boolean;
  handleForceUpdate: () => void;
  isForcingUpdate: boolean;
}

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <p>Loading PDF generator...</p> }
);

const LiveMonitoringPanel = ({
  config,
  analytics,
  handleRefresh,
  refreshStatus,
  handleForceUpdate,
  isForcingUpdate,
}: LiveMonitoringPanelProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionCard
        title="Live System Status"
        description="Real-time status of the pricing engine and key algorithm parameters."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium text-green-800">
                System Active
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              All services operational
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-blue-800">
                MCD Status
              </span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              {config.mcd.enabled
                ? `Enabled / Updates ${config.mcd.updateFrequency}`
                : "Disabled"}
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-purple-800">
                RCD Status
              </span>
            </div>
            <p className="text-xs text-purple-600 mt-1">
              {config.rcd.enabled ? "Enabled" : "Disabled"}
            </p>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            Current Algorithm Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
                MCD Parameters
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Current Multiplier:</span>
                  <span className="font-mono font-medium text-slate-800">
                    {analytics?.currentMCDMultiplier?.toFixed(4) || "1.0000"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Sensitivity:</span>
                  <span className="font-mono font-medium text-slate-800">
                    {config.mcd.sensitivityCoefficient}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Max Increase:</span>
                  <span className="font-mono font-medium text-slate-800">
                    {(config.mcd.maxPriceIncrease * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
                RCD Parameters
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Max Discount:</span>
                  <span className="font-mono font-medium text-slate-800">
                    {config.rcd.maxDiscount}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Spend Weight:</span>
                  <span className="font-mono font-medium text-slate-800">
                    {config.rcd.spendWeight}x
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Min Spend / Visits:</span>
                  <span className="font-mono font-medium text-slate-800">
                    ${config.rcd.thresholds.minimumSpend} /{" "}
                    {config.rcd.thresholds.minimumVisits}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
      <SectionCard
        title="Quick Actions"
        description="Manually trigger system events and data exports."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleRefresh}
            disabled={refreshStatus}
            className={cn(
              "flex items-center justify-center gap-2 text-slate-700 py-3 px-4 rounded-lg font-medium transition-colors",
              refreshStatus
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 hover:bg-slate-200"
            )}
          >
            <RefreshCw
              className={cn("h-4 w-4", refreshStatus && "animate-spin")}
            />
            {refreshStatus ? "Refreshed!" : "Refresh Analytics"}
          </button>
          <PDFDownloadLink
            document={<ReportPDF config={config} analytics={analytics} />}
            fileName={`report-${new Date().toISOString().split("T")[0]}.pdf`}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-lg font-medium transition-colors"
          >
            {({ loading }) =>
              loading ? (
                "Preparing PDF..."
              ) : (
                <>
                  <Download className="h-4 w-4" /> Export Report
                </>
              )
            }
          </PDFDownloadLink>
          <button
            onClick={handleForceUpdate}
            disabled={isForcingUpdate}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-70"
          >
            <Zap className={cn("h-4 w-4", isForcingUpdate && "animate-ping")} />
            {isForcingUpdate ? "Forcing Update..." : "Force MCD Update"}
          </button>
        </div>
      </SectionCard>
    </div>
  );
};

export default LiveMonitoringPanel;
