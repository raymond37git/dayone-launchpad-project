import { redirect } from "next/navigation";
import Image from "next/image";
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
    <div className="min-h-screen bg-[#FCF3E8]">
      {/* ── TopNavBar ─────────────────────────────────── */}
      <TopNavBar />

      <main className="pt-14">

        {/* ── Banner (contained, rounded) + overlapping logo ── */}
        <div className="relative pt-5">
          <div className="max-w-5xl mx-auto">
            <HeroBanner />
          </div>

          {/* Logo sits at the bottom edge of the banner, half overlapping down */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
            <div className="max-w-5xl mx-auto px-5">
              <div className="w-[76px] h-[76px] rounded-2xl bg-[#FCF3E8] border-[3px] border-white shadow-lg flex items-center justify-center overflow-hidden translate-y-1/2 pointer-events-auto">
                <Image src="/cozy_leaf_logo.png" alt="Day One" width={54} height={54} />
              </div>
            </div>
          </div>
        </div>

        {/* ── CommunityHeader — pt accommodates overlapping logo ── */}
        <div className="bg-white border-b border-[#D5C0A9]/30">
          <div className="max-w-5xl mx-auto px-5 pt-12">
            <CommunityHeader />
          </div>
        </div>

        {/* ── Two-column content ────────────────────────── */}
        <div className="max-w-5xl mx-auto px-5">

          <EventsHeader />

          <div className="flex gap-6 items-start">

            {/* ── Left column: event list ───────────────── */}
            <div className="flex-1 min-w-0">
              <FilterTags />
              <PendingNotification />
              <EventList />
            </div>

            {/* ── Right column: sticky sidebar ─────────── */}
            <div className="w-[280px] flex-shrink-0">
              <div className="sticky top-20 flex flex-col gap-4 pt-3">
                <StickyCalendar />
                <MapWidget />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
