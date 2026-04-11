"use client";
import { BookOpen, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function LearningHours() {
  const [selectedMonth, setSelectedMonth] = useState('This month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; date: string; study: string; test: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const months = ['This month', 'Last month', 'January', 'February', 'March', 'April', 'May', 'June'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const monthDataPoints: Record<string, any[]> = {
    'This month': [
      { date: "Mar 1", study: "2h 30m", test: "1h 15m" },
      { date: "Mar 4", study: "3h 10m", test: "45m" },
      { date: "Mar 9", study: "4h 20m", test: "2h 5m" },
      { date: "Mar 13", study: "3h 45m", test: "1h 30m" },
      { date: "Mar 17", study: "2h 50m", test: "1h 20m" },
      { date: "Mar 21", study: "4h 5m", test: "2h 10m" },
      { date: "Mar 25", study: "3h 30m", test: "1h 45m" },
      { date: "Mar 29", study: "3h 55m", test: "1h 25m" },
    ],
    'Last month': [
      { date: "Feb 2", study: "3h 15m", test: "1h 30m" },
      { date: "Feb 6", study: "2h 45m", test: "50m" },
      { date: "Feb 10", study: "4h 0m", test: "2h 15m" },
      { date: "Feb 14", study: "3h 30m", test: "1h 40m" },
      { date: "Feb 18", study: "3h 20m", test: "1h 25m" },
      { date: "Feb 22", study: "2h 55m", test: "1h 10m" },
      { date: "Feb 26", study: "4h 10m", test: "2h 5m" },
    ],
    'January': [
      { date: "Jan 3", study: "2h 20m", test: "1h 10m" },
      { date: "Jan 7", study: "3h 5m", test: "55m" },
      { date: "Jan 11", study: "3h 50m", test: "1h 50m" },
      { date: "Jan 15", study: "3h 25m", test: "1h 35m" },
      { date: "Jan 19", study: "2h 40m", test: "1h 15m" },
      { date: "Jan 23", study: "4h 0m", test: "2h 0m" },
      { date: "Jan 27", study: "3h 35m", test: "1h 40m" },
      { date: "Jan 31", study: "3h 45m", test: "1h 30m" },
    ],
    'February': [
      { date: "Feb 2", study: "3h 15m", test: "1h 30m" },
      { date: "Feb 6", study: "2h 45m", test: "50m" },
      { date: "Feb 10", study: "4h 0m", test: "2h 15m" },
      { date: "Feb 14", study: "3h 30m", test: "1h 40m" },
      { date: "Feb 18", study: "3h 20m", test: "1h 25m" },
      { date: "Feb 22", study: "2h 55m", test: "1h 10m" },
      { date: "Feb 26", study: "4h 10m", test: "2h 5m" },
    ],
    'March': [
      { date: "Mar 1", study: "2h 30m", test: "1h 15m" },
      { date: "Mar 5", study: "3h 10m", test: "45m" },
      { date: "Mar 9", study: "4h 20m", test: "2h 5m" },
      { date: "Mar 13", study: "3h 45m", test: "1h 30m" },
      { date: "Mar 17", study: "2h 50m", test: "1h 20m" },
      { date: "Mar 21", study: "4h 5m", test: "2h 10m" },
      { date: "Mar 25", study: "3h 30m", test: "1h 45m" },
      { date: "Mar 29", study: "3h 55m", test: "1h 25m" },
    ],
    'April': [
      { date: "Apr 2", study: "2h 40m", test: "1h 20m" },
      { date: "Apr 6", study: "3h 15m", test: "1h 0m" },
      { date: "Apr 10", study: "4h 10m", test: "2h 0m" },
      { date: "Apr 14", study: "3h 35m", test: "1h 45m" },
      { date: "Apr 18", study: "3h 0m", test: "1h 30m" },
      { date: "Apr 22", study: "3h 50m", test: "1h 55m" },
      { date: "Apr 26", study: "3h 25m", test: "1h 35m" },
      { date: "Apr 30", study: "4h 5m", test: "1h 50m" },
    ],
    'May': [
      { date: "May 2", study: "2h 50m", test: "1h 25m" },
      { date: "May 6", study: "3h 20m", test: "1h 10m" },
      { date: "May 10", study: "4h 0m", test: "2h 10m" },
      { date: "May 14", study: "3h 40m", test: "1h 50m" },
      { date: "May 18", study: "3h 10m", test: "1h 35m" },
      { date: "May 22", study: "3h 55m", test: "2h 0m" },
      { date: "May 26", study: "3h 30m", test: "1h 40m" },
      { date: "May 30", study: "4h 15m", test: "1h 55m" },
    ],
    'June': [
      { date: "Jun 3", study: "2h 35m", test: "1h 15m" },
      { date: "Jun 7", study: "3h 5m", test: "55m" },
      { date: "Jun 11", study: "3h 50m", test: "1h 50m" },
      { date: "Jun 15", study: "3h 30m", test: "1h 40m" },
      { date: "Jun 19", study: "2h 55m", test: "1h 25m" },
      { date: "Jun 23", study: "4h 10m", test: "2h 5m" },
      { date: "Jun 27", study: "3h 40m", test: "1h 45m" },
    ],
  };

  const dataPoints = monthDataPoints[selectedMonth] || monthDataPoints['This month'];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentage = x / rect.width;
    const index = Math.min(Math.floor(percentage * dataPoints.length), dataPoints.length - 1);
    
    if (index >= 0 && index < dataPoints.length) {
      setHoveredPoint({ x, y, ...dataPoints[index] });
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] p-4 md:p-6 font-matter relative" style={{ minHeight: '323px' }}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-gray-800" strokeWidth={2} />
          <h2 className="text-[#111827] text-[16px] font-season font-bold">Learning Hours</h2>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#E5E7EB] rounded-full text-[13px] text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
          >
            {selectedMonth}
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    selectedMonth === month ? 'bg-gray-50 text-[#111827]' : 'text-[#6B7280]'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="relative flex h-[200px]">
        <div className="w-[48px] flex flex-col justify-between items-end pr-4 text-[#9CA3AF] text-[12px] pb-[32px] pt-[8px] shrink-0">
          <span>80 hr</span>
          <span>60 hr</span>
          <span>40 hr</span>
          <span>20 hr</span>
          <span>0 hr</span>
        </div>

        <div className="flex-1 relative cursor-pointer" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="absolute inset-0 flex flex-col justify-between pb-[32px] pt-[16px]">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full border-t border-dashed border-gray-200"></div>
            ))}
          </div>

          <div className="absolute inset-0 pb-[32px] overflow-hidden">
            <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                {/* Light Blue Background Wave Gradient */}
                <linearGradient id="lightWaveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A4B4FF" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#A4B4FF" stopOpacity="0.01"/>
                </linearGradient>
                
                {/* Darker Blue Foreground Wave Gradient */}
                <linearGradient id="darkWaveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6484C4" stopOpacity="0.75"/>
                  <stop offset="100%" stopColor="#6484C4" stopOpacity="0.01"/>
                </linearGradient>
              </defs>

              {/* Background Wave (Light Blue) */}
              <path 
                d="M 0,150 
                   C 40,140 60,60 100,60 
                   C 140,60 150,160 190,160 
                   C 230,160 250,50 310,50 
                   C 370,50 380,80 430,80 
                   C 480,80 510,140 540,140 
                   C 570,140 590,50 630,50 
                   C 670,50 690,170 730,170 
                   C 770,170 790,60 830,60 
                   C 870,60 890,130 930,130 
                   C 970,130 980,80 1000,80 
                   L 1000,300 L 0,300 Z" 
                fill="url(#lightWaveGrad)" 
              />
              <path 
                d="M 0,150 
                   C 40,140 60,60 100,60 
                   C 140,60 150,160 190,160 
                   C 230,160 250,50 310,50 
                   C 370,50 380,80 430,80 
                   C 480,80 510,140 540,140 
                   C 570,140 590,50 630,50 
                   C 670,50 690,170 730,170 
                   C 770,170 790,60 830,60 
                   C 870,60 890,130 930,130 
                   C 970,130 980,80 1000,80" 
                fill="none" 
                stroke="#8BA4F9" 
                strokeWidth="2.5" 
                vectorEffect="non-scaling-stroke"
              />

              {/* Foreground Wave (Dark Blue) */}
              <path 
                d="M 0,100 
                   C 50,80 70,40 100,40 
                   C 130,40 140,180 170,180 
                   C 200,180 230,100 270,100 
                   C 310,100 330,150 360,150 
                   C 390,150 420,80 450,80 
                   C 480,80 500,130 530,130 
                   C 560,130 590,60 620,60 
                   C 650,60 670,190 710,190 
                   C 750,190 770,50 810,50 
                   C 850,50 880,180 920,180 
                   C 960,180 980,70 1000,70 
                   L 1000,300 L 0,300 Z" 
                fill="url(#darkWaveGrad)" 
              />
              <path 
                d="M 0,100 
                   C 50,80 70,40 100,40 
                   C 130,40 140,180 170,180 
                   C 200,180 230,100 270,100 
                   C 310,100 330,150 360,150 
                   C 390,150 420,80 450,80 
                   C 480,80 500,130 530,130 
                   C 560,130 590,60 620,60 
                   C 650,60 670,190 710,190 
                   C 750,190 770,50 810,50 
                   C 850,50 880,180 920,180 
                   C 960,180 980,70 1000,70" 
                fill="none" 
                stroke="#5A79C2" 
                strokeWidth="2.5" 
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="absolute bottom-0 w-full flex justify-between text-[#9CA3AF] text-[12px] pr-4">
            {dataPoints.map((point, idx) => (
              <span key={idx}>{point.date}</span>
            ))}
          </div>

          {/* Tooltip on hover */}
          {hoveredPoint && (
            <div 
              className="absolute z-50 pointer-events-none"
              style={{ 
                left: `${hoveredPoint.x}px`, 
                top: `${hoveredPoint.y + 20}px`,
                transform: 'translateX(-50%)'
              }}
            >
              {/* Tooltip box */}
              <div className="bg-[#1F2937] text-white p-2.5 rounded-[6px] shadow-xl w-[110px]">
                <p className="text-[#9CA3AF] text-[10px] mb-2">{hoveredPoint.date}</p>
                
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5A79C2] shrink-0"></span>
                  <span className="text-[10px] text-gray-300">Study: <span className="text-white">{hoveredPoint.study}</span></span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8BA4F9] shrink-0"></span>
                  <span className="text-[10px] text-gray-300">Test: <span className="text-white">{hoveredPoint.test}</span></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-center gap-6 text-[13px] text-[#6B7280]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#5A79C2]"></span>
          Study
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8BA4F9]"></span>
          Online Test
        </div>
      </div>
    </div>
  );
}
