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

  // Derived: which tags are currently active
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

      <div className="flex flex-col md:flex-row gap-6 items-start">

        {/* Right column — calendar + map */}
        <div className="w-full md:w-[280px] md:flex-shrink-0 md:order-last">
          <div className="md:sticky md:top-20 flex flex-col gap-4 pt-3">
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
          <FilterTags activeTags={activeTags} onTagSelect={handleTagSelect} />
          <PendingNotification savedCount={savedEventIds.length} />
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
