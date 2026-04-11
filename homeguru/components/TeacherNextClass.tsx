"use client";
import { Clock, Video } from "lucide-react";

export default function TeacherNextClass() {
  return (
    <div className="bg-white w-full font-matter border border-[#E5E7EB] rounded-[16px] p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1A1A1A" viewBox="0 0 256 256">
            <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM184,216H72V180l56-42,56,42.35Zm0-140.36L128,118,72,76V40H184Z"/>
          </svg>
          <h3 className="text-[#111827] text-[16px] font-season font-bold">Next Class</h3>
        </div>
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF3C7] text-[#D97706] rounded-lg text-[13px] font-medium">
          <Clock size={14} strokeWidth={2.5} />
          IN 10 MIN
        </span>
      </div>

      {/* Class Card */}
      <div className="flex items-start gap-4">
        
        {/* Student Avatar */}
        <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#F97316] to-[#EF4444] flex items-center justify-center text-white font-bold text-[20px] shrink-0 shadow-sm">
          MI
        </div>

        {/* Class Details */}
        <div className="flex-1 min-w-0">
          <h4 className="text-[#111827] text-[18px] font-semibold mb-1">Meera Iyer</h4>
          <p className="text-[#6B7280] text-[14px] mb-3">English Lit · 11:17 AM · 1h</p>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-[#3D4A6B] text-white rounded-full text-[14px] font-medium hover:bg-[#2f3a54] transition-colors flex items-center gap-2">
              <Video size={16} strokeWidth={2.5} />
              Join now
            </button>
            <button className="px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#1A1A1A] rounded-full text-[14px] font-medium hover:bg-gray-50 transition-colors">
              Reschedule
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
