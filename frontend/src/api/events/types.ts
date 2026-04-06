export interface Event {
  id: string;
  title: string;
  startUtc: string;
  endUtc: string;
}

export type EditEventValues = Omit<Event, 'id'>;
