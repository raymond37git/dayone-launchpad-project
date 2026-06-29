import { redirect } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase-server";
import { TopNavBar } from "./components/TopNavBar";
import { HeroBanner } from "./components/HeroBanner";
import { CommunityHeader } from "./components/CommunityHeader";
import { EventsSection } from "./components/EventsSection";
import { CrawlingSnail } from "./components/CrawlingSnail";
import { PageRevealOverlay } from "./components/PageRevealOverlay";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: userTagRows } = await supabase
    .from("user_tags")
    .select("tag")
    .eq("user_id", user.id);

  const userTags = userTagRows?.map((r) => r.tag as string) ?? [];

  const { data: profile } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", user.id)
    .single();

  const avatarUrl = profile?.avatar_url ?? null;

  return (
    <div className="min-h-screen bg-[#FCF3E8]">
      <PageRevealOverlay />
      {/* ── TopNavBar ─────────────────────────────────── */}
      <TopNavBar avatarUrl={avatarUrl} />

      <main className="pt-14">

        {/* ── Banner (contained, rounded) + overlapping logo ── */}
        <div className="relative pt-5">
          <div className="max-w-5xl mx-auto">
            <HeroBanner />
          </div>

          {/* Logo sits at the bottom edge of the banner, half overlapping down */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
            <div className="max-w-5xl mx-auto px-5">
              <div className="w-[76px] h-[76px] rounded-2xl bg-white border-[3px] border-white shadow-lg flex items-center justify-center overflow-hidden translate-y-1/2 pointer-events-auto">
                <Image src="/Picture 1.png" alt="Day One" width={72} height={72} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Highlight caption below banner ─────────────── */}
        <div className="max-w-5xl mx-auto flex justify-end px-5 mt-1.5">
          <p className="text-[11px] text-[#BC9579]">
            <span className="font-semibold text-[#96401F]">✦ Highlight of the week</span>
            {" · "}SXSW Sydney Hackathon × Build Club: Supercharging Work with AI
          </p>
        </div>

        {/* ── CommunityHeader — pt accommodates overlapping logo ── */}
        <div className="border-b border-[#D5C0A9]/30">
          <div className="max-w-5xl mx-auto px-5 pt-12">
            <CommunityHeader />
          </div>
        </div>

        {/* ── Events content ────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-5">
          <EventsSection userTags={userTags} />
        </div>

        {/* ── Snail ─────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-5 pb-4">
          <CrawlingSnail />
        </div>
      </main>
    </div>
  );
}
