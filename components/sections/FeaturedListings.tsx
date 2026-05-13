"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SplitText } from "@/components/ui/SplitText";
import { projects } from "@/lib/data/properties";
import { cn } from "@/lib/utils";
import { registerGsap } from "@/lib/animations/gsap";

export function FeaturedListings() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const sec = root.current;
    const trk = track.current;
    if (!sec || !trk) return;

    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const distance = () => trk.scrollWidth - window.innerWidth;
      const tween = gsap.to(trk, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    }, sec);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="work"
      ref={root}
      className="relative bg-ink text-bone py-24 lg:py-32"
    >
      <div className="container-edge mb-16 lg:mb-24 flex items-end justify-between gap-10">
        <div className="flex-1 max-w-3xl">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="block w-8 h-px bg-champagne" />
            Selected Work · 01 / 06
          </p>
          <SplitText
            as="h2"
            by="word"
            stagger={0.07}
            className="display text-bone text-[10vw] sm:text-[7vw] lg:text-[6rem] leading-[0.95] text-balance"
          >
            Six roofs we measure by.
          </SplitText>
        </div>
        <p className="hidden md:block max-w-xs text-bone-dim text-sm leading-relaxed">
          A short selection from the last twenty-four months — across San
          Francisco, Marin, and the Napa Valley. Each one detailed in our
          Folsom Street shop before a single fastener was driven.
        </p>
      </div>

      <div className="relative">
        <div
          ref={track}
          data-cursor="drag"
          data-cursor-label="Drag"
          className={cn(
            "no-scrollbar flex gap-8 lg:gap-14",
            isMobile
              ? "overflow-x-auto px-[5vw] snap-x snap-mandatory"
              : "px-[6vw] will-change-transform",
          )}
          style={isMobile ? { scrollPaddingLeft: "5vw" } : undefined}
        >
          {projects.map((p, i) => (
            <Card
              key={p.slug}
              index={i}
              p={p}
              isMobile={isMobile}
            />
          ))}
          <div className="shrink-0 w-[5vw] lg:w-[6vw]" aria-hidden />
        </div>
      </div>

      <div className="container-edge mt-16 lg:mt-24 flex items-center justify-between text-bone-dim text-[11px] uppercase tracking-[0.22em]">
        <span>{isMobile ? "Swipe →" : "Scroll horizontally →"}</span>
        <span>Full project archive on request</span>
      </div>
    </section>
  );
}

function Card({
  p,
  index,
  isMobile,
}: {
  p: (typeof projects)[number];
  index: number;
  isMobile: boolean;
}) {
  return (
    <article
      data-cursor="view"
      data-cursor-label="View"
      className={cn(
        "group relative shrink-0 snap-start",
        "w-[82vw] sm:w-[60vw] md:w-[50vw] lg:w-[42vw] xl:w-[36vw]",
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-graphite-soft">
        <Image
          src={p.image}
          alt={`${p.name}, ${p.neighborhood}`}
          fill
          sizes="(max-width: 768px) 82vw, (max-width: 1280px) 50vw, 36vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.04]"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
        <span className="absolute top-5 left-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bone">
          <span
            className={cn(
              "size-1.5 rounded-full",
              p.status === "Award Winner"
                ? "bg-champagne"
                : p.status === "Recently Completed"
                  ? "bg-bone"
                  : p.status === "In Progress"
                    ? "bg-champagne/70"
                    : "bg-bone-faint",
            )}
          />
          {p.status}
        </span>
        <span className="absolute top-5 right-5 font-display italic text-bone-dim text-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-6 lg:mt-7 flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-6">
          <h3 className="font-display text-3xl lg:text-4xl text-bone leading-none">
            {p.name}
          </h3>
          <span className="text-bone-dim text-xs uppercase tracking-[0.22em] whitespace-nowrap">
            {String(index + 1).padStart(2, "0")} / {projects.length}
          </span>
        </div>

        <p className="text-bone-dim text-sm leading-relaxed">
          <span className="text-bone">{p.address}</span> · {p.neighborhood}
        </p>

        <div className="relative inline-block">
          <span className="font-display text-2xl lg:text-3xl text-bone italic">
            {p.material}
          </span>
          <span className="absolute left-0 -bottom-2 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100" />
        </div>

        <dl className="mt-3 grid grid-cols-3 gap-4 border-t border-bone-faint/15 pt-4 text-xs uppercase tracking-[0.18em] text-bone-dim">
          <Spec label="Squares" value={p.squares} />
          <Spec label="Pitch" value={p.pitch} />
          <Spec label="Build" value={p.duration} />
        </dl>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1">
      <dt>{label}</dt>
      <dd className="text-bone font-display text-lg normal-case tracking-normal">
        {value}
      </dd>
    </div>
  );
}
