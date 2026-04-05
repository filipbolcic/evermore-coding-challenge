export const HOUR_LIST = Array.from({ length: 24 });

export const HOUR_LABELS = HOUR_LIST.map((_, i) => `${i.toString().padStart(2, '0')}:00`);

export const HOUR_GRID_ROWS =
  HOUR_LIST.map((_, hour) => `[hour-${hour}] minmax(72px, auto)`).join(' ') + ' [hour-24]';
