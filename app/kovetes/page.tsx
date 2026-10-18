import { site } from "@/lib/site";
import { redirect } from "next/navigation";

export default function TrackingPage() {
  const wooUrl = site.wooBaseUrl || "http://localhost:8080";
  redirect(`${wooUrl}/megrendeles-kovetese/`);
}