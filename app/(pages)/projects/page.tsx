'use cache'

import { Suspense } from "react";
import type { Metadata } from "next";
import Card from "@/app/global/components/card";
import TechStack from "@/app/global/components/tech-stack";
import ExternalLinkIcon from "@/app/global/icons/external-link";
import GithubIcon from "@/app/global/icons/github";
import getSiteContent from "@/app/global/api/site";
import { options } from "@/app/global/constants/DateFormat";
import PageTransition from "@/app/global/components/page-transition";
import getProjectsCopy from "./api/content";
import getProjects from "./api/projects";
import { cacheLife } from 'next/cache'
cacheLife('hours')

export async function generateMetadata(): Promise<Metadata> {
    const { header } = await getProjectsCopy();

    return { title: header.title };
}

function toPeriod(project: Project): string {
    const start = project.start_date.toLocaleDateString('en-US', options);

    if (!project.end_date) {
        return start;
    }

    const end = project.end_date.toLocaleDateString('en-US', options);

    return `${start} - ${end}`;
}

function toLinks(project: Project, labels: ProjectsContent['links']): CardLink[] {
    if (project.confidential) {
        return [];
    }

    const links: CardLink[] = [];

    if (project.repo_url) {
        links.push({
            label: labels.repository,
            href: project.repo_url,
            icon: <GithubIcon color="currentColor" className="h-4 w-4" />,
        });
    }

    if (project.demo_url) {
        links.push({
            label: labels.demo,
            href: project.demo_url,
            icon: <ExternalLinkIcon className="h-4 w-4" />,
        });
    }

    return links;
}

function toCard(project: Project, copy: Omit<ProjectsContent, 'projects'>): CardDetail {
    return {
        id: project.id,
        title: project.name,
        subtitle: project.role,
        summary: project.summary,
        detail: project.detail,
        banner: project.banner,
        icon: project.icon,
        period: toPeriod(project),
        status: project.status,
        highlights: project.highlights,
        links: toLinks(project, copy.links),
        confidential: project.confidential,
    };
}

/**
 * Isolated behind its own `await` so the header above can prerender: the
 * project list comes from a live backend call that cache components can't
 * statically cache, so it has to stay inside a Suspense boundary instead.
 */
async function ProjectsList({ copy }: { copy: Omit<ProjectsContent, 'projects'> }) {
    const [projects, site] = await Promise.all([getProjects(), getSiteContent()]);
    const sorted = projects.sort((a, b) => b.start_date.getTime() - a.start_date.getTime());

    return (
        <ul className="stagger grid grid-cols-1 gap-6 sm:grid-cols-2 md:min-h-0 md:flex-1 md:overflow-y-auto md:overscroll-contain md:pr-2 lg:grid-cols-3 [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent] scrollbar-thin">
            {sorted.map((project) => (
                <li key={project.id}>
                    <Card
                        item={toCard(project, copy)}
                        labels={site.card}
                        className="w-full"
                        back={<TechStack items={project.tech_stack} label={copy.tech_stack_label} labels={site.tech_stack} />}
                    >
                        <TechStack items={project.tech_stack} max={4} labels={site.tech_stack} />
                    </Card>
                </li>
            ))}
        </ul>
    );
}

export default async function Projects() {
    const copy = await getProjectsCopy();

    return (
        <PageTransition>
            <section className="w-full max-w-6xl space-y-8 px-6 py-12 md:flex md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden md:px-12 [@media(min-height:900px)]:py-24 2xl:max-w-5xl">
                <header className="reveal space-y-3 text-center text-balance text-white md:text-start">
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        <strong className="text-primary">{copy.header.title.charAt(0)}</strong>
                        {copy.header.title.slice(1)}
                    </h1>
                    <p className="text-white/70">{copy.header.lead}</p>
                </header>

                <Suspense fallback={<p className="text-white/50">Loading projects…</p>}>
                    <ProjectsList copy={copy} />
                </Suspense>
            </section>
        </PageTransition>
    );
}
