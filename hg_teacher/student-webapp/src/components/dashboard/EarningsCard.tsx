"use client";

import { TrendUp } from "@phosphor-icons/react";

export default function EarningsCard() {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">

      {/* Hero */}
      <div className="px-5 py-5 border-b border-[#F5F5F5]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[28px] font-light text-[#111] leading-none" style={{ letterSpacing: "-0.3px" }}>₹12,400</p>
            <p className="text-[12px] text-[#AAA] mt-1.5">this month</p>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#10B981]">
            <TrendUp size={12} weight="bold" />
            +18%
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="px-5 py-4 border-b border-[#F5F5F5]">
        <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest block mb-3">Breakdown</span>
        {[
          { label: "This week", value: "₹4,200", sub: "14 sessions" },
          { label: "Last week", value: "₹3,800", sub: "12 sessions" },
          { label: "Pending payout", value: "₹2,400", sub: "Next: Jul 1" },
        ].map((item, i, arr) => (
          <div
            key={i}
            className="flex items-center justify-between py-2.5"
            style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
          >
            <span className="text-[12px] text-[#888]">{item.label}</span>
            <div className="text-right">
              <p className="text-[14px] font-light text-[#111]">{item.value}</p>
              <p className="text-[10px] text-[#CCC] mt-0.5">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top Students */}
      <div className="px-5 py-4 border-b border-[#F5F5F5]">
        <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest block mb-3">Top Students</span>
        <div className="space-y-0">
          {[
            { name: "Aarav Sharma", sessions: "24 sessions", amount: "₹12,000" },
            { name: "Sneha Kapoor", sessions: "18 sessions", amount: "₹14,400" },
            { name: "Priya Patel", sessions: "16 sessions", amount: "₹8,000" },
            { name: "Rohan Gupta", sessions: "12 sessions", amount: "₹6,000" },
          ].map((student, i, arr) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-[#FAFAFA] -mx-1 px-1 rounded-lg transition-colors"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
            >
              <img
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${student.name}`}
                alt={student.name}
                className="w-8 h-8 rounded-full shrink-0"
                style={{ backgroundColor: "#FAFAFA", border: "1.5px solid #EBEBEB" }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#111] truncate">{student.name}</p>
                <p className="text-[11px] text-[#AAA] mt-0.5">{student.sessions}</p>
              </div>
              <span className="text-[13px] font-light text-[#111] shrink-0">{student.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="px-5 py-4">
        <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest block mb-3">Monthly Trend</span>
        <div className="flex items-end justify-between gap-2 h-[80px]">
          {[
            { label: "Jan", fill: 0.4 },
            { label: "Feb", fill: 0.55 },
            { label: "Mar", fill: 0.45 },
            { label: "Apr", fill: 0.7 },
            { label: "May", fill: 0.85 },
            { label: "Jun", fill: 1.0 },
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
              <div
                className="w-full rounded-[4px] transition-colors group-hover:opacity-70"
                style={{
                  height: `${bar.fill * 100}%`,
                  backgroundColor: i === 5 ? "#555" : "#EBEBEB",
                }}
              />
              <span className="text-[9px] text-[#AAA]">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
