import Link from "next/link";

const voices = [
  { name: "Vedish – Bold & Energetic News Anchor", desc: "Vedish delivers a high-energy, expressive, and commanding tone built for news broadcasting at its finest...", hue: 114 },
  { name: "Guru - Deep, Calm and Breathy", desc: "Guru - Rich, Bass Hindi Voice - Guru is a pen name of a very experienced VO artist who has spent decades in the voice industry...", hue: 227 },
  { name: "Vedish – Breaking News Narrator", desc: "Vedish delivers a strong, authoritative, and composed Hindi news narration style built for credibility and impact...", hue: 120 },
  { name: "Anant – Raw & Relatable Tutor", desc: "Anant brings a raw, relatable, and youthful energy that makes even the toughest concepts feel approachable...", hue: 175 },
  { name: "Mitali – Live News Bulletin Voice", desc: "Mitali delivers news the way it should sound — clear, energetic, and completely authoritative...", hue: 134 },
];

const VerifiedBadge = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "min(1.25rem, 2rem)", height: "min(1.25rem, 2rem)" }}>
    <path fill="white" fillRule="evenodd" d="m13.02 2.944 1.664-.02a2.5 2.5 0 0 1 2.53 2.53l-.02 1.663 1.19 1.163a2.5 2.5 0 0 1 0 3.577l-1.19 1.163.02 1.664a2.5 2.5 0 0 1-2.53 2.53l-1.664-.02-1.163 1.19a2.5 2.5 0 0 1-3.577 0l-1.163-1.19-1.663.02a2.5 2.5 0 0 1-2.53-2.53l.02-1.664-1.19-1.163a2.5 2.5 0 0 1 0-3.577l1.19-1.163-.02-1.663a2.5 2.5 0 0 1 2.53-2.53l1.663.02 1.163-1.19a2.5 2.5 0 0 1 3.577 0l1.163 1.19Z" clipRule="evenodd" />
    <path fill="#DDBF22" fillRule="evenodd" d="M12.755 4.378a1 1 0 0 1-.727-.302l-1.313-1.343a1 1 0 0 0-1.43 0L7.972 4.076a1 1 0 0 1-.727.302l-1.878-.023a1 1 0 0 0-1.012 1.012l.023 1.878a1 1 0 0 1-.302.728L2.733 9.284a1 1 0 0 0 0 1.43l1.343 1.313a1 1 0 0 1 .302.727l-.023 1.878a1 1 0 0 0 1.012 1.012l1.878-.023a1 1 0 0 1 .728.302l1.312 1.343a1 1 0 0 0 1.43 0l1.313-1.343a1 1 0 0 1 .727-.302l1.878.023a1 1 0 0 0 1.012-1.012l-.023-1.878a1 1 0 0 1 .302-.727l1.343-1.313a1 1 0 0 0 0-1.43l-1.343-1.313a1 1 0 0 1-.302-.727l.023-1.878a1 1 0 0 0-1.012-1.012l-1.878.023Z" clipRule="evenodd" />
    <path fill="white" fillRule="evenodd" d="m13.53 8.53-1.06-1.06L9 10.94 7.53 9.47l-1.06 1.06L9 13.06l4.53-4.53Z" clipRule="evenodd" />
  </svg>
);

export default function LatestFromLibrary() {
  return (
    <div>
      <p className="text-lg font-semibold mb-3" style={{ color: "hsl(240 3% 6%)" }}>Latest from the library</p>
      <ul className="mb-2">
        {voices.map((v) => (
          <li key={v.name} className="flex items-center gap-3 transition-colors duration-75 relative hover:bg-black/[0.02] cursor-pointer group p-0 bg-transparent">
            <button className="text-left rounded absolute inset-0 focus:outline-none bg-transparent" />
            <div className="w-full flex items-center py-3 gap-2">
              {/* Avatar */}
              <div className="shrink-0 flex items-center justify-center rounded-[10px] bg-transparent w-8 h-8 self-start my-1">
                <div className="relative group shrink-0" style={{ height: "2rem", width: "2rem" }}>
                  <div className="block opacity-100 transition-opacity duration-100">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-white" style={{ width: "100%", height: "100%" }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-orange-400 to-pink-500 rounded-full" style={{ filter: `hue-rotate(${v.hue}deg) saturate(120%)`, transform: `rotate(${v.hue}deg)` }} />
                    </div>
                  </div>
                  {/* Play overlay */}
                  <div className="absolute inset-0 md:group-hover:opacity-100 opacity-0 transition-opacity duration-100">
                    <button className="inline-flex items-center justify-center bg-gray-900 text-white h-full w-full rounded-full">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="shrink-0 w-[18px] h-[18px]">
                        <path d="M8.38399 3.68914C7.05155 2.86616 5.33301 3.82463 5.33301 5.39074V14.6094C5.33301 16.1755 7.05155 17.134 8.38399 16.311L15.8467 11.7016C17.1121 10.9201 17.1121 9.07998 15.8467 8.29846L8.38399 3.68914Z" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                  {/* Verified badge */}
                  <span className="absolute top-0 right-0 translate-y-[-30%] translate-x-[30%]">
                    <VerifiedBadge />
                  </span>
                </div>
              </div>
              {/* Text */}
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center mb-0.5">
                  <p className="text-sm font-semibold line-clamp-1 max-w-sm" style={{ color: "hsl(240 3% 6%)" }}>{v.name}</p>
                </div>
                <p className="text-sm text-gray-500 font-normal line-clamp-1 max-w-xl">{v.desc}</p>
              </div>
              {/* View button on hover */}
              <div className="relative flex items-center w-fit hidden group-hover:flex gap-2">
                <Link href="/voices" className="relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-75 bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 hover:border-gray-300 text-gray-900 shadow-none h-8 px-2.5 rounded-lg text-xs">
                  View
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/voices" className="relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-75 bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 hover:border-gray-300 text-gray-900 shadow-none h-8 px-2.5 rounded-lg text-xs">
        Explore Library
      </Link>
    </div>
  );
}
