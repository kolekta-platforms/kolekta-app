import { createClient } from "next-sanity";

// Public values (also in studio/sanity.config.ts). Fallbacks keep the build
// working in environments without the env vars set (CI, PR builds, local).
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ev7risxe";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-08-29";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
