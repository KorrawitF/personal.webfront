import type { ReactNode } from "react";

declare global {
    type CardLink = {
        label: string,
        href: string,
        /**
         * Icon rendered before the label. The caller supplies the node so the
         * card doesn't need to know which kinds of link exist.
         */
        icon?: ReactNode,
    }

    /**
     * The content of a single card. Every field except `id` and `title` is
     * optional so the same shape fits projects, articles, certificates, etc.
     */
    type CardDetail = {
        id: number | string,
        title: string,
        subtitle?: string,
        /** Short teaser shown on the front face. */
        summary?: string,
        /** Long description shown on the back face. */
        detail?: string,
        /** Banner image url rendered at the top of the front face. */
        banner?: string,
        /** Small logo/avatar shown next to the title. */
        icon?: string,
        /** e.g. "Jan 2025 - Present" */
        period?: string,
        /** e.g. "Production", "Archived", "In progress" */
        status?: string,
        /** Bullet points shown on the back face. */
        highlights?: string[],
        links?: CardLink[],
        /**
         * Marks work that cannot be shared publicly. When true the card hides
         * every link and shows a "private" notice instead.
         */
        confidential?: boolean,
    }

    type CardProps = {
        item: CardDetail,
        /** Turns the card into a two-sided card that flips on click. Defaults to true. */
        flippable?: boolean,
        /** Starts the card on its back face. Only used when `flippable`. */
        defaultFlipped?: boolean,
        className?: string,
        /**
         * Free-form content for the bottom of the front face, e.g. a
         * `<TechStack />`. Kept as a slot so the card stays content-agnostic.
         */
        children?: ReactNode,
        /** Free-form content appended to the back face, below the highlights. */
        back?: ReactNode,
    }

    type CardListProps = {
        items: CardDetail[],
        flippable?: boolean,
        className?: string,
    }
}
