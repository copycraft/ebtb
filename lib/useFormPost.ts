"use client";

import { useState } from "react";

export type FormState = { status: "idle" | "sending" | "done" } | { status: "error"; message: string };

/** POST JSON to one of the /api form routes and track idle → sending → done | error. */
export function useFormPost(endpoint: string) {
  const [state, setState] = useState<FormState>({ status: "idle" });

  const send = async (payload: Record<string, unknown>) => {
    setState({ status: "sending" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setState({ status: "done" });
        return true;
      }
      setState({ status: "error", message: data.error || "Valami elakadt. Próbáld újra." });
    } catch {
      setState({ status: "error", message: "Nincs kapcsolat. Ellenőrizd a netet, és próbáld újra." });
    }
    return false;
  };

  return { state, send, reset: () => setState({ status: "idle" }) };
}
