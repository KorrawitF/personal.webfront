'use client'

import { useState } from "react";
import Image from "./image";
import LockIcon from "../icons/lock";
import fill from "../utils/format";

const FACE = "absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-background/80 shadow-lg shadow-black/30 backface-hidden";
const SCROLLER = "min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin] [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent]";

function Links({ item, labels }: { item: CardDetail, labels: CardLabels }) {
    if (item.confidential) {
        return (
            <p className="flex items-center gap-2 text-xs text-white/60">
                <LockIcon className="h-4 w-4 shrink-0" />
                {labels.confidential}
            </p>
        );
    }

    if (!item.links?.length) {
        return null;
    }

    return (
        <ul className="flex flex-wrap gap-2">
            {item.links.map((link) => (
                <li key={link.href}>
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-primary hover:bg-primary hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        {link.icon && <span className="flex shrink-0 items-center">{link.icon}</span>}
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}

function Banner({ item }: { item: CardDetail }) {
    if (!item.banner) {
        return null;
    }

    return (
        <div className="relative h-36 shrink-0 overflow-hidden bg-white/5">
            <Image className="h-full w-full object-cover" src={item.banner} alt={item.title} />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
            {item.status && (
                <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-background/80 px-2.5 py-0.5 text-xs font-medium text-secondary">
                    {item.status}
                </span>
            )}
        </div>
    );
}

function Header({ item, showStatus }: { item: CardDetail, showStatus: boolean }) {
    return (
        <div className="flex items-start gap-3">
            {item.icon && (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/10 text-white/80">
                    {typeof item.icon === 'string'
                        ? <Image className="h-full w-full object-contain p-1" src={item.icon} alt={item.title} />
                        : item.icon}
                </span>
            )}
            <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold text-primary sm:text-lg">{item.title}</h3>
                {item.subtitle && <p className="truncate text-sm text-secondary">{item.subtitle}</p>}
            </div>
            {showStatus && item.status && (
                <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                    {item.status}
                </span>
            )}
        </div>
    );
}

function Highlights({ items }: { items: string[] }) {
    if (!items.length) {
        return null;
    }

    return (
        <ul className="ms-4 list-disc space-y-1 text-sm text-white/70 marker:text-primary">
            {items.map((highlight) => (
                <li key={highlight} className="wrap-break-word">{highlight}</li>
            ))}
        </ul>
    );
}

export default function Card({
    item,
    labels,
    flippable = true,
    defaultFlipped = false,
    className = '',
    children,
    back,
}: CardProps) {
    const [flipped, setFlipped] = useState(defaultFlipped);
    const hasLinks = item.confidential || Boolean(item.links?.length);

    if (!flippable) {
        return (
            <article className={`flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-lg shadow-black/30 backdrop-blur-sm ${className}`}>
                <Banner item={item} />
                <div className="flex min-h-0 flex-1 flex-col gap-3 p-5 text-white">
                    <Header item={item} showStatus={!item.banner} />
                    {item.period && <p className="text-xs text-white/60">{item.period}</p>}
                    {item.summary && <p className="text-sm wrap-break-word text-white/70">{item.summary}</p>}
                    {item.detail && <p className="text-sm wrap-break-word text-white/70">{item.detail}</p>}
                    <Highlights items={item.highlights ?? []} />
                    {children}
                    {back}
                    {hasLinks && (
                        <div className="mt-auto pt-2">
                            <Links item={item} labels={labels} />
                        </div>
                    )}
                </div>
            </article>
        );
    }

    const flip = () => setFlipped((prev) => !prev);

    return (
        <article className={`h-112 perspective-[1400px] ${className}`}>
            <div className={`relative h-full w-full transition-transform duration-500 ease-out transform-3d motion-reduce:transition-none ${flipped ? 'rotate-y-180' : ''}`}>
                <div className={FACE} inert={flipped}>
                    <button
                        type="button"
                        onClick={flip}
                        aria-expanded={flipped}
                        aria-label={fill(labels.show_details, { title: item.title })}
                        className="flex h-full w-full flex-col text-left transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    >
                        <Banner item={item} />
                        <div className="flex min-h-0 flex-1 flex-col gap-3 p-5 text-white">
                            <Header item={item} showStatus={!item.banner} />
                            {item.period && <p className="text-xs text-white/60">{item.period}</p>}
                            {item.summary && <p className="line-clamp-4 text-sm wrap-break-word text-white/70">{item.summary}</p>}
                            <div className="mt-auto space-y-2">
                                {children}
                                <p className="flex items-center gap-1.5 pt-1 text-xs font-medium text-primary">
                                    {labels.view_details}
                                    <svg className="h-3.5 w-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 9a8 8 0 0 1 13-6M20 15a8 8 0 0 1-13 6" />
                                        <path d="M4 4v5h5M20 20v-5h-5" />
                                    </svg>
                                </p>
                            </div>
                        </div>
                    </button>
                </div>

                <div className={`${FACE} rotate-y-180`} inert={!flipped}>
                    <div className="flex h-full flex-col gap-3 p-5 text-white">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h3 className="truncate text-base font-semibold text-primary sm:text-lg">{item.title}</h3>
                                {item.period && <p className="text-xs text-white/60">{item.period}</p>}
                            </div>
                            <button
                                type="button"
                                onClick={flip}
                                aria-label={fill(labels.hide_details, { title: item.title })}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:border-primary hover:bg-primary hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 6 18 18M18 6 6 18" />
                                </svg>
                            </button>
                        </div>

                        <div className={`${SCROLLER} space-y-3`}>
                            {item.detail && <p className="text-sm wrap-break-word text-white/70">{item.detail}</p>}
                            <Highlights items={item.highlights ?? []} />
                            {back}
                        </div>

                        <div className="mt-auto shrink-0 border-t border-white/10 pt-3">
                            <Links item={item} labels={labels} />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
