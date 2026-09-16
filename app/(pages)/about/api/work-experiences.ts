import client, { isConnectionError } from "@/app/global/lib/api";

type BackendWorkExperience = {
    id: number,
    jobTitle: string,
    companyName: string,
    detail: string,
    techStack: string[] | null,
    icon: string | null,
    startDate: string,
    endDate: string | null,
};

function toExperience(experience: BackendWorkExperience): Experience {
    return {
        id: experience.id,
        job_title: experience.jobTitle,
        company_name: experience.companyName,
        detail: experience.detail,
        tech_stack: experience.techStack ?? [],
        icon: experience.icon ?? undefined,
        start_date: new Date(experience.startDate),
        end_date: experience.endDate ? new Date(experience.endDate) : undefined,
    };
}

export default async function getWorkExperiences(): Promise<Experience[]> {
    let experiences: BackendWorkExperience[];
    try {
        experiences = await client.get<BackendWorkExperience[]>('/work-experiences');
    } catch (error) {
        if (isConnectionError(error)) {
            return [];
        }
        throw error;
    }

    return experiences.map(toExperience);
}
