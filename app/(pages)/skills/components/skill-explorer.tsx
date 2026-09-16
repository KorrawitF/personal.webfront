'use client'

import { startTransition, useEffect, useMemo, useRef, useState, ViewTransition } from "react";
import SkillDetail from "./skill-detail";
import SkillTree from "./skill-tree";

const CANVAS = "min-h-0 overflow-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4 [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent] scrollbar-thin";

function branch(domain: SkillDomain, skill: Skill): Set<string> {
    const byId = new Map(domain.skills.map((entry) => [entry.id, entry]));
    const ids = new Set<string>();

    let current: Skill | undefined = skill;

    while (current && !ids.has(current.id)) {
        ids.add(current.id);
        current = current.parent ? byId.get(current.parent) : undefined;
    }

    return ids;
}

export default function SkillExplorer({ domains, labels, tech_stack }: SkillExplorerProps) {
    const selections = useMemo<SkillSelection[]>(
        () => domains.flatMap((domain) => domain.skills.map((skill) => ({ domain, skill }))),
        [domains],
    );

    const fallback = selections.find((entry) => entry.skill.parent && entry.skill.level === 5) ?? selections[0];
    const [selectedId, setSelectedId] = useState(fallback?.skill.id);
    const selected = selections.find((entry) => entry.skill.id === selectedId) ?? fallback;
    const activeIds = useMemo(() => selected ? branch(selected.domain, selected.skill) : new Set<string>(), [selected]);

    const trees = useRef(new Map<string, HTMLDivElement | null>());
    const canvas = useRef<HTMLDivElement>(null);
    const detail = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const pane = canvas.current;

        if (pane) {
            pane.scrollTop = pane.scrollHeight;
        }
    }, []);

    const select = (domain: SkillDomain, skill: Skill) => {
        startTransition(() => setSelectedId(skill.id));

        if (window.matchMedia("(max-width: 1023px)").matches) {
            detail.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const focusDomain = (domain: SkillDomain) => {
        startTransition(() => setSelectedId(domain.skills[0].id));
        trees.current.get(domain.id)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

    if (!selected) {
        return null;
    }

    return (
        <div className="stagger flex min-h-0 flex-col gap-4 lg:flex-1 lg:overflow-hidden">
            <ul className="flex shrink-0 flex-wrap gap-2">
                {domains.map((domain) => {
                    const active = domain.id === selected.domain.id;

                    return (
                        <li key={domain.id}>
                            <button
                                type="button"
                                onClick={() => focusDomain(domain)}
                                aria-pressed={active}
                                className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                                    active ? 'border-white/40 bg-white/10 text-white' : 'border-white/15 bg-white/5 text-white/60 hover:text-white'
                                }`}
                            >
                                <span className="h-2 w-2 rounded-full" style={{ background: domain.color }} />
                                {domain.name}
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div className="grid min-h-0 grid-cols-1 gap-4 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_21rem] lg:overflow-hidden">
                <div ref={canvas} className={`${CANVAS} h-[58dvh] lg:h-auto`}>
                    <div className="mx-auto flex w-max items-end gap-8 pb-1">
                        {domains.map((domain) => (
                            <div
                                key={domain.id}
                                ref={(node) => {
                                    trees.current.set(domain.id, node);
                                }}
                                className="shrink-0"
                            >
                                <SkillTree
                                    domain={domain}
                                    selectedId={selectedId}
                                    activeIds={activeIds}
                                    onSelect={select}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div ref={detail} className="flex min-h-0 scroll-mt-20">
                    <ViewTransition key={selectedId} name="skill-detail" share="swap" default="none">
                        <SkillDetail
                            domain={selected.domain}
                            skill={selected.skill}
                            labels={labels}
                            tech_stack={tech_stack}
                            className="w-full lg:min-h-0"
                        />
                    </ViewTransition>
                </div>
            </div>
        </div>
    );
}
