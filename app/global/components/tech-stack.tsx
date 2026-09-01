export default function TechStack({ items, label, max, className = '' }: TechStackProps) {
    if (!items.length) {
        return null;
    }

    const shown = max ? items.slice(0, max) : items;
    const hidden = items.length - shown.length;

    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && <p className="text-xs font-semibold uppercase tracking-wide text-white/50">{label}</p>}
            <ul className="flex flex-wrap items-center gap-2">
                {shown.map((tech) => (
                    <li key={tech} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-secondary">
                        {tech}
                    </li>
                ))}
                {hidden > 0 && <li className="text-xs text-white/50">+{hidden} more</li>}
            </ul>
        </div>
    );
}
