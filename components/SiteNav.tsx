"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { MouseEvent } from "react";
import { useCart } from "@/lib/cart";
import { navItems } from "@/lib/content";
import { Drawer } from "./Drawer";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { NavBar } from "./ds";
import type { NavItem } from "./ds";

function activeLabel(pathname: string) {
  if (pathname.startsWith("/receptek")) return "Receptek";
  if (pathname.startsWith("/bolt") || pathname.startsWith("/termekek")) return "Bolt";
  if (pathname.startsWith("/rolunk")) return "Rólunk";
  if (pathname.startsWith("/kovetes")) return "Követés";
  return undefined;
}

/** Top bar. Page links navigate; any `/#id` link smooth-scrolls when already on the home page. */
export function SiteNav() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (item: NavItem, e: MouseEvent<HTMLElement>) => {
    setMenuOpen(false);
    const hash = item.href.startsWith("/#") ? item.href.slice(2) : null;
    if (pathname !== "/" || !hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${hash}`);
  };

  const shop = { label: "Bolt", href: "/bolt" };

  return (
    <>
      <NavBar
        links={navItems}
        active={activeLabel(pathname)}
        onNavigate={go}
        cta="Vásárlás"
        ctaHref={shop.href}
        onCta={(e) => go(shop, e as MouseEvent<HTMLElement>)}
        cartCount={count}
        onCart={() => setOpen(true)}
        onMenu={() => setMenuOpen(true)}
      />
      <Drawer open={menuOpen} onOpenChange={setMenuOpen} title="Menü">
        <StaggerGroup as="ul" trigger="mount" delay={0.1} gap={0.05} style={{ listStyle: "none", margin: 0, padding: "var(--space-3) 0" }}>
          {navItems.map((item) => (
            <StaggerItem as="li" key={item.href} style={{ borderBottom: "var(--border-1) solid var(--border-soft)" }}>
              <Link
                href={item.href}
                onClick={(e) => go(item, e)}
                style={{
                  display: "block",
                  padding: "18px 0",
                  fontFamily: "var(--font-headline)",
                  fontWeight: "var(--weight-black)",
                  textTransform: "uppercase",
                  letterSpacing: ".02em",
                  fontSize: 20,
                  color: "var(--poppy-800)",
                }}
              >
                {item.label}
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Drawer>
    </>
  );
}
