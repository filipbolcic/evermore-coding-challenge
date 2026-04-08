export const UTC_ISO_DATETIME_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]00(?::?00)?)$/;

export const UTC_ISO_DATETIME_MESSAGE =
  'must be an ISO 8601 UTC datetime with a zero-offset suffix such as Z or +00:00';
