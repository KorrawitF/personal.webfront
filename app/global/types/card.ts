import type { ReactNode } from "react";

declare global {
    type CardLink = {
        label: string,
        href: string,
        icon?: ReactNode,
    }

    type CardDetail = {
        id: number | string,
        title: string,
        subtitle?: string,
        summary?: string,
        detail?: string,
        banner?: string,
        icon?: ReactNode,
        period?: string,
        status?: string,
        highlights?: string[],
        links?: CardLink[],
        confidential?: boolean,
    }

    type CardProps = {
        item: CardDetail,
        labels: CardLabels,
        flippable?: boolean,
        defaultFlipped?: boolean,
        className?: string,
        children?: ReactNode,
        back?: ReactNode,
    }

    type CardListProps = {
        items: CardDetail[],
        flippable?: boolean,
        className?: string,
    }
}
