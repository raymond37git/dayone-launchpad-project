import { EVENTS, type Event } from "../data/events";
import { EventCard } from "./EventCard";

const WEEK_DAYS_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDateLabel(iso: string): string {
  const d = new Date(iso);
  const isToday = d.toDateString() === new Date("2026-06-20").toDateString();
  const dayName = isToday ? "Today" : WEEK_DAYS_LONG[d.getDay()];
  return `${dayName}  ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function formatDayPart(iso: string): string {
  const d = new Date(iso);
  const isToday = d.toDateString() === new Date("2026-06-20").toDateString();
  return isToday ? "Today" : WEEK_DAYS_LONG[d.getDay()];
}

function formatDatePart(iso: string): string {
  const d = new Date(iso);
  return `${WEEK_DAYS_LONG[d.getDay()]}`;
}

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
  const isToday = d.toDateString() === new Date("2026-06-20").toDateString();
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

export function EventList() {
  const groups = groupByDate(EVENTS);

  return (
    <div className="flex flex-col pb-16">
      {groups.map((group) => (
        <div key={group.dateKey}>
          <DateDivider iso={group.iso} />
          <div className="flex flex-col gap-3">
            {group.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
