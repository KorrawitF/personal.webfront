'use client'

import { useMemo } from "react";
import Image from "@/app/global/components/image";
import layoutSkillTree, { COLUMN } from "../utils/tree-layout";

const MAX_LEVEL = 5;
/** The domain label may run wider than the column its node sits in. */
const LABEL = COLUMN + 48;

function initials(name: string): string {
    return name
        .split(/[\s&/.]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase();
}

function path(edge: SkillEdge): string {
    const middle = (edge.from.y + edge.to.y) / 2;

    return `M ${edge.from.x} ${edge.from.y} C ${edge.from.x} ${middle}, ${edge.to.x} ${middle}, ${edge.to.x} ${edge.to.y}`;
}

function Meter({ level, color }: { level: number, color: string }) {
    return (
        <span className="flex items-center gap-0.75" aria-hidden="true">
            {Array.from({ length: MAX_LEVEL }, (_, index) => (
                <span
                    key={index}
                    className="h-1 w-1.5 rounded-full"
                    style={{ background: index < level ? color : 'rgba(255,255,255,0.18)' }}
                />
            ))}
        </span>
    );
}

export default function SkillTree({ domain, selectedId, activeIds, onSelect }: SkillTreeProps) {
    const layout = useMemo(() => layoutSkillTree(domain), [domain]);

    return (
        <section
            className="relative shrink-0"
            style={{ width: layout.width, height: layout.height }}
            aria-label={`${domain.name} skill tree`}
        >
            <svg
                className="pointer-events-none absolute inset-0"
                width={layout.width}
                height={layout.height}
                aria-hidden="true"
            >
                {layout.edges.map((edge) => {
                    const locked = edge.to.skill.level === 0;
                    // An edge off the domain node has no parent skill to light up with.
                    const active = activeIds.has(edge.to.skill.id) && (!edge.parent || activeIds.has(edge.parent));

                    return (
                        <path
                            key={edge.id}
                            d={path(edge)}
                            fill="none"
                            stroke={domain.color}
                            strokeWidth={active ? 4 : 3}
                            strokeLinecap="round"
                            strokeDasharray={locked ? '4 7' : undefined}
                            opacity={locked ? 0.3 : active ? 1 : 0.55}
                            style={active ? { filter: `drop-shadow(0 0 6px ${domain.color})` } : undefined}
                        />
                    );
                })}
            </svg>

            {/* The domain itself: the trunk every branch grows from, not a skill you can pick. */}
            <p
                className="absolute flex flex-col items-center gap-1.5 leading-tight"
                style={{
                    left: layout.root.x - LABEL / 2,
                    top: layout.root.y - layout.root.radius,
                    width: LABEL,
                }}
            >
                <span
                    aria-hidden="true"
                    className="flex items-center justify-center rounded-full border-2 backdrop-blur-sm"
                    style={{
                        width: layout.root.radius * 2,
                        height: layout.root.radius * 2,
                        borderColor: domain.color,
                        background: `color-mix(in srgb, ${domain.color} 18%, transparent)`,
                    }}
                >
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: domain.color }} />
                </span>
                <span
                    className="text-center text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: domain.color }}
                >
                    {domain.name}
                </span>
            </p>

            <ul>
                {layout.nodes.map((node) => {
                    const { skill } = node;
                    const locked = skill.level === 0;
                    const selected = skill.id === selectedId;
                    const size = node.radius * 2;

                    return (
                        <li
                            key={skill.id}
                            className="absolute"
                            style={{ left: node.x - COLUMN / 2, top: node.y - node.radius, width: COLUMN }}
                        >
                            <button
                                type="button"
                                onClick={() => onSelect(domain, skill)}
                                aria-pressed={selected}
                                aria-label={`${skill.name}, ${skill.level} of ${MAX_LEVEL}`}
                                title={`${skill.name} - ${skill.level}/${MAX_LEVEL}`}
                                className="group flex w-full cursor-pointer flex-col items-center gap-1 rounded-xl px-1 pb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                            >
                                <span
                                    className="flex items-center justify-center rounded-full border-2 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none"
                                    style={{
                                        width: size,
                                        height: size,
                                        borderColor: locked ? 'rgba(255,255,255,0.22)' : domain.color,
                                        borderStyle: locked ? 'dashed' : 'solid',
                                        background: locked
                                            ? 'rgba(255,255,255,0.04)'
                                            : `color-mix(in srgb, ${domain.color} 18%, transparent)`,
                                        boxShadow: selected
                                            ? `0 0 0 4px color-mix(in srgb, ${domain.color} 30%, transparent), 0 0 22px color-mix(in srgb, ${domain.color} 55%, transparent)`
                                            : undefined,
                                    }}
                                >
                                    {skill.icon ? (
                                        <Image
                                            className={`h-5 w-5 object-contain ${locked ? 'opacity-40' : ''}`}
                                            src={skill.icon}
                                            alt=""
                                        />
                                    ) : (
                                        <span
                                            aria-hidden="true"
                                            className="text-xs font-bold"
                                            style={{ color: locked ? 'rgba(255,255,255,0.45)' : domain.color }}
                                        >
                                            {initials(skill.name)}
                                        </span>
                                    )}
                                </span>

                                {/* A plate, so the branch running up from the tier below cannot
                                    cut through the name. */}
                                <span className="flex max-w-full flex-col items-center gap-1 rounded-md bg-background/90 px-1.5 py-0.5">
                                    <span
                                        className={`text-center text-[11px] leading-tight wrap-break-word ${
                                            selected ? 'font-semibold text-white' : locked ? 'text-white/40' : 'text-white/75'
                                        }`}
                                    >
                                        {skill.name}
                                    </span>
                                    {locked
                                        ? <span className="text-[10px] leading-none text-white/35">0/{MAX_LEVEL}</span>
                                        : <Meter level={skill.level} color={domain.color} />}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
