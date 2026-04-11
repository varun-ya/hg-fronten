"use client";
import { Calendar, Clock } from "lucide-react";

export default function TeacherTodaySchedule() {
  const todayClasses = [
    { time: "9:00 AM", name: "Meera Iyer", subject: "English Lit", avatar: "MI", color: "from-[#F97316] to-[#EF4444]" },
    { time: "10:30 AM", name: "Aarav Sharma", subject: "Mathematics", avatar: "AS", color: "from-[#3B82F6] to-[#8B5CF6]" },
    { time: "11:30 AM", name: "Priya Patel", subject: "Physics", avatar: "PP", color: "from-[#10B981] to-[#059669]" },
    { time: "2:00 PM", name: "Rohan Gupta", subject: "Chemistry", avatar: "RG", color: "from-[#EF4444] to-[#DC2626]" },
    { time: "4:30 PM", name: "Kavya Singh", subject: "JEE Prep", avatar: "KS", color: "from-[#8B5CF6] to-[#6366F1]" },
    { time: "6:00 PM", name: "Amit Verma", subject: "Calculus", avatar: "AV", color: "from-[#F97316] to-[#EA580C]" },
  ];

  return (
    <div className="bg-white w-full font-matter border border-[#E5E7EB] rounded-[16px] p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-[#1A1A1A]" strokeWidth={2} />
          <h3 className="text-[#111827] text-[16px] font-season font-bold">Today</h3>
        </div>
        <button className="text-[#6B7280] text-[13px] font-medium hover:text-[#111827] transition-colors">
          View all
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-5 pb-5 border-b border-[#F3F4F6]">
        <div className="text-center">
          <p className="text-[#111827] text-[24px] font-semibold leading-none mb-1">3</p>
          <p className="text-[#6B7280] text-[12px]">Classes</p>
        </div>
        <div className="text-center">
          <p className="text-[#10B981] text-[24px] font-semibold leading-none mb-1">2</p>
          <p className="text-[#6B7280] text-[12px]">Done</p>
        </div>
        <div className="text-center">
          <p className="text-[#D97706] text-[24px] font-semibold leading-none mb-1">₹1,500</p>
          <p className="text-[#6B7280] text-[12px]">Earned</p>
        </div>
      </div>

      {/* Pending Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#111827] text-[14px] font-semibold">1</span>
        <span className="text-[#6B7280] text-[14px]">Pending</span>
      </div>

      {/* Schedule List */}
      <div className="space-y-2">
        {todayClasses.map((cls, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] transition-colors cursor-pointer">
            <span className="text-[#6B7280] text-[13px] font-medium w-[70px] shrink-0">{cls.time}</span>
            <div className={`w-[36px] h-[36px] rounded-full bg-gradient-to-br ${cls.color} flex items-center justify-center text-white text-[12px] font-semibold shrink-0`}>
              {cls.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#111827] text-[14px] font-semibold truncate">{cls.name}</p>
              <p className="text-[#6B7280] text-[12px] truncate">{cls.subject}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
