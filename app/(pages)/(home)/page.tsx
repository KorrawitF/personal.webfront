import type { ReactNode } from "react";
import Image from "@/app/global/components/image";
import GithubIcon from "@/app/global/icons/github";
import LinkedInIcon from "@/app/global/icons/linkedin";
import MailIcon from "@/app/global/icons/mail";
import PageTransition from "@/app/global/components/page-transition";
import TransitionLink from "@/app/global/components/transition-link";
import getHomeContent from "./api/mocks/home";

const icons: Record<string, ReactNode> = {
    Email: <MailIcon className="h-5 w-5" />,
    LinkedIn: <LinkedInIcon className="h-5 w-5" color="currentColor" />,
    GitHub: <GithubIcon className="h-5 w-5" color="currentColor" />,
};

export default async function Home() {
    const content = await getHomeContent();

    return (
        <PageTransition>
            <section className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 md:min-h-0 md:flex-1 md:grid-cols-5 md:gap-12 md:px-12 [@media(min-height:900px)]:py-24 2xl:max-w-5xl">
                <div className="stagger order-2 flex flex-col items-center gap-6 text-center md:order-1 md:col-span-3 md:items-start md:text-start">
                    <p className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-secondary">
                        {content.eyebrow}
                    </p>

                    <div className="space-y-3">
                        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                            {content.greeting} <span className="text-primary">{content.name}</span>
                        </h1>
                        <p className="max-w-lg text-base text-white/70 sm:text-lg">{content.intro}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        {content.actions.map((action, index) => (
                            <TransitionLink
                                key={action.href}
                                href={action.href}
                                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                    index === 0
                                        ? 'bg-primary text-background hover:bg-secondary'
                                        : 'border border-white/15 bg-white/10 text-white hover:border-primary hover:text-primary'
                                }`}
                            >
                                {action.label}
                            </TransitionLink>
                        ))}
                    </div>

                    <ul className="flex items-center gap-3">
                        {content.channels.map((channel) => (
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

                <div className="reveal order-1 mx-auto w-40 max-w-full sm:w-56 md:order-2 md:col-span-2 md:w-full">
                    <div className="relative">
                        <div aria-hidden="true" className="absolute -inset-6 rounded-full bg-primary/15 blur-3xl" />
                        <div className="relative aspect-square overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-lg shadow-black/40 md:rounded-3xl">
                            <Image className="h-full w-full object-cover" src={content.portrait.src} alt={content.portrait.alt} />
                        </div>
                    </div>
                </div>
            </section>
        </PageTransition>
    );
}
