import { apiFetch } from '../client';
import type { Event, UpdateEventValues } from './types';

export function getEvents() {
  return apiFetch<Event[]>('/events');
}

export function createEvent(input: UpdateEventValues) {
  return apiFetch<Event>('/events', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
