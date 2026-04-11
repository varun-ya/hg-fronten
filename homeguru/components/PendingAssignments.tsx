"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function PendingAssignments() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const allAssignments = [
    {
      id: 1,
      title: 'Spanish Essay',
      teacher: 'Ms. Priya Kapoor',
      tagText: 'Due tomorrow',
      tagBg: '#FEF2F2',
      tagColor: '#DC2626',
      iconBg: 'transparent',
    },
    {
      id: 2,
      title: 'Laws of Motion',
      teacher: 'Mr. Rajan Sharma',
      tagText: '4 days left',
      tagBg: '#FFFBEB',
      tagColor: '#D97706',
      iconBg: 'transparent',
    },
    {
      id: 3,
      title: 'Vector Math Worksheet',
      teacher: 'Ms. Priya Kapoor',
      tagText: 'Due in 5 days',
      tagBg: '#F3F4F6',
      tagColor: '#374151',
      iconBg: 'transparent',
    },
    {
      id: 4,
      title: 'Python Array Practice',
      teacher: 'Mr. Aditya Kulkarni',
      tagText: 'Due next week',
      tagBg: '#EFF6FF',
      tagColor: '#2563EB',
      iconBg: 'transparent',
    },
  ];

  const totalPages = Math.ceil(allAssignments.length / itemsPerPage);
  const assignments = allAssignments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] p-5 font-matter" style={{ height: '286px' }}>
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#111827" viewBox="0 0 256 256">
          <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"/>
        </svg>
        <h2 className="text-[#111827] text-[16px] font-season font-bold">Pending Assignments</h2>
        <span className="ml-auto bg-[#FEF2F2] text-[#DC2626] text-[11px] px-2 py-0.5 rounded-full font-medium">2 due</span>
      </div>

      {/* Assignment List */}
      <div className="flex flex-col gap-1">
        {assignments.map((assignment, index) => (
          <React.Fragment key={assignment.id}>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3.5">
                {/* Gradient Icon chip */}
                <div 
                  className="w-[42px] h-[42px] rounded-xl flex items-center justify-center shrink-0 border border-gray-100"
                  style={{ background: 'transparent' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="2" width="16" height="20" rx="3" stroke="#111827" strokeWidth="1.5" />
                    <line x1="8" y1="12" x2="16" y2="12" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="8" y1="16" x2="12" y2="16" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[#111827] text-[14.5px]">{assignment.title}</h3>
                    <span 
                      className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                      style={{ color: assignment.tagColor, backgroundColor: assignment.tagBg }}
                    >
                      {assignment.tagText}
                    </span>
                  </div>
                  <p className="text-[#9CA3AF] text-[12.5px]">{assignment.teacher}</p>
                </div>
              </div>

              {/* Action */}
              <Link href="/assignment">
                <button className="px-4 py-1.5 bg-white border border-[#E5E7EB] rounded-full text-[#374151] text-[13px] hover:bg-[#F9FAFB] transition-colors">
                  View
                </button>
              </Link>
            </div>

            {index < assignments.length - 1 && (
              <div className="w-full border-t border-[#F3F4F6]"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 bg-[#F9FAFB] rounded-xl px-4 py-2.5 flex items-center justify-between">
        <div className="text-[#9CA3AF] text-[12px]">
          Showing <span className="text-[#111827] font-medium">{currentPage}</span> of <span className="text-[#111827] font-medium">{totalPages}</span>
        </div>
        <div className="flex items-center gap-3 text-[12px]">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 transition-colors ${currentPage === 1 ? 'text-[#D1D5DB] cursor-not-allowed' : 'text-[#374151] hover:text-[#111827]'}`}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Prev
          </button>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 transition-colors ${currentPage === totalPages ? 'text-[#D1D5DB] cursor-not-allowed' : 'text-[#374151] hover:text-[#111827]'}`}>
            Next
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>

    </div>
  );
}
