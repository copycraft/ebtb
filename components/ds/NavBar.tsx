"use client";

import { m } from "motion/react";
import Link from "next/link";
import type { HTMLAttributes, MouseEvent } from "react";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavBarProps extends HTMLAttributes<HTMLElement> {
  links?: NavItem[];
  active?: string;
  /** Intercepts a link click (e.g. to smooth-scroll on the same page). Call preventDefault to cancel navigation. */
  onNavigate?: (item: NavItem, event: MouseEvent<HTMLAnchorElement>) => void;
  homeHref?: string;
  cartCount?: number;
  onCart?: () => void;
  cta?: string;
  ctaHref?: string;
  onCta?: (event: MouseEvent<HTMLElement>) => void;
  /** Opens the mobile menu. The burger only renders below 860px (see .ebtb-nav-* in globals.css). */
  onMenu?: () => void;
}

/** Top site bar: wordmark, boxed links, cart. Links collapse into a menu button on small screens. */
export function NavBar({
  links = [],
  active,
  onNavigate,
  homeHref = "/",
  cartCount = 0,
  onCart,
  cta = "Shop",
  ctaHref,
  onCta,
  onMenu,
  style,
  ...rest
}: NavBarProps) {
  return (
    <nav
      aria-label="Fő navigáció"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-5)",
        padding: "var(--space-3) var(--gutter-inline)",
        background: "var(--surface-card)",
        borderBottom: "var(--border-2) solid var(--border-strong)",
        ...style,
      }}
      {...rest}
    >
      <Link
        href={homeHref}
        aria-label="EBTB — főoldal"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          lineHeight: 1,
          color: "var(--blaze-500)",
          letterSpacing: "var(--tracking-display)",
        }}
      >
        EBTB
      </Link>
      <div className="ebtb-nav-links" style={{ display: "flex", gap: "var(--space-2)", flex: 1 }}>
        {links.map((l) => {
          const on = active === l.label;
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={on ? "page" : undefined}
              onClick={(e) => onNavigate && onNavigate(l, e)}
              className="ebtb-nav-link"
              style={{
                position: "relative",
                isolation: "isolate",
                fontFamily: "var(--font-ui)",
                fontWeight: "var(--weight-bold)",
                fontSize: "var(--type-label-sm)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-label)",
                padding: "9px 14px",
                borderRadius: "var(--radius-pill)",
                border: "var(--border-2) solid var(--border-strong)",
                background: "transparent",
                color: on ? "var(--text-on-ink)" : "var(--poppy-800)",
                transition: "color var(--dur-med) var(--ease-snap)",
                whiteSpace: "nowrap",
              }}
            >
              {on ? (
                // One shared ink pill: on route change it slides from the old link to the new one.
                <m.span
                  layoutId="ebtb-nav-active"
                  aria-hidden="true"
                  transition={{ type: "spring", stiffness: 520, damping: 40 }}
                  style={{
                    position: "absolute",
                    inset: -2,
                    zIndex: -1,
                    borderRadius: "var(--radius-pill)",
                    background: "var(--surface-ink)",
                  }}
                />
              ) : null}
              {l.label}
            </Link>
          );
        })}
      </div>
      <span className="ebtb-nav-cta">
        <Button size="sm" as={ctaHref ? "a" : "button"} href={ctaHref} onClick={onCta}>
          {cta}
        </Button>
      </span>
      <span style={{ position: "relative", display: "inline-flex", marginLeft: "auto" }}>
        <IconButton name="shopping-bag" label={cartCount > 0 ? `Kosár, ${cartCount} termék` : "Kosár"} onClick={onCart} />
        {cartCount > 0 ? (
          <m.span
            key={cartCount}
            aria-hidden="true"
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 18 }}
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              minWidth: 22,
              height: 22,
              padding: "0 5px",
              display: "grid",
              placeItems: "center",
              borderRadius: "var(--radius-pill)",
              background: "var(--action-primary)",
              color: "var(--text-on-blaze)",
              border: "var(--border-2) solid var(--border-strong)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
            }}
          >
            {cartCount}
          </m.span>
        ) : null}
      </span>
      {onMenu ? (
        <span className="ebtb-nav-menu">
          <IconButton name="menu" label="Menü" onClick={onMenu} />
        </span>
      ) : null}
    </nav>
  );
}
