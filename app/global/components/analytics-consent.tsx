'use client'

import Script from "next/script";
import { useSyncExternalStore } from "react";

type Consent = 'granted' | 'denied';

const STORAGE_KEY = 'analytics-consent';

const listeners = new Set<() => void>();

/**
 * The answer, kept in memory only when localStorage refused the write (private
 * mode, blocked site data), so it still holds for this page view. While storage
 * works it is never set, and storage stays the single source of truth.
 */
let fallback: Consent | undefined;

function read(): Consent | undefined {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'granted' || stored === 'denied') {
            return stored;
        }
    } catch {
        // Storage can throw when blocked; fall through to the in-memory answer.
    }

    return fallback;
}

function write(consent: Consent) {
    try {
        window.localStorage.setItem(STORAGE_KEY, consent);
    } catch {
        fallback = consent;
    }

    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    // Keeps other open tabs in step when the answer is given in one of them.
    window.addEventListener('storage', listener);

    return () => {
        listeners.delete(listener);
        window.removeEventListener('storage', listener);
    };
}

/**
 * Server and hydration render see 'unknown', so neither the banner nor the
 * scripts appear until the stored answer has actually been read.
 */
function getServerSnapshot(): Consent | 'unknown' {
    return 'unknown';
}

export default function AnalyticsConsent({ measurementId }: { measurementId: string }) {
    const consent = useSyncExternalStore<Consent | 'unknown' | undefined>(subscribe, read, getServerSnapshot);

    if (consent === 'granted') {
        return (
            <>
                <Script
                    id="ga-loader"
                    src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
                    strategy="afterInteractive"
                />
                <Script id="ga-init" strategy="afterInteractive">
                    {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(measurementId)});`}
                </Script>
            </>
        );
    }

    if (consent !== undefined) {
        // 'denied', or still 'unknown' before hydration has read the stored answer.
        return null;
    }

    return (
        <section
            aria-label="Analytics consent"
            className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-white/15 bg-background/95 p-4 text-sm text-white shadow-lg shadow-black/30 backdrop-blur sm:left-auto sm:max-w-sm"
        >
            <p className="text-white/80">
                This site would like to use Google Analytics to store anonymous information about how it is used,
                such as the pages you visit and the kind of device you use. Nothing is stored unless you accept.
            </p>
            <div className="mt-4 flex gap-2">
                <button
                    type="button"
                    onClick={() => write('granted')}
                    className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                    Accept
                </button>
                <button
                    type="button"
                    onClick={() => write('denied')}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:border-primary hover:bg-primary hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    Decline
                </button>
            </div>
        </section>
    );
}
