export {}

declare global {
    type FormField = {
        label: string,
        placeholder?: string,
    }

    type ResumeFormCopy = {
        fields: Record<keyof ResumeRequest, FormField>,
        optional: string,
        submit: string,
        sending: string,
        note: string,
        errors: {
            name_required: string,
            email_required: string,
            email_invalid: string,
            message_too_long: string,
            invalid: string,
            failed: string,
        },
        /** Takes {resume} and {email} placeholders. */
        success: string,
    }

    type ContactMethodsCopy = {
        status: Record<ContactMethodStatus, string>,
        alternatives: string,
        pending_note: string,
        use_email: string,
    }

    type MailContentsCopy = {
        includes_label: string,
        reply_label: string,
    }

    type ContactContent = {
        header: PageHeader,
        methods: ContactMethod[],
        mail: ResumeMail,
        mail_copy: MailContentsCopy,
        methods_copy: ContactMethodsCopy,
        form: ResumeFormCopy,
    }
}
