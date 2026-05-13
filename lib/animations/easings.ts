// Shared motion vocabulary. No bouncy springs — only editorial easings.
export const EASE = {
  editorial: [0.65, 0, 0.35, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutQuart: [0.76, 0, 0.24, 1] as const,
  hover: [0.4, 0, 0.2, 1] as const,
} as const;

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  long: 1.2,
  reveal: 1.6,
} as const;
