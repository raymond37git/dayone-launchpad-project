import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import OnboardingForm from "./OnboardingForm";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { edit } = await searchParams;
  const editMode = edit === "1";

  let initialTags: string[] = [];
  if (editMode) {
    const { data } = await supabase
      .from("user_tags")
      .select("tag")
      .eq("user_id", user.id);
    initialTags = data?.map((row: { tag: string }) => row.tag) ?? [];
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-[#FCF3E8] px-4 py-16">
      <OnboardingForm initialTags={initialTags} editMode={editMode} />
    </div>
  );
}
