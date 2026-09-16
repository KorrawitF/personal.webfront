import client, { isConnectionError } from "@/app/global/lib/api";

type BackendContent = {
    id: number,
    page: string,
    content: Record<string, unknown>,
};

/**
 * Page copy changes rarely, so this is cached rather than wrapped in
 * Suspense like the live entity lists (projects, skills, etc.) — that lets
 * the header/shell of each page keep prerendering under cacheComponents.
 *
 * `fallback` only kicks in when the backend is unreachable outright (e.g. a
 * Docker build with no backend to hit) — that keeps the static shell
 * buildable standalone. A reachable backend that errors, or has no row for
 * `page`, still fails loudly rather than silently shipping placeholder copy.
 */
export default async function getContent<T>(page: string, fallback: T): Promise<T> {
    'use cache'

    let contents: BackendContent[];
    try {
        contents = await client.get<BackendContent[]>('/contents');
    } catch (error) {
        if (isConnectionError(error)) {
            return fallback;
        }
        throw error;
    }

    const match = contents.find((entry) => entry.page === page);

    if (!match) {
        throw new Error(`Content for page "${page}" was not found.`);
    }

    return match.content as T;
}
