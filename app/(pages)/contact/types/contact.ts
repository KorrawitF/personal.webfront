import type { ReactNode } from "react";

declare global {
    type ContactMethodStatus = 'available' | 'pending';

    type ContactMethod = {
        id: string,
        name: string,
        handle?: string,
        summary: string,
        detail?: string,
        status: ContactMethodStatus,
        href?: string,
    }

    type ContactChannel = {
        label: string,
        value: string,
        href?: string,
    }

    type ResumeMail = {
        subject: string,
        resume: string,
        includes: string[],
        contact_back: ContactChannel[],
    }

    type ResumeRequest = {
        name: string,
        email: string,
        company?: string,
        role?: string,
        message?: string,
    }

    type ResumeDelivery = {
        id: string,
        to: string,
        delivered_at: Date,
    }

    type ResumeFormErrors = Partial<Record<keyof ResumeRequest, string>>;

    type ContactMethodsProps = {
        methods: ContactMethod[],
        mail: ResumeMail,
        mail_copy: MailContentsCopy,
        copy: ContactMethodsCopy,
        form: ResumeFormCopy,
        card: CardLabels,
        icons: Record<string, ReactNode>,
    }

    type ResumeFormState = {
        status: 'idle' | 'success' | 'error',
        message?: string,
        errors?: ResumeFormErrors,
        values?: Partial<ResumeRequest>,
    }
}
