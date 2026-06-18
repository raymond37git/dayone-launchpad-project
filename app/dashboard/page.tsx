import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { logout } from "@/app/actions/auth";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="flex flex-col gap-6 rounded-2xl border border-black/[.08] bg-white p-8 shadow-sm dark:border-white/[.1] dark:bg-zinc-900 w-full max-w-sm">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</p>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="h-10 w-full rounded-lg border border-black/[.12] bg-zinc-50 text-sm font-medium text-black transition hover:bg-zinc-100 active:scale-[.98] dark:border-white/[.12] dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
