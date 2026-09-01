export default function MailIcon({ size = 24, color = "currentColor", className = "" }: IconProps = {}) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 8.6 5.7a2.5 2.5 0 0 0 2.8 0L22 7" />
        </svg>
    );
}
