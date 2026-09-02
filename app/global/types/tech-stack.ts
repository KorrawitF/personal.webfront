export {}

declare global {
    type TechStackProps = {
        items: string[],
        label?: string,
        max?: number,
        labels?: TechStackLabels,
        className?: string,
    }
}
