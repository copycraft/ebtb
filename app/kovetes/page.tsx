"use client";

import { useState, FormEvent } from "react";
import { site } from "@/lib/site";

export default function TrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const trimmed = orderId.trim();
    if (!trimmed) {
      setError("Kérlek, add meg a rendelés számát.");
      return;
    }

    setIsSubmitting(true);

    const wooUrl = site.wooBaseUrl;
    const trackingUrl = `${wooUrl}/megrendeles-kovetese/?order_id=${encodeURIComponent(trimmed)}`;

    window.location.href = trackingUrl;
  };

  return (
    <section
      aria-label="Rendelés követés"
      style={{
        padding: "clamp(48px,7vw,96px) var(--gutter-inline)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <div style={{ width: "100%", maxWidth: 480 }}>
        <header style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
          <h1
            style={{
              margin: "0 0 var(--space-3)",
              fontFamily: "var(--font-headline)",
              fontWeight: "var(--weight-black)",
              textTransform: "uppercase",
              letterSpacing: ".02em",
              fontSize: "clamp(32px,4.5vw,48px)",
              lineHeight: 1.1,
              color: "var(--poppy-800)",
            }}
          >
            Rendelés követés
          </h1>
          <p style={{ margin: 0, fontSize: "var(--type-body-lg)", color: "var(--ink-600)", lineHeight: 1.6 }}>
            Add meg a rendelés számát, és átirányítunk a WooCommerce követő oldalára.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <label
              htmlFor="order-id"
              style={{
                fontFamily: "var(--font-headline)",
                fontWeight: "var(--weight-black)",
                textTransform: "uppercase",
                letterSpacing: ".02em",
                fontSize: "var(--type-label-md)",
                color: "var(--poppy-800)",
              }}
            >
              Rendelés szám
            </label>
            <input
              type="text"
              id="order-id"
              name="order_id"
              autoComplete="off"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="pl. 12345"
              disabled={isSubmitting}
              style={{
                padding: "var(--space-3) var(--space-4)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--type-body-lg)",
                letterSpacing: ".08em",
                border: "var(--border-2) solid var(--border-strong)",
                borderRadius: "var(--radius-md)",
                background: "var(--salt-100)",
                color: "var(--ink-900)",
                outline: "none",
                transition: "border-color 150ms, box-shadow 150ms",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                margin: 0,
                padding: "var(--space-3)",
                fontSize: "var(--type-body-sm)",
                color: "var(--blaze-600)",
                background: "var(--blaze-50)",
                border: "var(--border-1) solid var(--blaze-200)",
                borderRadius: "var(--radius-md)",
                textAlign: "center",
              }}
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: "var(--space-2)",
              padding: "var(--space-3) var(--space-6)",
              fontFamily: "var(--font-headline)",
              fontWeight: "var(--weight-black)",
              textTransform: "uppercase",
              letterSpacing: ".02em",
              fontSize: "var(--type-label-lg)",
              color: "var(--salt-100)",
              background: "var(--poppy-600)",
              border: "var(--border-2) solid var(--poppy-700)",
              borderRadius: "var(--radius-md)",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
              transition: "background-color 150ms, border-color 150ms, opacity 150ms",
            }}
          >
            {isSubmitting ? "Átirányítás…" : "Követés"}
          </button>
        </form>

        <p
          style={{
            marginTop: "var(--space-6)",
            fontSize: "var(--type-body-sm)",
            color: "var(--ink-500)",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          A rendelés számot a megerősítő e-mailben találod (pl. <code style={{ fontFamily: "var(--font-mono)" }}>#12345</code>).
          Ha van kulcsod is, a WooCommerce oldalon tudod megadni.
        </p>
      </div>
    </section>
  );
}