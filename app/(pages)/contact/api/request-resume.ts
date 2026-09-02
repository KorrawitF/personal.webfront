'use server'

import fill from "@/app/global/utils/format";
import { getResumeFormCopy, getResumeMail, sendResumeMail } from "./mocks/contact";

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

function validate(request: ResumeRequest, copy: ResumeFormCopy['errors']): ResumeFormErrors {
    const errors: ResumeFormErrors = {};

    if (!request.name) {
        errors.name = copy.name_required;
    }

    if (!request.email) {
        errors.email = copy.email_required;
    } else if (!EMAIL_PATTERN.test(request.email)) {
        errors.email = copy.email_invalid;
    }

    if (request.message && request.message.length > 1000) {
        errors.message = copy.message_too_long;
    }

    return errors;
}

export default async function requestResume(_state: ResumeFormState, formData: FormData): Promise<ResumeFormState> {
    const copy = getResumeFormCopy();
    const request = toRequest(formData);
    const errors = validate(request, copy.errors);

    if (Object.keys(errors).length) {
        return {
            status: 'error',
            message: copy.errors.invalid,
            errors,
            values: request,
        };
    }

    try {
        const delivery = await sendResumeMail(request);

        return {
            status: 'success',
            message: fill(copy.success, { resume: getResumeMail().resume, email: delivery.to }),
        };
    } catch {
        return {
            status: 'error',
            message: copy.errors.failed,
            values: request,
        };
    }
}
