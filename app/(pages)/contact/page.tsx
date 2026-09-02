import type { Metadata } from "next";
import type { ReactNode } from "react";
import GithubIcon from "@/app/global/icons/github";
import LinkedInIcon from "@/app/global/icons/linkedin";
import MailIcon from "@/app/global/icons/mail";
import getSiteContent from "@/app/global/api/mocks/site";
import { getContactContent } from "./api/mocks/contact";
import PageTransition from "@/app/global/components/page-transition";
import ContactMethods from "./components/contact-methods";

export async function generateMetadata(): Promise<Metadata> {
    const content = await getContactContent();

    return { title: content.header.title };
}

const icons: Record<string, ReactNode> = {
    email: <MailIcon className="h-5 w-5" />,
    linkedin: <LinkedInIcon className="h-5 w-5" color="currentColor" />,
    github: <GithubIcon className="h-5 w-5" color="currentColor" />,
};

export default async function Contact() {
    const [content, site] = await Promise.all([getContactContent(), getSiteContent()]);

    return (
        <PageTransition>
            <section className="w-full max-w-6xl space-y-8 px-6 py-12 md:flex md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden md:px-12 [@media(min-height:900px)]:py-16 2xl:max-w-5xl">
                <header className="reveal space-y-3 text-center text-balance text-white md:text-start">
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        <strong className="text-primary">{content.header.title.charAt(0)}</strong>
                        {content.header.title.slice(1)}
                    </h1>
                    <p className="text-white/70">{content.header.lead}</p>
                </header>

                <ContactMethods
                    methods={content.methods}
                    mail={content.mail}
                    mail_copy={content.mail_copy}
                    copy={content.methods_copy}
                    form={content.form}
                    card={site.card}
                    icons={icons}
                />
            </section>
        </PageTransition>
    );
}
