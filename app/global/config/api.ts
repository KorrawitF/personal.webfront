import { origin } from "./env";

/**
 * Where the backend lives, read once from the environment. Not `NEXT_PUBLIC_*`:
 * every caller of `lib/api.ts` runs server-side, so the value never needs to
 * reach the client bundle. This is the only file besides site.ts that reads
 * `process.env` — import `api` from here rather than adding a new read.
 */
const api = {
    /** Origin with no trailing slash, so a path can be appended directly. */
    base_url: origin(process.env.API_URL, "http://localhost:8080/api"),
} as const;

/**
 * Browser-loadable path for a backend-hosted asset. CMS content stores the
 * path exactly as the backend serves it (e.g. `/media/{id}/file`). Handing
 * that straight to the client would require the browser to resolve
 * `base_url` itself — often an internal, server-only origin — so instead
 * this returns a same-origin path proxied through `app/media/[...path]/route.ts`,
 * which is the only place `base_url` is used for asset requests.
 */
export function mediaUrl(path: string): string {
    return path;
}

export default api;
