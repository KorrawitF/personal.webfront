import site from "@/app/global/config/site";

export default function getExperiences(): Experience[] {
    return [
        {
            id: 1,
            job_title: "Full Stack Developer",
            company_name: "Ascend Group",
            detail: "Work as full stack developer",
            tech_stack: ["Golang", "NextJs", "Kafka", "Postgresql", "MySql"],
            start_date: new Date("2026-03-01"),
            icon: 'https://www.ascendcorp.com/wp-content/uploads/2025/02/Ascend_Logo.png',
        },
        {
            id: 2,
            job_title: "Backend Developer",
            company_name: "BJC(Big C)",
            detail: "Work as backend developer",
            tech_stack: ["Golang", "VueJs", "Kafka", "Postgresql", "MySql", "Python"],
            start_date: new Date("2025-09-01"),
            end_date: new Date("2026-02-01"),
            icon: "https://corporate.bigc.co.th/assets/images/logo-big.png",
        },
        {
            id: 3,
            job_title: "Backend Developer",
            company_name: "BJC(Big C)",
            detail: "Work as backend developer",
            tech_stack: ["Golang", "VueJs", "Kafka", "Postgresql", "MySql", "Python"],
            start_date: new Date("2025-09-01"),
            end_date: new Date("2026-02-01"),
            icon: "https://corporate.bigc.co.th/assets/images/logo-big.png",
        },
        {
            id: 4,
            job_title: "Backend Developer",
            company_name: "BJC(Big C)",
            detail: "Work as backend developer",
            tech_stack: ["Golang", "VueJs", "Kafka", "Postgresql", "MySql", "Python"],
            start_date: new Date("2025-09-01"),
            end_date: new Date("2026-02-01"),
            icon: "https://corporate.bigc.co.th/assets/images/logo-big.png",
        },
        {
            id: 5,
            job_title: "Backend Developer",
            company_name: "BJC(Big C)",
            detail: "Work as backend developer",
            tech_stack: ["Golang", "VueJs", "Kafka", "Postgresql", "MySql", "Python"],
            start_date: new Date("2025-09-01"),
            end_date: new Date("2026-02-01"),
            icon: "https://corporate.bigc.co.th/assets/images/logo-big.png",
        },
        {
            id: 6,
            job_title: "Backend Developer",
            company_name: "BJC(Big C)",
            detail: "Work as backend developer",
            tech_stack: ["Golang", "VueJs", "Kafka", "Postgresql", "MySql", "Python"],
            start_date: new Date("2025-09-01"),
            end_date: new Date("2026-02-01"),
            icon: "https://corporate.bigc.co.th/assets/images/logo-big.png",
        },
        {
            id: 7,
            job_title: "Backend Developer",
            company_name: "BJC(Big C)",
            detail: "Work as backend developer",
            tech_stack: ["Golang", "VueJs", "Kafka", "Postgresql", "MySql", "Python"],
            start_date: new Date("2025-09-01"),
            end_date: new Date("2026-02-01"),
            icon: "https://corporate.bigc.co.th/assets/images/logo-big.png",
        }
    ];
}

export async function getAboutContent(): Promise<AboutContent> {
    const experiences = getExperiences().sort((a, b) => b.start_date.getTime() - a.start_date.getTime());
    const toolkit = [...new Set(experiences.flatMap((exp) => exp.tech_stack ?? []))];
    const companies = new Set(experiences.map((exp) => exp.company_name)).size;

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
        facts: [
            { label: "Experience", value: "3+ yrs" },
            { label: "Companies", value: `${companies}` },
            { label: "Technologies", value: `${toolkit.length}` },
        ],
        toolkit_label: "Core toolkit",
        present: "Present",
        experience_label: "Experience",
        experience_count: "{count} roles",
        experiences,
    };
}
