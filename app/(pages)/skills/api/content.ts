import getContent from "@/app/global/api/content";

export default async function getSkillsCopy(): Promise<Omit<SkillsContent, 'domains'>> {
    return getContent<Omit<SkillsContent, 'domains'>>('skills');
}
