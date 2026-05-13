"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SplitText } from "@/components/ui/SplitText";
import { materials } from "@/lib/data/neighborhoods";
import { registerGsap } from "@/lib/animations/gsap";

export function Neighborhoods() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-tile]"), {
        y: 80,
        opacity: 0,
        ease: "expo.out",
        duration: 1.4,
        stagger: 0.08,
        scrollTrigger: {
          trigger: el.querySelector("[data-grid]"),
          start: "top 80%",
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="materials"
      ref={root}
      className="relative bg-ink text-bone py-28 lg:py-40"
    >
      <div className="container-edge">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-24">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="block w-8 h-px bg-champagne" />
              03 — Materials
            </p>
            <SplitText
              as="h2"
              by="word"
              className="display text-bone text-[10vw] sm:text-[7vw] lg:text-[6rem] leading-[0.95]"
            >
              Six systems.
            </SplitText>
            <SplitText
              as="h2"
              by="word"
              delay={0.2}
              className="display italic text-bone text-[10vw] sm:text-[7vw] lg:text-[6rem] leading-[0.95]"
            >
              One standard.
            </SplitText>
          </div>
          <p className="max-w-sm text-bone-dim text-sm leading-relaxed">
            Every system on this page is detailed in our shop, mocked up
            full-scale, and reviewed with the architect. We don't sell
            materials — we build the assembly around them.
          </p>
        </div>

        <div
          data-grid
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
        >
          {materials.map((m, i) => (
            <a
              key={m.slug}
              data-tile
              data-cursor="view"
              data-cursor-label="Spec"
              href={`#${m.slug}`}
              className="group relative block"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-graphite-soft">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale transition-[filter,transform] duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:grayscale-0 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
                <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.22em] text-bone">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute top-5 right-5 text-[10px] uppercase tracking-[0.22em] text-bone-dim">
                  {m.count} installed
                </span>

                <div className="absolute inset-x-5 bottom-5">
                  <div className="overflow-hidden">
                    <h3 className="font-display text-3xl lg:text-4xl text-bone leading-none transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1">
                      {m.name}
                    </h3>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-bone-dim">
                    <span>{m.region}</span>
                    <span className="text-bone">Life · {m.medianPrice}</span>
                  </div>
                  <span className="mt-3 block h-px w-0 bg-champagne transition-[width] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full" />
                </div>
              </div>

              <div className="mt-4 flex items-start justify-between gap-6">
                <p className="text-sm leading-relaxed text-bone-dim max-w-[36ch]">
                  {m.blurb}
                </p>
                <span className="shrink-0 text-[11px] uppercase tracking-[0.22em] text-bone inline-flex items-center gap-2">
                  Spec sheet
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
