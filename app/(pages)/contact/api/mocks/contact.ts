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

/**
 * Mock transport: nothing leaves the app yet. Swap the body for the real
 * provider call (SMTP or a transactional API) once one is picked — the
 * signature is what the server action already depends on.
 */
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
