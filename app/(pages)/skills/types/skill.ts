export {}

declare global {
    type SkillExperience = {
        id: number,
        title: string,
        org?: string,
        period: string,
        detail: string,
    }

    type Skill = {
        id: string,
        name: string,
        parent?: string,
        level: number,
        icon?: string,
        summary: string,
        tools: string[],
        use_cases: string[],
        experiences: SkillExperience[],
    }

    type SkillDomain = {
        id: string,
        name: string,
        color: string,
        summary: string,
        skills: Skill[],
    }

    type SkillPoint = {
        x: number,
        y: number,
        radius: number,
    }

    type SkillNode = SkillPoint & {
        skill: Skill,
        depth: number,
    }

    type SkillEdge = {
        id: string,
        from: SkillPoint,
        to: SkillNode,
        parent?: string,
    }

    type SkillTreeLayout = {
        width: number,
        height: number,
        root: SkillPoint,
        nodes: SkillNode[],
        edges: SkillEdge[],
    }

    type SkillSelection = {
        domain: SkillDomain,
        skill: Skill,
    }

    type SkillExplorerProps = {
        domains: SkillDomain[],
        labels: SkillDetailLabels,
        tech_stack: TechStackLabels,
    }

    type SkillTreeProps = {
        domain: SkillDomain,
        selectedId: string,
        activeIds: Set<string>,
        onSelect: (domain: SkillDomain, skill: Skill) => void,
    }

    type SkillDetailProps = {
        domain: SkillDomain,
        skill: Skill,
        labels: SkillDetailLabels,
        tech_stack: TechStackLabels,
        className?: string,
    }
}
