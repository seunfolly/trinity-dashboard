"use client";
import { Config } from "../types/types";
import { SectionCard, SettingRow, ToggleSwitch } from "./UISharedComponent";

interface MCDSettingsProps {
  config: Config["mcd"];
  updateConfig: (path: string, value: string | number | boolean) => void;
  saveConfiguration: () => void;
  loading: boolean;
}

const MCDSettings = ({
  config,
  updateConfig,
  saveConfiguration,
  loading,
}: MCDSettingsProps) => {
  return (
    <SectionCard
      title="Marketing Cost Displacement (MCD)"
      description="Dynamically adjust prices based on marketing spend to protect profit margins."
    >
      <SettingRow
        label="Enable MCD"
        description="Turn on automatic price adjustments."
      >
        <ToggleSwitch
          enabled={config.enabled}
          onChange={() => updateConfig("mcd.enabled", !config.enabled)}
        />
      </SettingRow>

      <SettingRow
        label="Sensitivity Coefficient"
        description="Controls how aggressively prices react to marketing spend changes."
      >
        <div className="w-64">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-slate-500">Low</span>
            <span className="font-semibold text-blue-600">
              {config.sensitivityCoefficient.toFixed(1)}
            </span>
            <span className="text-sm text-slate-500">High</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={config.sensitivityCoefficient}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig(
                "mcd.sensitivityCoefficient",
                parseFloat(e.target.value)
              )
            }
            disabled={!config.enabled}
          />
        </div>
      </SettingRow>

      <SettingRow
        label="Maximum Price Increase"
        description="The highest percentage prices can be increased by the MCD model."
      >
        <div className="w-64">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-slate-500">0%</span>
            <span className="font-semibold text-blue-600">
              {(config.maxPriceIncrease * 100).toFixed(0)}%
            </span>
            <span className="text-sm text-slate-500">50%</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={config.maxPriceIncrease}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig("mcd.maxPriceIncrease", parseFloat(e.target.value))
            }
            disabled={!config.enabled}
          />
        </div>
      </SettingRow>

      <SettingRow
        label="Minimum Spend Threshold"
        description="MCD only activates when marketing spend for the period exceeds this value."
      >
        <div className="relative w-48">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
            $
          </span>
          <input
            type="number"
            className="pl-7 w-full rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            value={config.minimumSpendThreshold}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig(
                "mcd.minimumSpendThreshold",
                parseFloat(e.target.value) || 0
              )
            }
            disabled={!config.enabled}
          />
        </div>
      </SettingRow>

      <div className="flex justify-end pt-6 border-t border-slate-200 -mx-6 px-6 -mb-6 pb-6">
        <button
          onClick={saveConfiguration}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : "Save MCD Settings"}
        </button>
      </div>
    </SectionCard>
  );
};

export default MCDSettings;
