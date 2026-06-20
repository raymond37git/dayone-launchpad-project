"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export async function saveUserTags(tags: string[]): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: "Not authenticated." };

  if (tags.length === 0) return { error: "Please select at least one tag." };

  const rows = tags.map((tag) => ({ user_id: user.id, tag }));
  const { error } = await supabase.from("user_tags").upsert(rows, { onConflict: "user_id,tag" });

  if (error) return { error: error.message };

  redirect("/home");
}

export async function updateUserTags(tags: string[]): Promise<{ error?: string }> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: "Not authenticated." };

  if (tags.length === 0) return { error: "Please keep at least one interest." };

  const { error: deleteError } = await supabase
    .from("user_tags")
    .delete()
    .eq("user_id", user.id);

  if (deleteError) return { error: deleteError.message };

  const rows = tags.map((tag) => ({ user_id: user.id, tag }));
  const { error } = await supabase.from("user_tags").insert(rows);

  if (error) return { error: error.message };

  redirect("/home");
}
