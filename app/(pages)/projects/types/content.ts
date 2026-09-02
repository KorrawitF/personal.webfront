export {}

declare global {
    type ProjectsContent = {
        header: PageHeader,
        /** Keyed by link kind, so the page can pair each label with its icon. */
        links: {
            repository: string,
            demo: string,
        },
        tech_stack_label: string,
        /** Shown instead of an end date for an ongoing project. */
        present: string,
        projects: Project[],
    }
}
