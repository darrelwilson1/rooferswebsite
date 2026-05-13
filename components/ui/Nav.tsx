"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handler() {
      setScrolled(window.scrollY > 40);
    }
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-500",
        scrolled
          ? "backdrop-blur-md bg-ink/55 border-b border-bone-faint/20"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-edge flex items-center justify-between py-5 lg:py-6">
        <Link
          href="/"
          aria-label={site.brand}
          className="group flex items-center gap-3"
        >
          <Mark />
          <span className="hidden sm:block text-bone text-[13px] tracking-[0.16em] uppercase">
            Meridian <span className="text-bone-dim">— Roofworks</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          href="#contact"
          data-cursor="hover"
          className="hidden md:inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-bone group"
        >
          <span className="size-1.5 rounded-full bg-champagne" />
          Site survey
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center gap-2 text-bone text-[12px] uppercase tracking-[0.18em]"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="block w-6">
            <span
              className={cn(
                "block h-px bg-bone transition-transform duration-500",
                open ? "translate-y-[3px] rotate-45" : "",
              )}
            />
            <span
              className={cn(
                "block h-px bg-bone mt-1 transition-transform duration-500",
                open ? "-translate-y-[1px] -rotate-45" : "",
              )}
            />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="md:hidden overflow-hidden bg-ink border-t border-bone-faint/15"
          >
            <div className="container-edge py-8 flex flex-col gap-5">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl text-bone leading-none"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-bone-faint/15 text-bone-dim text-xs uppercase tracking-[0.22em]">
                Site survey · {site.company.phone}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      data-cursor="hover"
      className="relative text-[12px] uppercase tracking-[0.22em] text-bone group"
    >
      <span className="relative inline-block py-1">
        {children}
        <span className="absolute left-0 right-0 -bottom-px h-px overflow-hidden">
          <span className="block h-px bg-champagne origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]" />
        </span>
      </span>
    </Link>
  );
}

function Mark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className="text-bone"
    >
      {/* Stylized roof / apex mark for Meridian */}
      <path
        d="M3 24 L16 6 L29 24"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M8 24 L16 13 L24 24"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.55"
      />
      <circle cx="16" cy="6" r="1.6" fill="#C9A96E" />
    </svg>
  );
}
