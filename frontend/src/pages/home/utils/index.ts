import { TZDateMini } from '@date-fns/tz';
import type { Event } from '../../../api/events/types';
import { dateFormat, timeFormat } from '../../../utils/date';

export interface CalendarEventSegment extends Event {
  segmentDate: string;
  segmentStartTimeFormatted: string;
  segmentEndTimeFormatted: string;
  segmentMinuteStart: number;
  segmentMinuteEnd: number;
}

function getSegmentForDate(event: Event, targetDate: string, timezone: string) {
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
  const startMinute = startsBeforeDay ? 0 : eventStart.getMinutes();
  const endHour = endsAfterDay ? 24 : eventEnd.getHours();
  const endMinute = endsAfterDay ? 0 : eventEnd.getMinutes();

  // prevent events ending on midnight to be carried over to the next day
  // eg. endUtc: 2026-05-04T00:00:00 would otherwise be rendered on the 4ht of May
  const isMidnightEndingEvent = eventEndDate === targetDate && endHour === 0 && endMinute === 0;
  if (isMidnightEndingEvent) {
    return null;
  }

  const eventSegment: CalendarEventSegment = {
    ...event,
    segmentDate: targetDate,
    segmentStartTimeFormatted: startsBeforeDay ? '00:00' : timeFormat(eventStart),
    segmentEndTimeFormatted: endsAfterDay ? '00:00' : timeFormat(eventEnd),
    segmentMinuteStart: startHour * 60 + startMinute,
    segmentMinuteEnd: endHour * 60 + endMinute,
  };

  return eventSegment;
}

export function getDailyEventSegments(events: Event[], selectedDate: string, timezone: string) {
  return events
    .map((event) => getSegmentForDate(event, selectedDate, timezone))
    .filter((e) => e !== null);
}

export function getWeeklyEventSegments(events: Event[], weekDays: Date[], timezone: string) {
  const weeklyEvents = weekDays.flatMap((wd) =>
    getDailyEventSegments(events, dateFormat(wd), timezone)
  );
  return weeklyEvents.filter((e) => e !== null);
}
