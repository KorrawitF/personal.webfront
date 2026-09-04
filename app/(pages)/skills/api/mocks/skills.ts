export default function getSkillsCopy(): Omit<SkillsContent, 'domains'> {
    return {
        header: {
            title: "Skills",
            lead: "One tree per domain, rooted in the thing it all grows from and branching into the specifics. Pick any node to see the tools behind it, what I use it for, and where it has actually shipped. Dashed nodes are on the roadmap rather than on my CV.",
        },
        detail: {
            levels: [
                "On the roadmap",
                "Familiar",
                "Working knowledge",
                "Proficient",
                "Advanced",
                "Daily driver",
            ],
            tools: "Tools",
            use_cases: "Use cases",
            experience: "Experience",
            no_experience: "Nothing shipped with this yet — it is on the list, not on my CV.",
        },
    };
}
