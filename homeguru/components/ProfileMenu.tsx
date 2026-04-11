"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface ProfileMenuProps {
  onProfileClick: () => void;
  onReferRewardsClick: () => void;
}

export default function ProfileMenu({ onProfileClick, onReferRewardsClick }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const menuItems = [
    {
      label: "Profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      action: () => { setIsOpen(false); onProfileClick(); },
    },
    {
      label: "Settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      href: "/settings",
    },
    {
      label: "Refer & Rewards",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12v10H4V12" /><path d="M2 7h20v5H2z" /><path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
      action: () => { setIsOpen(false); onReferRewardsClick(); },
    },
    {
      label: "Support",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
          <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
        </svg>
      ),
      href: "https://support.homeguru.com",
      external: true,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-1 w-[36px] h-[36px] rounded-full overflow-hidden border border-[#E5E7EB] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-200"
        aria-label="Open profile menu"
      >
        <img
          src="https://i.pravatar.cc/150?img=33"
          alt="User profile"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-[calc(100%+6px)] w-[216px] bg-white border border-[#E5E7EB] rounded-xl py-3 shadow-lg z-50"
          style={{ animation: "fadeSlideIn 0.15s ease-out" }}
        >
          <div className="space-y-0.5 overflow-y-auto" style={{ maxHeight: "200px" }}>
            {menuItems.map((item) => {
              const inner = (
                <div className="mx-3 px-3 py-2.5 hover:bg-[#F9FAFB] rounded-full cursor-pointer transition-colors">
                  <div className="flex w-full items-center gap-3">
                    <span className="shrink-0 text-[#374151]">{item.icon}</span>
                    <span className="text-[13.5px] font-normal text-[#111827] font-matter leading-snug">
                      {item.label}
                    </span>
                  </div>
                </div>
              );

              if (item.external && item.href) {
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                    {inner}
                  </a>
                );
              }
              if (item.action) {
                return <div key={item.label} onClick={item.action}>{inner}</div>;
              }
              return (
                <Link key={item.label} href={item.href || "#"} onClick={() => setIsOpen(false)}>
                  {inner}
                </Link>
              );
            })}
          </div>

          {/* Divider + Logout */}
          <div className="border-t border-[#F3F4F6] mt-2 pt-2">
            <div className="mx-3 px-3 py-2.5 hover:bg-[#FEF2F2] rounded-full cursor-pointer transition-colors">
              <div className="flex w-full items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#374151]">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                <span className="text-[13.5px] font-normal text-[#111827] font-matter">Logout</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
