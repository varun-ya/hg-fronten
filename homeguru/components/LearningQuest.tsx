"use client";
import React from 'react';

export default function LearningQuest() {
  return (
    <div
      className="relative overflow-hidden rounded-[20px] flex flex-col w-full"
      style={{
        height: '366px',
        background: 'linear-gradient(160deg, #e8eaf6 0%, #c5cae9 45%, #9fa8da 100%)',
        padding: '22px 20px',
        border: '1px solid #c5cae9',
      }}
    >
      
      {/* Header Section */}
      <div className="flex items-center gap-[6px] mb-[6px]">
        {/* Custom SVG for the circular question mark icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-[1px]">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM11.05 15H12.95V16.9H11.05V15ZM12 6.5C13.65 6.5 15 7.85 15 9.5C15 10.5 14.3 11.25 13.5 12C12.8 12.65 12.45 13.05 12.45 14H10.55C10.55 12.5 11.35 11.75 12.15 11.05C12.75 10.55 13.1 10.15 13.1 9.5C13.1 8.9 12.6 8.4 12 8.4C11.4 8.4 10.9 8.9 10.9 9.5H9C9 7.85 10.35 6.5 12 6.5Z"/>
        </svg>
        <h2 className="text-white text-[16px] font-season font-bold tracking-[0.01em]">
          Learning Quest
        </h2>
      </div>

      {/* Subtitle */}
      <p className="text-[#e2e8f0] text-[12.5px] leading-[17px] mb-[14px] pr-2 font-matter font-light opacity-90">
        Based on yesterday&apos;s class, solve this to unlock today&apos;s key.
      </p>

      {/* Badges */}
      <div className="flex gap-[8px] mb-[16px]">
        <span className="bg-[#a3c3b2] text-[#1f3a29] px-[10px] py-[4.5px] rounded-[7px] text-[11.5px] font-matter font-light leading-none">
          Laws of motion
        </span>
        <span className="bg-[#c6adc6] text-[#3f2440] px-[10px] py-[4.5px] rounded-[7px] text-[11.5px] font-matter font-light leading-none">
          Level 1
        </span>
      </div>

      {/* Questions Area */}
      <div className="relative flex-1 w-full">
        
        {/* Question 1 (Visible) */}
        <div
          className="rounded-[14px] p-[14px] relative z-0 mb-[10px]"
          style={{
            backgroundColor: 'rgba(64, 78, 100, 0.85)',
            boxShadow: 'inset 0px 1px 1px rgba(255, 255, 255, 0.08), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex gap-[6px]">
            <span className="text-[#e2e8f0] text-[12.5px] font-matter font-light shrink-0 pt-[1px] opacity-90">
              Q.1
            </span>
            <p className="text-white text-[13.5px] leading-[19px] font-matter font-light">
              According to Newton&apos;s First Law, a body will continue to remain at rest or in uniform motion unless acted upon by:
            </p>
          </div>
        </div>

        {/* Question 2 (Faded/Obscured) */}
        <div
          className="rounded-[14px] p-[14px] relative z-0 opacity-40"
          style={{
            backgroundColor: 'rgba(64, 78, 100, 0.85)',
            boxShadow: 'inset 0px 1px 1px rgba(255, 255, 255, 0.08)',
          }}
        >
          <div className="flex gap-[6px]">
            <span className="text-[#e2e8f0] text-[12.5px] font-matter font-light shrink-0 pt-[1px]">
              Q.2
            </span>
            <p className="text-white text-[13.5px] leading-[19px] font-matter font-light blur-[0.5px]">
              What is the SI unit of force?
            </p>
          </div>
        </div>
      </div>

      {/* The fog/fade overlay that covers the bottom part of the questions */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          bottom: '60px',
          left: 0,
          width: '100%',
          height: '160px',
          background: 'linear-gradient(0deg, #b6c8db 15%, rgba(182,200,219,0.9) 45%, rgba(182,200,219,0) 100%)'
        }}
      />

      {/* Lock / Key Icon Box */}
      <div
        className="absolute z-20 flex items-center justify-center rounded-[14px]"
        style={{
          width: '80px',
          height: '52px',
          backgroundColor: '#2f2f2f',
          top: '223px',
          left: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.05)'
        }}
      >
        {/* Custom exact matching 3D Gold Key SVG */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 3px 2px rgba(0,0,0,0.3))' }}>
          <g transform="rotate(-45, 12, 12)">
            <rect x="4" y="10.5" width="11" height="3" rx="1" fill="url(#key-grad)"/>
            <rect x="5.5" y="12" width="2.5" height="4.5" rx="1" fill="url(#key-grad)"/>
            <rect x="9.5" y="12" width="2.5" height="4.5" rx="1" fill="url(#key-grad)"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M18 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 3.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="url(#key-grad)"/>
          </g>
          <defs>
            <linearGradient id="key-grad" x1="4" y1="7" x2="23" y2="17" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFE87C"/>
              <stop offset="40%" stopColor="#F6A723"/>
              <stop offset="100%" stopColor="#A55A08"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Action Button */}
      <button
        className="w-full bg-white text-[#111111] rounded-[24px] font-matter font-light text-[14.5px] z-20 relative hover:bg-gray-50 transition-colors shadow-sm"
        style={{ 
          height: '46px', 
          marginTop: 'auto',
          letterSpacing: '-0.01em'
        }}
      >
        Take the Challenge
      </button>

    </div>
  );
}
