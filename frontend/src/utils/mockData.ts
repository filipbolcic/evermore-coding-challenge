export interface MockEvent {
  id: string;
  title: string;
  startUtc: string;
  endUtc: string;
}

// 'UTC': 0,
// 'America/New_York': -4,
// 'America/Los_Angeles': -7,
// 'Europe/London': 1,
// 'Europe/Zagreb': 2,
// 'Asia/Tokyo': 9,
// 'Asia/Kolkata': 5.5,
// 'Australia/Sydney': 10,

export const MOCK_EVENTS: MockEvent[] = [
  {
    id: '1',
    title: 'Client Call',
    startUtc: '2026-04-01T09:00:00Z',
    endUtc: '2026-04-01T10:00:00Z',
    // UTC: 2026-04-01T09:00:00Z - 2026-04-01T10:00:00Z
    // America/New_York: 2026-04-01T05:00:00 - 2026-04-01T06:00:00
    // America/Los_Angeles: 2026-04-01T02:00:00 - 2026-04-01T03:00:00
    // Europe/London: 2026-04-01T10:00:00 - 2026-04-01T11:00:00
    // Europe/Zagreb: 2026-04-01T11:00:00 - 2026-04-01T12:00:00
    // Asia/Tokyo: 2026-04-01T18:00:00 - 2026-04-01T19:00:00
    // Asia/Kolkata: 2026-04-01T14:30:00 - 2026-04-01T15:30:00
    // Australia/Sydney: 2026-04-01T19:00:00 - 2026-04-01T20:00:00
  },
  {
    id: '2',
    title: 'Team Meeting',
    startUtc: '2026-04-03T10:00:00Z',
    endUtc: '2026-04-03T11:00:00Z',
    // UTC: 2026-04-03T10:00:00Z - 2026-04-03T11:00:00Z
    // America/New_York: 2026-04-03T06:00:00 - 2026-04-03T07:00:00
    // America/Los_Angeles: 2026-04-03T03:00:00 - 2026-04-03T04:00:00
    // Europe/London: 2026-04-03T11:00:00 - 2026-04-03T12:00:00
    // Europe/Zagreb: 2026-04-03T12:00:00 - 2026-04-03T13:00:00
    // Asia/Tokyo: 2026-04-03T19:00:00 - 2026-04-03T20:00:00
    // Asia/Kolkata: 2026-04-03T15:30:00 - 2026-04-03T16:30:00
    // Australia/Sydney: 2026-04-03T20:00:00 - 2026-04-03T21:00:00
  },
  {
    id: '3',
    title: 'Lunch Break',
    startUtc: '2026-04-03T12:00:00Z',
    endUtc: '2026-04-03T13:00:00Z',
    // UTC: 2026-04-03T12:00:00Z - 2026-04-03T13:00:00Z
    // America/New_York: 2026-04-03T08:00:00 - 2026-04-03T09:00:00
    // America/Los_Angeles: 2026-04-03T05:00:00 - 2026-04-03T06:00:00
    // Europe/London: 2026-04-03T13:00:00 - 2026-04-03T14:00:00
    // Europe/Zagreb: 2026-04-03T14:00:00 - 2026-04-03T15:00:00
    // Asia/Tokyo: 2026-04-03T21:00:00 - 2026-04-03T22:00:00
    // Asia/Kolkata: 2026-04-03T17:30:00 - 2026-04-03T18:30:00
    // Australia/Sydney: 2026-04-03T22:00:00 - 2026-04-03T23:00:00
  },
  {
    id: '4',
    title: 'Project Review',
    startUtc: '2026-04-04T14:00:00Z',
    endUtc: '2026-04-04T15:30:00Z',
    // UTC: 2026-04-04T14:00:00Z - 2026-04-04T15:30:00Z
    // America/New_York: 2026-04-04T10:00:00 - 2026-04-04T11:30:00
    // America/Los_Angeles: 2026-04-04T07:00:00 - 2026-04-04T08:30:00
    // Europe/London: 2026-04-04T15:00:00 - 2026-04-04T16:30:00
    // Europe/Zagreb: 2026-04-04T16:00:00 - 2026-04-04T17:30:00
    // Asia/Tokyo: 2026-04-04T23:00:00 - 2026-04-05T00:30:00
    // Asia/Kolkata: 2026-04-04T19:30:00 - 2026-04-04T21:00:00
    // Australia/Sydney: 2026-04-05T00:00:00 - 2026-04-05T01:30:00
  },
  {
    id: '5',
    title: 'Late Night Sync',
    startUtc: '2026-04-05T23:30:00Z',
    endUtc: '2026-04-06T00:30:00Z',
    // UTC: 2026-04-05T23:30:00Z - 2026-04-06T00:30:00Z (spans two days)
    // America/New_York: 2026-04-05T19:30:00 - 2026-04-05T20:30:00
    // America/Los_Angeles: 2026-04-05T16:30:00 - 2026-04-05T17:30:00
    // Europe/London: 2026-04-06T00:30:00 - 2026-04-06T01:30:00 (next day)
    // Europe/Zagreb: 2026-04-06T01:30:00 - 2026-04-06T02:30:00 (next day)
    // Asia/Tokyo: 2026-04-06T08:30:00 - 2026-04-06T09:30:00 (next day)
    // Asia/Kolkata: 2026-04-06T05:00:00 - 2026-04-06T06:00:00 (next day)
    // Australia/Sydney: 2026-04-06T09:30:00 - 2026-04-06T10:30:00 (next day)
  },
  {
    id: '6',
    title: 'Early Morning APAC',
    startUtc: '2026-04-07T00:15:00Z',
    endUtc: '2026-04-07T01:15:00Z',
    // UTC: 2026-04-07T00:15:00Z - 2026-04-07T01:15:00Z
    // America/New_York: 2026-04-06T20:15:00 - 2026-04-06T21:15:00 (previous day)
    // America/Los_Angeles: 2026-04-06T17:15:00 - 2026-04-06T18:15:00 (previous day)
    // Europe/London: 2026-04-07T01:15:00 - 2026-04-07T02:15:00
    // Europe/Zagreb: 2026-04-07T02:15:00 - 2026-04-07T03:15:00
    // Asia/Tokyo: 2026-04-07T09:15:00 - 2026-04-07T10:15:00
    // Asia/Kolkata: 2026-04-07T05:45:00 - 2026-04-07T06:45:00
    // Australia/Sydney: 2026-04-07T10:15:00 - 2026-04-07T11:15:00
  },
  {
    id: '7',
    title: 'Workshop',
    startUtc: '2026-04-10T13:00:00Z',
    endUtc: '2026-04-10T17:00:00Z',
    // UTC: 2026-04-10T13:00:00Z - 2026-04-10T17:00:00Z
    // America/New_York: 2026-04-10T09:00:00 - 2026-04-10T13:00:00
    // America/Los_Angeles: 2026-04-10T06:00:00 - 2026-04-10T10:00:00
    // Europe/London: 2026-04-10T14:00:00 - 2026-04-10T18:00:00
    // Europe/Zagreb: 2026-04-10T15:00:00 - 2026-04-10T19:00:00
    // Asia/Tokyo: 2026-04-10T22:00:00 - 2026-04-11T02:00:00
    // Asia/Kolkata: 2026-04-10T18:30:00 - 2026-04-10T22:30:00
    // Australia/Sydney: 2026-04-10T23:00:00 - 2026-04-11T03:00:00
  },
];
