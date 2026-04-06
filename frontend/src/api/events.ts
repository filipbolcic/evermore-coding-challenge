import { apiFetch } from './client';

export interface EventDto {
  id: string;
  title: string;
  startUtc: string;
  endUtc: string;
}

export interface CreateEventInput {
  title: string;
  startUtc: string;
  endUtc: string;
}

export function getEvents() {
  return apiFetch<EventDto[]>('/events');
}

export function createEvent(input: CreateEventInput) {
  return apiFetch<EventDto>('/events', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
