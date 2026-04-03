export interface MockEvent {
  id: string;
  title: string;
  startUtc: string;
  endUtc: string;
}

export const MOCK_EVENTS: MockEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    startUtc: '2026-04-03T10:00:00Z',
    endUtc: '2026-04-03T11:00:00Z',
  },
  {
    id: '2',
    title: 'Lunch Break',
    startUtc: '2026-04-03T12:00:00Z',
    endUtc: '2026-04-03T13:00:00Z',
  },
  {
    id: '3',
    title: 'Project Review',
    startUtc: '2026-04-04T14:00:00Z',
    endUtc: '2026-04-04T15:30:00Z',
  },
  {
    id: '4',
    title: 'Client Call',
    startUtc: '2026-04-01T09:00:00Z',
    endUtc: '2026-04-01T10:00:00Z',
  },
  {
    id: '5',
    title: 'Workshop',
    startUtc: '2026-04-10T13:00:00Z',
    endUtc: '2026-04-10T17:00:00Z',
  },
];
