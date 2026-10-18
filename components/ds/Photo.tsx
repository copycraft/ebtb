import type { CSSProperties, HTMLAttributes } from "react";

export type PhotoShape = "rounded" | "arch" | "circle" | "square";
export type PhotoTone = "cream" | "blaze" | "onion";

const SHAPES: Record<PhotoShape, CSSProperties> = {
  rounded: { borderRadius: "var(--radius-lg)" },
  arch: { borderRadius: "var(--radius-arch)" },
  circle: { borderRadius: "var(--radius-pill)" },
  square: { borderRadius: 0 },
};

export interface PhotoProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  shape?: PhotoShape;
  tone?: PhotoTone;
  ratio?: string;
  /** Placeholder caption — states the shot that still needs to be taken. */
  label?: string;
}

/** Image frame in the brand's crop shapes. Renders a labelled placeholder when src is absent. */
export function Photo({
  src,
  alt = "",
  shape = "rounded",
  tone = "cream",
  ratio = "4 / 3",
  label = "PHOTO",
  style,
  ...rest
}: PhotoProps) {
  const frame: CSSProperties = {
    position: "relative",
    aspectRatio: ratio,
    overflow: "hidden",
    background:
      tone === "cream" ? "var(--sesame-300)" : tone === "blaze" ? "var(--blaze-100)" : "var(--poppy-100)",
    border: "var(--border-2) solid var(--border-strong)",
    ...SHAPES[shape],
    ...style,
  };

  if (src) {
    return (
      <div style={frame} {...rest}>
        {/* Plain <img>: the brand has no photography yet, so sources are unknown at build time. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    );
  }

  return (
    <div style={frame} {...rest}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-ui)",
          fontWeight: "var(--weight-bold)" as CSSProperties["fontWeight"],
          fontSize: "var(--type-label-sm)",
          letterSpacing: "var(--tracking-label-wide)",
          color: "var(--grey-500)",
          textTransform: "uppercase",
          backgroundImage: "repeating-linear-gradient(45deg,transparent 0 12px,rgba(36,28,51,.05) 12px 24px)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
