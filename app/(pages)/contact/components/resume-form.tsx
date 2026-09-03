'use client'

import { useActionState } from "react";
import type { ReactNode } from "react";
import requestResume from "../api/request-resume";

const INITIAL_STATE: ResumeFormState = { status: 'idle' };

const SCROLLER = "min-h-0 space-y-4 md:flex-1 md:overflow-y-auto md:overscroll-contain md:pr-1 [scrollbar-color:color-mix(in_srgb,var(--foreground)_60%,transparent)_transparent] scrollbar-thin";
const FIELD = "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition-colors placeholder:text-white/30 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-white/50";

function Field({ id, field, optional, error, children }: {
    id: string,
    field: FormField,
    /** The word marking a field as not required, when it is not. */
    optional?: string,
    error?: string,
    children: ReactNode,
}) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className={LABEL}>
                {field.label}
                {optional && <span className="ms-1 font-normal normal-case tracking-normal text-white/30">{optional}</span>}
            </label>
            {children}
            {error && <p id={`${id}-error`} className="text-xs text-red-300">{error}</p>}
        </div>
    );
}

export default function ResumeForm({ copy, intro }: { copy: ResumeFormCopy, intro?: ReactNode }) {
    const [state, formAction, pending] = useActionState(requestResume, INITIAL_STATE);
    const values = state.values;
    const errors = state.errors;

    return (
        <form action={formAction} className="flex min-h-0 flex-1 flex-col gap-4">
            <div className={SCROLLER}>
                {intro}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field id="name" field={copy.fields.name} error={errors?.name}>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            defaultValue={values?.name}
                            aria-invalid={Boolean(errors?.name)}
                            aria-describedby={errors?.name ? 'name-error' : undefined}
                            placeholder={copy.fields.name.placeholder}
                            className={FIELD}
                        />
                    </Field>

                    <Field id="email" field={copy.fields.email} error={errors?.email}>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            defaultValue={values?.email}
                            aria-invalid={Boolean(errors?.email)}
                            aria-describedby={errors?.email ? 'email-error' : undefined}
                            placeholder={copy.fields.email.placeholder}
                            className={FIELD}
                        />
                    </Field>

                    <Field id="company" field={copy.fields.company} optional={copy.optional}>
                        <input
                            id="company"
                            name="company"
                            type="text"
                            autoComplete="organization"
                            defaultValue={values?.company}
                            placeholder={copy.fields.company.placeholder}
                            className={FIELD}
                        />
                    </Field>

                    <Field id="role" field={copy.fields.role} optional={copy.optional}>
                        <input
                            id="role"
                            name="role"
                            type="text"
                            defaultValue={values?.role}
                            placeholder={copy.fields.role.placeholder}
                            className={FIELD}
                        />
                    </Field>
                </div>

                <Field id="message" field={copy.fields.message} optional={copy.optional} error={errors?.message}>
                    <textarea
                        id="message"
                        name="message"
                        rows={3}
                        maxLength={copy.message_max_length}
                        defaultValue={values?.message}
                        aria-invalid={Boolean(errors?.message)}
                        aria-describedby={errors?.message ? 'message-error' : undefined}
                        placeholder={copy.fields.message.placeholder}
                        className={`${FIELD} resize-y`}
                    />
                </Field>
            </div>

            <div className="shrink-0 border-t border-white/10 pt-3">
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="submit"
                        disabled={pending}
                        className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-background transition-colors hover:border-secondary hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {pending && (
                            <svg className="h-4 w-4 animate-spin" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M12 3a9 9 0 1 0 9 9" />
                            </svg>
                        )}
                        {pending ? copy.sending : copy.submit}
                    </button>
                    <p className="text-xs text-white/40">{copy.note}</p>
                </div>

                <div aria-live="polite">
                    {state.message && (
                        <p
                            className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
                                state.status === 'success'
                                    ? 'border-primary/40 bg-primary/10 text-secondary'
                                    : 'border-red-400/40 bg-red-500/10 text-red-200'
                            }`}
                        >
                            {state.message}
                        </p>
                    )}
                </div>
            </div>
        </form>
    );
}
