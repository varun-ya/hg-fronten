"use client";

import { useState } from "react";

type TimeRange = "week" | "month";

// Mock data for weekly income (last 7 days)
const WEEKLY_DATA = [
  { day: "Mon", amount: 1200, sessions: 3 },
  { day: "Tue", amount: 1600, sessions: 4 },
  { day: "Wed", amount: 800, sessions: 2 },
  { day: "Thu", amount: 2000, sessions: 5 },
  { day: "Fri", amount: 1400, sessions: 3 },
  { day: "Sat", amount: 2400, sessions: 6 },
  { day: "Sun", amount: 1800, sessions: 4 },
];

// Mock data for monthly income (last 4 weeks)
const MONTHLY_DATA = [
  { week: "Week 1", amount: 4200, sessions: 12 },
  { week: "Week 2", amount: 5600, sessions: 15 },
  { week: "Week 3", amount: 6800, sessions: 18 },
  { week: "Week 4", amount: 5400, sessions: 14 },
];

export default function IncomeGraph() {
  const [timeRange, setTimeRange] = useState<TimeRange>("week");

  const data = timeRange === "week" ? WEEKLY_DATA : MONTHLY_DATA;
  const maxAmount = Math.max(...data.map((d) => d.amount));
  const totalIncome = data.reduce((sum, d) => sum + d.amount, 0);
  const avgIncome = Math.round(totalIncome / data.length);

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#EBEBEB] flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">
            Income Overview
          </span>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-[20px] text-[#111] font-medium">
              ₹{totalIncome.toLocaleString()}
            </span>
            <span className="text-[12px] text-[#888]">
              {timeRange === "week" ? "This week" : "This month"}
            </span>
          </div>
        </div>

        {/* Toggle buttons */}
        <div className="flex items-center gap-1 bg-[#F5F5F5] rounded-lg p-1">
          <button
            onClick={() => setTimeRange("week")}
            className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all cursor-pointer border-none ${
              timeRange === "week"
                ? "bg-[#F97316] text-white shadow-sm"
                : "bg-transparent text-[#888] hover:text-[#111]"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all cursor-pointer border-none ${
              timeRange === "month"
                ? "bg-[#F97316] text-white shadow-sm"
                : "bg-transparent text-[#888] hover:text-[#111]"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Graph */}
      <div className="px-5 py-6">
        <div className="flex items-end justify-between gap-3 h-[240px] relative">
          {data.map((item, index) => {
            const height = (item.amount / maxAmount) * 100;
            const isHighest = item.amount === maxAmount;
            const label = timeRange === "week" ? item.day : item.week;

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative"
              >
                {/* Tooltip on hover - positioned absolutely */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-[#1C1B1F] text-white px-2.5 py-1.5 rounded-lg text-[11px] whitespace-nowrap shadow-lg">
                    <div className="font-medium">₹{item.amount.toLocaleString()}</div>
                    <div className="text-[#CAC4D0] mt-0.5">{item.sessions} sessions</div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#1C1B1F] rotate-45"></div>
                </div>

                {/* Bar */}
                <div className="w-full flex flex-col justify-end" style={{ height: "200px" }}>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 group-hover:opacity-80 ${
                      isHighest ? "bg-[#F97316]" : "bg-[#FFF4ED] dark:bg-[#F97316]/20"
                    }`}
                    style={{ height: `${height}%`, minHeight: "12px" }}
                  />
                </div>

                {/* Label */}
                <span className="text-[11px] text-[#AAA] font-medium mt-2">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats footer */}
      <div className="grid grid-cols-3 border-t border-[#F5F5F5]">
        <div className="px-4 py-3 border-r border-[#F5F5F5]">
          <p className="text-[11px] text-[#AAA]">Average</p>
          <p className="text-[14px] font-medium text-[#111] mt-0.5">
            ₹{avgIncome.toLocaleString()}
          </p>
        </div>
        <div className="px-4 py-3 border-r border-[#F5F5F5]">
          <p className="text-[11px] text-[#AAA]">Highest</p>
          <p className="text-[14px] font-medium text-[#F97316]">
            ₹{maxAmount.toLocaleString()}
          </p>
        </div>
        <div className="px-4 py-3">
          <p className="text-[11px] text-[#AAA]">Sessions</p>
          <p className="text-[14px] font-medium text-[#111] mt-0.5">
            {data.reduce((sum, d) => sum + d.sessions, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
