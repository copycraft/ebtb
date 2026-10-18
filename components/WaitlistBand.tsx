"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useFormPost } from "@/lib/useFormPost";
import { ConsentLabel } from "./ConsentLabel";
import { Honeypot } from "./Honeypot";
import { Turnstile, turnstileEnabled } from "./Turnstile";
import { Button, Card, Checkbox, Input } from "./ds";

/** Newsletter / waitlist band. Posts to /api/newsletter. */
export function WaitlistBand() {
  const { state, send } = useFormPost("/api/newsletter");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState("");
  const [trap, setTrap] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = await send({ email, consent, turnstileToken: token, website: trap, source: "fooldal" });
    if (ok) setEmail("");
    setResetKey((k) => k + 1);
  };

  const note =
    state.status === "done"
      ? "Köszönjük — felkerültél a listára."
      : state.status === "error"
        ? state.message
        : "";

  return (
    <Card tone="onion" padding="clamp(24px,4vw,40px)">
      <h2
        style={{
          margin: "0 0 12px",
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "clamp(32px,4vw,44px)",
          lineHeight: 0.92,
          color: "var(--garlic-300)",
        }}
      >
        Receptek, újdonságok
      </h2>
      <p style={{ margin: "0 0 20px", color: "var(--salt-100)", fontSize: 17, lineHeight: 1.5, maxWidth: "44ch" }}>
        Havonta egy levél: mire szórtuk rá, és mi jön legközelebb.
      </p>
      <form onSubmit={onSubmit} style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
        <Honeypot value={trap} onChange={setTrap} />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 220px", minWidth: 0 }}>
            <Input
              label="E-mail cím"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="te@email.hu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button variant="garlic" size="md" type="submit" disabled={state.status === "sending" || (turnstileEnabled && !token)}>
            {state.status === "sending" ? "Küldjük…" : "Feliratkozom"}
          </Button>
        </div>
        <Checkbox
          name="consent"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          label={<ConsentLabel tone="light" />}
          style={{ color: "var(--salt-100)", fontSize: "var(--type-body-sm)" }}
        />
        <Turnstile onToken={setToken} resetKey={resetKey} />
      </form>
      <p
        role="status"
        style={{
          margin: "14px 0 0",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--type-label-sm)",
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: state.status === "error" ? "var(--garlic-300)" : "var(--poppy-100)",
          minHeight: 16,
        }}
      >
        {note}
      </p>
    </Card>
  );
}
