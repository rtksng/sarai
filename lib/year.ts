import { cacheLife } from "next/cache";

/** Current year for copyright lines — cached so the page can still prerender. */
export async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
