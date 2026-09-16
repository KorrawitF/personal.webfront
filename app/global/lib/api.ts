import api from "@/app/global/config/api";

/** Thrown for any non-2xx response, so callers can branch on status. */
export class ApiError extends Error {
    constructor(public readonly status: number, public readonly statusText: string, body?: string) {
        super(body || `${status} ${statusText}`);
        this.name = 'ApiError';
    }
}

/**
 * Issues one request against the backend. `base_url` is read once from
 * config/api.ts at module load, so callers only ever name the path —
 * they never touch `process.env` themselves.
 */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${api.base_url}${path}`, {
        ...init,
        headers: { 'Content-Type': 'application/json', ...init?.headers },
    });

    if (!response.ok) {
        throw new ApiError(response.status, response.statusText, await response.text().catch(() => undefined));
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

function get<T>(path: string, init?: RequestInit): Promise<T> {
    return request<T>(path, init);
}

function post<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    return request<T>(path, { ...init, method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined });
}

function put<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    return request<T>(path, { ...init, method: 'PUT', body: body !== undefined ? JSON.stringify(body) : undefined });
}

function del(path: string, init?: RequestInit): Promise<void> {
    return request<void>(path, { ...init, method: 'DELETE' });
}

const CONNECTION_ERROR_CODES = new Set([
    'ECONNREFUSED', 'ENOTFOUND', 'ECONNRESET', 'ETIMEDOUT', 'EAI_AGAIN', 'EHOSTUNREACH',
]);

/**
 * True only for "the backend isn't reachable at all" (e.g. no network during
 * a Docker build) — never for a real HTTP error response. Callers use this to
 * decide whether a failure is safe to fall back from; an ApiError (or any
 * other non-network failure) always propagates.
 */
export function isConnectionError(error: unknown): boolean {
    if (!(error instanceof TypeError)) {
        return false;
    }

    const code = (error.cause as { code?: string } | undefined)?.code;
    return code !== undefined && CONNECTION_ERROR_CODES.has(code);
}

const client = { get, post, put, del };

export default client;
