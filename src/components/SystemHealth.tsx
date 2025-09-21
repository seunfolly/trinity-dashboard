"use client";
import React from "react";
import { ShieldCheck } from "lucide-react";

const SystemHealth = ({ score }: { score: number }) => {
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)));
  return (
    <div className="lg:col-span-1 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
      <ShieldCheck className="w-12 h-12 mb-2" />
      <h3 className="text-lg font-bold">System Health</h3>
      <p className="text-5xl font-bold mt-2">{clampedScore}</p>
    </div>
  );
}
    <p className="text-sm opacity-80">out of 100</p>

export default SystemHealth;
