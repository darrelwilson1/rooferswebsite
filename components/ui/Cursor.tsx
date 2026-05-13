"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "drag" | "view";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 600, damping: 60, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 600, damping: 60, mass: 0.4 });
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState<string>("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    function onOver(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const target = t.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, [role='button']",
      );
      if (!target) {
        setState("default");
        setLabel("");
        return;
      }
      const data = target.getAttribute("data-cursor");
      const text = target.getAttribute("data-cursor-label") ?? "";
      if (data === "drag") setState("drag");
      else if (data === "view") setState("view");
      else setState("hover");
      setLabel(text);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size =
    state === "default" ? 8 : state === "hover" ? 56 : state === "view" ? 96 : 110;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          x: -size / 2,
          y: -size / 2,
          borderColor:
            state === "default"
              ? "rgba(245,241,234,0)"
              : "rgba(245,241,234,0.9)",
          backgroundColor:
            state === "default"
              ? "rgba(245,241,234,0.9)"
              : "rgba(245,241,234,0)",
        }}
        transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
        className="rounded-full border flex items-center justify-center"
      >
        {(state === "drag" || state === "view") && label && (
          <span
            className="text-[10px] font-medium uppercase"
            style={{
              letterSpacing: "0.16em",
              color: "#F5F1EA",
              mixBlendMode: "normal",
            }}
          >
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
