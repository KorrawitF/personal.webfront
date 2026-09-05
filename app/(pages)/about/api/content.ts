import site from "@/app/global/config/site";
import getContent from "@/app/global/api/content";

type AboutCopy = Omit<AboutContent, 'facts' | 'experiences' | 'profile'> & {
    profile: Omit<ProfileCard, 'name' | 'portrait'>,
};

export default async function getAboutCopy(): Promise<Omit<AboutContent, 'facts' | 'experiences'>> {
    const copy = await getContent<AboutCopy>('about');

    return {
        ...copy,
        profile: {
            ...copy.profile,
            name: site.owner,
            portrait: {
                src: "/profile.jpg",
                alt: site.owner,
            },
        },
    };
}
