"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { saveAvatarUrl } from "@/app/actions/profile";

export function PhotoUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError(null);
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Not authenticated."); setUploading(false); return; }

    // Delete any existing avatar files for this user before uploading
    const { data: existing } = await supabase.storage.from("avatars").list(user.id);
    if (existing && existing.length > 0) {
      const paths = existing.map((f) => `${user.id}/${f.name}`);
      await supabase.storage.from("avatars").remove(paths);
    }

    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file);

    if (uploadError) {
      setError(uploadError.message.toLowerCase().includes("already exists") ? "Try another file name" : uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);

    const result = await saveAvatarUrl(publicUrl);
    if (result.error) { setError(result.error); setUploading(false); return; }

    router.push("/onboarding-get-to-know-you");
  }

  function handleSkip() {
    router.push("/onboarding-get-to-know-you");
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">

      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[#96401F]">Add a profile photo</h1>
        <p className="text-[#896D5F]">Help others recognise you at events.</p>
      </div>

      {/* Avatar + confetti stack */}
      <div className="relative inline-flex">
        {/* Avatar circle */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-40 h-40 rounded-full border-2 border-dashed border-[#D5C0A9] bg-white flex flex-col items-center justify-center gap-2 overflow-hidden transition hover:border-[#96401F] active:scale-[.97]"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <>
              <span className="text-4xl">📷</span>
              <span className="text-xs text-[#BC9579]">Tap to choose</span>
            </>
          )}
        </button>

        {/* Confetti usagi — bottom right once photo is selected */}
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/confettiusagi.gif"
            alt=""
            aria-hidden
            className="absolute bottom-0 right-0 w-16 h-16 object-contain pointer-events-none translate-x-1/4 translate-y-1/4"
          />
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <div className="flex flex-col gap-3 w-full">
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || uploading}
          className="h-11 w-full rounded-lg bg-[#96401F] text-sm font-medium text-white transition hover:bg-[#A53B0A] active:scale-[.98] disabled:opacity-40"
        >
          {uploading ? "Uploading…" : "Save photo →"}
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className="h-9 w-full rounded-lg border border-[#D5C0A9] bg-white text-sm font-medium text-[#896D5F] transition hover:border-[#BC9579] hover:text-[#584B46] active:scale-[.98]"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
