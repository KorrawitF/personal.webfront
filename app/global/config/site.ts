import { origin, text } from "./env";

/**
 * Who the site belongs to and where it lives, read once from the environment.
 *
 * Every variable is `NEXT_PUBLIC_*`, so the values are inlined at build time and
 * are safe to import from client components as well as server ones. Every one is
 * optional too — the fallbacks below are the real values, so a fresh clone builds
 * and runs with no `.env` file at all. See `.env.example` for the full list.
 */

/** The full name behind the site. Most other defaults are derived from it. */
const owner = text(process.env.NEXT_PUBLIC_OWNER_NAME, "Korrawit Soodnalao");

/** What the site calls itself in short form — the first name by default. */
const name = text(process.env.NEXT_PUBLIC_SITE_NAME, owner.split(' ')[0]);

const site = {
    owner,
    name,
    /** The wordmark in the navbar. */
    brand: text(process.env.NEXT_PUBLIC_SITE_BRAND, `${name}.`),
    title: {
        default: name,
        /** Next fills the %s token with the page title. */
        template: text(process.env.NEXT_PUBLIC_SITE_TITLE_TEMPLATE, `${name} • %s`),
    },
    /** Absolute origin, no trailing slash: relative metadata URLs resolve against it. */
    url: origin(process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000"),
    /** BCP 47 tag for the lang attribute on <html>. */
    locale: text(process.env.NEXT_PUBLIC_SITE_LOCALE, "en"),
} as const;

export default site;
