import { TZDateMini } from '@date-fns/tz';
import type { MockEvent } from '../../types/date';
import { dateFormat, timeFormat } from '../../utils/date';

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

  const isOutOfBoundsEvent = eventStartDate > targetDate || eventEndDate < targetDate;
  if (isOutOfBoundsEvent) {
    return null;
  }

  const startsBeforeDay = eventStartDate < targetDate;
  const endsAfterDay = eventEndDate > targetDate;

  const startHour = startsBeforeDay ? 0 : eventStart.getHours();
  const endHour = endsAfterDay ? 24 : eventEnd.getHours();
  const endMinute = endsAfterDay ? 0 : eventEnd.getMinutes();

  const isMidnightEndingEvent = eventEndDate === targetDate && endHour === 0 && endMinute === 0;
  if (isMidnightEndingEvent) {
    return null;
  }

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
