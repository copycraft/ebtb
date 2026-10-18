/** The design system's motion tokens (styles/ds/tokens/motion.css) as Motion transitions. */
export const easeSnap = [0.2, 0.9, 0.25, 1] as const;
export const easePop = [0.34, 1.56, 0.64, 1] as const;

export const fast = { duration: 0.12, ease: easeSnap };
export const med = { duration: 0.22, ease: easeSnap };
export const reveal = { duration: 0.5, ease: easeSnap };
