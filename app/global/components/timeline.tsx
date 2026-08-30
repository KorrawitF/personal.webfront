'use cache'

import { ReactNode } from "react";
import  Image  from "./image"

export default async function TimeLine({items} : {items: TimeLineProps[]}) {
    return (
        <>
            <ol className="relative border-s border-default text-white">          
                {items.map((item) => {
                    return (
                        <li className="mb-10 ms-6 w-full" key={item.id}>      
                            {
                                item.icon ?
                                    (<span className="absolute flex items-center justify-center w-8 h-8 bg-brand-softer rounded-full -start-4">
                                        <Image className="rounded-full" src={item.icon} alt={item.subtitle} />
                                    </span>) :
                                    (
                                        <span className="absolute flex items-center justify-center w-6 h-6 bg-primary ring-primary rounded-full -start-3 ring-4 ring-buffer">
                                            <svg className="w-6 h-6 text-fg-brand-strong" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/></svg>
                                        </span>
                                    )
                            }
                            <time className="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded">{item.start_date} {item.end_date && '- ' + item.end_date}</time>
                            <h3 className="flex justify-between items-center mb-1 text-lg font-semibold text-primary text-heading my-2">{item.title} <span className="text-secondary">{item.subtitle}</span></h3>
                            <p className="mb-4 text-body">{item.detail}</p>
                        </li>
                    );
                })}        
            </ol>
        </>
    );
}