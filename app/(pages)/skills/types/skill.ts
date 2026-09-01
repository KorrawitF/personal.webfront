export {}

declare global {
    /** Where a skill was actually used - a job, a project or a piece of a system. */
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
        /** The skill this one branches from, inside the same domain. Omitted for the domain root. */
        parent?: string,
        /** 0 marks a locked node - on the roadmap, not practised yet. */
        level: number,
        icon?: string,
        summary: string,
        tools: string[],
        use_cases: string[],
        experiences: SkillExperience[],
    }

    /** One tree on the canvas: a family of skills growing out of the same root. */
    type SkillDomain = {
        id: string,
        name: string,
        /** Branch colour, used for the edges, the node rings and the domain label. */
        color: string,
        summary: string,
        skills: Skill[],
    }

    /** A skill placed on the canvas by the tree layout. */
    type SkillNode = {
        skill: Skill,
        depth: number,
        x: number,
        y: number,
        radius: number,
    }

    type SkillEdge = {
        id: string,
        from: SkillNode,
        to: SkillNode,
    }

    type SkillTreeLayout = {
        width: number,
        height: number,
        nodes: SkillNode[],
        edges: SkillEdge[],
    }

    type SkillSelection = {
        domain: SkillDomain,
        skill: Skill,
    }

    type SkillExplorerProps = {
        domains: SkillDomain[],
    }

    type SkillTreeProps = {
        domain: SkillDomain,
        selectedId: string,
        /** The selected node and its ancestors, so the branch leading to it lights up. */
        activeIds: Set<string>,
        onSelect: (domain: SkillDomain, skill: Skill) => void,
    }

    type SkillDetailProps = {
        domain: SkillDomain,
        skill: Skill,
        className?: string,
    }
}
