import { TZDateMini } from '@date-fns/tz';
import { dateFormat, timeFormat } from '../../utils/date';
import type { MockEvent } from '../../utils/mockData';

export interface CalendarEventSegment {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  hourStart: number;
  hourEnd: number;
}

function getSegmentForDate(event: MockEvent, targetDate: string, timezone: string) {
  const eventStart = new TZDateMini(event.startUtc, timezone);
  const eventEnd = new TZDateMini(event.endUtc, timezone);
  const eventStartDate = dateFormat(eventStart);
  const eventEndDate = dateFormat(eventEnd);

  const startsBeforeDay = eventStartDate < targetDate;
  const endsAfterDay = eventEndDate > targetDate;

  if (eventStartDate > targetDate || eventEndDate < targetDate) {
    return null;
  }

  const startHour = startsBeforeDay ? 0 : eventStart.getHours();
  const endHour = endsAfterDay ? 24 : eventEnd.getHours();
  const endMinute = endsAfterDay ? 0 : eventEnd.getMinutes();

  const eventSegment: CalendarEventSegment = {
    id: event.id,
    title: event.title,
    date: targetDate,
    startTime: startsBeforeDay ? '00:00' : timeFormat(eventStart),
    endTime: endsAfterDay ? '00:00' : timeFormat(eventEnd),
    hourStart: startHour,
    hourEnd: endMinute !== 0 ? endHour + 1 : endHour,
  };

  return eventSegment;
}

export function getDailyEventSegments(events: MockEvent[], selectedDate: string, timezone: string) {
  return events
    .map((event) => getSegmentForDate(event, selectedDate, timezone))
    .filter((e) => e !== null);
}

export function getWeeklyEventSegments(events: MockEvent[], weekDays: Date[], timezone: string) {
  const weeklyEvents = weekDays.flatMap((wd) =>
    getDailyEventSegments(events, dateFormat(wd), timezone)
  );
  return weeklyEvents.filter((e) => e !== null);
}
