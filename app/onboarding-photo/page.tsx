import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { PhotoUpload } from "./PhotoUpload";

export default async function OnboardingPhotoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FCF3E8] px-4 py-16">
      <PhotoUpload />
    </div>
  );
}
