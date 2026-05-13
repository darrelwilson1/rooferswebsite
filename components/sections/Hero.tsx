"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";
import { site } from "@/lib/site";
import { registerGsap } from "@/lib/animations/gsap";

const VIDEO_SRC =
  "https://videos.pexels.com/video-files/4488842/4488842-uhd_3840_2160_24fps.mp4";
const POSTER =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=70";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const m = media.current;
    if (!el || !m) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.to(m, {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
    >
      <div ref={media} className="absolute inset-[-4%] z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={POSTER}
          preload="metadata"
          aria-hidden
          className="size-full object-cover"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/25 to-ink/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />
      </div>

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
        className="container-edge absolute top-28 lg:top-32 left-0 z-10"
      >
        <span className="eyebrow inline-flex items-center gap-3">
          <span className="block w-8 h-px bg-bone-faint" />
          San Francisco · Est. {site.company.foundedYear}
        </span>
      </motion.div>

      {/* Headline */}
      <div className="container-edge absolute inset-0 z-10 flex items-end pb-[16vh] lg:pb-[14vh]">
        <h1 className="display text-bone text-balance text-[14vw] sm:text-[12vw] lg:text-[11.5rem] xl:text-[13rem] leading-[0.92]">
          <SplitText
            as="span"
            by="word"
            duration={1.4}
            stagger={0.08}
            delay={0.2}
            className="block"
          >
            Roofs built to
          </SplitText>
          <SplitText
            as="span"
            by="word"
            duration={1.4}
            stagger={0.08}
            delay={0.45}
            className="block italic font-light"
          >
            outlast the architect.
          </SplitText>
        </h1>
      </div>

      {/* Bottom-left credential */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1, ease: [0.65, 0, 0.35, 1] }}
        className="container-edge absolute bottom-7 left-0 z-10 max-w-[44ch]"
      >
        <div className="flex items-start gap-4 text-bone-dim text-[11px] uppercase tracking-[0.22em]">
          <span className="size-1.5 mt-2 rounded-full bg-champagne" />
          <div className="flex flex-col gap-1">
            <span className="text-bone">{site.company.name}</span>
            <span>{site.company.license}</span>
            <span className="text-bone-faint normal-case tracking-normal text-[12px] font-sans">
              {site.company.affiliation}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bottom-right scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="container-edge absolute bottom-7 right-0 z-10"
      >
        <div className="flex items-center gap-4 text-bone text-[11px] uppercase tracking-[0.22em]">
          <span>Scroll</span>
          <span className="relative block h-8 w-px overflow-hidden bg-bone-faint">
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-champagne"
              animate={{ y: [-12, 32, 32] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: [0.65, 0, 0.35, 1],
                times: [0, 0.7, 1],
              }}
            />
          </span>
        </div>
      </motion.div>

      {/* Edge ticker — left vertical */}
      <div className="hidden lg:flex absolute left-6 inset-y-0 z-10 items-center">
        <span
          className="text-bone-faint text-[10px] tracking-[0.4em] uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Standing seam · Slate · Tile · Cedar · Membrane
        </span>
      </div>
    </section>
  );
}
