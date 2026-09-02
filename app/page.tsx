import Link from "next/link";
import Image from "./global/components/image";
import GithubIcon from "./global/icons/github";
import LinkedInIcon from "./global/icons/linkedin";
import MailIcon from "./global/icons/mail";
import { getResumeMail } from "./(pages)/contact/api/mocks/contact";

const icons: Record<string, React.ReactNode> = {
    Email: <MailIcon className="h-5 w-5" />,
    LinkedIn: <LinkedInIcon className="h-5 w-5" color="currentColor" />,
    GitHub: <GithubIcon className="h-5 w-5" color="currentColor" />,
};

const channels = getResumeMail().contact_back.filter((channel) => channel.href);

export default function Home() {
    return (
        <div className="flex flex-1 flex-col items-center font-sans">
            <section className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 md:min-h-0 md:flex-1 md:grid-cols-5 md:gap-12 md:px-12 [@media(min-height:900px)]:py-24 2xl:max-w-5xl">
                <div className="order-2 flex flex-col items-center gap-6 text-center md:order-1 md:col-span-3 md:items-start md:text-start">
                    <p className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-secondary">
                        Full Stack Developer
                    </p>

                    <div className="space-y-3">
                        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                            Hi, I&rsquo;m <span className="text-primary">Korrawit Soodnalao</span>
                        </h1>
                        <p className="max-w-lg text-base text-white/70 sm:text-lg">
                            I&rsquo;m a Software Engineer focused on building scalable systems, solving challenging
                            problems, and turning ideas into software that works.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        <Link
                            href="/projects"
                            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            View my work
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            Get in touch
                        </Link>
                    </div>

                    <ul className="flex items-center gap-3">
                        {channels.map((channel) => (
                            <li key={channel.label}>
                                <a
                                    href={channel.href}
                                    target={channel.href?.startsWith('mailto:') ? undefined : '_blank'}
                                    rel="noreferrer noopener"
                                    aria-label={`${channel.label} — ${channel.value}`}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    {icons[channel.label]}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="order-1 mx-auto w-40 max-w-full sm:w-56 md:order-2 md:col-span-2 md:w-full">
                    <div className="relative">
                        <div aria-hidden="true" className="absolute -inset-6 rounded-full bg-primary/15 blur-3xl" />
                        <div className="relative aspect-square overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-lg shadow-black/40 md:rounded-3xl">
                            <Image className="h-full w-full object-cover" src="/profile.jpg" alt="Korrawit Soodnalao" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
