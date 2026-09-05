import client from "@/app/global/lib/api";

type BackendFormField = {
    id: number,
    fieldKey: string,
    kind: string,
    label: string,
    placeholder: string | null,
    required: boolean,
    maxLength: number | null,
    requiredError: string | null,
    invalidError: string | null,
    maxLengthError: string | null,
    sortOrder: number,
};

type BackendForm = {
    id: number,
    slug: string,
    submitLabel: string,
    sendingLabel: string,
    note: string | null,
    optionalLabel: string,
    invalidMessage: string,
    failedMessage: string,
    successMessage: string,
    fields: BackendFormField[],
};

const RESUME_FORM_SLUG = 'resume-request';

function toFormField(field: BackendFormField): FormField {
    return {
        label: field.label,
        placeholder: field.placeholder ?? undefined,
    };
}

function toResumeFormCopy(form: BackendForm): ResumeFormCopy {
    const byKey = new Map(form.fields.map((field) => [field.fieldKey, field]));

    function field(key: keyof ResumeRequest): BackendFormField {
        const match = byKey.get(key);
        if (!match) {
            throw new Error(`Form "${form.slug}" is missing its "${key}" field.`);
        }
        return match;
    }

    const name = field('name');
    const email = field('email');
    const company = field('company');
    const role = field('role');
    const message = field('message');

    return {
        fields: {
            name: toFormField(name),
            email: toFormField(email),
            company: toFormField(company),
            role: toFormField(role),
            message: toFormField(message),
        },
        message_max_length: message.maxLength ?? Infinity,
        optional: form.optionalLabel,
        submit: form.submitLabel,
        sending: form.sendingLabel,
        note: form.note ?? '',
        errors: {
            name_required: name.requiredError ?? '',
            email_required: email.requiredError ?? '',
            email_invalid: email.invalidError ?? '',
            message_too_long: message.maxLengthError ?? '',
            invalid: form.invalidMessage,
            failed: form.failedMessage,
        },
        success: form.successMessage,
    };
}

export default async function getResumeFormCopy(): Promise<ResumeFormCopy> {
    const forms = await client.get<BackendForm[]>('/forms');
    const form = forms.find((candidate) => candidate.slug === RESUME_FORM_SLUG);

    if (!form) {
        throw new Error(`Form "${RESUME_FORM_SLUG}" was not found.`);
    }

    return toResumeFormCopy(form);
}
