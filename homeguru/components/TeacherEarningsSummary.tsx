"use client";

export default function TeacherEarningsSummary() {
  return (
    <div className="bg-white w-full font-matter border border-[#E5E7EB] rounded-[16px] p-6">
      
      {/* Main Earnings Display */}
      <div className="mb-6">
        <p className="text-[#6B7280] text-[13px] mb-2">Total earnings this month</p>
        <div className="flex items-baseline gap-3">
          <h2 className="text-[#111827] text-[42px] font-bold leading-none">₹12,400</h2>
          <span className="text-[13px] px-3 py-1 rounded-full font-medium bg-[#D1FAE5] text-[#059669]">
            ↑ +18% this month
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 pt-6 border-t border-[#F3F4F6]">
        
        {/* Students */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[38px] h-[38px] rounded-xl bg-[#DBEAFE] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#2563EB" viewBox="0 0 256 256">
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/>
              </svg>
            </div>
          </div>
          <p className="text-[#111827] text-[24px] font-semibold leading-none mb-1">18</p>
          <p className="text-[#6B7280] text-[13px]">Students</p>
        </div>

        {/* Sessions */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[38px] h-[38px] rounded-xl bg-[#FEF3C7] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#D97706" viewBox="0 0 256 256">
                <path d="M216,40H40A16,16,0,0,0,24,56V168a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,128H40V56H216V168Zm16,40a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16H224A8,8,0,0,1,232,208Zm-68-56a8,8,0,0,1-8,8H100a8,8,0,0,1,0-16h56A8,8,0,0,1,164,152Z"/>
              </svg>
            </div>
          </div>
          <p className="text-[#111827] text-[24px] font-semibold leading-none mb-1">32</p>
          <p className="text-[#6B7280] text-[13px]">Sessions</p>
        </div>

        {/* Rating */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[38px] h-[38px] rounded-xl bg-[#FEE2E2] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#DC2626" viewBox="0 0 256 256">
                <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"/>
              </svg>
            </div>
          </div>
          <p className="text-[#111827] text-[24px] font-semibold leading-none mb-1">4.8</p>
          <p className="text-[#6B7280] text-[13px]">Rating</p>
        </div>

        {/* Hours */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[38px] h-[38px] rounded-xl bg-[#E0E7FF] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4F46E5" viewBox="0 0 256 256">
                <path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34Z"/>
              </svg>
            </div>
          </div>
          <p className="text-[#111827] text-[24px] font-semibold leading-none mb-1">48h</p>
          <p className="text-[#6B7280] text-[13px]">Hours</p>
        </div>

      </div>
    </div>
  );
}
