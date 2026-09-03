export {}

declare global {
    type SkillDetailLabels = {
        levels: string[],
        tools: string,
        use_cases: string,
        experience: string,
        no_experience: string,
    }

    type SkillsContent = {
        header: PageHeader,
        detail: SkillDetailLabels,
        domains: SkillDomain[],
    }
}
