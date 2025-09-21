"use client";
import { useState, useEffect, useMemo } from "react";
import { Config, AnalyticsData, TrendData } from "../../types/types";

export interface Product {
  id: number;
  name: string;
  basePrice: number;
  finalPrice?: number;
}

export interface Customer {
  id: number;
  name: string;
  totalSpend: number;
  totalVisits: number;
  discount?: number;
}

// Mock data calculation for analytics dashboard
const calculateMockAnalytics = (config: Config): AnalyticsData => {
  const baseRevenue = 89543.5;
  const marketingSpend = 31000;

  let mcdMultiplier = 1.0;
  if (config.mcd.enabled && marketingSpend > config.mcd.minimumSpendThreshold) {
    mcdMultiplier = 1 + 0.05 * config.mcd.sensitivityCoefficient;
    mcdMultiplier = Math.min(mcdMultiplier, 1 + config.mcd.maxPriceIncrease);
  }

  let avgDiscount = 0;
  const avgCustomer = { spend: 1200, visits: 15 };
  if (
    config.rcd.enabled &&
    avgCustomer.spend >= config.rcd.thresholds.minimumSpend &&
    avgCustomer.visits >= config.rcd.thresholds.minimumVisits
  ) {
    avgDiscount = config.rcd.maxDiscount * 0.6 + config.rcd.spendWeight * 0.5;
    avgDiscount = Math.min(avgDiscount, config.rcd.maxDiscount);
  }

  return {
    currentMCDMultiplier: mcdMultiplier,
    customers: { averageDiscount: avgDiscount, total: 1245 },
    revenue: { total: baseRevenue * mcdMultiplier },
    equilibriumScore: Math.round(80 + mcdMultiplier * 5 - avgDiscount),
    marketing: {
      byPlatform: {
        Google: { amount: 12000 },
        Facebook: { amount: 8500 },
        "X (Twitter)": { amount: 4500 },
        Instagram: { amount: 6000 },
      },
      totalSpend: marketingSpend,
    },
  };
};

// Custom hook to manage all analytics and pricing logic
export const useAnalytics = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | "">("");
  const [config, setConfig] = useState<Config>({
    mcd: {
      enabled: true,
      updateFrequency: "daily",
      sensitivityCoefficient: 1.0,
      maxPriceIncrease: 0.15,
      smoothingFactor: 0.3,
      minimumSpendThreshold: 100,
    },
    rcd: {
      enabled: true,
      maxDiscount: 20,
      spendWeight: 2.0,
      thresholds: { minimumSpend: 50, minimumVisits: 2 },
    },
  });
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [marketingTrends, setMarketingTrends] = useState<TrendData[]>([]);

  const [mockProducts, setMockProducts] = useState<Product[]>([
    { id: 101, name: "Classic T-Shirt", basePrice: 25.0 },
    { id: 102, name: "Premium Hoodie", basePrice: 60.0 },
    { id: 103, name: "Designer Jeans", basePrice: 120.0 },
    { id: 104, name: "Running Sneakers", basePrice: 95.0 },
  ]);

  // NEW: Add mock customer data
  const [mockCustomers, setMockCustomers] = useState<Customer[]>([
    { id: 1, name: "New Customer", totalSpend: 80, totalVisits: 1 },
    { id: 2, name: "Frequent Browser", totalSpend: 45, totalVisits: 10 },
    { id: 3, name: "Loyal Regular", totalSpend: 550, totalVisits: 15 },
    { id: 4, name: "High Spender", totalSpend: 2500, totalVisits: 8 },
  ]);

  // Load initial data on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem("mcdRcdConfig");
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig) as Config);
      } catch (error) {
        console.error("Failed to parse config from localStorage", error);
      }
    }
    const trends: TrendData[] = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        revenue: Math.random() * 5000 + 4000,
        marketingSpend: Math.random() * 1000 + 800,
      };
    });
    setMarketingTrends(trends);
  }, []);

  // Recalculate analytics whenever config changes
  useEffect(() => {
    const data = calculateMockAnalytics(config);
    setAnalytics(data);
  }, [config]);

  // Memoized calculation for final product prices
  const productsWithFinalPrices = useMemo(() => {
    const multiplier = analytics?.currentMCDMultiplier || 1.0;
    return mockProducts.map((product) => ({
      ...product,
      finalPrice: Math.round(product.basePrice * multiplier * 100) / 100,
    }));
  }, [analytics, mockProducts]);

  // NEW: Memoized calculation for RCD discounts
  const customersWithDiscounts = useMemo(() => {
    return mockCustomers.map((customer) => {
      let calculatedDiscount = 0;
      const { rcd } = config;

      if (
        rcd.enabled &&
        customer.totalSpend >= rcd.thresholds.minimumSpend &&
        customer.totalVisits >= rcd.thresholds.minimumVisits
      ) {
        const spendFactor = Math.min(customer.totalSpend / 1000, 1);
        const visitFactor = Math.min(customer.totalVisits / 20, 1);

        calculatedDiscount =
          (rcd.maxDiscount *
            (spendFactor * rcd.spendWeight +
              visitFactor * (1 / rcd.spendWeight))) /
          2;
      }

      const finalDiscount = Math.min(calculatedDiscount, rcd.maxDiscount);

      return {
        ...customer,
        discount: finalDiscount > 0 ? finalDiscount : 0,
      };
    });
  }, [config, mockCustomers]);

  const saveConfiguration = () => {
    setLoading(true);
    setSaveStatus("saving");
    localStorage.setItem("mcdRcdConfig", JSON.stringify(config));
    setTimeout(() => {
      setLoading(false);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
    }, 1000);
  };

  const updateConfig = (path: string, value: string | number | boolean) => {
    setConfig((prev: Config) => {
      const keys = path.split(".");
      const newConfig = structuredClone(prev);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  return {
    loading,
    saveStatus,
    config,
    analytics,
    marketingTrends,
    productsWithFinalPrices,
    customersWithDiscounts, // NEW: Export the customer list with discounts
    saveConfiguration,
    updateConfig,
  };
};
