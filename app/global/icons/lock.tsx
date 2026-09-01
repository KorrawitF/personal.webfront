// Plain sync component (no 'use cache'): it is imported by the client-side
// Card, so it has to be usable in both the server and client graphs.
export default function LockIcon({ size = 24, color = "currentColor", className = "" }: IconProps = {}) {
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
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
    );
}
