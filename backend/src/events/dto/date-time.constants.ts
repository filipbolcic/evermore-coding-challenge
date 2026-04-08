export const TIMEZONE_AWARE_ISO_DATETIME_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;

export const TIMEZONE_AWARE_ISO_DATETIME_MESSAGE =
  'must be an ISO 8601 datetime with a timezone offset or Z suffix';
