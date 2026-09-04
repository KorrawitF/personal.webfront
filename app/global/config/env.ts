/**
 * Coercion helpers for the config modules. `site.ts` and `api.ts` are the only
 * files in the app that read `process.env`; everything else imports the value
 * from one of them, so a variable is named, defaulted and documented exactly once.
 *
 * The reads there are written out in full — `process.env.NEXT_PUBLIC_SITE_URL`,
 * never `process.env[name]`. Next inlines `NEXT_PUBLIC_*` into the browser bundle
 * by literal substitution at build time, so a lookup through a variable is left
 * alone and comes back undefined on the client. That is why the helpers below take
 * a value and never a variable name.
 */

/** The value when it carries anything, the fallback when it is missing or blank. */
export function text(value: string | undefined, fallback: string): string {
    return value?.trim() || fallback;
}

/** A whole number, or the fallback when the value is missing or is not one. */
export function count(value: string | undefined, fallback: number): number {
    const parsed = Number(value?.trim());

    return value?.trim() && Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

/** An origin with any trailing slash dropped, so a path can be appended to it. */
export function origin(value: string | undefined, fallback: string): string {
    return text(value, fallback).replace(/\/+$/, '');
}
