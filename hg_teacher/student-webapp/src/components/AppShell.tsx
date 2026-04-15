"use client";

import { useSidebar } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";
import { List } from "@phosphor-icons/react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isOpen, toggle, isMobile } = useSidebar();
  const sidebarWidth = isOpen ? "var(--eleven-sidebar-width-expanded)" : "var(--eleven-sidebar-width-collapsed)";

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={toggle} />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isMobile ? isOpen : isOpen} />

      {/* Main content */}
      <div
        className="flex-1 h-full overflow-y-auto transition-[margin-left] duration-150 relative"
        style={{ marginLeft: isMobile ? 0 : sidebarWidth }}
      >
        {/* Mobile hamburger */}
        {isMobile && !isOpen && (
          <button
            onClick={toggle}
            className="fixed top-3 left-3 z-50 w-10 h-10 rounded-xl bg-white border border-[#EBEBEB] flex items-center justify-center cursor-pointer shadow-sm"
          >
            <List size={20} className="text-[#555]" weight="bold" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
