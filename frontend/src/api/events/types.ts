export interface Event {
  id: string;
  title: string;
  startUtc: string;
  endUtc: string;
}

export type UpdateEventValues = Omit<Event, 'id'>;
