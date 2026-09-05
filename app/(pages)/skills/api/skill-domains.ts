import client from "@/app/global/lib/api";

type BackendSkillExperience = {
    id: number,
    skillId: number,
    title: string,
    org?: string | null,
    detail: string,
};

type BackendSkill = {
    id: number,
    name: string | null,
    domainId: number,
    level: number,
    summary: string,
    experiences: BackendSkillExperience[] | null,
    tools: string[] | null,
    useCases: string[] | null,
    parent: string | null,
    icon: string | null,
};

type BackendSkillDomain = {
    id: number,
    name: string,
    color: string,
    summary: string,
    skills: BackendSkill[] | null,
};

/** Falls back to the icon slug, or the id, for rows created before `name` was backfilled. */
function toSkillName(skill: BackendSkill): string {
    if (skill.name) {
        return skill.name;
    }

    if (skill.icon) {
        return skill.icon.charAt(0).toUpperCase() + skill.icon.slice(1);
    }

    return `Skill ${skill.id}`;
}

function toExperience(experience: BackendSkillExperience): SkillExperience {
    return {
        id: experience.id,
        title: experience.title,
        org: experience.org ?? undefined,
        detail: experience.detail,
    };
}

function toSkill(skill: BackendSkill): Skill {
    return {
        id: String(skill.id),
        name: toSkillName(skill),
        parent: skill.parent ?? undefined,
        level: skill.level,
        icon: skill.icon?.startsWith('/') ? skill.icon : undefined,
        summary: skill.summary,
        tools: skill.tools ?? [],
        use_cases: skill.useCases ?? [],
        experiences: (skill.experiences ?? []).map(toExperience),
    };
}

function toDomain(domain: BackendSkillDomain): SkillDomain {
    return {
        id: String(domain.id),
        name: domain.name,
        color: domain.color,
        summary: domain.summary,
        skills: (domain.skills ?? []).map(toSkill),
    };
}

export default async function getSkillDomains(): Promise<SkillDomain[]> {
    const domains = await client.get<BackendSkillDomain[]>('/skill-domains');

    return domains.map(toDomain);
}
