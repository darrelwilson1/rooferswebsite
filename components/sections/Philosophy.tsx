"use client";

import { useEffect, useRef } from "react";
import { ImageMask } from "@/components/ui/ImageMask";
import { SplitText } from "@/components/ui/SplitText";
import { registerGsap } from "@/lib/animations/gsap";

const SHOP_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80";

const stats = [
  { value: "31", label: "Years in the trade" },
  { value: "1,400+", label: "Roofs delivered" },
  { value: "50 yr", label: "Workmanship warranty" },
];

export function Philosophy() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-stat]"), {
        y: 60,
        opacity: 0,
        ease: "expo.out",
        duration: 1.2,
        stagger: 0.12,
        scrollTrigger: {
          trigger: el.querySelector("[data-stats]"),
          start: "top 80%",
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craft"
      ref={root}
      className="relative bg-ink text-bone py-28 lg:py-40"
    >
      <div className="container-edge">
        <p className="eyebrow mb-12 lg:mb-16 flex items-center gap-3">
          <span className="block w-8 h-px bg-champagne" />
          02 — The Craft
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <ImageMask
              src={SHOP_IMAGE}
              alt="Meridian Roofworks shop floor — sheet metal brake, hand tools, copper sample wall"
              className="aspect-[4/5] w-full"
              from="bottom"
              parallax={-40}
            />
            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-bone-dim">
              The shop · Folsom Street, San Francisco
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <h2 className="display text-bone text-[8vw] sm:text-[6vw] lg:text-[4.2rem] leading-[1.02] text-balance">
              <SplitText as="span" by="word" className="block">
                We build like
              </SplitText>
              <SplitText
                as="span"
                by="word"
                delay={0.2}
                className="block"
              >
                architects.
              </SplitText>
              <span className="block">
                <SplitText
                  as="span"
                  by="word"
                  delay={0.35}
                  className="italic font-display text-champagne"
                >
                  Finished
                </SplitText>{" "}
                <SplitText as="span" by="word" delay={0.5}>
                  like furniture makers.
                </SplitText>
              </span>
            </h2>

            <div className="mt-12 max-w-prose space-y-6 text-bone-dim text-base lg:text-[17px] leading-[1.7]">
              <p>
                Meridian is a thirty-one-year-old roofing house. We work from a
                single shop on Folsom Street with two field crews — eleven
                journeymen between them — and we take on no more than
                twenty-four projects in a calendar year.
              </p>
              <p>
                Every roof is drawn, full-scale, in the shop before it leaves
                the bench. Every fastener pattern, every flashing detail, every
                seam length is set on paper, mocked up in metal, and approved
                by the architect of record before we touch the building.
              </p>
              <p>
                We are a Master Elite installer for GAF and a SELECT
                ShingleMaster for CertainTeed — the top two percent of the
                trade nationwide. Our workmanship warranty runs fifty years.
                Most of our work never needs it.
              </p>
            </div>

            <div
              data-stats
              className="mt-20 grid grid-cols-3 gap-4 border-t border-bone-faint/20 pt-8"
            >
              {stats.map((s) => (
                <div key={s.label} data-stat className="flex flex-col gap-3">
                  <span className="font-display text-5xl lg:text-6xl text-bone leading-none">
                    {s.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              data-cursor="hover"
              className="mt-14 group inline-flex items-center gap-4 text-bone text-[12px] uppercase tracking-[0.22em]"
            >
              <span className="relative">
                Request a site survey
                <span className="absolute left-0 -bottom-1 h-px w-full bg-bone-faint">
                  <span className="block h-px bg-champagne origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]" />
                </span>
              </span>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
