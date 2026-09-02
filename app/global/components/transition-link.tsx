'use client'

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePathname } from "next/navigation";
import direction from "../utils/navigation";

/** A link that tags its navigation with a direction, so the page slides the way the navbar reads. */
export default function TransitionLink({ href, ...props }: ComponentProps<typeof Link>) {
    const pathname = usePathname();

    return <Link {...props} href={href} transitionTypes={direction(pathname, String(href))} />;
}
