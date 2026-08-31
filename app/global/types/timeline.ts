import type { ReactNode } from "react";

declare global {
    type TimeLineItem = {
        id: number | string,
        start_date: string,
        end_date?: string,
        title: string,
        subtitle?: string,
        detail?: string,
        icon?: string,
        children?: ReactNode,
    }

    type TimeLineProps = {
        items: TimeLineItem[],
        className?: string,
    }
}