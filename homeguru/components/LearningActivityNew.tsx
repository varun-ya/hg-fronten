import React from 'react';

export default function LearningActivity() {
  // Mapping out the specific activity days to match the design exactly
  const activityData = {
    loggedIn: [4, 7, 9, 10, 13, 15, 16, 17, 21], // Green
    newCourse: [3, 6, 12, 24],                   // Blue
    quizAttempts: [5, 18, 28],                   // Orange
  };

  // Helper to determine the background color based on the day
  const getDayStyle = (day: number) => {
    if (activityData.loggedIn.includes(day)) return 'bg-[#A2EDB8] text-gray-900';
    if (activityData.newCourse.includes(day)) return 'bg-[#A7D3F9] text-gray-900';
    if (activityData.quizAttempts.includes(day)) return 'bg-[#EFCEAA] text-gray-900';
    return 'bg-[#F2F3F5] text-gray-600'; // Default Gray
  };

  return (
    <div className="w-[340px] bg-white rounded-[20px] border border-[#E5E7EB] p-5 font-sans shadow-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[#111827] text-[16px] font-season font-bold">
          Learning Activity
        </h2>
        
        {/* Dropdown Button */}
        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-[10px] text-[13px] text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          This month
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      {/* Subtitle / Streak */}
      <p className="text-[#6B7280] text-[14px] mb-5">
        You showed up on <span className="font-semibold text-gray-900">18 days</span> this month <span role="img" aria-label="fire">🔥</span>
      </p>

      {/* Calendar Grid (9 columns) */}
      <div className="grid grid-cols-9 mb-6" style={{ width: '257px', height: '116px', gap: '4.5px' }}>
        {[...Array(31)].map((_, i) => {
          const day = i + 1;
          return (
            <div 
              key={day}
              className={`rounded-[6px] flex items-center justify-center font-medium ${getDayStyle(day)}`}
              style={{ width: '22.4px', height: '22.4px', fontSize: '10px' }}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend Footer */}
      <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-y-3 gap-x-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-[3px] bg-[#A2EDB8]"></div>
          <span className="text-[13px] text-gray-600">Logged in</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-[3px] bg-[#EFCEAA]"></div>
          <span className="text-[13px] text-gray-600 font-medium">
            3 <span className="font-normal text-gray-600">Quiz attempts</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-[3px] bg-[#A7D3F9]"></div>
          <span className="text-[13px] text-gray-600 font-medium">
            4 <span className="font-normal text-gray-600">New course</span>
          </span>
        </div>
      </div>

    </div>
  );
}
