"use client";

import { useSidebar } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isOpen, isMobile } = useSidebar();
  const sidebarWidth = isOpen ? "var(--eleven-sidebar-width-expanded)" : "var(--eleven-sidebar-width-collapsed)";

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">
      {/* Fixed Left Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Center — scrollable, offset by sidebar */}
      <div
        className="flex-1 h-full overflow-y-auto transition-[margin-left] duration-150"
        style={{ marginLeft: isMobile ? 0 : sidebarWidth }}
      >
        {children}
      </div>
    </div>
  );
}
