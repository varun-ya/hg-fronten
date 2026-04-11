import { ReactNode } from "react";

interface VoiceCard {
  title: string;
  desc: string;
  href: string;
  svg: ReactNode;
}

const cards: VoiceCard[] = [
  {
    title: "Voice Design",
    desc: "Design an entirely new voice from a text prompt",
    href: "/voice-lab?action=create&creationType=voiceDesign",
    svg: (
      <svg width="78" height="48" viewBox="0 0 78 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="md:group-hover:scale-[1.15] origin-center transition-all duration-200 ease-in-out">
          <rect x="21" y="6" width="36" height="36" rx="10" fill="#EB524B" stroke="#F3F4F6" strokeWidth="3" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          <path d="M38.705 29.753c-.868.236-1.778.269-2.66.095a6.19 6.19 0 01-2.427-1.096 6.19 6.19 0 01-1.687-2.06 6.19 6.19 0 01-.596-2.594c.004-.9.216-1.786.619-2.59a6.19 6.19 0 011.704-2.043 6.19 6.19 0 012.436-1.07 6.19 6.19 0 012.66.118" stroke="white" strokeWidth="1.406" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38.551 21.3a.45.45 0 01.449-.45h2.925a.45.45 0 010 .9h-2.925a.45.45 0 01-.45-.45zM39 22.65a.45.45 0 000 .9h1.351a.45.45 0 000-.9H39zM45.548 21.3a1.8 1.8 0 00-1.273-.537 1.8 1.8 0 00-1.274.537l-3.793 3.793a.45.45 0 00-.132.318v1.739a.45.45 0 00.45.45h1.739a.45.45 0 00.318-.132l3.793-3.793a1.8 1.8 0 000-2.375z" fill="white" />
        </g>
      </svg>
    ),
  },
  {
    title: "Clone your Voice",
    desc: "Create a realistic digital clone of your voice",
    href: "/voice-lab?action=create",
    svg: (
      <svg width="78" height="48" viewBox="0 0 78 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="md:group-hover:scale-[1.15] md:group-hover:-translate-x-0.5 origin-center transition-all duration-200 ease-in-out">
          <rect x="8" y="13.282" width="32" height="32" rx="10" transform="rotate(-15 8 13.282)" fill="#2DD28D" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          <circle cx="24" cy="28" r="5" fill="white" fillOpacity="0.3" />
          <path d="M28.666 29.603a6.25 6.25 0 11-2.547-9.668" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="md:group-hover:scale-[1.15] md:group-hover:translate-x-0.5 origin-center transition-all duration-200 ease-in-out">
          <rect x="39.474" y="4" width="32" height="32" rx="10" transform="rotate(15 39.474 4)" fill="#2DD28D" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          <path d="M55.645 20.922c.154-.573-.528-.997-.974-.605l-4.37 3.84a.75.75 0 00.162 1.193l2.15.576-.58 2.164c-.153.572.53.997.975.605l4.369-3.84a.75.75 0 00-.163-1.193l-2.15-.576.58-2.164z" fill="white" />
        </g>
      </svg>
    ),
  },
  {
    title: "Voice Collections",
    desc: "Curated AI voices for every use case",
    href: "/voice-library/collections",
    svg: (
      <svg width="78" height="48" viewBox="0 0 78 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="md:group-hover:scale-[1.15] md:group-hover:-translate-x-0.5 origin-center transition-all duration-200 ease-in-out">
          <rect x="7" y="12.282" width="32" height="32" rx="10" transform="rotate(-15 7 12.282)" fill="#3B7DCA" fillOpacity="0.6" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
        </g>
        <g className="md:group-hover:scale-[1.15] md:group-hover:translate-x-0.5 origin-center transition-all duration-200 ease-in-out">
          <rect x="39.474" y="4.423" width="32" height="32" rx="10" transform="rotate(15 39.474 4.423)" fill="#5D79DF" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          {/* Grid dots pattern */}
          {[
            [48.9, 18.3], [47.3, 24.6], [55.2, 20], [53.5, 26.3],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.5" fill="white" fillOpacity="0.4" />
          ))}
        </g>
      </svg>
    ),
  },
];

export default function CreateOrClone() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold mb-1" style={{ color: "hsl(240 3% 6%)" }}>Create or clone a voice</p>
      {cards.map((card) => (
        <div key={card.title} className="h-full group">
          <div className="flex gap-4 h-full w-full -mx-1.5 p-1.5 relative items-center rounded-[16px] bg-white transition duration-200 min-h-[92px]">
            {/* Thumbnail */}
            <div className="relative overflow-hidden bg-black/[0.04] group-hover:bg-black/[0.06] transition-all duration-200 max-w-[122px] min-w-[122px] flex-1 rounded-[16px] shrink-0 block">
              <div className="relative w-full pb-[75%]" />
              <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center [&_svg]:max-w-[90%]">
                {card.svg}
              </div>
            </div>
            {/* Text */}
            <div className="text-left shrink">
              <p className="text-sm font-medium" style={{ color: "hsl(240 3% 6%)" }}>{card.title}</p>
              <p className="text-sm font-normal mt-0.5 text-gray-500">{card.desc}</p>
            </div>
            {/* Overlay link */}
            <a
              aria-label={card.title}
              className="absolute top-0 right-0 bottom-0 left-0 outline-none rounded-[24px] focus-visible:outline-none focus-visible:ring-[1.5px]"
              href={card.href}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
