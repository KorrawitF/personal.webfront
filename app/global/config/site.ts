import { origin, text } from "./env";

/**
 * Who the site belongs to and where it lives, read once from the environment.
 *
 * Not `NEXT_PUBLIC_*`: every caller (site.ts, home.ts, content.ts) runs
 * server-side and passes the resolved values down as plain props, so nothing
 * here needs to reach the client bundle. Keeping it off `NEXT_PUBLIC_*` means
 * one built image can be reconfigured per environment with plain runtime env
 * vars, instead of being frozen at `next build` time. Every variable is
 * optional too — the fallbacks below are the real values, so a fresh clone
 * builds and runs with no `.env` file at all. See `.env.example` for the full list.
 */

/** The full name behind the site. Most other defaults are derived from it. */
const owner = text(process.env.OWNER_NAME, "Korrawit Soodnalao");

/** What the site calls itself in short form — the first name by default. */
const name = text(process.env.SITE_NAME, owner.split(' ')[0]);

const site = {
    owner,
    name,
    /** The wordmark in the navbar. */
    brand: text(process.env.SITE_BRAND, `${name}.`),
    title: {
        default: name,
        /** Next fills the %s token with the page title. */
        template: text(process.env.SITE_TITLE_TEMPLATE, `${name} • %s`),
    },
    /** Absolute origin, no trailing slash: relative metadata URLs resolve against it. */
    url: origin(process.env.SITE_URL, "http://localhost:3000"),
    /** BCP 47 tag for the lang attribute on <html>. */
    locale: text(process.env.SITE_LOCALE, "en"),
} as const;

export default site;
