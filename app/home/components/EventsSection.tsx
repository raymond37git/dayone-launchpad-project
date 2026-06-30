"use client";

import { useState, useEffect } from "react";
import { EventsHeader } from "./EventsHeader";
import { FilterTags } from "./FilterTags";
import { PendingNotification } from "./PendingNotification";
import { EventList } from "./EventList";
import { StickyCalendar } from "./StickyCalendar";
import { MapWidget } from "./MapWidget";

interface Props {
  userTags: string[];
}

export function EventsSection({ userTags }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [forMe, setForMe] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);

  // Load saved events from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dayone_saved_events");
      if (stored) setSavedEventIds(JSON.parse(stored));
    } catch {}
  }, []);

  // Persist saved events whenever they change
  useEffect(() => {
    localStorage.setItem("dayone_saved_events", JSON.stringify(savedEventIds));
  }, [savedEventIds]);

  function handleToggleSave(id: string) {
    setSavedEventIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const activeTags: string[] = forMe ? userTags : selectedTag ? [selectedTag] : [];

  function handleForMeToggle() {
    setForMe((prev) => !prev);
    setSelectedTag(null);
    setShowSaved(false);
  }

  function handleShowSavedToggle() {
    setShowSaved((prev) => !prev);
    setForMe(false);
    setSelectedTag(null);
  }

  function handleTagSelect(tag: string) {
    setForMe(false);
    setShowSaved(false);
    setSelectedTag((prev) => (prev === tag ? null : tag));
  }

  return (
    <div>
      <EventsHeader
        forMe={forMe}
        onForMeToggle={handleForMeToggle}
        hasUserTags={userTags.length > 0}
        showSaved={showSaved}
        onShowSavedToggle={handleShowSavedToggle}
        savedCount={savedEventIds.length}
      />

      {/* FilterTags and notification sit above the two-column layout so the
          sidebar's natural top aligns with the first event row — this lets
          position:sticky engage at exactly the right scroll position. */}
      <FilterTags activeTags={activeTags} onTagSelect={handleTagSelect} />
      <PendingNotification savedCount={savedEventIds.length} />

      {/* Two-column layout — no items-start so the right column stretches to
          the full height of the event list, which is required for sticky. */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* Right column — calendar + map, always sticky once user scrolls to events */}
        <div className="w-full md:w-[280px] md:flex-shrink-0 md:order-last">
          {/* Spacer matches DateDivider height (py-3 + text-sm = 44px) so the
              calendar's natural top aligns with the first event card row */}
          <div className="hidden md:block h-11" />
          <div className="md:sticky md:top-20 flex flex-col gap-4">
            <StickyCalendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onReset={() => setSelectedDate(null)}
            />
            <MapWidget />
          </div>
        </div>

        {/* Left column — event list */}
        <div className="flex-1 min-w-0 w-full md:order-first">
          <EventList
            selectedDate={selectedDate}
            activeTags={activeTags}
            showSaved={showSaved}
            savedEventIds={savedEventIds}
            onToggleSave={handleToggleSave}
          />
        </div>

      </div>
    </div>
  );
}
