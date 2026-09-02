export {}

declare global {
    /** Copy for the detail panel beside the trees. */
    type SkillDetailLabels = {
        /** One entry per level, indexed by `Skill.level` — index 0 is a locked node. */
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
