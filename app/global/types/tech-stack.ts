export {}

declare global {
    type TechStackProps = {
        items: string[],
        /** Small heading rendered above the chips. */
        label?: string,
        /** Show at most this many chips, then a "+n more" chip. Unset shows all. */
        max?: number,
        className?: string,
    }
}
