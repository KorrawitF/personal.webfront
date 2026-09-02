import type { Metadata } from "next";
import Image from "@/app/global/components/image";
import TechStack from "@/app/global/components/tech-stack";
import TimeLine from "@/app/global/components/timeline";
import { options } from "@/app/global/constants/DateFormat";
import getExperiences from "./api/mocks/about";

export const metadata: Metadata = {
  title: "About",
};

const PANE = "min-h-0 md:overflow-y-auto md:overscroll-contain [scrollbar-width:thin] [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent]";

const experiences = getExperiences().sort((a, b) => b.start_date.getTime() - a.start_date.getTime());

const toolkit = [...new Set(experiences.flatMap((exp) => exp.tech_stack ?? []))];
const companies = new Set(experiences.map((exp) => exp.company_name)).size;

const facts = [
    { label: 'Experience', value: '3+ yrs' },
    { label: 'Companies', value: `${companies}` },
    { label: 'Technologies', value: `${toolkit.length}` },
];

const timeline: TimeLineItem[] = experiences.map((exp) => ({
    id: exp.id,
    start_date: exp.start_date.toLocaleDateString('en-US', options),
    end_date: exp.end_date ? exp.end_date.toLocaleDateString('en-US', options) : 'Present',
    title: exp.job_title,
    subtitle: exp.company_name,
    detail: exp.detail,
    icon: exp.icon,
    children: exp.tech_stack?.length ? <TechStack items={exp.tech_stack} max={5} /> : undefined,
}));

function Fade() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-10 bg-linear-to-t from-background to-transparent md:block"
        />
    );
}

export default function About() {
    return (
        <div className="flex flex-1 flex-col items-center font-sans">
            <section className="w-full max-w-6xl space-y-8 px-6 py-12 md:flex md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden md:px-12 [@media(min-height:900px)]:py-16 2xl:max-w-5xl">
                <header className="shrink-0 space-y-3 text-center text-balance text-white md:text-start">
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        <strong className="text-primary">A</strong>bout
                    </h1>
                    <p className="text-white/70">
                        A Software Engineer with 3+ years of experience building scalable backend services, APIs and
                        cloud-native applications &mdash; here&rsquo;s the short version, and the roles that got me here.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-8 md:min-h-0 md:flex-1 md:grid-cols-5">
                    <div className="relative flex min-h-0 flex-col md:col-span-2">
                        <div className={`${PANE} space-y-5 md:flex-1 md:pb-6 md:pr-2`}>
                            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4">
                                <span className="flex h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/60">
                                    <Image className="h-full w-full object-cover" src="/profile.jpg" alt="Korrawit Soodnalao" />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-base font-semibold text-white">Korrawit Soodnalao</p>
                                    <p className="truncate text-sm text-secondary">Full Stack Developer</p>
                                    <p className="truncate text-xs text-white/50">Backend &middot; Cloud &middot; DevOps</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-white">
                                <p className="border-s-2 border-primary/60 ps-4 text-base">
                                    I work primarily with Go, PHP/Laravel, React, Vue and Kubernetes, with a focus on system
                                    design, microservices, DevOps and automation.
                                </p>
                                <p className="text-sm text-white/70">
                                    I enjoy solving complex problems, designing reliable systems, and turning ideas into
                                    practical software.
                                </p>
                                <p className="text-sm text-white/70">
                                    I&rsquo;ve worked on ERP, warehouse management, banking integrations and AI-powered
                                    automation across the full software development lifecycle.
                                </p>
                            </div>

                            <dl className="grid grid-cols-3 gap-3">
                                {facts.map((fact) => (
                                    <div key={fact.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                                        <dt className="text-[0.65rem] font-semibold uppercase tracking-wide text-white/50">{fact.label}</dt>
                                        <dd className="text-lg font-semibold text-primary">{fact.value}</dd>
                                    </div>
                                ))}
                            </dl>

                            <TechStack items={toolkit} label="Core toolkit" />
                        </div>
                        <Fade />
                    </div>

                    <div className="flex min-h-0 flex-col gap-3 md:col-span-3">
                        <div className="flex shrink-0 items-baseline justify-between gap-3 border-b border-white/10 pb-2">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-white/50">Experience</h2>
                            <p className="text-xs text-white/40">{experiences.length} roles</p>
                        </div>

                        <div className="relative flex min-h-0 flex-1 flex-col">
                            <TimeLine className={`${PANE} pt-1 md:flex-1 md:pb-6`} items={timeline} />
                            <Fade />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
