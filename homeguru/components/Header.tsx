"use client";

import { ReactNode, useState } from "react";
import ProfileMenu from "@/components/ProfileMenu";
import ProfileModal from "@/components/ProfileModal";
import ReferRewardsModal from "@/components/ReferRewardsModal";

export default function Header({
  title = "Good morning,",
  titleAccent = "Varun",
  titleSuffix = " ✦",
  subtitle = "Friday, 13 March",
  hideRightTools = false
}: {
  title?: ReactNode;
  titleAccent?: ReactNode;
  titleSuffix?: ReactNode;
  subtitle?: ReactNode;
  hideRightTools?: boolean;
}) {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [referModalOpen, setReferModalOpen] = useState(false);

  return (
    <>
      <header className="flex md:items-center justify-between w-full flex-wrap gap-4">

        {/* Greeting / Page Title */}
        <div className="min-w-0">
          {subtitle && <p className="text-[12px] text-[#9CA3AF] mb-0.5 font-matter truncate">{subtitle}</p>}
          <h1 className="text-[22px] md:text-[26px] text-[#111827] font-season leading-tight truncate">
            {title} {titleAccent && <span className="text-[#4F46E5]">{titleAccent}</span>}{titleSuffix && <span>{titleSuffix}</span>}
          </h1>
        </div>

        {/* Right Side Tools */}
        {!hideRightTools && (
          <div className="flex items-center gap-2 md:gap-2.5">

            {/* Search Icon */}
            <button
              aria-label="Search"
              className="rounded-full flex items-center justify-center hover:bg-[#F3F4F6] transition-colors"
              style={{ width: '36px', height: '36px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6B7280" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </button>

            {/* Notification Icon */}
            <button
              aria-label="Notifications"
              className="relative rounded-full flex items-center justify-center hover:bg-[#F3F4F6] transition-colors"
              style={{ width: '36px', height: '36px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6B7280" viewBox="0 0 256 256">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
              {/* Unread Dot */}
              <span className="absolute top-[7px] right-[7px] w-1.5 h-1.5 bg-indigo-500 rounded-full border border-white"></span>
            </button>

            {/* Streak Counter */}
            <div className="hidden sm:flex rounded-full items-center gap-1.5 font-matter" style={{ paddingLeft: '12px', paddingRight: '14px', height: '36px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#F59E0B" viewBox="0 0 256 256">
                <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path>
              </svg>
              <span className="text-[13px] text-[#374151]">0</span>
            </div>

            {/* Upgrade Button */}
            <button className="hidden md:flex items-center gap-1.5 rounded-full hover:bg-[#FEF9EC] transition-colors font-matter text-[13px]"
              style={{ paddingLeft: '16px', paddingRight: '16px', height: '36px', backgroundColor: '#FFFBEB', border: '1px solid #F0D870', color: '#92400E' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#D97706" viewBox="0 0 256 256">
                <path d="M243.31,90.91l-128.4-64.2a16,16,0,0,0-14.86,0l-128.4,64.2A16,16,0,0,0,0,104l0,8a8,8,0,0,0,8,8H16V208a8,8,0,0,0,8,8H232a8,8,0,0,0,8-8V120h8a8,8,0,0,0,8-8l0-8A16,16,0,0,0,243.31,90.91Z"></path>
              </svg>
              Upgrade
            </button>

            {/* User Profile Avatar with Dropdown */}
            <ProfileMenu
              onProfileClick={() => setProfileModalOpen(true)}
              onReferRewardsClick={() => setReferModalOpen(true)}
            />
          </div>
        )}
      </header>

      {/* Profile Modal */}
      <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />

      {/* Refer & Rewards Modal */}
      <ReferRewardsModal isOpen={referModalOpen} onClose={() => setReferModalOpen(false)} />
    </>
  );
}
