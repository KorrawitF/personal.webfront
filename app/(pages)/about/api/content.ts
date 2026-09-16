import site from "@/app/global/config/site";
import { mediaUrl } from "@/app/global/config/api";
import getContent from "@/app/global/api/content";

type AboutCopy = Omit<AboutContent, 'facts' | 'experiences' | 'profile'> & {
    profile: Omit<ProfileCard, 'name' | 'portrait'> & { portrait: string },
};

const FALLBACK: AboutCopy = {
    header: { title: 'About', lead: '' },
    profile: { role: '', tags: [], portrait: '' },
    paragraphs: [],
    toolkit_label: 'Toolkit',
    present: 'Present',
    experience_label: 'Experience',
    experience_count: '{count} roles',
};

export default async function getAboutCopy(): Promise<Omit<AboutContent, 'facts' | 'experiences'>> {
    const copy = await getContent<AboutCopy>('about', FALLBACK);

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
