import api from "@/app/global/config/api";

/**
 * Public proxy for backend-hosted media. `mediaUrl()` points browsers here
 * instead of at `api.base_url` directly, so the backend origin (often only
 * reachable server-side, e.g. an internal Docker hostname) never has to be
 * resolvable by the client — the request is same-origin and this handler
 * forwards it server-side.
 */
export async function GET(_: Request, ctx: RouteContext<'/media/[...path]'>) {
    const { path } = await ctx.params;
    const response = await fetch(`${api.base_url}/media/${path.join('/')}`);

    if (!response.ok || !response.body) {
        return new Response(null, { status: response.status });
    }

    return new Response(response.body, {
        headers: {
            'Content-Type': response.headers.get('content-type') ?? 'application/octet-stream',
            'Cache-Control': response.headers.get('cache-control') ?? 'public, max-age=31536000, immutable',
        },
    });
}
