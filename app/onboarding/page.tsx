import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { GenderStep } from "./GenderStep";

export default async function OnboardingGenderPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center bg-[#FCF3E8] px-4 py-16">
      <GenderStep />
    </div>
  );
}
