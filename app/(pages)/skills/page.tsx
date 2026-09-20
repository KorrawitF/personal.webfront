'use cache'
cacheLife('hours')
import { Suspense } from "react";
import type { Metadata } from "next";
import getSiteContent from "@/app/global/api/site";
import getSkillsCopy from "./api/content";
import getSkillDomains from "./api/skill-domains";
import PageTransition from "@/app/global/components/page-transition";
import SkillExplorer from "./components/skill-explorer";

export async function generateMetadata(): Promise<Metadata> {
    const { header } = await getSkillsCopy();

    return { title: header.title };
}

async function SkillExplorerSection({ labels }: { labels: SkillDetailLabels }) {
    const [domains, site] = await Promise.all([getSkillDomains(), getSiteContent()]);

    return <SkillExplorer domains={domains} labels={labels} tech_stack={site.tech_stack} />;
}

export default async function Skills() {
    const { header, detail } = await getSkillsCopy();

    return (
        <PageTransition>
            <section className="w-full max-w-6xl space-y-6 px-6 py-12 lg:flex lg:max-h-[calc(100dvh-5rem)] lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-hidden lg:px-12 xl:max-w-7xl [@media(min-height:900px)]:py-16">
                <header className="reveal shrink-0 space-y-3 text-center text-balance text-white md:text-start">
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        <strong className="text-primary">{header.title.charAt(0)}</strong>
                        {header.title.slice(1)}
                    </h1>
                    <p className="text-white/70">{header.lead}</p>
                </header>

                <Suspense fallback={<p className="text-white/50">Loading skills…</p>}>
                    <SkillExplorerSection labels={detail} />
                </Suspense>
            </section>
        </PageTransition>
    );
}
