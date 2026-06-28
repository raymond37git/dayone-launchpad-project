"use client";

import { useState, useRef } from "react";
import { saveUserTags, updateUserTags } from "@/app/actions/tags";
import { INTEREST_TAG_LABELS } from "@/app/lib/tags";

const PREDEFINED_TAGS = INTEREST_TAG_LABELS;

interface Props {
  initialTags?: string[];
  editMode?: boolean;
}

export default function OnboardingForm({ initialTags = [], editMode = false }: Props) {
  const predefinedInitial = initialTags.filter((t) => PREDEFINED_TAGS.includes(t));
  const customInitial = initialTags.filter((t) => !PREDEFINED_TAGS.includes(t));

  const [selected, setSelected] = useState<Set<string>>(new Set(predefinedInitial));
  const [otherOpen, setOtherOpen] = useState(customInitial.length > 0);
  const [customTags, setCustomTags] = useState<string[]>(customInitial);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(tag: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(tag);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }

  function toggleTag(tag: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function addTag(tag: string) {
    setSelected((prev) => new Set(prev).add(tag));
  }

  function removePredefinedTag(tag: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(tag);
      return next;
    });
    showToast(tag);
  }

  function toggleOther() {
    setOtherOpen((prev) => {
      const next = !prev;
      if (next) setTimeout(() => inputRef.current?.focus(), 50);
      return next;
    });
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = inputValue.trim();
      if (value && !customTags.includes(value) && !PREDEFINED_TAGS.includes(value)) {
        setCustomTags((prev) => [...prev, value]);
      }
      setInputValue("");
    }
  }

  function removeCustomTag(tag: string) {
    setCustomTags((prev) => prev.filter((t) => t !== tag));
    if (editMode) showToast(tag);
  }

  async function handleSubmit() {
    const allTags = [...selected, ...customTags];
    if (allTags.length === 0) {
      setError("Please select at least one interest to continue.");
      return;
    }
    setError(null);
    setPending(true);
    const result = await (editMode ? updateUserTags(allTags) : saveUserTags(allTags));
    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
  }

  const otherActive = otherOpen || customTags.length > 0;

  return (
    <div className="flex flex-col gap-8 w-full max-w-lg">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-[#96401F]">
          {editMode ? "Your interests" : "What are you interested in?"}
        </h1>
        <p className="text-[#896D5F]">
          {editMode
            ? "Add or remove interests — we'll use these to personalise your experience."
            : "Select everything that applies — we'll use this to personalise your experience."}
        </p>
      </div>

      {/* Tag grid */}
      <div className="flex flex-wrap gap-3">
        {PREDEFINED_TAGS.map((tag) => {
          const isSelected = selected.has(tag);

          if (editMode && isSelected) {
            return (
              <span
                key={tag}
                className="flex items-center gap-2 rounded-full border border-[#96401F] bg-[#96401F] px-4 py-2 text-sm font-medium text-white"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removePredefinedTag(tag)}
                  aria-label={`Remove ${tag}`}
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-white/25 text-xs font-bold leading-none hover:bg-white/45 transition"
                >
                  −
                </button>
              </span>
            );
          }

          return (
            <button
              key={tag}
              type="button"
              onClick={() => (editMode ? addTag(tag) : toggleTag(tag))}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition active:scale-[.97] ${
                !editMode && isSelected
                  ? "border-[#96401F] bg-[#96401F] text-white"
                  : "border-[#D5C0A9] bg-[#FCF3E8] text-[#96401F] hover:border-[#96401F]"
              }`}
            >
              {tag}
            </button>
          );
        })}

        {/* Other toggle */}
        <button
          type="button"
          onClick={toggleOther}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition active:scale-[.97] ${
            otherActive
              ? "border-[#96401F] bg-[#96401F] text-white"
              : "border-[#D5C0A9] bg-[#FCF3E8] text-[#96401F] hover:border-[#96401F]"
          }`}
        >
          Other
        </button>
      </div>

      {/* Custom tag input */}
      {otherOpen && (
        <div className="flex flex-col gap-3 rounded-2xl border border-[#D5C0A9] bg-white p-5">
          <p className="text-sm text-[#584B46]">
            Type a tag and press{" "}
            <kbd className="rounded bg-[#FCF3E8] px-1.5 py-0.5 font-mono text-xs text-[#96401F]">
              Enter
            </kbd>{" "}
            to add it.
          </p>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="e.g. Web3, Climate, EdTech…"
            className="h-10 rounded-lg border border-[#D5C0A9] bg-[#FCF3E8] px-3 text-sm text-[#261D20] placeholder:text-[#BC9579] outline-none transition focus:border-[#96401F] focus:bg-white"
          />
          {customTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {customTags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 rounded-full border border-[#96401F] bg-[#96401F] px-3 py-1 text-sm font-medium text-white"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeCustomTag(tag)}
                    className="leading-none opacity-70 hover:opacity-100"
                    aria-label={`Remove ${tag}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={pending}
        className="h-11 w-full rounded-lg bg-[#96401F] text-sm font-medium text-white transition hover:bg-[#A53B0A] active:scale-[.98] disabled:opacity-50"
      >
        {pending ? "Saving…" : editMode ? "Save interests" : "Continue"}
      </button>

      {/* Removal toast */}
      {toast && (
        <div
          key={toast}
          className="toast-enter fixed bottom-6 left-1/2 z-50 rounded-lg bg-[#261D20] px-5 py-3 text-sm text-white shadow-xl"
        >
          <span className="font-semibold">"{toast}"</span> removed from your interests
        </div>
      )}
    </div>
  );
}
