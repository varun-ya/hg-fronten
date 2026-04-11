"use client";

import { CheckCircle, Trophy, UserPlus, CaretRight, Circle } from "@phosphor-icons/react";

export default function TodayCard() {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">

      {/* Stats Strip */}
      <div className="grid grid-cols-4 border-b border-[#F5F5F5]">
        {[
          { value: "3", label: "Classes" },
          { value: "2", label: "Done" },
          { value: "₹1,500", label: "Earned" },
          { value: "1", label: "Pending" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center py-3.5"
            style={{ borderRight: i < 3 ? "1px solid #F5F5F5" : "none" }}
          >
            <p className="text-[16px] font-light text-[#111]">{stat.value}</p>
            <p className="text-[10px] text-[#AAA] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Schedule */}
      <div className="px-5 py-4 border-b border-[#F5F5F5]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Schedule</span>
          <button className="flex items-center gap-1 text-[11px] text-[#888] hover:text-[#111] cursor-pointer bg-transparent border-none transition-colors">
            View all <CaretRight size={10} />
          </button>
        </div>
        <div className="space-y-0">
          {[
            { time: "9:00 AM", name: "Meera Iyer", subject: "English Lit", status: "Done" },
            { time: "10:30 AM", name: "Aarav Sharma", subject: "Mathematics", status: "Done" },
            { time: "11:30 AM", name: "Priya Patel", subject: "Physics", status: "Next" },
            { time: "2:00 PM", name: "Rohan Gupta", subject: "Chemistry", status: "" },
            { time: "4:30 PM", name: "Kavya Singh", subject: "JEE Prep", status: "" },
            { time: "6:00 PM", name: "Amit Verma", subject: "Calculus", status: "" },
          ].map((item, i, arr) => {
            const isNext = item.status === "Next";
            const isDone = item.status === "Done";
            return (
              <div
                key={i}
                className={`flex items-center gap-3 py-2.5 -mx-1 px-1 rounded-lg transition-colors cursor-pointer ${
                  isDone ? "opacity-40" : "hover:bg-[#FAFAFA]"
                }`}
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
              >
                <span className={`text-[12px] w-[60px] shrink-0 ${
                  isDone ? "text-[#CCC] line-through" : isNext ? "text-[#F97316] font-medium" : "text-[#AAA]"
                }`}>
                  {item.time}
                </span>
                {isNext && <Circle size={5} weight="fill" className="text-[#F97316] shrink-0" />}
                <span className={`flex-1 text-[13px] truncate ${
                  isDone ? "text-[#CCC] line-through" : isNext ? "font-medium text-[#111]" : "text-[#555]"
                }`}>
                  {item.name}
                </span>
                <span className={`text-[11px] shrink-0 ${isDone ? "text-[#DDD]" : "text-[#CCC]"}`}>
                  {item.subject}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Highlights */}
      <div className="px-5 py-4">
        <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest block mb-3">
          Highlights
        </span>
        <div className="space-y-0">
          {[
            { icon: Trophy, title: "Sneha scored 247/300", subtitle: "JEE Mock #8", color: "#F59E0B" },
            { icon: CheckCircle, title: "2 assignments submitted", subtitle: "Aarav, Rohan", color: "#10B981" },
            { icon: UserPlus, title: "New student request", subtitle: "Ananya Reddy · Physics", color: "#3B82F6" },
          ].map((item, i, arr) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-[#FAFAFA] -mx-1 px-1 rounded-lg transition-colors"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${item.color}12` }}
              >
                <item.icon size={14} weight="fill" style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#111]">{item.title}</p>
                <p className="text-[11px] text-[#AAA] mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
