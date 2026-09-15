'use client'

import { startTransition, useState, ViewTransition } from "react";
import type { ReactNode } from "react";
import Card from "@/app/global/components/card";
import fill from "@/app/global/utils/format";
import MailContents from "./mail-contents";
import ResumeForm from "./resume-form";

const PANEL = "min-h-0 space-y-4 md:flex-1 md:overflow-y-auto md:overscroll-contain md:pr-1 [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent] scrollbar-thin";
const PILL = "shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-secondary";

function toCard(method: ContactMethod, status: string, copy: ContactMethodsCopy, icon?: ReactNode): CardDetail {
    // Only the email method drives the résumé-request form; any other
    // available method with an href just links out (e.g. LinkedIn, GitHub).
    const isLinkOut = method.status === 'available' && method.id !== 'email' && Boolean(method.href);

    return {
        id: method.id,
        title: method.name,
        subtitle: method.handle,
        summary: method.summary,
        detail: method.detail,
        icon,
        status,
        links: isLinkOut ? [{ label: fill(copy.visit_link, { title: method.name }), href: method.href! }] : undefined,
    };
}

export default function ContactMethods({ methods, mail, mail_copy, copy, form, card, icons }: ContactMethodsProps) {
    const fallback = methods.find((method) => method.status === 'available') ?? methods[0];
    const [activeId, setActiveId] = useState(fallback.id);

    // As with the skill panel, the swap has to be async for the cross-fade to run.
    const select = (id: string) => startTransition(() => setActiveId(id));

    const active = methods.find((method) => method.id === activeId) ?? fallback;
    const alternatives = methods.filter((method) => method.id !== active.id);
    const email = methods.find((method) => method.id === 'email');
    const isEmailForm = active.id === 'email' && active.status === 'available';
    const isLinkOut = !isEmailForm && active.status === 'available' && Boolean(active.href);

    // The form fills the column so it can scroll inside; a short pending or
    // link-out panel sizes to its content instead of stretching into empty space.
    const fills = isEmailForm;

    return (
        <div className="stagger grid grid-cols-1 gap-6 md:min-h-0 md:flex-1 md:grid-cols-3 md:overflow-hidden">
            <div id="contact-panel" className={`flex md:col-span-2 md:min-h-0 ${fills ? '' : 'md:items-start'}`}>
                {/* Keyed, so switching method reads as one panel leaving and
                    another arriving rather than an in-place content jump. */}
                <ViewTransition key={active.id} name="contact-panel" share="swap" default="none">
                    <Card item={toCard(active, copy.status[active.status], copy, icons[active.id])} labels={card} flippable={false} className="w-full md:max-h-full">
                        {isEmailForm ? (
                            <ResumeForm copy={form} intro={<MailContents mail={mail} copy={mail_copy} />} />
                        ) : isLinkOut ? null : (
                            <div className="flex min-h-0 flex-1 flex-col gap-4">
                                <div className={PANEL}>
                                    <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                                        {copy.pending_note}
                                    </p>
                                </div>

                                {email && (
                                    <div className="shrink-0 border-t border-white/10 pt-3">
                                        <button
                                            type="button"
                                            onClick={() => select(email.id)}
                                            aria-controls="contact-panel"
                                            className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-background transition-colors hover:border-secondary hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                        >
                                            {copy.use_email}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </ViewTransition>
            </div>

            <div className="flex flex-col gap-3 md:min-h-0 md:overflow-y-auto md:overscroll-contain md:pr-1 [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent] scrollbar-thin">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">{copy.alternatives}</p>

                <ul id="contact-alternatives" className="space-y-3">
                    {alternatives.map((method) => (
                        <li key={method.id}>
                            <button
                                type="button"
                                onClick={() => select(method.id)}
                                aria-controls="contact-panel"
                                className="w-full rounded-2xl border border-white/15 bg-white/5 p-4 text-left shadow-lg shadow-black/20 transition-colors hover:border-primary hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                <span className="flex items-start gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/10 text-white/80">
                                        {icons[method.id]}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="flex items-center gap-2">
                                            <span className="truncate text-base font-semibold text-primary">{method.name}</span>
                                            <span className={`ms-auto ${PILL}`}>{copy.status[method.status]}</span>
                                        </span>
                                        {method.handle && <span className="block truncate text-sm text-secondary">{method.handle}</span>}
                                        <span className="mt-1.5 block text-sm text-white/60">{method.summary}</span>
                                    </span>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
