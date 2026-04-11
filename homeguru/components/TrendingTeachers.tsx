"use client";
import React, { useState } from 'react';

const TEACHERS_DATA = [
  {
    id: 1,
    name: 'Aarav Mehta',
    subject: 'JEE Mathematics',
    rating: '4.6',
    lessons: '339',
    rate: '₹539',
    trend: 26,
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 2,
    name: 'Dr. Kavya Sharma',
    subject: 'NEET Biology',
    rating: '4.5',
    lessons: '566',
    rate: '₹669',
    trend: 21,
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: 3,
    name: 'Sneha Iyer',
    subject: 'IELTS Speaking & Writing',
    rating: '4.2',
    lessons: '455',
    rate: '₹799',
    trend: 20,
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 4,
    name: 'Aditya Kulkarni',
    subject: 'Python for Beginners',
    rating: '4.6',
    lessons: '265',
    rate: '₹899',
    trend: 20,
    avatar: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: 5,
    name: 'Priya Desai',
    subject: 'Data Science',
    rating: '4.7',
    lessons: '412',
    rate: '₹999',
    trend: 18,
    avatar: 'https://i.pravatar.cc/150?img=25',
  },
  {
    id: 6,
    name: 'Rahul Verma',
    subject: 'Web Development',
    rating: '4.4',
    lessons: '298',
    rate: '₹699',
    trend: 15,
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
];

export default function TrendingTeachersTable() {

  return (
    <div className="w-full font-matter">
      
      {/* Outside Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0c0c0e" viewBox="0 0 256 256">
          <path d="M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z"></path>
        </svg>
        <h2 className="text-[#111827] text-[16px] font-season font-bold">Trending teachers</h2>
      </div>

      {/* Table Container */}
      <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          
          {/* Table Header */}
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-[#E5E7EB]">
              <th className="py-4 pl-6 pr-4 text-[10.5px] text-[#9CA3AF] uppercase tracking-widest font-medium">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 transition-colors">
                  Teachers
                  <SortArrows />
                </div>
              </th>
              <th className="py-4 px-4 text-[10.5px] text-[#9CA3AF] uppercase tracking-widest font-medium">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 transition-colors">
                  Rating
                  <SortArrows />
                </div>
              </th>
              <th className="py-4 px-4 text-[10.5px] text-[#9CA3AF] uppercase tracking-widest font-medium">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 transition-colors">
                  Lessons
                  <SortArrows />
                </div>
              </th>
              <th className="py-4 px-4 text-[10.5px] text-[#9CA3AF] uppercase tracking-widest font-medium">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 transition-colors">
                  Rate
                  <SortArrows />
                </div>
              </th>
              <th className="py-4 px-4 text-[10.5px] text-[#9CA3AF] uppercase tracking-widest font-medium">
                Trend
              </th>
            </tr>
          </thead>
        </table>
        </div>

        {/* Scrollable Body */}
        <div className="max-h-[320px] overflow-y-auto overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
          {/* Table Body */}
          <tbody>
            {TEACHERS_DATA.map((teacher, index) => (
              <tr 
                key={teacher.id} 
                className={`${index !== TEACHERS_DATA.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50/50 transition-colors`}
              >
                
                {/* Teachers Column */}
                <td className="py-4 pl-6 pr-4 align-middle">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <img src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#111827] text-[15px] mb-[1px]">
                        {teacher.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-[#A5998B] text-[11.5px]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="12" y1="3" x2="12" y2="21"></line>
                          <line x1="3" y1="12" x2="21" y2="12"></line>
                        </svg>
                        {teacher.subject}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Rating Column */}
                <td className="py-4 px-4 align-middle">
                  <div className="flex items-center gap-1.5 text-[#111827] text-[14.5px]">
                    {teacher.rating}
                    <svg className="w-3.5 h-3.5 text-[#111827] fill-current mb-[2px]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </td>

                {/* Lessons Column */}
                <td className="py-4 px-4 align-middle">
                  <span className="text-[#111827] text-[14.5px]">
                    {teacher.lessons}
                  </span>
                </td>

                {/* Rate Column */}
                <td className="py-4 px-4 align-middle">
                  <span className="text-[#111827] text-[14.5px]">
                    {teacher.rate}
                  </span>
                </td>

                {/* Trend Column */}
                <td className="py-4 px-4 align-middle">
                  <div className="flex items-start gap-1.5">
                    {/* Green Trending Arrow */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2D8946" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px]">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                    
                    <div className="flex flex-col leading-[1.2]">
                      <span className="text-[#2D8946] text-[12px]">
                        {teacher.trend} classes
                      </span>
                      <span className="text-[#2D8946] text-[12px]">
                        this week
                      </span>
                    </div>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

// Reusable micro-component for the column sorting arrows
function SortArrows() {
  return (
    <div className="flex flex-col gap-[1px] opacity-60">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  );
}
