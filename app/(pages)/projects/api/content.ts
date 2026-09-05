import getContent from "@/app/global/api/content";

export default async function getProjectsCopy(): Promise<Omit<ProjectsContent, 'projects'>> {
    return getContent<Omit<ProjectsContent, 'projects'>>('projects');
}
