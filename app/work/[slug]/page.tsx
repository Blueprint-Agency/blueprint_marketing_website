import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav, Footer, StickyChop } from "@/components/Chrome";
import { CASE_STUDIES, clientBySlug } from "@/lib/clients";
import { WA } from "@/lib/site";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const client = clientBySlug(slug);
  if (!client || !client.detail) return {};

  const description = client.sector
    ? `What Blueprint built for ${client.name}, ${client.sector.toLowerCase()} in ${client.place}.`
    : `What Blueprint built for ${client.name}.`;

  return {
    title: client.name,
    description,
    alternates: { canonical: `/work/${client.slug}` },
    openGraph: {
      title: `${client.name} · Blueprint`,
      description,
      url: `/work/${client.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = clientBySlug(slug);
  if (!client || !client.detail) notFound();

  const { detail } = client;

  return (
    <>
      <Nav />
      <StickyChop />

      <main id="main" className="px-4 sm:px-6">
        <article className="mx-auto max-w-3xl py-10 sm:py-16">
          <Link
            href="/#work"
            className="shout text-xs tracking-[0.16em] text-tungsten no-underline hover:underline"
          >
            ← Back to the lane
          </Link>

          <header className="mt-6">
            <div
              className="tarp tarp-scallop mb-6 h-7 w-full animate-sway"
              aria-hidden="true"
            />
            <h1 className="shout text-5xl leading-[0.9] text-fluoro sm:text-6xl">
              {client.name}
            </h1>
            {client.sector && (
              <p className="mt-3 text-tarp-pale/80">
                {client.sector} · {client.place}
              </p>
            )}
            <a
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className="shout mt-4 inline-block text-sm text-tungsten no-underline hover:underline"
            >
              Open {client.href.replace("https://", "")} ↗
            </a>
          </header>

          {/* Verifiable structural facts. Not outcome claims. */}
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {detail.facts.map((f) => (
              <li
                key={f.label}
                className="border-2 border-plum-edge/50 bg-night-deep/60 p-4"
              >
                <span className="marker block text-3xl text-tungsten">
                  {f.value}
                </span>
                <span className="mt-1 block text-xs leading-snug text-tarp-pale/75">
                  {f.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-5">
            {detail.story.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-lg leading-relaxed font-medium text-fluoro"
                    : "leading-relaxed text-tarp-pale/85"
                }
              >
                {p}
              </p>
            ))}
          </div>

          <section className="mt-10" aria-labelledby="built">
            <h2
              id="built"
              className="shout text-2xl text-fluoro"
            >
              What we built
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {detail.built.map((b) => (
                <li
                  key={b}
                  className="price-card rotate-[-0.4deg] px-3 py-1.5 text-sm"
                >
                  {b}
                </li>
              ))}
            </ul>
          </section>

          {/*
            The outcome section, told honestly. PRODUCT.md records that no
            measured result exists for this project. Saying so costs less
            than inventing one and being asked about it in the WhatsApp thread.

            Rendered as a price card — a note pinned to the stall, in the
            world's own vocabulary rather than a generic accent-bordered callout.
          */}
          {detail.outcomes === null && (
            <section
              className="price-card mt-10 rotate-[-0.5deg] p-5 sm:p-6"
              aria-labelledby="results"
            >
              <h2 id="results" className="shout text-xl text-ink">
                On results
              </h2>
              <p className="font-body mt-3 text-sm leading-relaxed text-ink/85">
                We are not publishing a percentage here. We would rather you
                open the site, look at what is actually live, and ask us
                directly what it did. We will tell you straight on WhatsApp.
              </p>
            </section>
          )}

          <section className="mt-14 border-t-2 border-plum-edge/40 pt-10 text-center">
            <h2 className="shout text-3xl leading-tight text-fluoro sm:text-4xl">
              Want the same for your business?
            </h2>
            <a
              href={WA.fromWork(client.name)}
              className="chop mt-6 inline-flex items-center gap-2 border-chop-deep bg-chop px-6 py-3.5 font-black text-ink no-underline shadow-[0_6px_0_var(--color-chop-deep)] transition-transform active:translate-y-1 active:shadow-[0_2px_0_var(--color-chop-deep)]"
            >
              Message us about this
            </a>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
