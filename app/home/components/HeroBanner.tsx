"use client";

export function HeroBanner() {
  return (
    <div className="w-full h-[200px] sm:h-[240px] rounded-2xl overflow-hidden relative bg-gradient-to-b from-[#FCF3E8] to-[#F7E2CE]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/banner.png"
        alt="Day One Community Banner"
        className="w-full h-full object-cover object-center"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    </div>
  );
}
