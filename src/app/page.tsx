"use client";
import { useState } from "react";
import {
  Settings,
  LayoutDashboard,
  DollarSign,
  Target,
  HeartPulse,
  Activity,
  ShoppingCart,
  LucideIcon,
} from "lucide-react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Import custom hook and components
import { SectionId } from "@/types/types";
import AedMetricsPanel from "@/components/AEDMetrics";
import MCDSettings from "@/components/MCDSettings";
import RCDSettings from "@/components/RCDSettings";
import LiveMonitoringPanel from "@/components/LiveMonitoringPanel";
import OverviewPanel from "@/components/OverviewPanel";
import ProductPricingPreview from "@/components/ProductPricingPreview";
import { useAnalytics } from "./hooks/useAnalytics";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const sidebarItems: { id: SectionId; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "mcd", label: "MCD Settings", icon: DollarSign },
  { id: "rcd", label: "RCD Settings", icon: Target },
  { id: "preview", label: "Product Preview", icon: ShoppingCart },
  { id: "aed", label: "AED Monitoring", icon: HeartPulse },
  { id: "monitoring", label: "Live Monitoring", icon: Activity },
];

const Page = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  const {
    loading,
    saveStatus,
    config,
    analytics,
    marketingTrends,
    productsWithFinalPrices,
    saveConfiguration,
    customersWithDiscounts,
    updateConfig,
  } = useAnalytics();

  const [refreshStatus, setRefreshStatus] = useState(false);
  const [isForcingUpdate, setIsForcingUpdate] = useState(false);

  const handleRefresh = () => {
    setRefreshStatus(true);
    setTimeout(() => setRefreshStatus(false), 2000);
  };

  const handleForceUpdate = async () => {
    setIsForcingUpdate(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsForcingUpdate(false);
  };

  const renderContent = () => {
        const loyalCustomer = customersWithDiscounts.find((c) => c.id === 3); // Finds "Loyal Regular"
        const sampleDiscount = loyalCustomer?.discount || 0;
    switch (activeSection) {
      case "overview":
        return (
          <OverviewPanel
            analytics={analytics}
            marketingTrends={marketingTrends}
          />
        );
      case "mcd":
        return (
          <MCDSettings
            config={config.mcd}
            updateConfig={updateConfig}
            saveConfiguration={saveConfiguration}
            loading={loading}
          />
        );
      case "rcd":
        return (
          <RCDSettings
            config={config.rcd}
            updateConfig={updateConfig}
            saveConfiguration={saveConfiguration}
            loading={loading}
          />
        );
      case "preview":
        return (
          <ProductPricingPreview
            products={productsWithFinalPrices}
            mcdMultiplier={analytics?.currentMCDMultiplier || 1.0}
            sampleRcdDiscount={sampleDiscount} // Pass the discount here
          />
        );
      case "aed":
        return <AedMetricsPanel analytics={analytics} config={config} />;
      case "monitoring":
        return (
          <LiveMonitoringPanel
            config={config}
            analytics={analytics}
            handleRefresh={handleRefresh}
            refreshStatus={refreshStatus}
            handleForceUpdate={handleForceUpdate}
            isForcingUpdate={isForcingUpdate}
          />
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <>
      <style>{`
        input[type="range"] { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; background: #E2E8F0; border-radius: 9999px; outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; background: #2563EB; border-radius: 9999px; cursor: pointer; border: 3px solid #FFFFFF; box-shadow: 0 0 0 1px rgba(0,0,0,0.1); }
      `}</style>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <div className="flex">
          <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col">
            <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-200">
              <Settings className="text-blue-600 h-7 w-7" />
              <h1 className="text-lg font-bold text-slate-800">MCD-RCD</h1>
            </div>
            <nav className="p-4">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg w-full mb-1",
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
          <main className="flex-1 p-8">
            <header className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500 mt-1">
                  Configure algorithms and monitor performance.
                </p>
              </div>
              {saveStatus === "saved" && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                  ✓ Configuration saved
                </div>
              )}
            </header>
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;
