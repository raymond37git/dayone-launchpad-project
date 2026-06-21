"use client";

import { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

const LOCATIONS = [
  { name: "Sydney",    lat: -33.8688, lng: 151.2093, events: 7 },
  { name: "Melbourne", lat: -37.8136, lng: 144.9631, events: 3 },
  { name: "Brisbane",  lat: -27.4698, lng: 153.0251, events: 2 },
  { name: "Perth",     lat: -31.9505, lng: 115.8605, events: 1 },
  { name: "Auckland",  lat: -36.8485, lng: 174.7633, events: 1 },
];

const CENTER = { lat: -30, lng: 145 };

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f5f7fa" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#d1d5db" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#dbeafe" }] },
  { featureType: "road", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#f0fdf4" }] },
];

const MAP_OPTIONS: google.maps.MapOptions = {
  styles: MAP_STYLES,
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: true,
  gestureHandling: "cooperative",
  minZoom: 3,
  maxZoom: 10,
};

export function MapWidget() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selected, setSelected] = useState<typeof LOCATIONS[number] | null>(null);

  const onLoad = useCallback((m: google.maps.Map) => setMap(m), []);
  const onUnmount = useCallback(() => setMap(null), []);

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

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "220px" }}
        center={CENTER}
        zoom={4}
        options={MAP_OPTIONS}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={() => setSelected(null)}
      >
        {LOCATIONS.map((loc) => (
          <Marker
            key={loc.name}
            position={{ lat: loc.lat, lng: loc.lng }}
            onClick={() => setSelected(loc)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#1d4ed8",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
            options={{ pixelOffset: new google.maps.Size(0, -12) }}
          >
            <div className="text-xs font-semibold text-gray-900 px-0.5 py-0.5">
              <div>{selected.name}</div>
              <div className="text-blue-600 font-medium mt-0.5">{selected.events} event{selected.events !== 1 ? "s" : ""}</div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
