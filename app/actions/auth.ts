"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export type AuthState =
  | { error?: string; message?: string }
  | undefined;

export async function login(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  const { count } = await supabase
    .from("user_tags")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  redirect(count && count > 0 ? "/home" : "/onboarding-get-to-know-you");
}

export async function signup(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = (formData.get("fullName") as string) ?? "";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (error) return { error: error.message };

  if (!data.session) {
    return { message: "Check your email to confirm your account before signing in." };
  }

  redirect("/onboarding-get-to-know-you");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
