import site from "@/app/global/config/site";
import getContent from "./content";

type SiteCopy = Pick<SiteContent, 'open_menu' | 'close_menu' | 'card' | 'tech_stack'>;

export default async function getSiteContent(): Promise<SiteContent> {
    const copy = await getContent<SiteCopy>('site');

    return {
        title: site.title,
        brand: site.brand,
        url: site.url,
        locale: site.locale,
        ...copy,
    };
}
