"use client";

import { Notebook, FileText, VideoCamera, ChatCircle, ArrowRight } from "@phosphor-icons/react";

interface ClassNote {
  date: string;
  topic: string;
  subject: string;
  status: "done" | "pending";
  files: number;
  hasRecording: boolean;
  chatMessages: number;
  preview: string;
  subjectColor: string;
}

export default function ClassNotes() {
  const notes: ClassNote[] = [
    {
      date: "Dec 15",
      topic: "Quadratic Equations",
      subject: "Mathematics",
      status: "done",
      files: 3,
      hasRecording: true,
      chatMessages: 5,
      preview: "Learned solving methods...",
      subjectColor: "#4A7CF5",
    },
    {
      date: "Dec 14",
      topic: "Newton's Laws",
      subject: "Physics",
      status: "done",
      files: 2,
      hasRecording: true,
      chatMessages: 8,
      preview: "Force and motion concepts...",
      subjectColor: "#E85060",
    },
    {
      date: "Dec 13",
      topic: "Organic Chemistry",
      subject: "Chemistry",
      status: "done",
      files: 4,
      hasRecording: false,
      chatMessages: 3,
      preview: "Functional groups study...",
      subjectColor: "#8B5CF6",
    },
    {
      date: "Dec 12",
      topic: "Shakespeare",
      subject: "English",
      status: "done",
      files: 1,
      hasRecording: true,
      chatMessages: 12,
      preview: "Macbeth analysis...",
      subjectColor: "#22C55E",
    },
  ];

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-[15px] font-bold text-[#111]">Class Notes</h2>
        <button className="text-[12px] text-[#F97316] hover:text-[#EA580C] font-semibold flex items-center gap-1 bg-transparent border-none cursor-pointer transition-colors">
          View all <ArrowRight size={12} weight="bold" />
        </button>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {notes.map((note, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[170px] h-[200px] rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            {/* Gradient Top Section (52% height) */}
            <div
              className="h-[104px] flex flex-col items-center justify-center relative p-4"
              style={{
                background: `linear-gradient(135deg, ${note.subjectColor}20 0%, ${note.subjectColor}40 100%)`,
              }}
            >
              {/* Date and Status */}
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#666]">
                  {note.date}
                </span>
                {note.status === "done" && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-[#22C55E]/10 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-[#22C55E]" />
                    <span className="text-[9px] font-bold text-[#22C55E]">Done</span>
                  </div>
                )}
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${note.subjectColor}30` }}
              >
                <Notebook size={24} weight="fill" style={{ color: note.subjectColor }} />
              </div>
            </div>

            {/* White Bottom Section (48% height) */}
            <div className="h-[96px] bg-white p-3 flex flex-col">
              <h3 className="text-[12px] font-bold text-[#111] mb-1 line-clamp-2 leading-tight">
                {note.topic}
              </h3>

              {/* Resource Badges */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-0.5">
                  <FileText size={11} className="text-[#888]" weight="bold" />
                  <span className="text-[10px] font-semibold text-[#888]">{note.files}</span>
                </div>
                {note.hasRecording && (
                  <div className="flex items-center gap-0.5">
                    <VideoCamera size={11} className="text-[#888]" weight="fill" />
                  </div>
                )}
                <div className="flex items-center gap-0.5">
                  <ChatCircle size={11} className="text-[#888]" weight="fill" />
                  <span className="text-[10px] font-semibold text-[#888]">{note.chatMessages}</span>
                </div>
              </div>

              {/* Preview Text */}
              <p className="text-[10px] text-[#AAA] line-clamp-2 leading-tight">
                {note.preview}
              </p>
            </div>
          </div>
        ))}

        {/* View All Card */}
        <div className="flex-shrink-0 w-[170px] h-[200px] rounded-[28px] bg-white border-2 border-dashed border-[#E5E7EB] flex flex-col items-center justify-center cursor-pointer hover:border-[#F97316] hover:bg-[#FFF4ED] transition-all group">
          <div className="w-12 h-12 rounded-full bg-[#F5F5F5] group-hover:bg-[#F97316] flex items-center justify-center mb-3 transition-colors">
            <Notebook size={20} className="text-[#888] group-hover:text-white transition-colors" weight="bold" />
          </div>
          <span className="text-[13px] font-bold text-[#888] group-hover:text-[#F97316] transition-colors">
            All Notes
          </span>
          <span className="text-[10px] text-[#AAA] mt-1">View history</span>
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
