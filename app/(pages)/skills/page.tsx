import type { Metadata } from "next";
import getSkillDomains from "./api/mocks/skills";
import SkillExplorer from "./components/skill-explorer";

export const metadata: Metadata = {
  title: "Skills",
};

const domains = getSkillDomains();

export default function Skills() {
    return (
        <div className="flex flex-1 flex-col items-center font-sans">
            <section className="w-full max-w-6xl space-y-6 px-6 py-12 lg:flex lg:max-h-[calc(100dvh-5rem)] lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-hidden lg:px-12 xl:max-w-7xl [@media(min-height:900px)]:py-16">
                <header className="shrink-0 space-y-3 text-center text-balance text-white md:text-start">
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        <strong className="text-primary">S</strong>kills
                    </h1>
                    <p className="text-white/70">
                        One tree per domain, rooted in the thing it all grows from and branching into the specifics.
                        Pick any node to see the tools behind it, what I use it for, and where it has actually shipped.
                        Dashed nodes are on the roadmap rather than on my CV.
                    </p>
                </header>

                <SkillExplorer domains={domains} />
            </section>
        </div>
    );
}
