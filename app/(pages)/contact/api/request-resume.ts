'use server'

import { getResumeMail, sendResumeMail } from "./mocks/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(formData: FormData, field: keyof ResumeRequest): string {
    return String(formData.get(field) ?? '').trim();
}

function toRequest(formData: FormData): ResumeRequest {
    return {
        name: read(formData, 'name'),
        email: read(formData, 'email'),
        company: read(formData, 'company') || undefined,
        role: read(formData, 'role') || undefined,
        message: read(formData, 'message') || undefined,
    };
}

function validate(request: ResumeRequest): ResumeFormErrors {
    const errors: ResumeFormErrors = {};

    if (!request.name) {
        errors.name = 'Tell me who I am sending this to.';
    }

    if (!request.email) {
        errors.email = 'An email address is required — that is where the résumé goes.';
    } else if (!EMAIL_PATTERN.test(request.email)) {
        errors.email = 'That does not look like a valid email address.';
    }

    if (request.message && request.message.length > 1000) {
        errors.message = 'Keep it under 1000 characters.';
    }

    return errors;
}

export default async function requestResume(_state: ResumeFormState, formData: FormData): Promise<ResumeFormState> {
    const request = toRequest(formData);
    const errors = validate(request);

    if (Object.keys(errors).length) {
        return {
            status: 'error',
            message: 'Check the highlighted fields and try again.',
            errors,
            values: request,
        };
    }

    try {
        const delivery = await sendResumeMail(request);

        return {
            status: 'success',
            message: `${getResumeMail().resume} is on its way to ${delivery.to}. It carries my contact details too, so you can reply straight back.`,
        };
    } catch {
        return {
            status: 'error',
            message: 'The mail could not be sent just now. Try again in a moment.',
            values: request,
        };
    }
}
