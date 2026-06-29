"use server";

import { createClient } from "@/lib/supabase-server";

export async function saveProfile(data: {
  name: string;
  personality_type: string;
  profession: string;
  looking_for: string;
}): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, ...data }, { onConflict: "id" });

  if (error) return { error: error.message };
  return { success: true };
}

export async function saveAvatarUrl(avatarUrl: string): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: "Not authenticated." };

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, avatar_url: avatarUrl }, { onConflict: "id" });

  if (error) return { error: error.message };
  return { success: true };
}
