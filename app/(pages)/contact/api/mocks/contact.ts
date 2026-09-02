export default function getContactMethods(): ContactMethod[] {
    return [
        {
            id: "email",
            name: "Email",
            summary: "Leave your details and my résumé lands in your inbox, together with every way to reach me back.",
            status: "available",
        },
        {
            id: "linkedin",
            name: "LinkedIn",
            handle: "in/korrawit",
            summary: "The longer work history, endorsements and anything worth a formal introduction.",
            detail: "Not wired up yet — the profile link goes live once the page is finished.",
            status: "pending",
        },
        {
            id: "github",
            name: "GitHub",
            handle: "@korrawit",
            summary: "Source for the public projects, plus the smaller experiments that never made the projects page.",
            detail: "Not wired up yet — waiting on a tidy-up of the public repositories.",
            status: "pending",
        },
    ];
}

export function getResumeMail(): ResumeMail {
    return {
        subject: "Korrawit Soodnalao — résumé and contact details",
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

export function getResumeFormCopy(): ResumeFormCopy {
    return {
        fields: {
            name: { label: "Your name", placeholder: "Jane Doe" },
            email: { label: "Email", placeholder: "jane@company.com" },
            company: { label: "Company", placeholder: "Where you are writing from" },
            role: { label: "Role you are hiring for", placeholder: "Backend Engineer" },
            message: { label: "Anything I should know", placeholder: "A line about the role, the team or the timeline." },
        },
        optional: "optional",
        submit: "Send me the résumé",
        sending: "Sending…",
        note: "Your address is used for this one mail — nothing else.",
        errors: {
            name_required: "Tell me who I am sending this to.",
            email_required: "An email address is required — that is where the résumé goes.",
            email_invalid: "That does not look like a valid email address.",
            message_too_long: "Keep it under 1000 characters.",
            invalid: "Check the highlighted fields and try again.",
            failed: "The mail could not be sent just now. Try again in a moment.",
        },
        success: "{resume} is on its way to {email}. It carries my contact details too, so you can reply straight back.",
    };
}

export async function getContactContent(): Promise<ContactContent> {
    return {
        header: {
            title: "Contact",
            lead: "The quickest route is email — tell me where to send things and my résumé arrives in your inbox with my own contact details attached, so you can reply straight back. Pick another channel on the right to switch to it.",
        },
        methods: getContactMethods(),
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
        form: getResumeFormCopy(),
    };
}
