"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProfile } from "@/app/actions/profile";

const MBTI_TYPES = [
  { code: "INTJ", name: "The Architect" },
  { code: "INTP", name: "The Logician" },
  { code: "ENTJ", name: "The Commander" },
  { code: "ENTP", name: "The Debater" },
  { code: "INFJ", name: "The Advocate" },
  { code: "INFP", name: "The Mediator" },
  { code: "ENFJ", name: "The Protagonist" },
  { code: "ENFP", name: "The Campaigner" },
  { code: "ISTJ", name: "The Logistician" },
  { code: "ISFJ", name: "The Defender" },
  { code: "ESTJ", name: "The Executive" },
  { code: "ESFJ", name: "The Consul" },
  { code: "ISTP", name: "The Virtuoso" },
  { code: "ISFP", name: "The Adventurer" },
  { code: "ESTP", name: "The Entrepreneur" },
  { code: "ESFP", name: "The Entertainer" },
];

export function ProfileForm() {
  const [name, setName] = useState("");
  const [personalityType, setPersonalityType] = useState("");
  const [profession, setProfession] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const canSubmit = name.trim().length > 0;

  async function handleNext() {
    if (!canSubmit) return;
    setError(null);
    setPending(true);
    const result = await saveProfile({
      name: name.trim(),
      personality_type: personalityType,
      profession: profession.trim(),
      looking_for: lookingFor.trim(),
    });
    if (result.error) {
      setError(result.error);
      setPending(false);
      return;
    }
    router.push("/onboarding-photo");
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight text-[#96401F]">
          Tell us about yourself
        </h1>
        <p className="text-[#896D5F]">Fill in what you're comfortable sharing.</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#584B46]">Name <span className="text-[#96401F]">*</span></label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your first name"
            className="h-11 rounded-lg border border-[#D5C0A9] bg-white px-3 text-sm text-[#261D20] placeholder:text-[#BC9579] outline-none transition focus:border-[#96401F] focus:ring-1 focus:ring-[#96401F]/20"
          />
        </div>

        {/* Personality type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#584B46]">Personality type</label>
          <div className="relative">
            <select
              value={personalityType}
              onChange={(e) => setPersonalityType(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-[#D5C0A9] bg-white px-3 pr-9 text-sm text-[#261D20] outline-none transition focus:border-[#96401F] focus:ring-1 focus:ring-[#96401F]/20"
            >
              <option value="">Select your type…</option>
              {MBTI_TYPES.map((t) => (
                <option key={t.code} value={t.code}>
                  {t.code} — {t.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#BC9579]">
              ▾
            </span>
          </div>
        </div>

        {/* Profession */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#584B46]">Profession</label>
          <input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="e.g. Product Designer, Founder, Engineer…"
            className="h-11 rounded-lg border border-[#D5C0A9] bg-white px-3 text-sm text-[#261D20] placeholder:text-[#BC9579] outline-none transition focus:border-[#96401F] focus:ring-1 focus:ring-[#96401F]/20"
          />
        </div>

        {/* Looking for */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#584B46]">What are you looking for?</label>
          <textarea
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            placeholder="e.g. Co-founders, collaborators, mentors, friends in tech…"
            rows={3}
            className="rounded-lg border border-[#D5C0A9] bg-white px-3 py-2.5 text-sm text-[#261D20] placeholder:text-[#BC9579] outline-none transition resize-none focus:border-[#96401F] focus:ring-1 focus:ring-[#96401F]/20"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={handleNext}
        disabled={!canSubmit || pending}
        className="h-11 w-full rounded-lg bg-[#96401F] text-sm font-medium text-white transition hover:bg-[#A53B0A] active:scale-[.98] disabled:opacity-40"
      >
        {pending ? "Saving…" : "Next →"}
      </button>
    </div>
  );
}
