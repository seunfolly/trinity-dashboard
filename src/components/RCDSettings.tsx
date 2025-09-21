"use client";
import { Config } from "../types/types";
import { SectionCard, SettingRow, ToggleSwitch } from "./UISharedComponent";

interface RCDSettingsProps {
  // FIX 1: Expect only the 'rcd' part of the Config object
  config: Config["rcd"];
  updateConfig: (path: string, value: string | number | boolean) => void;
  saveConfiguration: () => void;
  loading: boolean;
}

const RCDSettings = ({
  config,
  updateConfig,
  saveConfiguration,
  loading,
}: RCDSettingsProps) => {
  return (
    <SectionCard
      title="Returning Customer Discount (RCD)"
      description="Reward customer loyalty with personalized discounts based on purchase history."
    >
      <SettingRow
        label="Enable RCD"
        description="Activate automatic discounts for loyal customers."
      >
        {/* FIX 2: Access properties directly from the 'config' prop */}
        <ToggleSwitch
          enabled={config.enabled}
          onChange={() => updateConfig("rcd.enabled", !config.enabled)}
        />
      </SettingRow>
      <SettingRow
        label="Maximum Discount"
        description="The highest possible discount a customer can receive through this model."
      >
        <div className="w-64">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-slate-500">0%</span>
            <span className="font-semibold text-blue-600">
              {config.maxDiscount}%
            </span>
            <span className="text-sm text-slate-500">50%</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={config.maxDiscount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig("rcd.maxDiscount", parseInt(e.target.value))
            }
            disabled={!config.enabled}
          />
        </div>
      </SettingRow>
      <SettingRow
        label="Spend Weight"
        description="How much importance to give customer spend vs. visit frequency."
      >
        <div className="w-64">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-slate-500">Low</span>
            <span className="font-semibold text-blue-600">
              {config.spendWeight.toFixed(1)}x
            </span>
            <span className="text-sm text-slate-500">High</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={config.spendWeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig("rcd.spendWeight", parseFloat(e.target.value))
            }
            disabled={!config.enabled}
          />
        </div>
      </SettingRow>
      <div className="pt-8 border-t border-slate-200">
        <h3 className="font-medium text-slate-800">Minimum Requirements</h3>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Customers must meet these criteria to be eligible for RCD discounts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Minimum Spend
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                $
              </span>
              <input
                type="number"
                className="pl-7 w-full rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                value={config.thresholds.minimumSpend}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig(
                    "rcd.thresholds.minimumSpend",
                    parseFloat(e.target.value) || 0
                  )
                }
                disabled={!config.enabled}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Minimum Visits
            </label>
            <input
              type="number"
              className="w-full rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              value={config.thresholds.minimumVisits}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateConfig(
                  "rcd.thresholds.minimumVisits",
                  parseInt(e.target.value) || 0
                )
              }
              disabled={!config.enabled}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-6 border-t border-slate-200 -mx-6 px-6 -mb-6 pb-6">
        <button
          onClick={saveConfiguration}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : "Save RCD Settings"}
        </button>
      </div>
    </SectionCard>
  );
};

export default RCDSettings;
