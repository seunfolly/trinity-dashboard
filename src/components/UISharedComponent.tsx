"use client";
import { FC, ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// UI Components
interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <span className="text-3xl font-bold text-slate-800 mt-1">{value}</span>
      </div>
      <div className={cn("rounded-full p-3", color)}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </div>
);

interface SectionCardProps {
  children: ReactNode;
  title: string;
  description: string;
}

export const SectionCard = ({
  children,
  title,
  description,
}: SectionCardProps) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
    <div className="p-6 border-b border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
    <div className="p-6 space-y-8">{children}</div>
  </div>
);

interface SettingRowProps {
  label: string;
  description: string;
  children: ReactNode;
}

export const SettingRow: FC<SettingRowProps> = ({
  label,
  description,
  children,
}) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
    <div className="md:w-2/3">
      <h3 className="font-medium text-slate-800">{label}</h3>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
    <div className="mt-4 md:mt-0">{children}</div>
  </div>
);

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
