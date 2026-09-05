import site from "@/app/global/config/site";
import getContent from "@/app/global/api/content";

type HomeCopy = Omit<HomeContent, 'name' | 'portrait'>;

export default async function getHomeContent(): Promise<HomeContent> {
    const copy = await getContent<HomeCopy>('home');

    return {
        ...copy,
        name: site.owner,
        portrait: {
            src: "/profile.jpg",
            alt: site.owner,
        },
    };
}
