import { EVENTS, type Event } from "../data/events";
import { EventCard } from "./EventCard";

const WEEK_DAYS_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TODAY_STRING = new Date().toDateString();

function getDateKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

type EventGroup = { dateKey: string; iso: string; events: Event[] };

function groupByDate(events: Event[]): EventGroup[] {
  const sorted = [...events].sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );
  return sorted.reduce<EventGroup[]>((acc, event) => {
    const key = getDateKey(event.dateTime);
    const existing = acc.find((g) => g.dateKey === key);
    if (existing) existing.events.push(event);
    else acc.push({ dateKey: key, iso: event.dateTime, events: [event] });
    return acc;
  }, []);
}

function DateDivider({ iso }: { iso: string }) {
  const d = new Date(iso);
  const isToday = d.toDateString() === TODAY_STRING;
  const dayLabel = isToday ? "Today" : WEEK_DAYS_LONG[d.getDay()];
  const dateLabel = `${MONTHS[d.getMonth()]} ${d.getDate()}`;

  return (
    <div className="flex items-center gap-3 py-3">
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isToday ? "bg-[#96401F]" : "bg-[#D5C0A9]"}`} />
      <span className="text-sm font-semibold text-[#261D20]">{dayLabel}</span>
      <span className="text-sm text-[#BC9579]">{dateLabel}</span>
    </div>
  );
}

interface Props {
  selectedDate: string | null;
  activeTags: string[];
  showSaved: boolean;
  savedEventIds: string[];
  onToggleSave: (id: string) => void;
}

export function EventList({ selectedDate, activeTags, showSaved, savedEventIds, onToggleSave }: Props) {
  const filtered = EVENTS.filter((e) => {
    if (selectedDate && !e.dateTime.startsWith(selectedDate)) return false;
    if (activeTags.length > 0 && !e.tags.some((t) => activeTags.includes(t.label))) return false;
    if (showSaved && !savedEventIds.includes(e.id)) return false;
    return true;
  });

  const groups = groupByDate(filtered);

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2">
        <p className="text-sm font-medium text-[#584B46]">
          {showSaved ? "No saved events yet" : "No events match your filters"}
        </p>
        <p className="text-xs text-[#BC9579]">
          {showSaved ? "Hit the bookmark on any event to save it" : "Try a different tag or date"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-16">
      {groups.map((group) => (
        <div key={group.dateKey}>
          <DateDivider iso={group.iso} />
          <div className="flex flex-col gap-3">
            {group.events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isSaved={savedEventIds.includes(event.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
