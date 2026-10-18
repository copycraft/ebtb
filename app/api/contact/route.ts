import { clean, clientIp, deliver, isEmail, json, verifyTurnstile } from "@/lib/forms";
import { contactTopics } from "@/lib/contact";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return json({ ok: false, status: 400, error: "Hibás kérés." });

  if (clean(body.website, 200)) return json({ ok: true, status: 200 });

  const name = clean(body.name, 120);
  const message = clean(body.message, 5000);
  const topic = contactTopics.find((t) => t.value === body.topic)?.value ?? "altalanos";

  if (!name) return json({ ok: false, status: 422, error: "Add meg a neved." });
  if (!isEmail(body.email)) return json({ ok: false, status: 422, error: "Ezt az e-mail címet nem tudjuk értelmezni." });
  if (message.length < 10) return json({ ok: false, status: 422, error: "Írj egy kicsit többet, legalább pár szót." });
  if (body.consent !== true) return json({ ok: false, status: 422, error: "Az üzenetküldéshez el kell fogadnod az adatkezelési tájékoztatót." });
  if (!(await verifyTurnstile(body.turnstileToken, clientIp(req)))) {
    return json({ ok: false, status: 403, error: "Nem sikerült ellenőrizni, hogy ember vagy. Frissítsd az oldalt." });
  }

  return json(
    await deliver("contact", {
      name,
      email: clean(body.email, 254),
      company: clean(body.company, 160),
      topic,
      message,
      consent: true,
    }),
  );
}
