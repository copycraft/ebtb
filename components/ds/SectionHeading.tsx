import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "title"> {
  eyebrow?: string;
  title: ReactNode;
  align?: "left" | "center";
  size?: "lg" | "sm";
  /** Heading level. 1 when the band opens its own page (/bolt, /rolunk). */
  level?: 1 | 2;
  children?: ReactNode;
}

/** Eyebrow + display headline pair that opens every page band. */
export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  size = "lg",
  level = 2,
  children,
  style,
  ...rest
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        ...style,
      }}
      {...rest}
    >
      {eyebrow ? (
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontWeight: "var(--weight-black)" as CSSProperties["fontWeight"],
            textTransform: "uppercase",
            fontSize: "var(--type-label-md)",
            letterSpacing: "var(--tracking-label-wide)",
            color: "var(--blaze-500)",
          }}
        >
          {eyebrow}
        </span>
      ) : null}
      <Heading
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: size === "lg" ? "var(--type-display-md)" : "var(--type-display-sm)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "var(--tracking-display)",
          color: "var(--text-display)",
          fontWeight: 400,
        }}
      >
        {title}
      </Heading>
      {children ? (
        <p style={{ margin: 0, maxWidth: "var(--measure-prose)", fontSize: "var(--type-body-lg)" }}>{children}</p>
      ) : null}
    </header>
  );
}
