const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error('Missing VITE_API_URL environment variable');
}

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

function buildUrl(path: string) {
  return new URL(path, apiUrl).toString();
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

export async function apiFetch<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof data.message === 'string'
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, data);
  }

  return data as TResponse;
}
