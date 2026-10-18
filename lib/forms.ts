/**
 * Server-side form plumbing shared by /api/newsletter and /api/contact.
 *
 * Where submissions go is still open, so delivery is one swappable function:
 * - FORM_WEBHOOK_URL set → POST the JSON there (Make, Zapier, n8n, Brevo/Mailchimp automations, a WP endpoint…)
 * - unset in development → logged to the server console
 * - unset in production  → rejected with 503, so nobody's message silently disappears
 *
 * Spam: Cloudflare Turnstile is verified when TURNSTILE_SECRET_KEY is set, plus a hidden honeypot field.
 */

export type FormKind = "newsletter" | "contact";

export interface FormResult {
  ok: boolean;
  status: number;
  error?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(v: unknown): v is string {
  return typeof v === "string" && v.length <= 254 && EMAIL.test(v);
}

export function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function verifyTurnstile(token: unknown, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function deliver(kind: FormKind, payload: Record<string, unknown>): Promise<FormResult> {
  const url = process.env.FORM_WEBHOOK_URL;
  const record = { kind, receivedAt: new Date().toISOString(), ...payload };

  if (!url) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, status: 503, error: "Az űrlap még nincs bekötve. Írj nekünk e-mailt." };
    }
    console.info(`[forms] ${kind} (no FORM_WEBHOOK_URL, dev only):`, record);
    return { ok: true, status: 200 };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return { ok: true, status: 200 };
  } catch (e) {
    console.error(`[forms] ${kind} delivery failed:`, e);
    return { ok: false, status: 502, error: "Most nem sikerült elküldeni. Próbáld újra pár perc múlva." };
  }
}

export function clientIp(req: Request) {
  return req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
}

export function json(result: FormResult) {
  return Response.json(result.ok ? { ok: true } : { ok: false, error: result.error }, { status: result.status });
}
