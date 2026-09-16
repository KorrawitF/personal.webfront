import Image from "@/app/global/components/image";
import TechStack from "@/app/global/components/tech-stack";

const MAX_LEVEL = 5;
const SCROLLER = "min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain pr-1 [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent] scrollbar-thin";

// Levels 1-2 -> Beginner, 3 -> Intermediate, 4 -> Advance, 5 -> Expert.
const LEVEL_LABELS = ["Beginner", "Beginner", "Intermediate", "Advanced", "Expert"];

function levelLabel(level: number): string {
    return LEVEL_LABELS[Math.max(0, level - 1)] ?? LEVEL_LABELS[0];
}

function Heading({ children }: { children: string }) {
    return <h3 className="text-xs font-semibold uppercase tracking-wide text-white/50">{children}</h3>;
}

export default function SkillDetail({ domain, skill, labels, tech_stack, className = '' }: SkillDetailProps) {
    const locked = skill.level === 0;

    return (
        <aside
            className={`flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg shadow-black/30 ${className}`}
            aria-live="polite"
        >
            <header className="shrink-0 space-y-3">
                <div className="flex items-start gap-3">
                    <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2"
                        style={{
                            borderColor: locked ? 'rgba(255,255,255,0.22)' : domain.color,
                            borderStyle: locked ? 'dashed' : 'solid',
                            background: `color-mix(in srgb, ${domain.color} 15%, transparent)`,
                        }}
                    >
                        {skill.icon
                            ? (
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 p-1.5">
                                    <Image className="h-full w-full object-contain" src={skill.icon} alt="" />
                                </span>
                            )
                            : <span className="text-sm font-bold" style={{ color: domain.color }}>{skill.name.slice(0, 2).toUpperCase()}</span>}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p
                            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                            style={{ color: domain.color }}
                        >
                            {domain.name}
                        </p>
                        <h2 className="text-lg font-semibold wrap-break-word text-primary sm:text-xl">{skill.name}</h2>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="flex items-center gap-1" aria-hidden="true">
                        {Array.from({ length: MAX_LEVEL }, (_, index) => (
                            <span
                                key={index}
                                className="h-1.5 w-6 rounded-full"
                                style={{ background: index < skill.level ? domain.color : 'rgba(255,255,255,0.15)' }}
                            />
                        ))}
                    </span>
                    <span className="text-sm text-white/70">
                        {levelLabel(skill.level)}
                        <span className="text-white/40"> &middot; {skill.level}/{MAX_LEVEL}</span>
                    </span>
                </div>
            </header>

            <div className={SCROLLER}>
                <p className="text-sm wrap-break-word text-white/75">{skill.summary}</p>

                <TechStack items={skill.tools} label={labels.tools} labels={tech_stack} />

                {skill.use_cases.length > 0 && (
                    <section className="space-y-1.5">
                        <Heading>{labels.use_cases}</Heading>
                        <ul className="ms-4 list-disc space-y-1 text-sm text-white/70 marker:text-primary">
                            {skill.use_cases.map((useCase) => (
                                <li key={useCase} className="wrap-break-word">{useCase}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {skill.experiences.length > 0 && (
                    <section className="space-y-2">
                        <Heading>{labels.experience}</Heading>
                        <ol className="space-y-3">
                            {skill.experiences.map((experience) => (
                                <li
                                    key={experience.id}
                                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                                    style={{ borderLeft: `3px solid ${domain.color}` }}
                                >
                                    <p className="text-sm font-medium wrap-break-word text-secondary">{experience.title}</p>
                                    <p className="text-xs text-white/50">
                                        {experience.org && <>{experience.org} </>}
                                    </p>
                                    <p className="mt-1.5 text-sm wrap-break-word text-white/70">{experience.detail}</p>
                                </li>
                            ))}
                        </ol>
                    </section>
                )}
            </div>
        </aside>
    );
}
