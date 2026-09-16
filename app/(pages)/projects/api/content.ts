import getContent from "@/app/global/api/content";

const FALLBACK: Omit<ProjectsContent, 'projects'> = {
    header: { title: 'Projects', lead: '' },
    links: { repository: 'Repository', demo: 'Demo' },
    tech_stack_label: 'Tech stack',
};

export default async function getProjectsCopy(): Promise<Omit<ProjectsContent, 'projects'>> {
    return getContent<Omit<ProjectsContent, 'projects'>>('projects', FALLBACK);
}
