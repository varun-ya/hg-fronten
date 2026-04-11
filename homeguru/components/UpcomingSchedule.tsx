"use client";

import React, { useState } from 'react';
import { Clock, Sun } from 'lucide-react';

const SCHEDULES = [
  {
    id: 1,
    title: "English Speaking -",
    subtitle: "Intermediate",
    startsIn: "4hr 5min",
    time: "2:00 PM – 3:00 PM",
    period: "Afternoon",
    date: "14 May, 2026",
    tutorName: "Cersei Lannister",
    tutorImage: "https://i.pravatar.cc/150?img=47",
    subject: "English",
    location: "India",
    rating: 5,
    lessons: 346
  },
  {
    id: 2,
    title: "Mathematics -",
    subtitle: "Advanced Calculus",
    startsIn: "1d 2hr",
    time: "10:00 AM – 11:30 AM",
    period: "Morning",
    date: "15 May, 2026",
    tutorName: "Jon Snow",
    tutorImage: "https://i.pravatar.cc/150?img=12",
    subject: "Mathematics",
    location: "USA",
    rating: 4.8,
    lessons: 520
  },
  {
    id: 3,
    title: "Web Development -",
    subtitle: "React.js Basics",
    startsIn: "2d 5hr",
    time: "3:00 PM – 5:00 PM",
    period: "Afternoon",
    date: "16 May, 2026",
    tutorName: "Arya Stark",
    tutorImage: "https://i.pravatar.cc/150?img=32",
    subject: "Programming",
    location: "UK",
    rating: 4.9,
    lessons: 280
  }
];

