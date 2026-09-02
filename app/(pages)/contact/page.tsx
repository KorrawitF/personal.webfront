import type { Metadata } from "next";
import type { ReactNode } from "react";
import GithubIcon from "@/app/global/icons/github";
import LinkedInIcon from "@/app/global/icons/linkedin";
import MailIcon from "@/app/global/icons/mail";
import getContactMethods, { getResumeMail } from "./api/mocks/contact";
import ContactMethods from "./components/contact-methods";

export const metadata: Metadata = {
  title: "Contact",
};

const icons: Record<string, ReactNode> = {
    email: <MailIcon className="h-5 w-5" />,
    linkedin: <LinkedInIcon className="h-5 w-5" color="currentColor" />,
    github: <GithubIcon className="h-5 w-5" color="currentColor" />,
};

const methods = getContactMethods();
const mail = getResumeMail();

export default function Contact() {
    return (
        <div className="flex flex-1 flex-col items-center font-sans">
            <section className="w-full max-w-6xl space-y-8 px-6 py-12 md:flex md:max-h-[calc(100dvh-5rem)] md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden md:px-12 [@media(min-height:900px)]:py-16 2xl:max-w-5xl">
                <header className="space-y-3 text-center text-balance text-white md:text-start">
                    <h1 className="text-2xl font-semibold sm:text-3xl">
                        <strong className="text-primary">C</strong>ontact
                    </h1>
                    <p className="text-white/70">
                        The quickest route is email &mdash; tell me where to send things and my résumé arrives in your
                        inbox with my own contact details attached, so you can reply straight back.
                        Pick another channel on the right to switch to it.
                    </p>
                </header>

                <ContactMethods methods={methods} mail={mail} icons={icons} />
            </section>
        </div>
    );
}
