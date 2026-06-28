"use client";

import type { Event } from "../data/events";

function StatusBadge({ event }: { event: Event }) {
  if (event.status === "Sold Out")
    return <span className="text-xs bg-red-50 text-red-600 border border-red-100 px-2.5 py-0.5 rounded-full font-medium">Sold Out</span>;
  if (event.status === "Waitlist")
    return <span className="text-xs bg-[#F7E2CE] text-[#96401F] border border-[#D5C0A9] px-2.5 py-0.5 rounded-full font-medium">Waitlist +{event.attendeeCount}</span>;
  if (event.price)
    return <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full font-medium">{event.price}</span>;
  if (event.attendeeCount)
    return <span className="text-xs bg-[#FCF3E8] text-[#896D5F] px-2.5 py-0.5 rounded-full font-medium">+{event.attendeeCount}</span>;
  return null;
}

interface Props {
  event: Event;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export function EventCard({ event, isSaved, onToggleSave }: Props) {
  return (
    <div id={`event-${event.id}`} className="w-full text-left bg-white rounded-2xl border border-[#D5C0A9]/40 shadow-sm p-4 hover:shadow-md transition-all">

      {/* Title row — full width with save button */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-base font-bold text-[#261D20] leading-snug line-clamp-2 flex-1">
          {event.title}
        </h3>
        <button
          type="button"
          onClick={() => onToggleSave(event.id)}
          aria-label={isSaved ? "Unsave event" : "Save event"}
          className={[
            "flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-all active:scale-90",
            isSaved ? "text-[#96401F]" : "text-[#D5C0A9] hover:text-[#96401F]",
          ].join(" ")}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 16 16"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 2h10a1 1 0 0 1 1 1v11l-6-3-6 3V3a1 1 0 0 1 1-1z" />
          </svg>
        </button>
      </div>

      {/* Bottom section — details left, image right */}
      <div className="flex gap-4 items-start">

        <div className="flex-1 min-w-0 flex flex-col gap-1.5">

          {/* Organizers */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {event.organizers.slice(0, 3).map((org) => (
                <div
                  key={org.name}
                  title={org.name}
                  className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: org.color }}
                >
                  {org.initials[0]}
                </div>
              ))}
            </div>
            <span className="text-xs text-[#896D5F] truncate">
              By {event.organizers.slice(0, 2).map((o) => o.name).join(", ")}
              {event.organizers.length > 2 ? ` & ${event.organizers.length - 2} more` : ""}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#896D5F]">
            {event.isVirtual ? (
              <svg className="w-3 h-3 flex-shrink-0 text-[#BC9579]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="14" height="10" rx="1.5" />
                <polyline points="1,6 8,10 15,6" />
              </svg>
            ) : (
              <svg className="w-3 h-3 flex-shrink-0 text-[#BC9579]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5c0 3.5-4.5 8.5-4.5 8.5S3.5 9.5 3.5 6A4.5 4.5 0 0 1 8 1.5z" />
                <circle cx="8" cy="6" r="1.5" />
              </svg>
            )}
            <span className="truncate">{event.location}</span>
          </div>

          {/* Colored tags */}
          {event.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mt-0.5">
              {event.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: tag.bg, color: tag.text }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}

          {/* Status badge */}
          {(event.status || event.price || event.attendeeCount) && (
            <div className="flex items-center gap-2 mt-0.5">
              <StatusBadge event={event} />
              {event.attendeeCount && !event.status && !event.price && (
                <div className="flex -space-x-1">
                  {event.organizers.slice(0, 3).map((org) => (
                    <div
                      key={org.name}
                      className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[7px] font-bold text-white"
                      style={{ backgroundColor: org.color }}
                    >
                      {org.initials[0]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Event image — starts inline with organizer row */}
        <div className="w-[88px] h-[88px] flex-shrink-0 rounded-xl overflow-hidden shadow-sm bg-[#F7E2CE]">
          {event.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${event.gradient}`} />
          )}
        </div>

      </div>
    </div>
  );
}
