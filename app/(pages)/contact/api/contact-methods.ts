import client, { isConnectionError } from "@/app/global/lib/api";

type BackendContactMethod = {
    id: number,
    slug: string,
    name: string,
    handle: string | null,
    summary: string,
    detail: string | null,
    status: string,
    type: string | null,
    href: string | null,
    sortOrder: number,
};

function toContactMethod(method: BackendContactMethod): ContactMethod {
    return {
        id: method.slug,
        name: method.name,
        handle: method.handle ?? undefined,
        summary: method.summary,
        detail: method.detail ?? undefined,
        status: method.status as ContactMethodStatus,
        href: method.href ?? undefined,
    };
}

export default async function getContactMethods(): Promise<ContactMethod[]> {
    let methods: BackendContactMethod[];
    try {
        methods = await client.get<BackendContactMethod[]>('/contact-methods');
    } catch (error) {
        if (isConnectionError(error)) {
            return [];
        }
        throw error;
    }

    return methods.map(toContactMethod);
}
