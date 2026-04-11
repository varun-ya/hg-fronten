"use client";
import { BookOpen, Paperclip, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const LESSONS = [
  {
    id: 1,
    title: "Network Security Basics",
    daysAgo: "2 days ago",
    filesShared: 3,
    quizScore: 6,
    quizTotal: 15,
    duration: "1h 30m",
    teacherName: "Cersei Lannister",
    teacherImage: "https://i.pravatar.cc/150?img=47"
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    daysAgo: "5 days ago",
    filesShared: 5,
    quizScore: 12,
    quizTotal: 15,
    duration: "2h 15m",
    teacherName: "Jon Snow",
    teacherImage: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 3,
    title: "Database Design Principles",
    daysAgo: "1 week ago",
    filesShared: 2,
    quizScore: 14,
    quizTotal: 20,
    duration: "1h 45m",
    teacherName: "Arya Stark",
    teacherImage: "https://i.pravatar.cc/150?img=32"
  }
];

export default function ReviewLesson() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % LESSONS.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + LESSONS.length) % LESSONS.length);
      setIsAnimating(false);
    }, 300);
  };

  const currentLesson = LESSONS[currentIndex];
  
  return (
    <div className="w-full">
      
      {/* Outside Header - SeasonMix Light for heading */}
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1A1A1A" viewBox="0 0 256 256">
          <path d="M149.61,85.71l-89.6,88a8,8,0,0,1-11.22,0L10.39,136a8,8,0,1,1,11.22-11.41L54.4,156.79l84-82.5a8,8,0,1,1,11.22,11.42Zm96.1-11.32a8,8,0,0,0-11.32-.1l-84,82.5-18.83-18.5a8,8,0,0,0-11.21,11.42l24.43,24a8,8,0,0,0,11.22,0l89.6-88A8,8,0,0,0,245.71,74.39Z"></path>
        </svg>
        <h2 className="text-[#111827] text-[16px] font-season font-bold">
          Review lesson
        </h2>
      </div>

      {/* Main Card */}
      <div 
        className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 transition-all duration-300 w-full"
        style={{
          minHeight: '280px',
          opacity: isAnimating ? 0.5 : 1,
          transform: isAnimating ? 'scale(0.98)' : 'scale(1)'
        }}
      >
        
        {/* Top Row: Date Badge & Files Link */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-[#F3F4F6] text-[#6B7280] text-[12px] font-matter font-light px-3 py-1 rounded-full">
            {currentLesson.daysAgo}
          </div>
          
          <button className="flex items-center gap-1.5 text-[#4F46E5] text-[13px] font-matter font-light hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#4F46E5" viewBox="0 0 256 256">
              <path d="M165.66,90.34a8,8,0,0,1,0,11.32l-64,64a8,8,0,0,1-11.32-11.32l64-64A8,8,0,0,1,165.66,90.34ZM215.6,40.4a56,56,0,0,0-79.2,0L106.34,70.45a8,8,0,0,0,11.32,11.32l30.06-30a40,40,0,0,1,56.57,56.56l-30.07,30.06a8,8,0,0,0,11.31,11.32L215.6,119.6a56,56,0,0,0,0-79.2ZM138.34,174.22l-30.06,30.06a40,40,0,1,1-56.56-56.57l30.05-30.05a8,8,0,0,0-11.32-11.32L40.4,136.4a56,56,0,0,0,79.2,79.2l30.06-30.07a8,8,0,0,0-11.32-11.31Z"></path>
            </svg>
            Files shared ({currentLesson.filesShared})
          </button>
        </div>

        {/* Middle Row: Title & Stats */}
        <div className="flex justify-between items-start mb-5 gap-4">
          <div className="flex-1">
            <h3 className="text-[#111827] text-[18px] font-season font-light leading-[1.3] tracking-tight">
              {currentLesson.title}
            </h3>
          </div>
          
          <div className="flex items-start gap-6 shrink-0">
            {/* Quiz Score Stat */}
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-0.5">
                <span className="text-[18px] font-season font-light text-[#111827]">{currentLesson.quizScore}</span>
                <span className="text-[12px] font-matter font-light text-[#4B5563]">/{currentLesson.quizTotal}</span>
              </div>
              <span className="text-[11px] font-matter font-light text-[#6B7280] mt-0.5">Quiz score</span>
            </div>
            
            {/* Duration Stat */}
            <div className="flex flex-col items-end">
              <span className="text-[18px] font-season font-light text-[#111827]">
                {currentLesson.duration}
              </span>
              <span className="text-[11px] font-matter font-light text-[#6B7280] mt-0.5">Duration</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Teacher & Action */}
        <div className="flex justify-between items-center pt-4 border-t border-[#F3F4F6]">
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden shadow-sm shrink-0">
              <img src={currentLesson.teacherImage} alt={currentLesson.teacherName} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#111827] text-[14px] font-season font-light leading-tight">
                by {currentLesson.teacherName}
              </span>
              <button className="flex items-center gap-1 text-[#A68A48] text-[12px] font-matter font-light w-fit hover:opacity-80 transition-opacity mt-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Rate
              </button>
            </div>
          </div>
          
          <button className="px-4 py-2 rounded-full border border-[#E5E7EB] text-[#374151] text-[13px] font-matter font-light hover:bg-[#F9FAFB] transition-colors shrink-0">
            Reschedule
          </button>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-end gap-3 text-[#6B7280] text-[12px] font-matter font-light mt-4">
          <button 
            onClick={handlePrev}
            disabled={isAnimating}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span className="flex items-center gap-1.5">
            <span className="w-6 h-6 flex items-center justify-center bg-[#F3F4F6] rounded text-[#111827] text-[11px] font-matter font-light">{currentIndex + 1}</span>
            <span>of {LESSONS.length}</span>
          </span>
          <button 
            onClick={handleNext}
            disabled={isAnimating}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

      </div>
    </div>
  );
}
