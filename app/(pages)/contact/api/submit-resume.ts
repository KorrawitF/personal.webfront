import client from "@/app/global/lib/api";
import { RESUME_FORM_SLUG } from "./form";

type FormSubmissionResult = {
    id: string,
    to: string,
    deliveredAt: string,
};

export default async function sendResumeMail(request: ResumeRequest): Promise<ResumeDelivery> {
    const result = await client.post<FormSubmissionResult>(`/forms/${RESUME_FORM_SLUG}/submissions`, request);

    return {
        id: result.id,
        to: result.to,
        delivered_at: new Date(result.deliveredAt),
    };
}
