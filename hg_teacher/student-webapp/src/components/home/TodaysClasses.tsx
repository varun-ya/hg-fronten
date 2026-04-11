"use client";

import { Video, Clock, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface ClassSession {
  time: string;
  teacher: string;
  subject: string;
  duration: string;
  status: "live" | "upcoming" | "completed";
  avatar: string;
  subjectColor: string;
}

export default function TodaysClasses() {
  const router = useRouter();

  const classes: ClassSession[] = [
    {
      time: "10:00 AM",
      teacher: "Ayush Soni",
      subject: "Mathematics",
      duration: "1 hour",
      status: "live",
      avatar: "A",
      subjectColor: "#4A7CF5",
    },
    {
      time: "2:00 PM",
      teacher: "Priya Menon",
      subject: "Physics",
      duration: "1 hour",
      status: "upcoming",
      avatar: "P",
      subjectColor: "#E85060",
    },
    {
      time: "4:30 PM",
      teacher: "Ankit Kapoor",
      subject: "English",
      duration: "45 min",
      status: "upcoming",
      avatar: "A",
      subjectColor: "#22C55E",
    },
    {
      time: "6:00 PM",
      teacher: "Neha Sharma",
      subject: "Chemistry",
      duration: "1 hour",
      status: "upcoming",
      avatar: "N",
      subjectColor: "#8B5CF6",
    },
  ];

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-[15px] font-bold text-[#111]">Today's Classes</h2>
        <button
          onClick={() => router.push("/schedule")}
          className="text-[12px] text-[#F97316] hover:text-[#EA580C] font-semibold flex items-center gap-1 bg-transparent border-none cursor-pointer transition-colors"
        >
          View schedule <ArrowRight size={12} weight="bold" />
        </button>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {classes.map((classItem, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[170px] h-[200px] rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            {/* Gradient Top Section (52% height) */}
            <div
              className="h-[104px] flex flex-col items-center justify-center relative p-4"
              style={{
                background: `linear-gradient(135deg, ${classItem.subjectColor} 0%, ${classItem.subjectColor}dd 100%)`,
              }}
            >
              {/* Status Badge */}
              {classItem.status === "live" && (
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-[9px] font-bold text-white">LIVE</span>
                </div>
              )}

              {classItem.status === "completed" && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-[9px] font-bold text-white">Done</span>
                </div>
              )}

              {/* Time */}
              <span className="text-[18px] font-bold text-white mb-2">
                {classItem.time}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                <Video size={20} weight="fill" className="text-white" />
              </div>

              {/* Duration */}
              <span className="text-[11px] font-medium text-white/90">
                {classItem.duration}
              </span>
            </div>

            {/* White Bottom Section (48% height) */}
            <div className="h-[96px] bg-white p-3 flex flex-col">
              <h3 className="text-[13px] font-bold text-[#111] mb-2 truncate">
                {classItem.subject}
              </h3>

              {/* Teacher Info */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: classItem.subjectColor }}
                >
                  {classItem.avatar}
                </div>
                <span className="text-[11px] text-[#666] truncate">
                  {classItem.teacher}
                </span>
              </div>

              {/* Action Button */}
              {classItem.status === "live" && (
                <button className="w-full py-1.5 bg-[#22C55E] hover:bg-[#16A34A] rounded-lg text-[11px] font-bold text-white transition-colors border-none cursor-pointer">
                  Join Now
                </button>
              )}

              {classItem.status === "upcoming" && (
                <button className="w-full py-1.5 bg-[#F5F5F5] hover:bg-[#E5E7EB] rounded-lg text-[11px] font-semibold text-[#666] transition-colors border-none cursor-pointer flex items-center justify-center gap-1">
                  <Clock size={12} weight="bold" />
                  Starts at {classItem.time}
                </button>
              )}

              {classItem.status === "completed" && (
                <button className="w-full py-1.5 bg-[#F5F5F5] rounded-lg text-[11px] font-semibold text-[#888] border-none cursor-pointer flex items-center justify-center gap-1">
                  <CheckCircle size={12} weight="fill" />
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}

        {/* View All Card */}
        <div className="flex-shrink-0 w-[170px] h-[200px] rounded-[28px] bg-white border-2 border-dashed border-[#E5E7EB] flex flex-col items-center justify-center cursor-pointer hover:border-[#F97316] hover:bg-[#FFF4ED] transition-all group">
          <div className="w-12 h-12 rounded-full bg-[#F5F5F5] group-hover:bg-[#F97316] flex items-center justify-center mb-3 transition-colors">
            <ArrowRight size={20} className="text-[#888] group-hover:text-white transition-colors" weight="bold" />
          </div>
          <span className="text-[13px] font-bold text-[#888] group-hover:text-[#F97316] transition-colors">
            View All
          </span>
          <span className="text-[10px] text-[#AAA] mt-1">Schedule</span>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
