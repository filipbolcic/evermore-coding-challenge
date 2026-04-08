export const HOUR_LIST = Array.from({ length: 24 });
export const HOUR_ROW_HEIGHT = 72;

export const HOUR_LABELS = HOUR_LIST.map((_, i) => `${i.toString().padStart(2, '0')}:00`);

export const HOUR_GRID_ROWS =
  HOUR_LIST.map((_, hour) => `[hour-${hour}] ${HOUR_ROW_HEIGHT}px`).join(' ') + ' [hour-24]';
