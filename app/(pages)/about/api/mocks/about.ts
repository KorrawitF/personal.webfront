import site from "@/app/global/config/site";

export default function getAboutCopy(): Omit<AboutContent, 'facts' | 'experiences'> {
    return {
        header: {
            title: "About",
            lead: "A Software Engineer with 3+ years of experience building scalable backend services, APIs and cloud-native applications — here’s the short version, and the roles that got me here.",
        },
        profile: {
            name: site.owner,
            role: "Full Stack Developer",
            tags: ["Backend", "Cloud", "DevOps"],
            portrait: {
                src: "/profile.jpg",
                alt: site.owner,
            },
        },
        paragraphs: [
            "I work primarily with Go, PHP/Laravel, React, Vue and Kubernetes, with a focus on system design, microservices, DevOps and automation.",
            "I enjoy solving complex problems, designing reliable systems, and turning ideas into practical software.",
            "I’ve worked on ERP, warehouse management, banking integrations and AI-powered automation across the full software development lifecycle.",
        ],
        toolkit_label: "Core toolkit",
        present: "Present",
        experience_label: "Experience",
        experience_count: "{count} roles",
    };
}
