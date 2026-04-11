"use client";

export default function TeacherSidebarWidget() {
  return (
    <div className="space-y-5 font-matter">
      
      {/* Live Class Card */}
      <div className="relative overflow-hidden rounded-[16px] bg-white border border-[#E5E7EB] p-5">
        {/* Live Badge & Join Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DCFCE7] border border-[#86EFAC]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span className="text-[10px] font-semibold text-[#16A34A] uppercase tracking-wide">Live in 10 min</span>
          </div>
          <button className="px-5 py-2 rounded-full bg-[#111827] text-white text-[13px] font-medium hover:bg-[#1F2937] transition-all active:scale-95">
            Join
          </button>
        </div>

        {/* Student Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#F3F4F6] flex items-center justify-center border border-[#E5E7EB]">
            <span className="text-[13px] font-semibold text-[#111827]">MI</span>
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#111827]">Meera Iyer</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[12px] text-[#6B7280]">English Lit</p>
              <span className="text-[#D1D5DB]">·</span>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" viewBox="0 0 256 256" className="text-[#6B7280]">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                </svg>
                <p className="text-[12px] text-[#6B7280]">7:15 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* To Do Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="text-[#111827]">
              <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM117.66,149.66l-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L80,164.69l26.34-26.35a8,8,0,0,1,11.32,11.32Zm0-64-32,32a8,8,0,0,1-11.32,0l-16-16A8,8,0,0,1,69.66,90.34L80,100.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM192,168H144a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm0-64H144a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Z"></path>
            </svg>
            <span className="text-[11px] font-semibold text-[#111827] uppercase tracking-wider">To Do</span>
          </div>
          <span className="text-[11px] text-[#F97316] font-semibold">5 pending</span>
        </div>
        
        <div className="space-y-1.5">
          {/* Priority Task */}
          <div className="flex items-center justify-between px-4 py-3 rounded-[12px] border transition-all cursor-pointer bg-[#FFF7ED] border-[#FDBA74]/30 hover:border-[#F97316]/40">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256" className="text-[#F97316]">
                <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path>
              </svg>
              <span className="text-[13px] font-medium text-[#111827]">Grade Aarav's assignment</span>
            </div>
            <span className="text-[11px] text-[#F97316] font-semibold">Due today</span>
          </div>

          {/* Regular Tasks */}
          <div className="flex items-center justify-between px-4 py-3 rounded-[12px] border transition-all cursor-pointer bg-white border-[#E5E7EB] hover:border-[#CBD5E1] hover:bg-[#F9FAFB]">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256" className="text-[#9CA3AF]">
                <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
              </svg>
              <span className="text-[13px] font-medium text-[#374151]">Reply to Kavya</span>
            </div>
            <span className="text-[11px] text-[#9CA3AF]">2h ago</span>
          </div>

          <div className="flex items-center justify-between px-4 py-3 rounded-[12px] border transition-all cursor-pointer bg-white border-[#E5E7EB] hover:border-[#CBD5E1] hover:bg-[#F9FAFB]">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256" className="text-[#9CA3AF]">
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-48-56a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V160H104a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,152Z"></path>
              </svg>
              <span className="text-[13px] font-medium text-[#374151]">Confirm Amit's session</span>
            </div>
            <span className="text-[11px] text-[#9CA3AF]">Tomorrow</span>
          </div>

          <div className="flex items-center justify-between px-4 py-3 rounded-[12px] border transition-all cursor-pointer bg-white border-[#E5E7EB] hover:border-[#CBD5E1] hover:bg-[#F9FAFB]">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256" className="text-[#9CA3AF]">
                <path d="M184,112a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h64A8,8,0,0,1,184,112Zm-8,24H112a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm48-88V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H72V48H48Zm160,0V48H88V208H208Z"></path>
              </svg>
              <span className="text-[13px] font-medium text-[#374151]">Update lesson plan</span>
            </div>
            <span className="text-[11px] text-[#9CA3AF]">This week</span>
          </div>

          <div className="flex items-center justify-between px-4 py-3 rounded-[12px] border transition-all cursor-pointer bg-white border-[#E5E7EB] hover:border-[#CBD5E1] hover:bg-[#F9FAFB]">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256" className="text-[#9CA3AF]">
                <path d="M216,40H40A16,16,0,0,0,24,56V216a8,8,0,0,0,11.58,7.16L64,208.94l28.42,14.22a8,8,0,0,0,7.16,0L128,208.94l28.42,14.22a8,8,0,0,0,7.16,0L192,208.94l28.42,14.22A8,8,0,0,0,232,216V56A16,16,0,0,0,216,40Zm0,163.06-20.42-10.22a8,8,0,0,0-7.16,0L160,207.06l-28.42-14.22a8,8,0,0,0-7.16,0L96,207.06,67.58,192.84a8,8,0,0,0-7.16,0L40,203.06V56H216ZM60.42,167.16a8,8,0,0,0,10.74-3.58L76.94,152h38.12l5.78,11.58a8,8,0,1,0,14.32-7.16l-32-64a8,8,0,0,0-14.32,0l-32,64A8,8,0,0,0,60.42,167.16ZM96,113.89,107.06,136H84.94ZM136,128a8,8,0,0,1,8-8h16V104a8,8,0,0,1,16,0v16h16a8,8,0,0,1,0,16H176v16a8,8,0,0,1-16,0V136H144A8,8,0,0,1,136,128Z"></path>
              </svg>
              <span className="text-[13px] font-medium text-[#374151]">Create mock test</span>
            </div>
            <span className="text-[11px] text-[#9CA3AF]">By Friday</span>
          </div>
        </div>
      </div>

      {/* Messages Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="text-[#111827]">
              <path d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"></path>
            </svg>
            <span className="text-[11px] font-semibold text-[#111827] uppercase tracking-wider">Messages</span>
          </div>
          <span className="text-[11px] text-[#F97316] font-semibold">2 unread</span>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-[12px] bg-white border border-[#E5E7EB] hover:border-[#CBD5E1] hover:bg-[#F9FAFB] transition-all cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[#FFF7ED] flex items-center justify-center shrink-0 border border-[#FDBA74]/30">
              <span className="text-[11px] font-semibold text-[#F97316]">S</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#111827] truncate">Sneha Kapoor</p>
              <p className="text-[12px] text-[#6B7280] truncate mt-0.5">Can we reschedule tomorrow's class?</p>
            </div>
            <span className="text-[11px] text-[#CBD5E1] shrink-0">20m</span>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-[12px] bg-white border border-[#E5E7EB] hover:border-[#CBD5E1] hover:bg-[#F9FAFB] transition-all cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[#F0F0FF] flex items-center justify-center shrink-0 border border-[#C7D2FE]/30">
              <span className="text-[11px] font-semibold text-[#4F46E5]">R</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#111827] truncate">Rohan Gupta</p>
              <p className="text-[12px] text-[#6B7280] truncate mt-0.5">Doubt in organic chemistry reaction</p>
            </div>
            <span className="text-[11px] text-[#CBD5E1] shrink-0">1h</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="relative overflow-hidden rounded-[12px] bg-white border border-[#E5E7EB] px-4 py-4 text-center hover:border-[#CBD5E1] hover:bg-[#F9FAFB] transition-all">
          <p className="font-season text-[22px] text-[#111827] leading-none tracking-tight">14</p>
          <p className="text-[10px] text-[#6B7280] mt-2 whitespace-pre-line leading-tight">Sessions{'\n'}this week</p>
        </div>
        <div className="relative overflow-hidden rounded-[12px] bg-white border border-[#E5E7EB] px-4 py-4 text-center hover:border-[#CBD5E1] hover:bg-[#F9FAFB] transition-all">
          <p className="font-season text-[22px] text-[#111827] leading-none tracking-tight">12.5</p>
          <p className="text-[10px] text-[#6B7280] mt-2 whitespace-pre-line leading-tight">Hours{'\n'}taught</p>
        </div>
        <div className="relative overflow-hidden rounded-[12px] bg-white border border-[#E5E7EB] px-4 py-4 text-center hover:border-[#CBD5E1] hover:bg-[#F9FAFB] transition-all">
          <p className="font-season text-[22px] text-[#111827] leading-none tracking-tight">4.9</p>
          <p className="text-[10px] text-[#6B7280] mt-2 whitespace-pre-line leading-tight">Avg{'\n'}rating</p>
        </div>
      </div>

    </div>
  );
}
