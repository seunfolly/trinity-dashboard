export type SectionId = "overview" | "mcd" | "rcd" | "monitoring";

export interface Config {
  mcd: {
    enabled: boolean;
    updateFrequency: string;
    sensitivityCoefficient: number;
    maxPriceIncrease: number;
    smoothingFactor: number;
    minimumSpendThreshold: number;
  };
  rcd: {
    enabled: boolean;
    maxDiscount: number;
    spendWeight: number;
    thresholds: {
      minimumSpend: number;
      minimumVisits: number;
    };
  };
}

export interface AnalyticsData {
  currentMCDMultiplier: number;
  customers: { averageDiscount: number; total: number };
  revenue: { total: number };
  equilibriumScore: number;
  marketing: {
    byPlatform: { [key: string]: { amount: number } };
    totalSpend: number;
  };
}

export interface TrendData {
  date: string;
  revenue: number;
  marketingSpend: number;
}
