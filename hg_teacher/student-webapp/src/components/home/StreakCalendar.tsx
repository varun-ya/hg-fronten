"use client";

import { Flame } from "@phosphor-icons/react";

// Generate 365 days of activity data (full year like GitHub)
const DAYS = 365;

// Generate data for 2026 only (January 2026 to December 2026)
function generateData(): number[] {
  const data: number[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetYear = 2026;
  const yearStart = new Date(targetYear, 0, 1); // January 1, 2026
  
  // Current month and date (April 2025, so we'll simulate April 2026)
  const currentMonth = 3; // April (0-indexed)
  const currentDate = today.getDate(); // Current day of month
  
  for (let i = 0; i < DAYS; i++) {
    const date = new Date(yearStart);
    date.setDate(date.getDate() + i);
    
    const month = date.getMonth();
    const dayOfMonth = date.getDate();
    
    // Only fill data up to April 2026 (current month)
    if (month > currentMonth || (month === currentMonth && dayOfMonth > currentDate)) {
      data.push(0); // Future dates - no activity
      continue;
    }
    
    // Seeded random based on date (for consistency)
    const seed = date.getFullYear() * 366 + date.getMonth() * 31 + date.getDate();
    const random = (seed * 9301 + 49297) % 233280 / 233280;
    
    // Create realistic patterns
    const dayOfWeek = date.getDay();
    
    // Weekends - less activity (20% chance of activity)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if (random < 0.2) {
        data.push(Math.floor(random * 5) + 1); // Low activity
      } else {
        data.push(0); // No activity
      }
    }
    // April (exam month) - high activity
    else if (month === 3) {
      if (random < 0.85) {
        data.push(Math.floor(random * 2) + 3); // High activity (3-4)
      } else {
        data.push(Math.floor(random * 3) + 1); // Medium activity
      }
    }
    // Regular school days (Jan, Feb, Mar) - moderate to high activity
    else {
      if (random < 0.75) {
        data.push(Math.floor(random * 4) + 1); // 1-4 activity
      } else {
        data.push(0); // Occasional off days
      }
    }
  }
  return data;
}

const activityData = generateData();

// Calculate streak (consecutive days from end)
function calculateStreak(): number {
  let streak = 0;
  for (let i = activityData.length - 1; i >= 0; i--) {
    if (activityData[i] > 0) streak++;
    else break;
  }
  return streak;
}

// Calculate active days
function calculateActiveDays(): number {
  return activityData.filter(a => a > 0).length;
}

// Get color for activity level (0-4)
function getColor(level: number): string {
  const colors = [
    "#DCDEE3", // 0 - neutral (none)
    "#C8E6C9", // 1 - greenContainer (low)
    "#81C784", // 2 - mid green (medium)
    "#43A047", // 3 - green (high)
    "#2E7D32", // 4 - deep green (very high)
  ];
  return colors[Math.max(0, Math.min(4, level))];
}

// Get month labels for 2026
function getMonthLabels(): { month: string; weekIndex: number }[] {
  const labels: { month: string; weekIndex: number }[] = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const targetYear = 2026;
  const yearStart = new Date(targetYear, 0, 1);
  
  let lastMonth = -1;
  
  for (let i = 0; i < DAYS; i++) {
    const date = new Date(yearStart);
    date.setDate(date.getDate() + i);
    const month = date.getMonth();
    const weekIndex = Math.floor(i / 7);
    
    // Add label when month changes
    if (month !== lastMonth) {
      labels.push({ month: monthNames[month], weekIndex });
      lastMonth = month;
    }
  }
  
  return labels;
}

export default function StreakCalendar() {
  const weeks = Math.ceil(DAYS / 7);
  const streak = calculateStreak();
  const activeDays = calculateActiveDays();
  const monthLabels = getMonthLabels();

  return (
    <div className="rounded-[12px] p-4 overflow-hidden" style={{ background: "#FFFFFF" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flame size={15} weight="fill" style={{ color: "#B5651D" }} />
          <span className="text-[13px] font-medium" style={{ color: "#1A1C1E" }}>
            {streak} day streak
          </span>
        </div>
        <span className="text-[10px]" style={{ color: "#74777F" }}>
          {activeDays}/{DAYS} days
        </span>
      </div>

      {/* Month Labels */}
      <div className="overflow-x-auto">
      <div className="relative mb-1.5" style={{ marginLeft: "28px", minWidth: "fit-content" }}>
        <div className="flex gap-[3px]">
          {Array.from({ length: weeks }).map((_, weekIndex) => {
            const label = monthLabels.find(l => l.weekIndex === weekIndex);
            return (
              <div key={weekIndex} className="w-[11px] text-[9px] font-medium" style={{ color: "#44474E" }}>
                {label ? label.month : ""}
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex gap-[3px]" style={{ minWidth: "fit-content" }}>
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] mr-1.5 w-[22px]">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
            <div
              key={day}
              className="h-[11px] flex items-center justify-end"
            >
              {index % 2 === 1 && (
                <span className="text-[9px]" style={{ color: "#74777F" }}>{day}</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Activity grid */}
        <div className="flex gap-[3px]">
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const dataIndex = weekIndex * 7 + dayIndex;
                const level = dataIndex < DAYS ? activityData[dataIndex] : -1;
                
                return (
                  <div
                    key={dayIndex}
                    className="w-[11px] h-[11px] rounded-[3px] cursor-pointer hover:ring-1 hover:ring-[#2E7D32] transition-all"
                    style={{
                      backgroundColor: getColor(level),
                    }}
                    title={`Activity level: ${level}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      </div>  {/* end overflow-x-auto */}

      {/* Legend */}
      <div className="flex items-center gap-1 mt-2.5 justify-end">
        <span className="text-[9px]" style={{ color: "#74777F" }}>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="w-[11px] h-[11px] rounded-[2px]"
            style={{ backgroundColor: getColor(level) }}
          />
        ))}
        <span className="text-[9px]" style={{ color: "#74777F" }}>More</span>
      </div>
    </div>
  );
}
