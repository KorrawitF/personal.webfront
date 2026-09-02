export {}

declare global {
    type ProfileCard = {
        name: string,
        role: string,
        tags: string[],
        portrait: Portrait,
    }

    type Fact = {
        label: string,
        value: string,
    }

    type AboutContent = {
        header: PageHeader,
        profile: ProfileCard,
        /** The first paragraph carries the accent rule; the rest are supporting copy. */
        paragraphs: string[],
        facts: Fact[],
        toolkit_label: string,
        /** Shown instead of an end date for the current role. */
        present: string,
        experience_label: string,
        /** Takes a {count} placeholder. */
        experience_count: string,
        experiences: Experience[],
    }
}
