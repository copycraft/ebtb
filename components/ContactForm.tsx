"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { contactTopics } from "@/lib/contact";
import { useFormPost } from "@/lib/useFormPost";
import { ConsentLabel } from "./ConsentLabel";
import { Honeypot } from "./Honeypot";
import { Turnstile, turnstileEnabled } from "./Turnstile";
import { Button, Card, Checkbox, Input, Select, Textarea, Toast } from "./ds";

/** Reads `?tema=nagyker` to preselect the topic. Needs a Suspense boundary; use <ContactForm /> as its fallback. */
export function ContactFormFromUrl() {
  const params = useSearchParams();
  return <ContactForm preset={contactTopics.find((t) => t.value === params.get("tema"))?.value} />;
}

/** Contact / wholesale enquiry. Posts to /api/contact. */
export function ContactForm({ preset = "altalanos" }: { preset?: string }) {
  const { state, send } = useFormPost("/api/contact");
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: preset, message: "" });
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState("");
  const [trap, setTrap] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = await send({ ...form, consent, turnstileToken: token, website: trap });
    if (ok) {
      setForm((f) => ({ ...f, message: "" }));
      setConsent(false);
    }
    setResetKey((k) => k + 1);
  };

  if (state.status === "done") {
    return (
      <Toast tone="success" title="Megkaptuk" style={{ maxWidth: "none" }}>
        Két munkanapon belül válaszolunk arra a címre, amit megadtál.
      </Toast>
    );
  }

  return (
    <Card tone="paper" padding="clamp(20px,3vw,32px)">
      <form onSubmit={onSubmit} style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18 }}>
        <Honeypot value={trap} onChange={setTrap} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
          <Input label="Neved" name="name" autoComplete="name" required value={form.name} onChange={set("name")} />
          <Input label="E-mail cím" type="email" name="email" autoComplete="email" required value={form.email} onChange={set("email")} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
          <Select label="Miről lenne szó?" name="topic" options={contactTopics} value={form.topic} onChange={set("topic")} />
          <Input
            label="Cég vagy üzlet (nem kötelező)"
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={set("company")}
          />
        </div>
        <Textarea
          label="Üzenet"
          name="message"
          required
          minLength={10}
          rows={6}
          value={form.message}
          onChange={set("message")}
          hint={form.topic === "nagyker" ? "Írd meg, hol árulnád, és nagyjából mennyi tégelyre gondolsz havonta." : undefined}
        />
        <Checkbox name="consent" required checked={consent} onChange={(e) => setConsent(e.target.checked)} label={<ConsentLabel />} style={{ fontSize: "var(--type-body-sm)" }} />
        <Turnstile onToken={setToken} resetKey={resetKey} />
        {state.status === "error" ? (
          <Toast tone="danger" title="Nem ment át" style={{ maxWidth: "none" }}>
            {state.message}
          </Toast>
        ) : null}
        <div>
          <Button type="submit" size="lg" disabled={state.status === "sending" || (turnstileEnabled && !token)}>
            {state.status === "sending" ? "Küldjük…" : "Elküldöm"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
