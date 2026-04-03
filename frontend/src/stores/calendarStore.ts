import { create } from 'zustand';
import { getBrowserTimezone } from '../utils/date';

export type CalendarViewType = 'monthly' | 'weekly' | 'daily';

interface CalendarState {
  viewType: CalendarViewType;
  currentDate: Date;
  selectedTimezone: string;

  setViewType: (viewType: CalendarViewType) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  goToToday: () => void;
  setSelectedTimezone: (timezone: string) => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  viewType: 'monthly',
  currentDate: new Date(),
  selectedTimezone: getBrowserTimezone(),

  setViewType: (viewType) => set({ viewType }),

  goToPrevious: () => {
    const { currentDate, viewType } = get();
    const newDate = new Date(currentDate);

    switch (viewType) {
      case 'monthly':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'weekly':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'daily':
        newDate.setDate(newDate.getDate() - 1);
        break;
    }

    set({ currentDate: newDate });
  },

  goToNext: () => {
    const { currentDate, viewType } = get();
    const newDate = new Date(currentDate);

    switch (viewType) {
      case 'monthly':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'weekly':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'daily':
        newDate.setDate(newDate.getDate() + 1);
        break;
    }

    set({ currentDate: newDate });
  },

  goToToday: () => set({ currentDate: new Date() }),

  setSelectedTimezone: (selectedTimezone) => set({ selectedTimezone }),
}));
