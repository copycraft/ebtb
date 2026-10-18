import { revalidateTag } from "next/cache";
import { PRODUCTS_TAG } from "@/lib/products";

/** WordPress pings this after a product changes (Paymenthandling/mu-plugins/ebtb-products.php). */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-ebtb-secret") !== secret) {
    return Response.json({ ok: false }, { status: 401 });
  }
  revalidateTag(PRODUCTS_TAG, "max");
  return Response.json({ ok: true });
}
