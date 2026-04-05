import { TZDateMini } from '@date-fns/tz';
import { add, sub } from 'date-fns';
import { create } from 'zustand';
import type { MockEvent } from '../types/date';
import { dateFormat, getBrowserTimezone } from '../utils/date';
import { MOCK_EVENTS } from '../utils/mockData';

export type CalendarViewType = 'monthly' | 'weekly' | 'daily';

interface CalendarState {
  viewType: CalendarViewType;
  selectedDate: string;
  selectedTimezone: string;
  events: MockEvent[];

  setViewType: (viewType: CalendarViewType) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  goToToday: () => void;
  setSelectedTimezone: (timezone: string) => void;
  addEvent: (event: MockEvent) => void;
  updateEvent: (event: MockEvent) => void;
  deleteEvent: (eventId: string) => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  viewType: 'monthly',
  selectedDate: dateFormat(new Date()),
  selectedTimezone: getBrowserTimezone(),
  events: MOCK_EVENTS,

  setViewType: (viewType) => set({ viewType }),

  goToPrevious: () => {
    const { selectedDate, viewType } = get();

    switch (viewType) {
      case 'monthly': {
        const newDate = sub(selectedDate, { months: 1 });
        set({ selectedDate: dateFormat(newDate) });
        break;
      }
      case 'weekly': {
        const newDate = sub(selectedDate, { weeks: 1 });
        set({ selectedDate: dateFormat(newDate) });
        break;
      }
      case 'daily': {
        const newDate = sub(selectedDate, { days: 1 });
        set({ selectedDate: dateFormat(newDate) });
        break;
      }
    }
  },

  goToNext: () => {
    const { selectedDate, viewType } = get();

    switch (viewType) {
      case 'monthly': {
        const newDate = add(selectedDate, { months: 1 });
        set({ selectedDate: dateFormat(newDate) });
        break;
      }
      case 'weekly': {
        const newDate = add(selectedDate, { weeks: 1 });
        set({ selectedDate: dateFormat(newDate) });
        break;
      }
      case 'daily': {
        const newDate = add(selectedDate, { days: 1 });
        set({ selectedDate: dateFormat(newDate) });
        break;
      }
    }
  },

  goToToday: () => {
    const { selectedTimezone } = get();
    set({ selectedDate: dateFormat(TZDateMini.tz(selectedTimezone)) });
  },

  setSelectedTimezone: (selectedTimezone) => set({ selectedTimezone }),

  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),

  updateEvent: (event) =>
    set((state) => ({
      events: state.events.map((existingEvent) =>
        existingEvent.id === event.id ? event : existingEvent
      ),
    })),

  deleteEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId),
    })),
}));
