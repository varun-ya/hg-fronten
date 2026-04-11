"use client";

import { useSidebar } from "@/context/SidebarContext";
import Link from "next/link";

export default function TopBar() {
  const { isOpen, toggle } = useSidebar();
  const headerWidth = isOpen
    ? "calc(100% - var(--eleven-sidebar-width-expanded))"
    : "calc(100% - var(--eleven-sidebar-width-collapsed))";

  return (
    <header
      className="hidden lg:block fixed top-0 right-0 z-[30] transition-[width] duration-150"
      style={{
        width: headerWidth,
        height: "calc(var(--eleven-header-height) + var(--eleven-banner-height))",
        borderBottom: "1px solid rgba(0,0,29,0.075)"
      }}
    >
      <div
        className="h-[var(--eleven-header-height)] w-full mx-auto flex items-center gap-2 bg-white/90 backdrop-blur-[8px] px-2.5"
        style={{ opacity: 1, visibility: "visible" as const, borderBottom: "1px solid rgba(0,0,29,0.075)" }}
      >
        {/* Sidebar toggle */}
        <button onClick={toggle} className="relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-transparent hover:bg-black/[0.04] active:bg-black/[0.06] rounded-[10px] pointer-events-auto p-0 h-8 w-8 text-gray-500 hover:text-gray-950 duration-100 transition-colors shrink-0 cursor-w-resize">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="w-5 h-5">
            <rect x="7" y="6.5" width="7" height="1.5" rx="0.75" transform="rotate(90 7 6.5)" fill="currentColor" />
            <rect x="3" y="4" width="14" height="12" rx="2.8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {/* Breadcrumb / Page title */}
        <div className="flex gap-1.5 items-center whitespace-nowrap min-w-0 overflow-hidden w-full py-1 px-1 -mr-1">
          <div className="shrink-0">
            <p data-testid="page-title" className="text-sm font-medium truncate" style={{ color: "hsl(240 3% 6%)" }}>Home</p>
          </div>
          {/* Hidden breadcrumb chevron (for measuring) */}
          <div className="flex gap-1.5 items-center shrink-0" style={{ position: "absolute", visibility: "hidden", pointerEvents: "none" }}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 shrink-0">
              <path d="M6.66675 10.6667L8.86201 8.4714C9.12235 8.21107 9.12235 7.78893 8.86201 7.5286L6.66675 5.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm font-medium text-gray-600 shrink-0">…</p>
          </div>
        </div>

        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center max-h-full w-fit gap-2">
          {/* Responsive wrapper: Feedback / Docs / Ask */}
          <div className="contents">
            <div className="hidden lg:contents">
              {/* Feedback */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center whitespace-nowrap font-semibold transition-colors duration-75 bg-white border hover:bg-gray-50 active:bg-gray-100 shadow-none h-8 px-2.5 text-[13px] rounded-[0.6rem]"
                style={{ borderColor: "var(--gray-alpha-200)", color: "hsl(var(--foreground))" }}
              >
                Feedback
              </button>
              {/* Docs */}
              <a
                href="https://elevenlabs.io/docs/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center whitespace-nowrap font-semibold transition-colors duration-75 bg-white border hover:bg-gray-50 active:bg-gray-100 shadow-none h-8 px-2.5 text-[13px] w-full rounded-[0.6rem]"
                style={{ borderColor: "var(--gray-alpha-200)", color: "hsl(var(--foreground))" }}
              >
                Docs
              </a>
              {/* Ask */}
              <button className="relative items-center justify-center whitespace-nowrap font-semibold transition-colors duration-75 bg-white border hover:bg-gray-50 active:bg-gray-100 shadow-none h-8 px-2.5 text-[13px] flex-shrink-0 hidden lg:inline-flex rounded-[0.6rem]" style={{ borderColor: "var(--gray-alpha-200)", color: "hsl(var(--foreground))" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="shrink-0 w-4 h-4 text-inherit opacity-100 -ml-[3px] mr-[5px]">
                  <path d="M13.4937 2.79004L13.0291 1.58215C12.9714 1.4322 12.8273 1.33325 12.6667 1.33325C12.506 1.33325 12.3619 1.4322 12.3043 1.58215L11.8397 2.79004C11.772 2.9661 11.6329 3.10523 11.4568 3.17295L10.2489 3.63753C10.0989 3.6952 10 3.83926 10 3.99992C10 4.16058 10.0989 4.30464 10.2489 4.36231L11.4568 4.82689C11.6329 4.89461 11.772 5.03374 11.8397 5.2098L12.3043 6.41769C12.3619 6.56764 12.506 6.66659 12.6667 6.66659C12.8273 6.66659 12.9714 6.56764 13.0291 6.41769L13.4937 5.2098C13.5613 5.03374 13.7005 4.89461 13.8765 4.82689L15.0845 4.36231C15.2344 4.30464 15.3333 4.16058 15.3333 3.99992C15.3333 3.83926 15.2344 3.6952 15.0845 3.63753L13.8765 3.17295C13.7005 3.10523 13.5613 2.9661 13.4937 2.79004Z" fill="currentColor" />
                  <path d="M8.00131 2.66675L4.00128 2.66675C2.89671 2.66675 2.00128 3.56219 2.00128 4.66675V10.0239C2.00128 11.1285 2.89671 12.0239 4.00128 12.0239H5.7677C5.92432 12.0239 6.07593 12.0791 6.19597 12.1797L7.99845 13.6906L9.82512 12.1772C9.94472 12.0781 10.0951 12.0239 10.2504 12.0239H12.0013C13.1058 12.0239 14.0013 11.1285 14.0013 10.0239V8.67868" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Ask
              </button>
            </div>
          </div>

          {/* Files */}
          <button
            aria-label="Files"
            className="relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-75 bg-white border hover:bg-gray-50 active:bg-gray-100 shadow-none p-0 h-8 w-8 shrink-0 rounded-[0.6rem]"
            style={{ borderColor: "var(--gray-alpha-200)", color: "hsl(var(--foreground))" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 w-4 h-4">
              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
              <path d="M2 10h20" />
            </svg>
          </button>

          {/* Notifications */}
          <button
            aria-label="Notifications"
            type="button"
            className="relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-75 bg-white border hover:bg-gray-50 active:bg-gray-100 shadow-none p-0 h-8 w-8 shrink-0 rounded-[0.6rem]"
            style={{ borderColor: "var(--gray-alpha-200)", color: "hsl(var(--foreground))" }}
          >
            <div className="shrink-0 w-5 h-5 relative">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="w-full h-full">
                <path d="M16.875 13.5367C16.875 13.9997 16.4997 14.375 16.0368 14.375H3.96327C3.50031 14.375 3.125 13.9997 3.125 13.5367C3.125 13.4031 3.15696 13.2713 3.21822 13.1526L4.1665 11.3134C4.32966 10.997 4.42335 10.6494 4.44131 10.2938L4.58626 7.42413C4.7305 4.54901 7.11155 2.29166 10 2.29166C12.8884 2.29166 15.2695 4.54901 15.4137 7.42413L15.5587 10.2938C15.5767 10.6494 15.6703 10.997 15.8335 11.3134L16.7817 13.1526C16.843 13.2713 16.875 13.4031 16.875 13.5367Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.3332 14.375C13.3332 16.2159 11.8408 17.7083 9.99984 17.7083C8.15889 17.7083 6.6665 16.2159 6.6665 14.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {/* Profile avatar with dual progress ring */}
          <Link
            href="/profile"
            data-testid="user-menu-button"
            aria-label="Your profile"
            className="group w-full relative items-center gap-0.5 h-10 w-10 justify-between flex rounded-lg text-sm leading-6 font-semibold transition-all duration-150"
          >
            <div className="shrink-0 relative transition-transform duration-150">
              <div className="relative">
                {/* Dual ring container */}
                <div className="flex relative" style={{ opacity: 1, width: 32, height: 32 }}>
                  {/* Left half: tiny arc */}
                  <div
                    className="absolute opacity-100 transition-opacity duration-300"
                    style={{ transform: "rotate(18deg)", width: 32, height: 32 }}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={1}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="42" strokeWidth="6px" fill="none" stroke="#e5e7eb" />
                      <circle cx="50" cy="50" r="42" strokeWidth="6px" fill="none" stroke="#6b7280" strokeLinecap="round" strokeDashoffset="66" strokeDasharray="2.64 261.36" />
                    </svg>
                  </div>
                  {/* Right half: large arc (flipped) */}
                  <div
                    className="absolute left-0 top-0 opacity-100 transition-opacity duration-300"
                    style={{ transform: "rotateY(180deg)", width: 32, height: 32 }}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={88}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="42" strokeWidth="6px" fill="none" stroke="#e5e7eb" />
                      <circle cx="50" cy="50" r="42" strokeWidth="6px" fill="none" stroke="#6b7280" strokeLinecap="round" strokeDashoffset="66" strokeDasharray="232.32 31.68" />
                    </svg>
                  </div>
                </div>
                {/* Avatar */}
                <div
                  className="absolute top-0 left-0 h-full w-full rounded-full p-px"
                  style={{ opacity: 1, transform: "scale(0.65)" }}
                >
                  <div className="w-full h-full rounded-full shrink-0 bg-gradient-to-br from-blue-400 to-purple-500 object-cover" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
