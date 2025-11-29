const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081/api/v1";

type Primitive = string | number | boolean | undefined | null;

export type ApiRequestOptions = RequestInit & {
  params?: Record<string, Primitive>;
  skipJsonParsing?: boolean;
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function apiFetch<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { params, headers, body, skipJsonParsing, ...rest } = options;

  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    ...rest,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body:
      body && typeof body !== "string" && !(body instanceof FormData)
        ? JSON.stringify(body)
        : body,
  });

  if (!response.ok) {
    const message = await safeParseError(response);
    throw new ApiError(response.status, message);
  }

  if (skipJsonParsing || response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

async function safeParseError(response: Response) {
  try {
    const payload = await response.json();
    if (payload?.message) {
      return payload.message;
    }
    return JSON.stringify(payload);
  } catch {
    return response.statusText || "Unexpected API error";
  }
}

