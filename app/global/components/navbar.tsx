"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menus = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-20">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 2xl:w-1/2">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            <strong className="text-primary">K</strong>orrawit.
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-base text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-neutral-tertiary md:hidden transition-transform ${isMenuOpen && 'rotate-90'}`}
          aria-controls="navbar-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
        >
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>

        <div
          className={`w-full overflow-hidden transition-all duration-300 ease-out md:block md:w-auto ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
          }`}
          id="navbar-menu"
        >
          <ul
            className={`mt-4 flex flex-col gap-2 border-0 bg-background p-2 transition-all duration-300 ease-out md:mt-0 md:flex-row md:items-center md:gap-1 md:rounded-full md:border md:border-white/10 md:p-0 ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0 md:translate-y-0 md:opacity-100"
            }`}
          >
            {menus.map((menu) => {
              const isActive = menu.href === "/" ? pathname === "/" : pathname.startsWith(menu.href);

              return (
                <li
                  key={menu.name}
                  className={`rounded-full border text-center transition-colors ${
                    isActive
                      ? "border-special bg-primary"
                      : "border-transparent hover:border-white/20"
                  }`}
                >
                  <Link
                    href={menu.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-full px-4 py-2 text-sm font-medium md:px-3 md:py-1.5 ${
                      isActive
                        ? "font-bold text-background"
                        : "text-white hover:text-secondary"
                    }`}
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
  );
}