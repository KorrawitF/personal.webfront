import getContent from "@/app/global/api/content";

const FALLBACK: Omit<ContactContent, 'methods' | 'form'> = {
    header: { title: 'Contact', lead: '' },
    mail: { subject: '', resume: '', includes: [], contact_back: [] },
    mail_copy: { includes_label: 'Includes', reply_label: 'Reply to' },
    methods_copy: {
        status: { available: 'Available', pending: 'Pending' },
        alternatives: '',
        pending_note: '',
        use_email: '',
        visit_link: 'Visit {title}',
    },
};

export default async function getContactContent(): Promise<Omit<ContactContent, 'methods' | 'form'>> {
    return getContent<Omit<ContactContent, 'methods' | 'form'>>('contact', FALLBACK);
}
