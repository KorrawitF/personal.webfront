type Project = {
    id: number,
    name: string,
    role?: string,
    icon?: string,
    banner?: string,
    summary: string,
    detail: string,
    tech_stack: string[],
    highlights?: string[],
    /** Left out for work that cannot be shared publicly. */
    repo_url?: string,
    demo_url?: string,
    status?: string,
    /** Hides every link and shows a "private repository" notice on the card. */
    confidential?: boolean,
    start_date: Date,
    end_date?: Date,
}
