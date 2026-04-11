"use client";

export default function StatsCards() {
  const stats = [
    {
      label: 'Classes attended',
      value: '16',
      badge: '↑ 4 this week',
      badgeColor: '#6B7280',
      badgeBg: '#F3F4F6',
      iconBg: 'transparent',
      iconColor: '#111827',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" viewBox="0 0 256 256">
          <path d="M240,192h-8V56a16,16,0,0,0-16-16H40A16,16,0,0,0,24,56V192H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM40,56H216V192H200V168a8,8,0,0,0-8-8H120a8,8,0,0,0-8,8v24H72V88H184v48a8,8,0,0,0-16,0V80a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8V192H40ZM184,192H128V176h56Z"/>
        </svg>
      ),
    },
    {
      label: 'Total learning time',
      value: '24h',
      badge: '↑ 3.5h this week',
      badgeColor: '#6B7280',
      badgeBg: '#F3F4F6',
      iconBg: 'transparent',
      iconColor: '#111827',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"/>
        </svg>
      ),
    },
    {
      label: 'Assignment done',
      value: '3',
      badge: '2 pending',
      badgeColor: '#6B7280',
      badgeBg: '#F3F4F6',
      iconBg: 'transparent',
      iconColor: '#111827',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" viewBox="0 0 256 256">
          <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-38.34-85.66a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L116,164.69l42.34-42.35A8,8,0,0,1,169.66,122.34Z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white w-full font-matter" 
      style={{ 
        minHeight: '98px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '18px 24px', 
        border: '1px solid #E5E7EB',
        borderRadius: '16px'
      }}>
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#F3F4F6] w-full gap-4 sm:gap-0">
        
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3.5 px-0 sm:px-6 py-2 sm:py-0">
            {/* Colored gradient icon chip */}
            <div 
              className="rounded-2xl flex items-center justify-center shrink-0"
              style={{ width: '46px', height: '46px', background: stat.iconBg, color: stat.iconColor }}
            >
              {stat.icon}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[#6B7280]" style={{ fontSize: '13px', lineHeight: '1' }}>{stat.label}</p>
              <div className="flex items-center gap-2">
                <span className="text-[#111827] font-medium" style={{ fontSize: '21px', lineHeight: '1' }}>{stat.value}</span>
                <span 
                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                  style={{ color: stat.badgeColor, backgroundColor: stat.badgeBg }}
                >
                  {stat.badge}
                </span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
