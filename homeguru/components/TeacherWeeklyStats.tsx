"use client";
import { TrendingUp } from "lucide-react";

export default function TeacherWeeklyStats() {
  const metrics = [
    { label: "Assignments submitted", value: "12" },
    { label: "Doubts asked", value: "8" },
    { label: "Practice sets completed", value: "15" },
    { label: "Average score", value: "78%" },
  ];

  return (
    <div className="bg-white w-full font-matter border border-[#E5E7EB] rounded-[16px] p-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp size={20} className="text-[#1A1A1A]" strokeWidth={2} />
        <h3 className="text-[#111827] text-[16px] font-season font-bold">This Week</h3>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5 pb-5 border-b border-[#F3F4F6]">
        <div className="text-center">
          <p className="text-[#111827] text-[24px] font-semibold leading-none mb-1">14</p>
          <p className="text-[#6B7280] text-[12px]">Sessions</p>
        </div>
        <div className="text-center">
          <p className="text-[#111827] text-[24px] font-semibold leading-none mb-1">12.5</p>
          <p className="text-[#6B7280] text-[12px]">Hours</p>
        </div>
        <div className="text-center">
          <p className="text-[#111827] text-[24px] font-semibold leading-none mb-1">4.9</p>
          <p className="text-[#6B7280] text-[12px]">Rating</p>
        </div>
      </div>

      {/* Metrics List */}
      <div className="space-y-2">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-xl">
            <span className="text-[#111827] text-[14px]">{metric.label}</span>
            <span className="text-[#111827] text-[14px] font-semibold">{metric.value}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
