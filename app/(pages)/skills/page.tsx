import type { Metadata } from "next";
import getSiteContent from "@/app/global/api/mocks/site";
import { getSkillsContent } from "./api/mocks/skills";
import PageTransition from "@/app/global/components/page-transition";
import SkillExplorer from "./components/skill-explorer";

export async function generateMetadata(): Promise<Metadata> {
    const content = await getSkillsContent();

    return { title: content.header.title };
}

export default async function Skills() {
    const [content, site] = await Promise.all([getSkillsContent(), getSiteContent()]);

    return (
        <PageTransition>
            <section className="w-full max-w-6xl space-y-6 px-6 py-12 lg:flex lg:max-h-[calc(100dvh-5rem)] lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-hidden lg:px-12 xl:max-w-7xl [@media(min-height:900px)]:py-16">
                <header className="reveal shrink-0 space-y-3 text-center text-balance text-white md:text-start">
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        <strong className="text-primary">{content.header.title.charAt(0)}</strong>
                        {content.header.title.slice(1)}
                    </h1>
                    <p className="text-white/70">{content.header.lead}</p>
                </header>

                <SkillExplorer domains={content.domains} labels={content.detail} tech_stack={site.tech_stack} />
            </section>
        </PageTransition>
    );
}
