"use client";

import { useState } from "react";

type TimeRange = "week" | "month";

// Mock data for weekly spending (last 7 days)
const WEEKLY_DATA = [
  { day: "Mon", amount: 500, sessions: 1 },
  { day: "Tue", amount: 800, sessions: 2 },
  { day: "Wed", amount: 400, sessions: 1 },
  { day: "Thu", amount: 1200, sessions: 3 },
  { day: "Fri", amount: 600, sessions: 1 },
  { day: "Sat", amount: 1000, sessions: 2 },
  { day: "Sun", amount: 700, sessions: 2 },
];

// Mock data for monthly spending (last 4 weeks)
const MONTHLY_DATA = [
  { week: "Week 1", amount: 2100, sessions: 6 },
  { week: "Week 2", amount: 2800, sessions: 8 },
  { week: "Week 3", amount: 3400, sessions: 9 },
  { week: "Week 4", amount: 2700, sessions: 7 },
];

export default function SpendingGraph() {
  const [timeRange, setTimeRange] = useState<TimeRange>("week");

  const data = timeRange === "week" ? WEEKLY_DATA : MONTHLY_DATA;
  const maxAmount = Math.max(...data.map((d) => d.amount));
  const totalSpending = data.reduce((sum, d) => sum + d.amount, 0);
  const avgSpending = Math.round(totalSpending / data.length);

  return (
    <div className="bg-white border border-[#CAC4D0] rounded-[14px] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#E7E0EC] flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-[#49454F] uppercase tracking-widest">
            Spending Overview
          </span>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-[20px] text-[#1C1B1F] font-medium">
              ₹{totalSpending.toLocaleString()}
            </span>
            <span className="text-[12px] text-[#79747E]">
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
                : "bg-transparent text-[#79747E] hover:text-[#1C1B1F]"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all cursor-pointer border-none ${
              timeRange === "month"
                ? "bg-[#F97316] text-white shadow-sm"
                : "bg-transparent text-[#79747E] hover:text-[#1C1B1F]"
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
                {/* Tooltip on hover */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-[#1C1B1F] text-white px-2.5 py-1.5 rounded-lg text-[11px] whitespace-nowrap shadow-lg">
                    <div className="font-medium">₹{item.amount.toLocaleString()}</div>
                    <div className="text-[#CAC4D0] mt-0.5">{item.sessions} sessions</div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#1C1B1F] rotate-45"></div>
                </div>

                {/* Bar */}
                <div className="w-full flex flex-col justify-end" style={{ height: "200px" }}>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 group-hover:opacity-80 ${
                      isHighest ? "bg-[#F97316]" : "bg-[#FFF4ED]"
                    }`}
                    style={{ height: `${height}%`, minHeight: "12px" }}
                  />
                </div>

                {/* Label */}
                <span className="text-[11px] text-[#79747E] font-medium mt-2">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats footer */}
      <div className="grid grid-cols-3 border-t border-[#E7E0EC]">
        <div className="px-4 py-3 border-r border-[#E7E0EC]">
          <p className="text-[11px] text-[#49454F]">Average</p>
          <p className="text-[14px] font-medium text-[#1C1B1F] mt-0.5">
            ₹{avgSpending.toLocaleString()}
          </p>
        </div>
        <div className="px-4 py-3 border-r border-[#E7E0EC]">
          <p className="text-[11px] text-[#49454F]">Highest</p>
          <p className="text-[14px] font-medium text-[#F97316]">
            ₹{maxAmount.toLocaleString()}
          </p>
        </div>
        <div className="px-4 py-3">
          <p className="text-[11px] text-[#49454F]">Sessions</p>
          <p className="text-[14px] font-medium text-[#1C1B1F] mt-0.5">
            {data.reduce((sum, d) => sum + d.sessions, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
