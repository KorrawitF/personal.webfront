import type { Metadata } from "next";
import Card from "@/app/global/components/card";
import TechStack from "@/app/global/components/tech-stack";
import ExternalLinkIcon from "@/app/global/icons/external-link";
import GithubIcon from "@/app/global/icons/github";
import getSiteContent from "@/app/global/api/mocks/site";
import { options } from "@/app/global/constants/DateFormat";
import { getProjectsContent } from "./api/mocks/projects";

export async function generateMetadata(): Promise<Metadata> {
    const content = await getProjectsContent();

    return { title: content.header.title };
}

function toPeriod(project: Project, present: string): string {
    const start = project.start_date.toLocaleDateString('en-US', options);
    const end = project.end_date ? project.end_date.toLocaleDateString('en-US', options) : present;

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

function toCard(project: Project, content: ProjectsContent): CardDetail {
    return {
        id: project.id,
        title: project.name,
        subtitle: project.role,
        summary: project.summary,
        detail: project.detail,
        banner: project.banner,
        icon: project.icon,
        period: toPeriod(project, content.present),
        status: project.status,
        highlights: project.highlights,
        links: toLinks(project, content.links),
        confidential: project.confidential,
    };
}

export default async function Projects() {
    const [content, site] = await Promise.all([getProjectsContent(), getSiteContent()]);

    return (
        <div className="flex flex-1 flex-col items-center font-sans">
            <section className="w-full max-w-6xl space-y-8 px-6 py-12 md:flex md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden md:px-12 [@media(min-height:900px)]:py-24 2xl:max-w-5xl">
                <header className="space-y-3 text-center text-balance text-white md:text-start">
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        <strong className="text-primary">{content.header.title.charAt(0)}</strong>
                        {content.header.title.slice(1)}
                    </h1>
                    <p className="text-white/70">{content.header.lead}</p>
                </header>

                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:min-h-0 md:flex-1 md:overflow-y-auto md:overscroll-contain md:pr-2 lg:grid-cols-3 [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent] scrollbar-thin">
                    {content.projects.map((project) => (
                        <li key={project.id}>
                            <Card
                                item={toCard(project, content)}
                                labels={site.card}
                                className="w-full"
                                back={<TechStack items={project.tech_stack} label={content.tech_stack_label} labels={site.tech_stack} />}
                            >
                                <TechStack items={project.tech_stack} max={4} labels={site.tech_stack} />
                            </Card>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
