import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { TopNavBar } from "./components/TopNavBar";
import { HeroBanner } from "./components/HeroBanner";
import { CommunityHeader } from "./components/CommunityHeader";
import { EventsHeader } from "./components/EventsHeader";
import { FilterTags } from "./components/FilterTags";
import { PendingNotification } from "./components/PendingNotification";
import { EventList } from "./components/EventList";
import { StickyCalendar } from "./components/StickyCalendar";
import { MapWidget } from "./components/MapWidget";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── TopNavBar ─────────────────────────────────── */}
      <TopNavBar />

      <main className="pt-14">
        {/* ── HeroBanner ────────────────────────────────── */}
        <HeroBanner />

        {/* ── CommunityHeader ───────────────────────────── */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-5">
            <CommunityHeader />
          </div>
        </div>

        {/* ── Two-column content ────────────────────────── */}
        <div className="max-w-5xl mx-auto px-5">

          {/* Events header row (full width of content area) */}
          <EventsHeader />

          <div className="flex gap-6 items-start">

            {/* ── Left column: event list ───────────────── */}
            <div className="flex-1 min-w-0">
              {/* ── FilterTags ──────────────────────────── */}
              <FilterTags />

              {/* ── PendingNotification ─────────────────── */}
              <PendingNotification />

              {/* ── EventList (container repeater) ──────── */}
              <EventList />
            </div>

            {/* ── Right column: sticky sidebar ─────────── */}
            <div className="w-[280px] flex-shrink-0">
              <div className="sticky top-20 flex flex-col gap-4 pt-3">
                {/* ── StickyCalendar ────────────────────── */}
                <StickyCalendar />

                {/* ── MapWidget ─────────────────────────── */}
                <MapWidget />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
