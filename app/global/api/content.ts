import client from "@/app/global/lib/api";

type BackendContent = {
    id: number,
    page: string,
    content: Record<string, unknown>,
};

/**
 * Page copy changes rarely, so this is cached rather than wrapped in
 * Suspense like the live entity lists (projects, skills, etc.) — that lets
 * the header/shell of each page keep prerendering under cacheComponents.
 */
export default async function getContent<T>(page: string): Promise<T> {
    'use cache'

    const contents = await client.get<BackendContent[]>('/contents');
    const match = contents.find((entry) => entry.page === page);

    if (!match) {
        throw new Error(`Content for page "${page}" was not found.`);
    }

    return match.content as T;
}