export default function UpcomingSchedule() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SCHEDULES.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + SCHEDULES.length) % SCHEDULES.length);
      setIsAnimating(false);
    }, 300);
  };

  const currentSchedule = SCHEDULES[currentIndex];
  return (
    <div className="w-full font-matter">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1A1A1A" viewBox="0 0 256 256">
          <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM184,216H72V180l56-42,56,42.35Zm0-140.36L128,118,72,76V40H184Z"></path>
        </svg>
        <h2 className="text-[#111827] text-[16px] font-season font-bold">Upcoming Schedule</h2>
      </div>

      {/* Stacked Card Container */}
      <div className="relative w-full">
        
        {/* Background Stack Cards - Hidden on mobile */}
        <div 
          className="hidden md:block absolute top-2 right-[-6px] border border-[#E5E7EB] rounded-[16px] bg-white z-0 transition-all duration-300 w-full" 
          style={{ 
            height: '251.34px',
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateX(-10px)' : 'translateX(0)'
          }}
        ></div>
        <div 
          className="hidden md:block absolute top-1 right-[-3px] border border-[#E5E7EB] rounded-[16px] bg-white z-0 transition-all duration-300 w-full" 
          style={{ 
            height: '251.34px',
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateX(-5px)' : 'translateX(0)'
          }}
        ></div>

        {/* Main Card */}
        <div 
          className="relative z-10 bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden transition-all duration-300 w-full" 
          style={{ 
            minHeight: '251.34px',
            opacity: isAnimating ? 0.5 : 1,
            transform: isAnimating ? 'scale(0.98)' : 'scale(1)'
          }}
        >
          
          <div className="relative p-4 md:p-6 flex flex-col md:flex-row md:justify-between gap-4 md:gap-6 h-full">
            
            {/* Left Side: Course Info */}
            <div className="flex flex-col gap-3 flex-1">
              
              {/* Starts In Badge */}
              <div className="bg-[#F3F4F6] text-[#6B7280] text-[13px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 w-fit" style={{ fontFamily: 'DM Sans' }}>
                <Clock size={14} strokeWidth={2} />
                Starts in <span className="text-[#1A1A1A]">{currentSchedule.startsIn}</span>
              </div>

              {/* Course Title */}
              <h3 className="text-[#1A1A1A] leading-tight text-[20px] md:text-[28px] font-season">
                {currentSchedule.title}<br />{currentSchedule.subtitle}
              </h3>

              {/* Time & Date Info */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[#6B7280] text-[12px] md:text-[13px]" style={{ fontFamily: 'DM Sans' }}>
                <span>{currentSchedule.time}</span>
                <div className="flex items-center gap-1">
                  <Sun size={14} strokeWidth={2} />
                  {currentSchedule.period}
                </div>
                <span>{currentSchedule.date}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-2">
                <button className="bg-[#3D4A6B] text-white px-4 md:px-5 py-2 rounded-full text-[13px] md:text-[14px] hover:bg-[#2f3a54] transition-colors" style={{ fontFamily: 'DM Sans' }}>
                  Join now
                </button>
                <button className="bg-white border border-[#E5E7EB] text-[#1A1A1A] px-4 md:px-5 py-2 rounded-full text-[13px] md:text-[14px] hover:bg-gray-50 transition-colors" style={{ fontFamily: 'DM Sans' }}>
                  Reschedule
                </button>
              </div>
            </div>

            {/* Right Side: Teacher Profile - Repositioned for mobile */}
            <div className="relative md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 w-full md:w-[261.32px] min-h-[200px] md:h-[256px] flex items-center justify-center font-sans mt-4 md:mt-0">
              
              {/* 1. Background Vector Layer */}
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img 
                  src="/images/Vector.png" 
                  alt="Card Background" 
                  className="w-full h-full object-contain opacity-100"
                  style={{ maxWidth: '261.32px', maxHeight: '256px' }}
                />
              </div>

              {/* 2. Foreground Content Layer */}
              <div className="relative z-10 flex flex-col items-center w-full md:w-[156.78px] h-auto md:h-[167.09px] md:-mt-12 py-4 md:py-0 px-2">
                
                {/* Profile Avatar */}
                <div className="w-[58.96px] h-[58.96px] min-w-[58.96px] min-h-[58.96px] rounded-full overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-2.5 border-2 border-white flex items-center justify-center">
                  <img 
                    src={currentSchedule.tutorImage}
                    alt={currentSchedule.tutorName}
                    className="w-full h-full object-cover rounded-full" 
                  />
                </div>

                {/* Teacher Details */}
                <div className="flex flex-col items-center font-sans max-w-full">
                  
                  {/* Name */}
                  <h4 className="text-[#0F172A] text-[15px] md:text-[17px] tracking-[0.01em] mb-2 text-center break-words max-w-full px-1">
                    {currentSchedule.tutorName}
                  </h4>

                  {/* Language & Location Row (Flat, no background pills) */}
                  <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap justify-center max-w-full">
                    
                    {/* Subject */}
                    <div className="flex items-center gap-1">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-[#475569] shrink-0">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                      </svg>
                      <span className="text-[#334155] text-[11px] md:text-[12px] tracking-wide">{currentSchedule.subject}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1">
                      <span className="text-[12px] leading-none">🇮🇳</span>
                      <span className="text-[#334155] text-[11px] md:text-[12px] tracking-wide">{currentSchedule.location}</span>
                    </div>
                    
                  </div>

                  {/* Spoken Language Detail */}
                  <div className="flex items-center gap-1 text-[#334155] text-[11px] md:text-[12px] mb-2 tracking-wide max-w-full">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#475569] shrink-0">
                      <path d="M5 8l6 6"></path>
                      <path d="M4 14l6-6 2-3"></path>
                      <path d="M2 5h12"></path>
                      <path d="M7 2h1"></path>
                      <path d="M22 22l-5-5"></path>
                      <path d="M17 22l5-5"></path>
                    </svg>
                    <span className="truncate">Speaks English (Native)</span>
                  </div>

                  {/* Ratings & Lessons Count */}
                  <div className="flex items-center gap-1.5 text-[#334155] text-[11px] md:text-[12px] tracking-wide flex-wrap justify-center max-w-full">
                    <span className="flex items-center gap-0.5">
                      {currentSchedule.rating}
                      <svg className="w-[11px] h-[11px] text-[#334155] fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </span>
                    
                    <span className="text-[14px] leading-none">·</span>
                    
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#475569] shrink-0">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                      {currentSchedule.lessons} lessons
                    </span>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end mt-3 w-full">
        <div className="flex items-center gap-2 text-[#6B7280] text-[13px]" style={{ fontFamily: 'DM Sans', width: '110px', height: '22px' }}>
          <button 
            onClick={handlePrev}
            disabled={isAnimating}
            className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30" 
            style={{ width: '22px', height: '22px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <span className="flex items-center gap-1.5" style={{ fontSize: '13px' }}>
            <span className="text-[#1A1A1A]">{currentIndex + 1}</span>
            <span>of</span>
            <span>{SCHEDULES.length}</span>
          </span>
          <button 
            onClick={handleNext}
            disabled={isAnimating}
            className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30" 
            style={{ width: '22px', height: '22px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>

    </div>
  );
}
