import { TZDateMini } from '@date-fns/tz';
import { add, sub } from 'date-fns';
import { create } from 'zustand';
import { dateFormat, getBrowserTimezone } from '../utils/date';

export type CalendarViewType = 'monthly' | 'weekly' | 'daily';

interface CalendarState {
  viewType: CalendarViewType;
  selectedDate: string;
  selectedTimezone: string;

  setViewType: (viewType: CalendarViewType) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  goToToday: () => void;
  setSelectedTimezone: (timezone: string) => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  viewType: 'monthly',
  selectedDate: dateFormat(new Date()),
  selectedTimezone: getBrowserTimezone(),

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
}));
