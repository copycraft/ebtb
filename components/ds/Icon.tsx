import type { CSSProperties, HTMLAttributes } from "react";

const CDN = "https://unpkg.com/lucide-static@0.441.0/icons/";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number;
  strokeColor?: string;
}

/** Monochrome Lucide glyph, tinted with currentColor via CSS mask. */
export function Icon({ name, size = 20, strokeColor, style, ...rest }: IconProps) {
  const url = `url(${CDN}${name}.svg)`;
  return (
    <span
      aria-hidden="true"
      style={
        {
          display: "inline-block",
          width: size,
          height: size,
          flex: "0 0 auto",
          background: strokeColor || "currentColor",
          WebkitMaskImage: url,
          maskImage: url,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          ...style,
        } as CSSProperties
      }
      {...rest}
    />
  );
}
