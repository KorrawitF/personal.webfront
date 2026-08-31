'use cache'

import  Image  from "./image"

export default async function TimeLine({className = '', items} : TimeLineProps) {
    return (
        <div className={`min-w-0 px-2 ${className}`}>
            <ol className="relative ms-4 border-s-2 border-white/35 text-white">
                {items.map((item) => {
                    return (
                        <li className="relative ms-6 pb-10 last:pb-0 sm:ms-8" key={item.id}>
                            {
                                item.icon ?
                                    (<span className="absolute -inset-s-11 top-0 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full sm:-inset-s-13">
                                        <Image className="h-full w-full object-cover" src={item.icon} alt={item.subtitle ?? item.title} />
                                    </span>) :
                                    (
                                        <span className="absolute -inset-s-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-4 ring-background sm:-inset-s-12">
                                            <svg className="h-4 w-4 text-background" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/></svg>
                                        </span>
                                    )
                            }
                            <time className="inline-block rounded border border-white/15 bg-white/10 px-1.5 py-0.5 text-xs font-medium text-white/80">
                                {item.start_date}{item.end_date && ` - ${item.end_date}`}
                            </time>
                            <div className="mt-2 flex flex-col gap-x-3 gap-y-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
                                <h3 className="text-base font-semibold text-primary sm:text-lg">{item.title}</h3>
                                {item.subtitle && <p className="text-sm text-secondary sm:text-base sm:font-medium">{item.subtitle}</p>}
                            </div>
                            {item.detail && <p className="mt-2 text-sm wrap-break-word text-white/70 sm:text-base">{item.detail}</p>}
                            {item.children && <div className="mt-3">{item.children}</div>}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
