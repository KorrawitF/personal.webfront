'use client'

import { useEffect, useRef, useState } from "react";

const FALLBACK = '/image-gallery.svg';

export default function Image({ src, alt, className }: ImageProps) {
    const [current, setCurrent] = useState(src);
    const [prevSrc, setPrevSrc] = useState(src);
    const ref = useRef<HTMLImageElement>(null);

    if (prevSrc !== src) {
        setPrevSrc(src);
        setCurrent(src);
    }

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
