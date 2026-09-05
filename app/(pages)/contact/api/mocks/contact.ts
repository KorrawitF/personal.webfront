import fill from "@/app/global/utils/format";
import site from "@/app/global/config/site";

export function getResumeMail(): ResumeMail {
    return {
        subject: fill("{owner} — résumé and contact details", { owner: site.owner }),
        resume: "korrawit-soodnalao-resume.pdf",
        includes: [
            "The résumé as a PDF attachment",
            "A short note on what I'm building at the moment",
            "Every channel you can reach me back on",
        ],
        contact_back: [
            { label: "Email", value: "korrawit.universal@gmail.com", href: "mailto:korrawit.universal@gmail.com" },
            { label: "LinkedIn", value: "in/korrawit", href: "https://www.linkedin.com/in/korrawit" },
            { label: "GitHub", value: "@korrawit", href: "https://github.com/korrawit" },
        ],
    };
}

export async function sendResumeMail(request: ResumeRequest): Promise<ResumeDelivery> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    console.info("[contact] mock résumé mail", {
        to: request.email,
        subject: getResumeMail().subject,
        attachment: getResumeMail().resume,
    });

    return {
        id: `mock_${Date.now().toString(36)}`,
        to: request.email,
        delivered_at: new Date(),
    };
}

export async function getContactContent(): Promise<Omit<ContactContent, 'methods' | 'form'>> {
    return {
        header: {
            title: "Contact",
            lead: "The quickest route is email — tell me where to send things and my résumé arrives in your inbox with my own contact details attached, so you can reply straight back. Pick another channel on the right to switch to it.",
        },
        mail: getResumeMail(),
        mail_copy: {
            includes_label: "What lands in your inbox",
            reply_label: "Reply on",
        },
        methods_copy: {
            status: {
                available: "Open",
                pending: "Pending",
            },
            alternatives: "Other ways to reach me",
            pending_note: "There is no form for this channel yet — it is still being wired up. Email is the one that reaches me today.",
            use_email: "Use the email form instead",
        },
    };
}
