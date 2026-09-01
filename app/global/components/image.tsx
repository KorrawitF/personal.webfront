'use client'

import { useEffect, useRef, useState } from "react";

const FALLBACK = '/image-gallery.svg';

export default function Image({ src, alt, className }: ImageProps) {
    const [current, setCurrent] = useState(src);
    const [prevSrc, setPrevSrc] = useState(src);
    const ref = useRef<HTMLImageElement>(null);

    // Drop a previous fallback when the caller points at a new source. Adjusting
    // state during render rather than in an effect avoids a cascading re-render.
    if (prevSrc !== src) {
        setPrevSrc(src);
        setCurrent(src);
    }

    // A server-rendered <img> usually finishes loading -- and failing -- before
    // React hydrates, and DOM error events do not replay for a listener attached
    // later. So `onError` alone never fires for images broken on first paint;
    // re-check the element directly whenever the source changes.
    useEffect(() => {
        const img = ref.current;

        if (img?.complete && img.naturalWidth === 0) {
            setCurrent(FALLBACK);
        }
    }, [current]);

    return (
        <img
            ref={ref}
            className={className}
            src={current}
            alt={alt}
            onError={() => setCurrent(FALLBACK)}
        />
    );
}
