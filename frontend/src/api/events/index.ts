import { apiFetch } from '../client';
import type { Event, UpdateEventValues } from './types';

export function getEvents() {
  return apiFetch<Event[]>('/events');
}

export function createEvent(values: UpdateEventValues) {
  return apiFetch<Event>('/events', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateEvent(id: string, values: UpdateEventValues) {
  return apiFetch<Event>(`/events/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function deleteEvent(id: string) {
  return apiFetch<Event>(`/events/${id}`, {
    method: 'DELETE',
  });
}
