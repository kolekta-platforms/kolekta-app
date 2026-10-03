import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./client";

// Server-only client used to write moderated content (comments). The token
// must never be exposed to the browser — do NOT prefix it with NEXT_PUBLIC_.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});
