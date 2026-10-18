"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { IconButton } from "./ds";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Right-hand sheet on the ink scrim — the storefront CartDrawer layout from the design system,
 * on Radix Dialog for the focus trap, Esc-to-close and scroll lock.
 */
export function Drawer({ open, onOpenChange, title, children, footer }: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="ebtb-scrim" style={{ position: "fixed", inset: 0, zIndex: 70, background: "var(--scrim-ink)" }} />
        <Dialog.Content
          aria-describedby={undefined}
          className="ebtb-drawer"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 71,
            width: "min(440px,100%)",
            background: "var(--surface-card)",
            borderLeft: "var(--border-2) solid var(--border-strong)",
            display: "flex",
            flexDirection: "column",
            outline: "none",
          }}
        >
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "var(--space-5)",
              borderBottom: "var(--border-2) solid var(--border-strong)",
            }}
          >
            <Dialog.Title style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 34, lineHeight: 1 }}>
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <IconButton name="x" label="Bezárás" variant="bare" />
            </Dialog.Close>
          </header>
          <div style={{ flex: 1, overflow: "auto", padding: "0 var(--space-5)" }}>{children}</div>
          {footer ? (
            <footer
              style={{
                padding: "var(--space-5)",
                borderTop: "var(--border-2) solid var(--border-strong)",
                background: "var(--sesame-300)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
            >
              {footer}
            </footer>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
