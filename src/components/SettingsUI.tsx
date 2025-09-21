import {  ReactNode } from "react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// SettingRow Component
interface SettingRowProps {
  label: string;
  description: string;
  children: ReactNode;
}

export const SettingRow = ({
  label,
  description,
  children,
}: SettingRowProps) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
    <div className="md:w-2/3">
      <h3 className="font-medium text-slate-800">{label}</h3>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
    <div className="mt-4 md:mt-0">{children}</div>
  </div>
);

// ToggleSwitch Component
interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
}

export const ToggleSwitch= ({ enabled, onChange }: ToggleSwitchProps) => (
  <button
    onClick={onChange}
    className={cn(
      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
      enabled ? "bg-blue-600" : "bg-slate-300"
    )}
  >
    <span
      className={cn(
        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out",
        enabled ? "translate-x-6" : "translate-x-1"
      )}
    />
  </button>
);
