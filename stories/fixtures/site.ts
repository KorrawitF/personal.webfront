import site from "@/app/global/config/site";

/**
 * Stories render components in isolation and must not depend on a running
 * backend, so this stands in for the real `getSiteContent` (which now hits
 * the CMS) with the same shape.
 */
export default async function getSiteContent(): Promise<SiteContent> {
    return {
        title: site.title,
        brand: site.brand,
        url: site.url,
        locale: site.locale,
        open_menu: "Open main menu",
        close_menu: "Close main menu",
        card: {
            view_details: "View details",
            show_details: "Show more details about {title}",
            hide_details: "Hide details about {title}",
            confidential: "Private repository — source is not public.",
        },
        tech_stack: {
            more: "+{count} more",
        },
    };
}
