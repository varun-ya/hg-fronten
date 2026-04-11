"use client";

import {
  Exam, FileText, CalendarX, CheckCircle,
  BookOpen, ChatCircle
} from "@phosphor-icons/react";

export default function ActivityCard() {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">

      {/* Activity Feed */}
      <div className="px-5 py-4 border-b border-[#F5F5F5]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Recent Activity</span>
          <span className="text-[11px] text-[#888]">Today</span>
        </div>
        <div className="space-y-0">
          {[
            { initial: "S", name: "Sneha Kapoor", action: "scored 247/300 in JEE Mock #8", time: "45m", icon: Exam },
            { initial: "A", name: "Aarav Sharma", action: "submitted Quadratic Equations assignment", time: "2h", icon: FileText },
            { initial: "P", name: "Priya Patel", action: "rescheduled Physics to 11:30 AM tomorrow", time: "3h", icon: CalendarX },
            { initial: "R", name: "Rohan Gupta", action: "completed Organic Chemistry practice set", time: "5h", icon: CheckCircle },
            { initial: "M", name: "Meera Iyer", action: "started English Literature chapter 8", time: "6h", icon: BookOpen },
            { initial: "K", name: "Kavya Singh", action: "asked a doubt in JEE Prep group", time: "8h", icon: ChatCircle },
            { initial: "A", name: "Amit Verma", action: "completed Calculus assignment early", time: "10h", icon: CheckCircle },
            { initial: "S", name: "Sneha Kapoor", action: "started revision for JEE Mock #9", time: "12h", icon: BookOpen },
          ].map((activity, i, arr) => (
            <div
              key={i}
              className="flex items-start gap-3 py-2.5 cursor-pointer hover:bg-[#FAFAFA] -mx-1 px-1 rounded-lg transition-colors"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
            >
              <img
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${activity.name}`}
                alt={activity.name}
                className="w-8 h-8 rounded-full shrink-0 mt-0.5"
                style={{ backgroundColor: "#FAFAFA", border: "1.5px solid #EBEBEB" }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-medium text-[#111]">{activity.name}</span>
                  <span className="text-[11px] text-[#CCC] shrink-0">{activity.time}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <activity.icon size={11} className="text-[#CCC] shrink-0" />
                  <p className="text-[12px] text-[#888] truncate">{activity.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="px-5 py-4">
        <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest block mb-3">This Week</span>
        {[
          { label: "Assignments submitted", value: "12" },
          { label: "Doubts asked", value: "8" },
          { label: "Practice sets completed", value: "15" },
          { label: "Average score", value: "78%" },
        ].map((stat, i, arr) => (
          <div
            key={i}
            className="flex items-center justify-between py-2"
            style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
          >
            <span className="text-[12px] text-[#888]">{stat.label}</span>
            <span className="text-[13px] font-light text-[#111]">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
