"use client";

import { useEffect, useRef } from "react";

/** Blaze reading-progress rule pinned to the top of the viewport. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = document.scrollingElement || document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (el.scrollTop / max) * 100)) : 0;
      if (bar.current) bar.current.style.width = `${pct}%`;
    };

    update();
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      document.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 6,
        background: "rgba(36,28,51,.18)",
        zIndex: 60,
        pointerEvents: "none",
      }}
    >
      <div ref={bar} style={{ height: "100%", width: "0%", background: "#FF4A1E", borderRight: "2px solid #241C33" }} />
    </div>
  );
}
