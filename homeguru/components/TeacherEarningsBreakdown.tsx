"use client";
import { useState } from "react";
import { Wallet, TrendingUp } from "lucide-react";

export default function TeacherEarningsBreakdown() {
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <div className="bg-white w-full font-matter border border-[#E5E7EB] rounded-[16px] p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Wallet size={20} className="text-[#1A1A1A]" strokeWidth={2} />
          <h3 className="text-[#111827] text-[16px] font-season font-bold">Earnings</h3>
        </div>
        <button className="text-[#3B82F6] text-[13px] font-medium hover:text-[#2563EB] transition-colors">
          Wallet
        </button>
      </div>

      {/* Month Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors ${
              selectedMonth === month
                ? "bg-[#111827] text-white"
                : "bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6]"
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Earnings Cards */}
      <div className="space-y-3">
        
        {/* This Week */}
        <div className="p-4 bg-[#F9FAFB] rounded-xl">
          <p className="text-[#6B7280] text-[12px] mb-1">This week</p>
          <p className="text-[#111827] text-[24px] font-bold mb-1">₹4,200</p>
          <p className="text-[#6B7280] text-[13px]">14 sessions</p>
        </div>

        {/* Last Week */}
        <div className="p-4 bg-[#F9FAFB] rounded-xl">
          <p className="text-[#6B7280] text-[12px] mb-1">Last week</p>
          <p className="text-[#111827] text-[24px] font-bold mb-1">₹3,800</p>
          <p className="text-[#6B7280] text-[13px]">12 sessions</p>
        </div>

        {/* Pending Payout */}
        <div className="p-4 bg-[#FEF3C7] rounded-xl border border-[#FDE68A]">
          <p className="text-[#92400E] text-[12px] mb-1">Pending payout</p>
          <p className="text-[#D97706] text-[24px] font-bold mb-1">₹2,400</p>
          <p className="text-[#92400E] text-[13px]">Next: Jul 1</p>
        </div>

      </div>

    </div>
  );
}
