import site from "@/app/global/config/site";
import { mediaUrl } from "@/app/global/config/api";
import getContent from "@/app/global/api/content";

type HomeCopy = Omit<HomeContent, 'name' | 'portrait'> & { portrait: string };

export default async function getHomeContent(): Promise<HomeContent> {
    const copy = await getContent<HomeCopy>('home');

    return {
        ...copy,
        name: site.owner,
        portrait: {
            src: mediaUrl(copy.portrait),
            alt: site.owner,
        },
    };
}
