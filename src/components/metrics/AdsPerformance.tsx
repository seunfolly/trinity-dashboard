"use client";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
} from "recharts";

type AdsData = {
  platform: string;
  [month: string]: number | string;
};

const AdsPerformance = ({ adsData }: { adsData: AdsData[] }) => {
  //  dataset (3 months comparison)
  const ads: AdsData[] = [
    { platform: "Facebook", Jan: 400, Feb: 320, Mar: 500 },
    { platform: "Google", Jan: 300, Feb: 450, Mar: 250 },
    { platform: "Instagram", Jan: 200, Feb: 280, Mar: 300 },
    { platform: "TikTok", Jan: 150, Feb: 220, Mar: 260 },
  ];

  // Extract months dynamically
  const monthKeys = Object.keys(ads[0]).filter((k) => k !== "platform");

  // Color palette for months
  const colors = ["#22c55e", "#3b82f6", "#eab308", "#ef4444", "#a855f7"];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Ads Performance (Comparative)
      </h3>

      {/* Grouped Bar Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={ads}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="platform" tick={{ fill: "#64748b", fontSize: 12 }} />
          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
          <Tooltip />
          <Legend />

          {monthKeys.map((month, idx) => (
            <Bar
              key={month}
              dataKey={month}
              fill={colors[idx % colors.length]}
              name={month}
              barSize={30}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Rankings per month */}
      <div className="mt-6 space-y-3 text-sm text-slate-700">
        {monthKeys.map((month) => {
          const sorted = [...ads].sort(
            (a, b) => (b[month] as number) - (a[month] as number)
          );
          const best = sorted[0];
          const worst = sorted[sorted.length - 1];

          return (
            <div key={month} className="border-t border-slate-200 pt-3">
              <p className="font-medium text-slate-900">{month} Rankings:</p>
              <p>
                🏆 Best Performing:{" "}
                <span className="font-semibold text-green-600">
                  {best.platform} ({best[month]})
                </span>
              </p>
              <p>
                📉 Least Performing:{" "}
                <span className="font-semibold text-red-600">
                  {worst.platform} ({worst[month]})
                </span>
              </p>
              <p className="mt-1">
                Full Order:{" "}
                {sorted.map((ad, idx) => (
                  <span key={ad.platform} className="mr-2">
                    {idx + 1}. {ad.platform} ({ad[month]})
                  </span>
                ))}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdsPerformance;
