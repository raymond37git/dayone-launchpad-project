// Location dots are approximate positions for APAC cities within the widget bounds
const LOCATIONS = [
  { name: "Sydney",    x: "76%", y: "62%" },
  { name: "Melbourne", x: "63%", y: "72%" },
  { name: "Brisbane",  x: "78%", y: "49%" },
  { name: "Perth",     x: "30%", y: "59%" },
  { name: "Auckland",  x: "90%", y: "68%" },
];

export function MapWidget() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Map area */}
      <div className="relative h-[200px] bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100">

        {/* Stylised continent silhouette — purely decorative */}
        <svg
          viewBox="0 0 320 200"
          className="absolute inset-0 w-full h-full opacity-20"
          aria-hidden
        >
          {/* Australia shape (simplified) */}
          <path
            d="M160,60 L200,52 L230,58 L252,70 L258,90 L252,115
               L238,130 L228,148 L210,155 L195,150 L180,158 L168,152
               L155,155 L148,145 L140,132 L132,118 L130,98 L138,78 Z"
            fill="#94a3b8"
          />
          {/* Tasmania */}
          <path d="M188,162 L196,158 L202,165 L196,172 L188,168 Z" fill="#94a3b8" />
          {/* New Zealand (simplified) */}
          <path d="M272,110 L278,105 L284,112 L280,122 L274,118 Z" fill="#94a3b8" />
          <path d="M268,126 L274,120 L280,128 L276,140 L268,136 Z" fill="#94a3b8" />
        </svg>

        {/* Location dots */}
        {LOCATIONS.map((loc) => (
          <div
            key={loc.name}
            className="absolute"
            style={{ left: loc.x, top: loc.y, transform: "translate(-50%, -50%)" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#1d4ed8] border-2 border-white shadow-md" />
          </div>
        ))}

        {/* Watermark */}
        <div className="absolute bottom-2 left-3 flex items-center gap-1">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="opacity-30">
            <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 7 5 7s5-3.25 5-7c0-2.76-2.24-5-5-5zm0 6.5C4.17 6.5 3.5 5.83 3.5 5S4.17 3.5 5 3.5 6.5 4.17 6.5 5 5.83 6.5 5 6.5z" fill="currentColor"/>
          </svg>
          <span className="text-[9px] text-gray-400 font-medium">Maps</span>
        </div>
      </div>
    </div>
  );
}
