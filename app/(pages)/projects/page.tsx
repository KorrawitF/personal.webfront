import Card from "@/app/global/components/card";
import TechStack from "@/app/global/components/tech-stack";
import ExternalLinkIcon from "@/app/global/icons/external-link";
import GithubIcon from "@/app/global/icons/github";
import { options } from "@/app/global/constants/DateFormat";
import getProjects from "./api/mocks/projects";

function toPeriod(project: Project): string {
    const start = project.start_date.toLocaleDateString('en-US', options);
    const end = project.end_date ? project.end_date.toLocaleDateString('en-US', options) : 'Present';

    return `${start} - ${end}`;
}

function toLinks(project: Project): CardLink[] {
    if (project.confidential) {
        return [];
    }

    const links: CardLink[] = [];

    if (project.repo_url) {
        links.push({
            label: 'Repository',
            href: project.repo_url,
            icon: <GithubIcon color="currentColor" className="h-4 w-4" />,
        });
    }

    if (project.demo_url) {
        links.push({
            label: 'Live demo',
            href: project.demo_url,
            icon: <ExternalLinkIcon className="h-4 w-4" />,
        });
    }

    return links;
}

function toCard(project: Project): CardDetail {
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
        links: toLinks(project),
        confidential: project.confidential,
    };
}

const projects = getProjects().sort((a, b) => b.start_date.getTime() - a.start_date.getTime());

export default function Projects() {
    return (
        <div className="flex flex-1 flex-col items-center font-sans">
            <section className="w-full max-w-6xl space-y-8 px-6 py-12 md:flex md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden md:px-12 [@media(min-height:900px)]:py-24 2xl:max-w-5xl">
                <header className="space-y-3 text-center text-balance text-white md:text-start">
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        <strong className="text-primary">P</strong>rojects
                    </h1>
                    <p className="text-white/70">
                        A selection of what I&rsquo;ve built &mdash; backend services, platform tooling and full stack products.
                        Tap a card to flip it for the full story, the tech stack and a repository link where the code is public.
                    </p>
                </header>

                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:min-h-0 md:flex-1 md:overflow-y-auto md:overscroll-contain md:pr-2 lg:grid-cols-3 [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent] scrollbar-thin">
                    {projects.map((project) => (
                        <li key={project.id}>
                            <Card
                                item={toCard(project)}
                                className="w-full"
                                back={<TechStack items={project.tech_stack} label="Tech stack" />}
                            >
                                <TechStack items={project.tech_stack} max={4} />
                            </Card>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
