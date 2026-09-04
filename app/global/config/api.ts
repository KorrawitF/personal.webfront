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

export default api;
