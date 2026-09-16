import site from "@/app/global/config/site";
import { mediaUrl } from "@/app/global/config/api";
import getContent from "@/app/global/api/content";

type AboutCopy = Omit<AboutContent, 'facts' | 'experiences' | 'profile'> & {
    profile: Omit<ProfileCard, 'name' | 'portrait'> & { portrait: string },
};

export default async function getAboutCopy(): Promise<Omit<AboutContent, 'facts' | 'experiences'>> {
    const copy = await getContent<AboutCopy>('about');

    return {
        ...copy,
        profile: {
            ...copy.profile,
            name: site.owner,
            portrait: {
                src: mediaUrl(copy.profile.portrait),
                alt: site.owner,
            },
        },
    };
}
