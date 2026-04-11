import Link from "next/link";
import { ReactNode } from "react";

interface Feature {
  label: string;
  href: string;
  svg: ReactNode;
}

const features: Feature[] = [
  {
    label: "Instant speech",
    href: "/tts",
    svg: (
      <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="md:group-hover:scale-110 md:group-hover:rotate-3 origin-center transition-all duration-200 ease-in-out">
          <rect x="26" y="27" width="58" height="42" rx="9" fill="url(#paint0_tts)" />
          <rect x="34" y="35" width="39" height="4" rx="2" fill="#C7D5F4" />
          <rect x="34" y="42" width="28" height="4" rx="2" fill="#C7D5F4" />
          <rect x="34" y="49" width="32" height="4" rx="2" fill="#C7D5F4" />
          <rect x="65" y="57" width="13" height="5" rx="2.5" fill="#5D79DF" />
          <path d="M26 50.661V35C26 30.5817 29.5817 27 34 27H76C80.4183 27 84 30.5817 84 35V64" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g className="md:group-hover:scale-125 md:group-hover:-rotate-12 origin-[30px_70px] transition-all duration-200 ease-in-out">
          <rect x="10" y="55" width="32" height="32" rx="16" fill="#5D79DF" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          <path d="M23.8668 76.3333V73.6L25.1335 73.7333C25.5023 73.7128 25.8512 73.5599 26.1163 73.3027C26.3813 73.0455 26.5446 72.7013 26.5762 72.3333V68.5333C26.5806 67.5729 26.2033 66.65 25.5273 65.9678C24.8513 65.2855 23.9319 64.8997 22.9715 64.8953C22.0111 64.8909 21.0882 65.2682 20.4059 65.9442C19.7237 66.6202 19.3379 67.5395 19.3335 68.5C19.3335 70.3666 19.7708 70.536 20.0002 71.5333C20.1552 72.1356 20.1618 72.7665 20.0195 73.372L19.3335 76.3333" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M31.2002 74.8666C32.1374 73.9293 32.6641 72.6582 32.6645 71.3327C32.6648 70.0072 32.1389 68.7358 31.2022 67.798" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M29.3331 73C29.5512 72.7819 29.7239 72.5228 29.8412 72.2376C29.9586 71.9523 30.0182 71.6466 30.0166 71.3382C30.0151 71.0298 29.9524 70.7247 29.8322 70.4407C29.712 70.1566 29.5367 69.8992 29.3164 69.6833" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <linearGradient id="paint0_tts" x1="55" y1="27" x2="55" y2="69" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    label: "Audiobook",
    href: "/audiobooks",
    svg: (
      <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="md:group-hover:scale-110 origin-center transition-all duration-200 ease-in-out">
          <rect x="24" y="19" width="58" height="42" rx="9" fill="url(#paint0_ab)" />
          <rect x="39" y="27" width="34" height="4" rx="2" fill="#FDCDCB" />
          <rect x="39" y="34" width="28" height="4" rx="2" fill="#FDCDCB" />
          <rect x="39" y="41" width="32" height="4" rx="2" fill="#FDCDCB" />
          <rect x="39" y="53" width="30" height="4" rx="2" fill="#E5E7EB" />
          <rect x="39" y="60" width="24" height="4" rx="2" fill="#E5E7EB" />
          <circle cx="33" cy="29" r="3" fill="#EB524B" />
          <path d="M24 38.661V27C24 22.5817 27.5817 19 32 19H74C78.4183 19 82 22.5817 82 27V38" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g className="md:group-hover:scale-125 md:group-hover:-rotate-12 origin-[20px_57px] transition-all duration-200 ease-in-out">
          <rect x="4" y="41" width="32" height="32" rx="16" fill="#EB524B" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          <path d="M14.667 57.852H16.444c.315 0 .616.125.838.347.223.222.347.524.347.838v1.778c0 .314-.124.616-.347.838a1.185 1.185 0 01-.838.347h-.592c-.315 0-.616-.125-.838-.347a1.185 1.185 0 01-.347-.838v-4.148a6.667 6.667 0 015.334-6.333 6.667 6.667 0 015.333 6.333v4.148c0 .314-.124.616-.347.838a1.185 1.185 0 01-.838.347h-.593c-.314 0-.616-.125-.838-.347a1.185 1.185 0 01-.347-.838v-1.778c0-.314.124-.616.347-.838.222-.222.524-.347.838-.347h1.778" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <linearGradient id="paint0_ab" x1="53" y1="19" x2="53" y2="61" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    label: "Image & Video",
    href: "/image-video",
    svg: (
      <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="md:group-hover:scale-110 origin-center transition-all duration-200 ease-in-out">
          <path d="M74 22H34C28.477 22 24 26.477 24 32V56C24 61.523 28.477 66 34 66H74C79.523 66 84 61.523 84 56V32C84 26.477 79.523 22 74 22Z" fill="url(#paint0_iv)" />
          <path d="M56 37H34C32.895 37 32 37.895 32 39C32 40.105 32.895 41 34 41H56C57.105 41 58 40.105 58 39C58 37.895 57.105 37 56 37Z" fill="#CAEADC" />
          <path d="M50 44H34C32.895 44 32 44.895 32 46C32 47.105 32.895 48 34 48H50C51.105 48 52 47.105 52 46C52 44.895 51.105 44 50 44Z" fill="#CAEADC" />
          <path d="M24 42V32C24 26.477 28.477 22 34 22H74C79.523 22 84 26.477 84 32V54" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="32" y="30" width="6" height="4" rx="1" fill="#CAEADC" />
          <rect x="40" y="30" width="6" height="4" rx="1" fill="#CAEADC" />
        </g>
        <g className="md:group-hover:scale-125 md:group-hover:rotate-12 origin-[60px_60px] transition-all duration-200 ease-in-out">
          <rect x="64" y="48" width="28" height="23" rx="9" fill="#5D79DF" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          <path d="M74.925 62.375v-5.75L81.25 59.5l-6.325 2.875z" fill="#fff" stroke="#fff" strokeWidth="1.25" strokeLinejoin="round" />
        </g>
        <g className="md:group-hover:scale-125 md:group-hover:-rotate-12 origin-[28px_66px] transition-all duration-200 ease-in-out">
          <circle cx="28" cy="66" r="17" fill="#2DD28D" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          <rect x="23.333" y="60" width="9.334" height="12" rx="1.333" stroke="#fff" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="26" cy="64" r="1.333" stroke="#fff" strokeWidth="1.333" />
          <path d="M34 68l-2.057-2.057a1.334 1.334 0 00-1.886 0L24 72" stroke="#fff" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <linearGradient id="paint0_iv" x1="54" y1="22" x2="54" y2="66" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    label: "ElevenAgents",
    href: "/agents",
    svg: (
      <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="md:group-hover:scale-110 origin-center transition-all duration-200 ease-in-out">
          <rect x="29" y="23" width="57" height="57" rx="28.5" fill="#F3E8FA" />
        </g>
        <g className="md:group-hover:scale-125 md:group-hover:-rotate-6 origin-center transition-all duration-200 ease-in-out">
          <rect x="18" y="62" width="43" height="16" rx="5" fill="#A94BD2" stroke="#F3F4F6" strokeWidth="2" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          {[24.5, 27.8, 31.1, 34.3, 37.6, 40.8, 44.1, 47.4, 50.6, 53.9].map((x, i) => (
            <line key={i} x1={x} y1={73 - [3.25, 3.15, 2.08, 2.77, 0.47, 0.54, 1.61, 1.67, 1.71, 2.31][i]} x2={x} y2={67 + [3.25, 3.15, 2.08, 2.77, 0.47, 0.54, 1.61, 1.67, 1.71, 2.31][i] - 0.69} stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          ))}
        </g>
        <g className="md:group-hover:scale-110 md:group-hover:rotate-12 origin-[74px_28px] transition-all duration-200 ease-in-out">
          <rect x="58" y="12" width="32" height="32" rx="16" fill="#A94BD2" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          <path d="M71.867 33.333V30.6l1.266.133c.37-.02.718-.173.983-.43.265-.258.429-.602.46-.97v-3.8a4.667 4.667 0 00-8-3.638 4.667 4.667 0 00-1.243 3.605c0 1.867.437 2.036.667 3.033.155.603.162 1.233.02 1.839l-.687 2.961" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M79.2 31.867a5.333 5.333 0 000-7.069" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M77.333 30a3.333 3.333 0 000-3.317" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    ),
  },
  {
    label: "Music",
    href: "/music",
    svg: (
      <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="md:group-hover:scale-110 origin-center transition-all duration-200 ease-in-out">
          <rect x="-6" y="41" width="77" height="27" rx="10" fill="url(#paint0_music)" stroke="#E5E7EB" strokeWidth="1.5" />
          {[10, 15.8, 21.4, 27, 32.6, 38.2, 43.8, 49.4, 55, 61].map((x, i) => (
            <line key={i} x1={x} y1={60 - [5.4, 5.4, 3.6, 4.7, 5.2, 0.8, 0.9, 2.8, 2.9, 6.7][i]} x2={x} y2={49 + [5.4, 5.4, 3.6, 4.7, 5.2, 0.8, 0.9, 2.8, 2.9, 6.7][i]} stroke="#F58633" strokeOpacity={[0.2, 0.4, 0.5, 0.6, 0.6, 1, 1, 1, 1, 1][i]} strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </g>
        <g className="md:group-hover:scale-110 md:group-hover:rotate-12 origin-[24px_30px] transition-all duration-200 ease-in-out">
          <rect x="8" y="14" width="30" height="32" rx="4" fill="#FE9641" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          <circle cx="23" cy="30" r="4" fill="#fff" fillOpacity="0.3" />
          <circle cx="23" cy="30" r="2" fill="#fff" />
        </g>
        <g className="md:group-hover:scale-110 md:group-hover:rotate-12 origin-center transition-all duration-200 ease-in-out">
          <circle cx="87" cy="74" r="14" fill="#F58633" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          <path d="M92.374 74.359c.544.544.296 1.474-.447 1.673l-7.717 2.073c-.743.2-1.424-.48-1.225-1.224l2.063-7.719c.199-.743 1.129-.992 1.673-.448l5.653 5.645z" fill="white" />
        </g>
        <defs>
          <linearGradient id="paint0_music" x1="72" y1="50" x2="5" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    label: "Dubbed video",
    href: "/dubbing",
    svg: (
      <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="md:group-hover:scale-110 origin-center transition-all duration-200 ease-in-out">
          <rect x="26" y="25" width="68" height="52" rx="8" fill="#E5E7EB" fillOpacity="0.5" />
        </g>
        <g className="md:group-hover:scale-110 md:group-hover:-rotate-3 origin-center transition-all duration-200 ease-in-out">
          <rect x="9" y="51" width="42" height="16" rx="5" fill="#2DD28D" stroke="#F3F4F6" strokeWidth="2" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          {[15.5, 18.7, 22, 25.2, 28.5, 31.8, 35, 38.3, 41.5, 44.8].map((x, i) => (
            <line key={i} x1={x} y1={62 - [3.2, 3.1, 2, 2.7, 0.4, 0.5, 1.5, 1.6, 1.6, 2.2][i]} x2={x} y2={56 + [3.2, 3.1, 2, 2.7, 0.4, 0.5, 1.5, 1.6, 1.6, 2.2][i]} stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          ))}
        </g>
        <g className="md:group-hover:scale-110 md:group-hover:translate-y-1 origin-center transition-all duration-200 ease-in-out">
          <rect x="33" y="73" width="30" height="16" rx="5" fill="#2DD28D" stroke="#F3F4F6" strokeWidth="2" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          {[40.25, 43.45, 46.65, 49.85, 53.05, 56.25].map((x, i) => (
            <line key={i} x1={x} y1={84 - [3.25, 2.15, 2.86, 0.5, 0.57, 1.67][i]} x2={x} y2={78 + [3.25, 2.15, 2.86, 0.5, 0.57, 1.67][i] - 0.25} stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          ))}
        </g>
        <g className="md:group-hover:scale-110 md:group-hover:rotate-6 origin-center transition-all duration-200 ease-in-out">
          <rect x="66" y="17" width="32" height="32" rx="16" fill="#2DD28D" stroke="#F3F4F6" strokeWidth="2.5" className="md:group-hover:stroke-[#E5E7EB] transition-all duration-200 ease-in-out" />
          <path d="M77.333 30.333l4-4" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M76.667 34.333l4-4 1.333-2" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M75.333 28.333h8" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M88.667 39.667L85.333 33 82 39.667" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M83.333 37h4" stroke="white" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    ),
  },
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-3 md:gap-3 md:grid-cols-6 mb-8 md:mb-12">
      {features.map((f) => (
        <Link
          key={f.label}
          href={f.href}
          aria-label={f.label}
          className="group flex flex-col items-center outline-none"
        >
          <div className="flex flex-col gap-2 w-full max-w-[180px]">
            <div className="relative overflow-hidden flex-1 rounded-[20px] flex items-center justify-center bg-black/[0.04] group-hover:bg-black/[0.06] transition-colors duration-200 w-full">
              <div className="relative w-full pb-[100%]" />
              <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center [&_svg]:max-w-[90%]">
                {f.svg}
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium text-xs sm:text-sm text-gray-900">{f.label}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
