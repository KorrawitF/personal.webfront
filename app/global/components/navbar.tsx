"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const [isDesktop, setIsDesktop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navListRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [pillStyle, setPillStyle] = useState({
    left: "0px",
    top: "0px",
    transform: "translate(0px, 0px)",
    width: "0px",
    height: "0px",
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleViewportChange = () => setIsDesktop(mediaQuery.matches);

    handleViewportChange();
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  useEffect(() => {
    const updatePillPosition = () => {
      const activeIndex = menus.findIndex((menu) =>
        menu.href === "/" ? pathname === "/" : pathname.startsWith(menu.href),
      );

      const activeItem = itemRefs.current[activeIndex];
      const navList = navListRef.current;

      if (!activeItem || !navList) {
        return;
      }

      const navRect = navList.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      setPillStyle({
        left: "0px",
        top: "0px",
        transform: `translate(${itemRect.left - navRect.left}px, ${itemRect.top - navRect.top}px)`,
        width: `${itemRect.width}px`,
        height: `${itemRect.height}px`,
      });
    };

    const scheduleUpdate = () => {
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(updatePillPosition);
      });

      const timer = window.setTimeout(updatePillPosition, 40);
      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(timer);
      };
    };

    const cleanup = scheduleUpdate();

    const handleResize = () => scheduleUpdate();
    window.addEventListener("resize", handleResize);

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && navListRef.current) {
      resizeObserver = new ResizeObserver(() => scheduleUpdate());
      resizeObserver.observe(navListRef.current);
    }

    return () => {
      cleanup();
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, [pathname, isMenuOpen, isDesktop]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-20 border-b transition-colors duration-300 md:border-none md:bg-transparent md:shadow-none ${
        isScrolled || isMenuOpen
          ? "bg-background shadow-lg"
          : "border-transparent bg-transparent shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 2xl:w-1/2">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
            <strong className="text-primary">K</strong>orrawit.
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-base text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-neutral-tertiary md:hidden transition-transform ${isMenuOpen && "rotate-90"}`}
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
            ref={navListRef}
            className={`relative mt-4 flex flex-col gap-2 border-0 p-2 transition-all duration-300 ease-out md:mt-0 md:flex-row md:items-center md:gap-1 md:rounded-full md:border md:p-0 ${
              isScrolled || isMenuOpen
                ? "bg-background md:border-white/10"
                : "bg-transparent md:border-transparent"
            } ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0 md:translate-y-0 md:opacity-100"
            }`}
          >
            <div
              className="pointer-events-none absolute z-0 rounded-full bg-primary shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-[transform,width,height] duration-300 ease-out"
              style={{
                left: pillStyle.left,
                top: pillStyle.top,
                transform: pillStyle.transform,
                width: pillStyle.width,
                height: pillStyle.height,
              }}
            />

            {menus.map((menu, index) => {
              const isActive = menu.href === "/" ? pathname === "/" : pathname.startsWith(menu.href);

              return (
                <li
                  key={menu.name}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className="relative z-10 flex-1 grow text-center"
                >
                  <Link
                    href={menu.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 md:px-3 md:py-1.5 ${
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