// 'UTC': 0,
// 'America/New_York': -4,
// 'America/Los_Angeles': -7,
// 'Europe/London': 1,
// 'Europe/Zagreb': 2,
// 'Asia/Tokyo': 9,
// 'Asia/Kolkata': 5.5,
// 'Australia/Sydney': 10,

import type { MockEvent } from '../types/date';

export const MOCK_EVENTS: MockEvent[] = [
  {
    id: '1',
    title: 'Client Call',
    startUtc: '2026-04-01T09:00:00Z',
    endUtc: '2026-04-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'Team Meeting',
    startUtc: '2026-04-03T10:00:00Z',
    endUtc: '2026-04-03T11:00:00Z',
  },
  {
    id: '3',
    title: 'Lunch Break',
    startUtc: '2026-04-03T12:00:00Z',
    endUtc: '2026-04-03T13:00:00Z',
  },
  {
    id: '4',
    title: 'Project Review',
    startUtc: '2026-04-04T14:00:00Z',
    endUtc: '2026-04-04T16:00:00Z',
  },
  {
    id: '5',
    title: 'Late Night Sync',
    startUtc: '2026-04-05T23:00:00Z',
    endUtc: '2026-04-06T00:00:00Z',
  },
  {
    id: '6',
    title: 'Early Morning APAC',
    startUtc: '2026-04-07T00:00:00Z',
    endUtc: '2026-04-07T01:00:00Z',
  },
  {
    id: '7',
    title: 'Night Long Meeting',
    startUtc: '2026-04-08T20:00:00Z',
    endUtc: '2026-04-09T02:00:00Z',
  },
  {
    id: '8',
    title: 'Workshop',
    startUtc: '2026-04-10T13:00:00Z',
    endUtc: '2026-04-10T17:00:00Z',
  },
];
