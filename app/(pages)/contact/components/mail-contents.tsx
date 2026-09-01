export default function MailContents({ mail }: { mail: ResumeMail }) {
    return (
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/50">What lands in your inbox</p>
            <ul className="ms-4 list-disc space-y-1 text-sm text-white/70 marker:text-primary">
                {mail.includes.map((item) => (
                    <li key={item} className="wrap-break-word">{item}</li>
                ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2 pt-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Reply on</p>
                <ul className="flex flex-wrap items-center gap-2">
                    {mail.contact_back.map((channel) => (
                        <li key={channel.label} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-secondary">
                            {channel.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
