import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The standard shadcn class merger.
 *
 * ADDED 2026-08-17, AND IT IS THE FIRST TAILWIND-DEPENDENT FILE HERE.
 * This project is not a shadcn project: there is no components.json, and
 * every one of the site's own surfaces is plain CSS scoped under `.v2` in
 * app/plain.css. Tailwind was installed for its reset and nothing else.
 *
 * It exists because components/ui/feature-carousel.tsx was supplied as a
 * shadcn component and is built on utility classes, so it needs `cn` and
 * the theme tokens in app/globals.css to render at all.
 *
 * SCOPE, so this does not quietly become a second way to build the site:
 * `cn` is for imported components under components/ui. Anything under
 * components/v2 is part of the Plain design system and takes its styling
 * from plain.css. If you find yourself importing this into a v2 component,
 * the question to ask is which of the two systems that component belongs
 * to, not how to make both work at once.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
