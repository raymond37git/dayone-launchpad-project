"use client";

// Replace /banner.jpg with your MapleStory Classic World image saved to /public/banner.jpg
export function HeroBanner() {
  return (
    <div className="w-full h-[260px] sm:h-[320px] overflow-hidden relative bg-gradient-to-b from-sky-300 to-sky-500">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/banner.jpg"
        alt="Day One Community Banner"
        className="w-full h-full object-cover object-center"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    </div>
  );
}
