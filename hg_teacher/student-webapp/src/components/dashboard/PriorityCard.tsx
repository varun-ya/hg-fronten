"use client";

import {
  ListChecks, ChatCircle, FileText, CalendarPlus,
  Notebook, Exam, Clock, Circle
} from "@phosphor-icons/react";

export default function PriorityCard() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes() + 10;
  const displayHours = minutes >= 60 ? (hours + 1) % 24 : hours;
  const displayMinutes = minutes % 60;
  const period = displayHours >= 12 ? "PM" : "AM";
  const displayHours12 = displayHours % 12 || 12;
  const timeStr = `${displayHours12}:${String(displayMinutes).padStart(2, "0")} ${period}`;

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">

      {/* Next Class */}
      <div className="px-5 py-4 border-b border-[#F5F5F5]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full">
              <Circle size={5} weight="fill" />
              LIVE IN 10 MIN
            </span>
          </div>
          <button className="px-4 py-1.5 rounded-lg bg-[#555] hover:bg-[#444] text-white text-[12px] font-medium transition-colors border-none cursor-pointer">
            Join
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-center">
            <span className="text-[12px] font-semibold text-[#555]">MI</span>
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#111]">Meera Iyer</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-[#AAA]">English Lit</span>
              <span className="text-[#DDD]">·</span>
              <div className="flex items-center gap-1">
                <Clock size={10} className="text-[#CCC]" />
                <span className="text-[11px] text-[#AAA]">{timeStr}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* To Do */}
      <div className="px-5 py-4 border-b border-[#F5F5F5]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">To Do</span>
          <span className="text-[11px] text-[#F97316] font-medium">5 pending</span>
        </div>
        <div className="space-y-0">
          {[
            { icon: FileText, text: "Grade Aarav's assignment", badge: "Due today", urgent: true },
            { icon: ChatCircle, text: "Reply to Kavya", badge: "2h ago", urgent: false },
            { icon: CalendarPlus, text: "Confirm Amit's session", badge: "Tomorrow", urgent: false },
            { icon: Notebook, text: "Update lesson plan", badge: "This week", urgent: false },
            { icon: Exam, text: "Create mock test", badge: "By Friday", urgent: false },
          ].map((item, i, arr) => (
            <div
              key={i}
              className="flex items-center justify-between py-2.5 cursor-pointer hover:bg-[#FAFAFA] -mx-1 px-1 rounded-lg transition-colors"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
            >
              <div className="flex items-center gap-2.5">
                <item.icon size={14} className={item.urgent ? "text-[#F97316]" : "text-[#CCC]"} />
                <span className={`text-[13px] ${item.urgent ? "font-medium text-[#111]" : "text-[#555]"}`}>
                  {item.text}
                </span>
              </div>
              <span className={`text-[11px] ${item.urgent ? "text-[#F97316] font-medium" : "text-[#CCC]"}`}>
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="px-5 py-4 border-b border-[#F5F5F5]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Messages</span>
          <span className="text-[11px] text-[#F97316] font-medium">2 unread</span>
        </div>
        <div className="space-y-0">
          {[
            { name: "Sneha Kapoor", msg: "Can we reschedule tomorrow's class?", time: "20m" },
            { name: "Rohan Gupta", msg: "Doubt in organic chemistry reaction", time: "1h" },
          ].map((item, i, arr) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-[#FAFAFA] -mx-1 px-1 rounded-lg transition-colors"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
            >
              <img
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${item.name}`}
                alt={item.name}
                className="w-8 h-8 rounded-full shrink-0"
                style={{ backgroundColor: "#FAFAFA", border: "1.5px solid #EBEBEB" }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#111] truncate">{item.name}</p>
                <p className="text-[11px] text-[#AAA] truncate mt-0.5">{item.msg}</p>
              </div>
              <span className="text-[11px] text-[#CCC] shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-3 border-t border-[#F5F5F5]">
        {[
          { value: "14", label: "Sessions" },
          { value: "12.5", label: "Hours" },
          { value: "4.9", label: "Rating" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center py-3.5"
            style={{ borderRight: i < 2 ? "1px solid #F5F5F5" : "none" }}
          >
            <p className="text-[16px] font-light text-[#111]">{stat.value}</p>
            <p className="text-[10px] text-[#AAA] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
