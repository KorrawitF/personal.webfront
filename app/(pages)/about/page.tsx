import TimeLine from "@/app/global/components/timeline";
import getExperiences from "./api/mocks/about";
import { options } from "@/app/global/constants/DateFormat";

const timeline : TimeLineItem[] = getExperiences().map((exp) => {
    return   {
            id: exp.id,
            start_date: exp.start_date.toLocaleDateString('en-Us', options),
            end_date: exp.end_date ? exp.end_date.toLocaleDateString('en-Us', options) : 'Present',
            title: exp.job_title,
            subtitle: exp.company_name,
            detail: exp.detail,
            icon: exp.icon,
            children: exp.tech_stack?.length ? (
                <ul className="flex flex-wrap gap-2">
                    {exp.tech_stack.map((tech) => (
                        <li key={tech} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-secondary">
                            {tech}
                        </li>
                    ))}
                </ul>
            ) : undefined,
        }
});


export default function About() {
    return (
        <div className="flex flex-1 flex-col items-center font-sans">
            <section className="grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 md:items-start md:gap-12 md:px-12 xl:py-24 2xl:max-w-5xl">
                <div className="min-w-0 space-y-4 text-center text-balance text-white md:text-start">
                    <p>I&rsquo;m a Software Engineer with 3+ years of experience building scalable backend services, APIs, and cloud-native applications.</p>
                    <p>I work primarily with Go, PHP/Laravel, React, Vue, and Kubernetes, with a focus on system design, microservices, DevOps, and automation.</p>
                    <p>I enjoy solving complex problems, designing reliable systems, and turning ideas into practical software. I&rsquo;ve worked on ERP, warehouse management, banking integrations, and AI-powered automation across the full software development lifecycle.</p>
                </div>
                <TimeLine
                    className="md:max-h-[70dvh] md:overflow-y-auto md:overscroll-contain [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent] scrollbar-thin"
                    items={timeline}
                />
            </section>
        </div>
    );
}
