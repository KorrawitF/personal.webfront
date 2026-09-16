import site from "@/app/global/config/site";
import getContent from "./content";

type SiteCopy = Pick<SiteContent, 'open_menu' | 'close_menu' | 'card' | 'tech_stack'>;

const FALLBACK: SiteCopy = {
    open_menu: 'Open menu',
    close_menu: 'Close menu',
    card: {
        view_details: 'View details',
        show_details: 'Show details for {title}',
        hide_details: 'Hide details for {title}',
        confidential: 'Confidential',
    },
    tech_stack: {
        more: '+{count} more',
    },
};

export default async function getSiteContent(): Promise<SiteContent> {
    const copy = await getContent<SiteCopy>('site', FALLBACK);

    return {
        title: site.title,
        brand: site.brand,
        url: site.url,
        locale: site.locale,
        ...copy,
    };
}
