import { clean, clientIp, deliver, isEmail, json, verifyTurnstile } from "@/lib/forms";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return json({ ok: false, status: 400, error: "Hibás kérés." });

  // Honeypot: bots fill every field. Pretend success.
  if (clean(body.website, 200)) return json({ ok: true, status: 200 });

  if (!isEmail(body.email)) return json({ ok: false, status: 422, error: "Ezt az e-mail címet nem tudjuk értelmezni." });
  if (body.consent !== true) return json({ ok: false, status: 422, error: "A feliratkozáshoz el kell fogadnod az adatkezelési tájékoztatót." });
  if (!(await verifyTurnstile(body.turnstileToken, clientIp(req)))) {
    return json({ ok: false, status: 403, error: "Nem sikerült ellenőrizni, hogy ember vagy. Frissítsd az oldalt." });
  }

  return json(await deliver("newsletter", { email: clean(body.email, 254), consent: true, source: clean(body.source, 60) }));
}
