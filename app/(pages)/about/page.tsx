'use cache'
cacheLife('hours')
import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "@/app/global/components/image";
import TechStack from "@/app/global/components/tech-stack";
import TimeLine from "@/app/global/components/timeline";
import getSiteContent from "@/app/global/api/site";
import { options } from "@/app/global/constants/DateFormat";
import fill from "@/app/global/utils/format";
import PageTransition from "@/app/global/components/page-transition";
import getAboutCopy from "./api/content";
import getWorkExperiences from "./api/work-experiences";

export async function generateMetadata(): Promise<Metadata> {
    const { header } = await getAboutCopy();

    return { title: header.title };
}

const PANE = "min-h-0 md:overflow-y-auto md:overscroll-contain [scrollbar-width:thin] [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent]";

function Fade() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-10 bg-linear-to-t from-background to-transparent md:block"
        />
    );
}

function toTimeline(experiences: Experience[], present: string, labels: TechStackLabels): TimeLineItem[] {
    return experiences.map((exp) => ({
        id: exp.id,
        start_date: exp.start_date.toLocaleDateString('en-US', options),
        end_date: exp.end_date ? exp.end_date.toLocaleDateString('en-US', options) : present,
        title: exp.job_title,
        subtitle: exp.company_name,
        detail: exp.detail,
        icon: exp.icon,
        children: exp.tech_stack?.length ? <TechStack items={exp.tech_stack} max={5} labels={labels} /> : undefined,
    }));
}

function toFacts(experiences: Experience[], toolkit: string[]): Fact[] {
    return [
        { label: "Experience", value: "3+ yrs" },
        { label: "Companies", value: `${new Set(experiences.map((exp) => exp.company_name)).size}` },
        { label: "Technologies", value: `${toolkit.length}` },
    ];
}

/**
 * Isolated behind its own `await` so the header above can prerender: the
 * experience list comes from a live backend call that cache components
 * can't statically cache, so it has to stay inside a Suspense boundary.
 */
async function AboutBody({ copy }: { copy: Omit<AboutContent, 'facts' | 'experiences'> }) {
    const [experiences, site] = await Promise.all([getWorkExperiences(), getSiteContent()]);
    const sorted = experiences.sort((a, b) => b.start_date.getTime() - a.start_date.getTime());
    const toolkit = [...new Set(sorted.flatMap((exp) => exp.tech_stack ?? []))];
    const facts = toFacts(sorted, toolkit);
    const [lead, ...supporting] = copy.paragraphs;

    return (
        <div className="grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 md:grid-cols-5">
            <div className="reveal relative flex min-h-0 flex-col md:col-span-2">
                <div className={`${PANE} space-y-5 md:flex-1 md:pb-6 md:pr-2`}>
                    <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4">
                        <span className="flex h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/60">
                            <Image
                                className="h-full w-full object-cover"
                                src={copy.profile.portrait.src}
                                alt={copy.profile.portrait.alt}
                            />
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-base font-semibold text-white">{copy.profile.name}</p>
                            <p className="truncate text-sm text-secondary">{copy.profile.role}</p>
                            <p className="truncate text-xs text-white/50">{copy.profile.tags.join(' · ')}</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-white">
                        <p className="border-s-2 border-primary/60 ps-4 text-base">{lead}</p>
                        {supporting.map((paragraph) => (
                            <p key={paragraph} className="text-sm text-white/70">{paragraph}</p>
                        ))}
                    </div>

                    <dl className="grid grid-cols-3 gap-3">
                        {facts.map((fact) => (
                            <div key={fact.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                                <dt className="text-[0.65rem] font-semibold uppercase tracking-wide text-white/50">{fact.label}</dt>
                                <dd className="text-lg font-semibold text-primary">{fact.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <TechStack items={toolkit} label={copy.toolkit_label} labels={site.tech_stack} />
                </div>
                <Fade />
            </div>

            <div className="flex min-h-0 flex-col gap-3 md:col-span-3">
                <div className="reveal flex shrink-0 items-baseline justify-between gap-3 border-b border-white/10 pb-2">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-white/50">
                        {copy.experience_label}
                    </h2>
                    <p className="text-xs text-white/40">
                        {fill(copy.experience_count, { count: sorted.length })}
                    </p>
                </div>

                <div className="relative flex min-h-0 flex-1 flex-col">
                    <TimeLine
                        className={`${PANE} pt-1 md:flex-1 md:pb-6`}
                        items={toTimeline(sorted, copy.present, site.tech_stack)}
                    />
                    <Fade />
                </div>
            </div>
        </div>
    );
}

export default async function About() {
    const copy = await getAboutCopy();

    return (
        <PageTransition>
            <section className="w-full max-w-6xl space-y-8 px-6 py-12 md:flex md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden md:px-12 [@media(min-height:900px)]:py-16 2xl:max-w-5xl">
                <header className="reveal shrink-0 space-y-3 text-center text-balance text-white md:text-start">
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        <strong className="text-primary">{copy.header.title.charAt(0)}</strong>
                        {copy.header.title.slice(1)}
                    </h1>
                    <p className="text-white/70">{copy.header.lead}</p>
                </header>

                <Suspense fallback={<p className="text-white/50">Loading experience…</p>}>
                    <AboutBody copy={copy} />
                </Suspense>
            </section>
        </PageTransition>
    );
}
