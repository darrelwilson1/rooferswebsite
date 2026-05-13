"use client";

import { useEffect, useRef } from "react";
import { site, nav } from "@/lib/site";
import { registerGsap } from "@/lib/animations/gsap";

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const word = el.querySelector("[data-mega]");
      if (!word) return;
      gsap.fromTo(
        word,
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: word, start: "top 90%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      className="relative bg-ink text-bone border-t border-bone-faint/15"
    >
      <div className="container-edge py-20 lg:py-24">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-20">
          <div className="col-span-2">
            <p className="eyebrow mb-4">Shop</p>
            <p className="font-display text-2xl text-bone leading-tight">
              {site.brand}
            </p>
            <p className="mt-4 text-sm text-bone-dim leading-relaxed max-w-xs">
              Architectural roofing and restoration for the Bay Area's most
              demanding houses. Since {site.company.foundedYear}.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="flex flex-col gap-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    data-cursor="hover"
                    href={n.href}
                    className="text-sm text-bone hover:text-champagne transition-colors duration-500"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  data-cursor="hover"
                  href={site.company.instagram}
                  className="text-sm text-bone hover:text-champagne transition-colors duration-500"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  data-cursor="hover"
                  href={site.company.linkedin}
                  className="text-sm text-bone hover:text-champagne transition-colors duration-500"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  data-cursor="hover"
                  href={`mailto:${site.company.email}`}
                  className="text-sm text-bone hover:text-champagne transition-colors duration-500"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="overflow-hidden">
          <span
            data-mega
            className="block font-display text-bone text-[24vw] sm:text-[20vw] lg:text-[16rem] xl:text-[20rem] leading-[0.85] tracking-[-0.05em] italic"
          >
            Meridian.
          </span>
        </div>

        <div className="mt-16 pt-8 border-t border-bone-faint/15 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-[11px] uppercase tracking-[0.22em] text-bone-dim">
          <span>
            © {new Date().getFullYear()} {site.brand} · {site.company.license}
          </span>
          <span>{site.company.affiliation}</span>
          <span>24-hour storm response</span>
        </div>
      </div>
    </footer>
  );
}
