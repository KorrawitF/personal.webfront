"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {name: "Home", href: "/"},
  {name: "About", href: "/about"},
  {name: "Skills", href: "/skills"},
  {name: "Projects", href: "/projects"},
  {name: "Contact", href: "/contact"}
]

export default function Navbar() {
    const pathname = usePathname();
    return (
        <>
        <nav className="fixed w-full z-20 top-0 start-0 border-default">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 2xl:w-1/2">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-xl text-white font-semibold whitespace-nowrap"><strong className="text-primary">K</strong>orrawit.</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" data-dm-proxy-injected="true"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
            </button>
            <div className="hidden w-full font-bold md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                {menus.map((menu) => {
                    const isActive = menu.href === "/" ? pathname === "/" : pathname.startsWith(menu.href);
                    return (
                        <li key={menu.name}>
                            <Link 
                            key={menu.name}
                            href={menu.href}
                            className={`block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0 ${isActive ? 'text-secondary' : 'text-white'}`}
                            >
                                {menu.name}
                            </Link>
                        </li>
                    );
                })}
              </ul>
            </div>
          </div>
        </nav>
        </>
    );
}