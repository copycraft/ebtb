"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Button, Card } from "./ds";

/**
 * Consent banner. The site sets no analytics or marketing cookies yet — only what it needs to work
 * (the cart in localStorage, Cloudflare Turnstile on forms). When analytics arrive, gate them on
 * `readConsent() === "all"` and listen for CONSENT_EVENT.
 */
const STORAGE_KEY = "ebtb-consent-v1";
const OPEN_EVENT = "ebtb:cookie-settings";
export const CONSENT_EVENT = "ebtb:consent";

export type Consent = "all" | "necessary";

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(readConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = (c: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* storage blocked — the banner will ask again next visit */
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          key="cookie"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 420, damping: 30, delay: 0.6 } }}
          exit={{ opacity: 0, y: 24, transition: { duration: 0.16 } }}
          role="region"
          aria-label="Sütibeállítások"
          style={{
            position: "fixed",
            left: "var(--gutter-inline)",
            bottom: 24,
            zIndex: 66,
            width: "min(460px, calc(100% - 2 * var(--gutter-inline)))",
          }}
        >
          <Card tone="paper" padding={20}>
            <p
              style={{
                margin: "0 0 6px",
                fontFamily: "var(--font-ui)",
                fontWeight: "var(--weight-black)",
                textTransform: "uppercase",
                fontSize: "var(--type-label-md)",
                letterSpacing: "var(--tracking-label)",
              }}
            >
              Sütik, de csak módjával
            </p>
            <p style={{ margin: "0 0 16px", fontSize: "var(--type-body-sm)", lineHeight: 1.5 }}>
              A működéshez szükséges sütiket mindig használjuk. Statisztikai sütiket csak a beleegyezéseddel tennénk.{" "}
              <Link href="/adatvedelem#sutik" style={{ color: "var(--text-link)", textDecoration: "underline" }}>
                Részletek
              </Link>
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Button size="sm" onClick={() => choose("all")}>
                Mehet mind
              </Button>
              <Button size="sm" variant="outline" onClick={() => choose("necessary")}>
                Csak a szükségesek
              </Button>
            </div>
          </Card>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Footer link that reopens the banner. */
export function CookieSettingsLink({ style }: { style?: CSSProperties }) {
  return (
    <button
      type="button"
      className="ebtb-footer-link"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        font: "inherit",
        letterSpacing: "inherit",
        textTransform: "inherit",
        ...style,
      }}
    >
      Sütibeállítások
    </button>
  );
}
