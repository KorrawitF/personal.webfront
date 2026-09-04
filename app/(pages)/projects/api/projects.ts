import client from "@/app/global/lib/api";

type BackendProject = {
    id: number,
    name: string,
    role: string | null,
    icon: string | null,
    banner: string | null,
    summary: string,
    detail: string,
    techStack: string[] | null,
    highlights: string[] | null,
    repoUrl: string | null,
    demoUrl: string | null,
    status: string | null,
    confidential: boolean | null,
    startDate: string,
    endDate: string | null,
};

function toProject(project: BackendProject): Project {
    return {
        id: project.id,
        name: project.name,
        role: project.role ?? undefined,
        icon: project.icon ?? undefined,
        banner: project.banner ?? undefined,
        summary: project.summary,
        detail: project.detail,
        tech_stack: project.techStack ?? [],
        highlights: project.highlights ?? undefined,
        repo_url: project.repoUrl ?? undefined,
        demo_url: project.demoUrl ?? undefined,
        status: project.status ?? undefined,
        confidential: project.confidential ?? undefined,
        start_date: new Date(project.startDate),
        end_date: project.endDate ? new Date(project.endDate) : undefined,
    };
}

export default async function getProjects(): Promise<Project[]> {
    const projects = await client.get<BackendProject[]>('/projects');

    return projects.map(toProject);
}
