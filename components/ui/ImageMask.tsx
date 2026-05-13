"use client";

import { useEffect, useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { registerGsap } from "@/lib/animations/gsap";

type Props = Omit<ImageProps, "alt"> & {
  alt: string;
  /** Optional parallax depth in px (subtle by default). */
  parallax?: number;
  /** Direction the mask wipes open from. */
  from?: "left" | "right" | "top" | "bottom";
  className?: string;
};

export function ImageMask({
  parallax = 60,
  from = "left",
  className,
  alt,
  ...img
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const i = inner.current;
    if (!el || !i) return;

    const { gsap, ScrollTrigger } = registerGsap();
    const ctx = gsap.context(() => {
      const initial =
        from === "left"
          ? "inset(0 100% 0 0)"
          : from === "right"
            ? "inset(0 0 0 100%)"
            : from === "top"
              ? "inset(100% 0 0 0)"
              : "inset(0 0 100% 0)";

      gsap.set(el, { clipPath: initial });
      gsap.to(el, {
        clipPath: "inset(0 0 0 0)",
        ease: "expo.out",
        duration: 1.6,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });

      if (parallax) {
        gsap.to(i, {
          yPercent: parallax > 0 ? -8 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [from, parallax]);

  return (
    <div
      ref={wrap}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <div ref={inner} className="absolute inset-[-6%]">
        <Image {...img} alt={alt} fill />
      </div>
    </div>
  );
}
