import getContent from "@/app/global/api/content";

const FALLBACK: Omit<SkillsContent, 'domains'> = {
    header: { title: 'Skills', lead: '' },
    detail: {
        levels: [],
        tools: '',
        use_cases: '',
        experience: '',
        no_experience: '',
    },
};

export default async function getSkillsCopy(): Promise<Omit<SkillsContent, 'domains'>> {
    return getContent<Omit<SkillsContent, 'domains'>>('skills', FALLBACK);
}
