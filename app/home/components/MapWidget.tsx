"use client";

import { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { EVENTS } from "../data/events";

const PINNED_EVENTS = EVENTS.filter((e) => e.lat !== undefined && e.lng !== undefined);

const CENTER = { lat: -33.8688, lng: 151.2073 };

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f5f7fa" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#dbeafe" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e5e7eb" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#f3f4f6" }] },
  { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ color: "#f9fafb" }] },
];

const MAP_OPTIONS: google.maps.MapOptions = {
  styles: MAP_STYLES,
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: true,
  gestureHandling: "cooperative",
  minZoom: 11,
  maxZoom: 17,
};

// Injected into every InfoWindow to strip the default close button and padding
const INFO_WINDOW_RESET = `
  .gm-ui-hover-effect { display: none !important; }
  .gm-style-iw-chr { display: none !important; }
  .gm-style-iw-c { padding: 0 !important; box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important; border-radius: 8px !important; }
  .gm-style-iw-d { padding: 0 !important; overflow: hidden !important; }
  .gm-style-iw-t::after { display: none !important; }
`;

export function MapWidget() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  const [, setMap] = useState<google.maps.Map | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const onLoad = useCallback((m: google.maps.Map) => setMap(m), []);
  const onUnmount = useCallback(() => setMap(null), []);

  function scrollToEvent(id: string) {
    const el = document.getElementById(`event-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (loadError) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-[220px] flex flex-col items-center justify-center gap-2 bg-gray-50 text-gray-400 text-xs px-4 text-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40">
            <circle cx="10" cy="10" r="8" />
            <line x1="10" y1="6" x2="10" y2="10" />
            <circle cx="10" cy="13.5" r="0.75" fill="currentColor" stroke="none" />
          </svg>
          Map unavailable — check API key
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-[220px] flex items-center justify-center bg-gray-50">
          <div className="w-5 h-5 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  const hoveredEvent = hoveredId ? PINNED_EVENTS.find((e) => e.id === hoveredId) : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "220px" }}
        center={CENTER}
        zoom={12}
        options={MAP_OPTIONS}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={() => setHoveredId(null)}
      >
        {PINNED_EVENTS.map((event) => (
          <Marker
            key={event.id}
            position={{ lat: event.lat!, lng: event.lng! }}
            onMouseOver={() => setHoveredId(event.id)}
            onMouseOut={() => setHoveredId(null)}
            onClick={() => {
              setHoveredId(null);
              scrollToEvent(event.id);
            }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              fillColor: "#1d4ed8",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 1.5,
            }}
          />
        ))}

        {/* Single hover InfoWindow — renders above whichever dot is hovered */}
        {hoveredEvent && (
          <InfoWindow
            position={{ lat: hoveredEvent.lat!, lng: hoveredEvent.lng! }}
            options={{
              pixelOffset: new google.maps.Size(0, -14),
              disableAutoPan: true,
            }}
          >
            <>
              <style>{INFO_WINDOW_RESET}</style>
              <div style={{ padding: "6px 10px", fontSize: 12, fontWeight: 600, color: "#BC9579", maxWidth: 150, lineHeight: 1.35 }}>
                {hoveredEvent.title}
              </div>
            </>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
