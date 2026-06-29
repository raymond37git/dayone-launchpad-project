import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { ProfileForm } from "./ProfileForm";

export default async function OnboardingProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FCF3E8] px-4 py-16">
      <ProfileForm />
    </div>
  );
}
