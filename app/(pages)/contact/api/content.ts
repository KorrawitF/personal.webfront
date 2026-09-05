import getContent from "@/app/global/api/content";

export default async function getContactContent(): Promise<Omit<ContactContent, 'methods' | 'form'>> {
    return getContent<Omit<ContactContent, 'methods' | 'form'>>('contact');
}
