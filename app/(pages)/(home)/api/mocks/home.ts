import { getResumeMail } from "../../../contact/api/mocks/contact";

export default async function getHomeContent(): Promise<HomeContent> {
    return {
        eyebrow: "Full Stack Developer",
        greeting: "Hi, I’m",
        name: "Korrawit Soodnalao",
        intro: "I’m a Software Engineer focused on building scalable systems, solving challenging problems, and turning ideas into software that works.",
        actions: [
            { label: "View my work", href: "/projects" },
            { label: "Get in touch", href: "/contact" },
        ],
        portrait: {
            src: "/profile.jpg",
            alt: "Korrawit Soodnalao",
        },
        // The same channels the résumé mail hands out, so both stay in step.
        channels: getResumeMail().contact_back.filter((channel) => channel.href),
    };
}
