export default function getProjectsCopy(): Omit<ProjectsContent, 'projects'> {
    return {
        header: {
            title: "Projects",
            lead: "A selection of what I’ve built — backend services, platform tooling and full stack products. Tap a card to flip it for the full story, the tech stack and a repository link where the code is public.",
        },
        links: {
            repository: "Repository",
            demo: "Live demo",
        },
        tech_stack_label: "Tech stack",
        present: "Present",
    };
}
