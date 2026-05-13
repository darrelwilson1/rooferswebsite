"use client";

import { createElement, useEffect, useRef } from "react";
import { registerGsap } from "@/lib/animations/gsap";

type Props = {
  children: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  className?: string;
  by?: "word" | "char" | "line";
  stagger?: number;
  delay?: number;
  duration?: number;
  start?: string;
  once?: boolean;
};

export function SplitText({
  children,
  as = "span",
  className,
  by = "word",
  stagger = 0.05,
  delay = 0,
  duration = 1.1,
  start = "top 85%",
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = registerGsap();

    const targets = el.querySelectorAll<HTMLElement>(".split-unit");
    gsap.set(targets, { yPercent: 110, opacity: 0.001 });

    const tween = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration,
      ease: "expo.out",
      stagger,
      delay,
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [children, by, stagger, delay, duration, start, once]);

  const units =
    by === "char"
      ? Array.from(children).map((c, i) => (
          <span key={i} className="inline-block overflow-hidden align-baseline">
            <span className="split-unit inline-block">
              {c === " " ? " " : c}
            </span>
          </span>
        ))
      : children.split(/(\s+)/).map((w, i) =>
          /^\s+$/.test(w) ? (
            <span key={i}>{w}</span>
          ) : (
            <span
              key={i}
              className="inline-block overflow-hidden align-baseline"
            >
              <span className="split-unit inline-block">{w}</span>
            </span>
          ),
        );

  return createElement(as, { ref, className }, units);
}
