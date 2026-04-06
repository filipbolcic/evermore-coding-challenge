import { apiFetch } from '../client';
import type { EditEventValues, Event } from './types';

export function getEvents() {
  return apiFetch<Event[]>('/events');
}

export function createEvent(input: EditEventValues) {
  return apiFetch<Event>('/events', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
