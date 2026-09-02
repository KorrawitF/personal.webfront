import { ViewTransition } from "react";
import type { ReactNode } from "react";

// Only a typed navigation animates. Browser back, a refresh, or a Suspense
// reveal carries no type and so swaps without sliding anywhere.
const DIRECTIONAL = {
    'nav-forward': 'nav-forward',
    'nav-back': 'nav-back',
    default: 'none',
};

/**
 * The shell every page sits in. It owns the page-level enter and exit, which has
 * to live in `page.tsx` rather than the layout: a layout persists across a
 * navigation, so its transitions would never fire.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
    return (
        <ViewTransition enter={DIRECTIONAL} exit={DIRECTIONAL} default="none">
            <div className="flex flex-1 flex-col items-center font-sans">{children}</div>
        </ViewTransition>
    );
}
