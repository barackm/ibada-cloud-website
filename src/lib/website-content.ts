// Type is derived from the English dictionary (canonical shape).
// At runtime, content is loaded per-locale via getDictionary() in app/[lang]/page.tsx.
import type enContent from "@/dictionaries/en.json";

export type WebsiteContent = typeof enContent;
