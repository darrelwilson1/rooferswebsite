"use client";

import Image from "next/image";
import { SplitText } from "@/components/ui/SplitText";
import { press } from "@/lib/data/journal";

export function Journal() {
  const lead = press[0];
  const rest = press.slice(1);

  return (
    <section
      id="press"
      className="relative bg-ink text-bone py-28 lg:py-40 border-t border-bone-faint/15"
    >
      <div className="container-edge">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-24">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="block w-8 h-px bg-champagne" />
              04 — Press & Awards
            </p>
            <SplitText
              as="h2"
              by="word"
              className="display text-[10vw] sm:text-[7vw] lg:text-[6rem] text-bone leading-[0.95]"
            >
              What the trade has said.
            </SplitText>
          </div>
          <a
            href="#press-archive"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-bone"
          >
            <span className="relative">
              Full press kit
              <span className="absolute left-0 -bottom-1 h-px w-full bg-bone-faint">
                <span className="block h-px bg-champagne origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </span>
            </span>
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Lead — large */}
          <article
            data-cursor="view"
            data-cursor-label="Read"
            className="lg:col-span-7 group"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-graphite-soft">
              <Image
                src={lead.image}
                alt={lead.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.04]"
              />
              <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.22em] text-bone bg-ink/40 backdrop-blur-sm px-3 py-1.5">
                {lead.kind}
              </span>
            </div>
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 sm:items-end">
              <h3 className="font-display text-3xl lg:text-5xl text-bone leading-[1.05] text-balance max-w-[22ch]">
                {lead.title}
              </h3>
              <div className="text-[11px] uppercase tracking-[0.22em] text-bone-dim sm:text-right whitespace-nowrap">
                {lead.date} · {lead.readMinutes} min
              </div>
            </div>
            <p className="mt-5 text-bone-dim text-base lg:text-[17px] leading-[1.7] max-w-[60ch]">
              {lead.excerpt}
            </p>
          </article>

          {/* Right column — varied sizes */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:gap-16 lg:pl-6 lg:border-l lg:border-bone-faint/15">
            {rest.map((j, i) => (
              <article
                key={j.slug}
                data-cursor="view"
                data-cursor-label="Read"
                className="group lg:pl-6"
              >
                <div
                  className={`relative w-full overflow-hidden bg-graphite-soft ${
                    j.size === "md" ? "aspect-[4/3]" : "aspect-[3/2]"
                  }`}
                >
                  <Image
                    src={j.image}
                    alt={j.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.22em] text-bone bg-ink/45 backdrop-blur-sm px-3 py-1.5">
                    {j.kind}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-bone-dim">
                  <span>{j.publication ?? "Meridian Field Notes"}</span>
                  <span>{j.date}</span>
                </div>
                <h3
                  className={`mt-3 font-display text-bone leading-[1.1] ${
                    j.size === "md" ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
                  }`}
                >
                  {j.title}
                </h3>
                <p className="mt-3 text-sm text-bone-dim leading-relaxed max-w-[44ch]">
                  {j.excerpt}
                </p>
                {i < rest.length - 1 && (
                  <span className="block h-px w-12 bg-bone-faint mt-10" />
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
