"use client";
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const navGroups = [
    {
      label: 'Main',
      items: [
        {
          name: 'Home',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path></svg>,
          href: '/'
        },
        {
          name: 'My Schedule',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-64-56a16,16,0,1,1-16-16A16,16,0,0,1,144,152Z"></path></svg>,
          href: '/schedule'
        },
        {
          name: 'Learning Roadmap',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M228.92,49.69a8,8,0,0,0-6.86-1.45L160.93,63.52,99.58,32.84a8,8,0,0,0-5.52-.6l-64,16A8,8,0,0,0,24,56V200a8,8,0,0,0,9.94,7.76l61.13-15.28,61.35,30.68A8.15,8.15,0,0,0,160,224a8,8,0,0,0,1.94-.24l64-16A8,8,0,0,0,232,200V56A8,8,0,0,0,228.92,49.69ZM104,52.94l48,24V203.06l-48-24ZM40,62.25l48-12v127.5l-48,12Zm176,131.5-48,12V78.25l48-12Z"></path></svg>,
          href: '/roadmap'
        },
      ],
    },
    {
      label: 'Learning',
      items: [
        {
          name: 'Session History',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"></path></svg>,
          href: '/session-history'
        },
        {
          name: 'Assignment',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path></svg>,
          href: '/assignment'
        },
        {
          name: 'Chat with Tutor',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg>,
          href: '/chat'
        },
      ],
    },
    {
      label: 'Community',
      items: [
        {
          name: 'Community',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"></path></svg>,
          href: '/community'
        },
      ],
    },
    {
      label: 'Account',
      items: [
        {
          name: 'Payments',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"></path></svg>,
          href: '/payments'
        },
        {
          name: 'Ratings & Feedback',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 256 256"><path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path></svg>,
          href: '/ratings'
        },
      ],
    },
  ];

  return (
    <aside
      className={`bg-[#F9FAFB] border-r border-[#E5E7EB] flex flex-col px-3 py-5 shrink-0 h-full overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out font-matter ${isOpen ? 'w-[260px]' : 'w-[72px]'
        }`}
    >

      {/* Logo Container */}
      <div className={`flex items-center justify-between mb-8 px-2 transition-all duration-300 ${isOpen ? '' : 'justify-center'
        }`}>
        {isOpen ? (
          <>
            <Image
              src="/images/homeguru.png"
              alt="HomeGuru Logo"
              width={90}
              height={28}
              className="object-contain"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9CA3AF] hover:text-[#111827] transition-colors p-1 rounded-lg hover:bg-[#F3F4F6]"
              aria-label="Close sidebar"
            >
              <PanelLeftClose size={18} strokeWidth={1.5} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="text-[#6B7280] hover:text-[#111827] transition-colors p-1 rounded-lg hover:bg-[#F3F4F6]"
            aria-label="Open sidebar"
          >
            <PanelLeftOpen size={18} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className={`w-full flex-1 transition-all duration-300`}>
        {navGroups.map((group, index) => (
          <div key={index} className="mb-6">
            {isOpen && (
              <h3 className="text-[#9CA3AF] text-[10.5px] font-medium tracking-widest uppercase mb-2 px-3">
                {group.label}
              </h3>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item, itemIdx) => {
                const isActive = pathname === item.href;
                return (
                  <li key={itemIdx}>
                    <Link
                      href={item.href || '#'}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] font-normal transition-all duration-150 ${isActive
                          ? 'bg-[#F0F0FF] text-[#4F46E5]'
                          : 'text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111827]'
                        } ${!isOpen ? 'justify-center' : ''
                        }`}
                      title={!isOpen ? item.name : ''}
                    >
                      <span className={`flex items-center justify-center shrink-0 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                        {item.icon}
                      </span>
                      {isOpen && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom User Section */}
      {isOpen && (
        <div className="mt-auto border-t border-[#E5E7EB] pt-4 px-2">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?img=33"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] text-[#111827] font-medium truncate">Varun</span>
              <span className="text-[11px] text-[#9CA3AF] truncate">Student</span>
            </div>
          </div>
        </div>
      )}

    </aside>
  );
}
