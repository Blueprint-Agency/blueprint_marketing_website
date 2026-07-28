import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav, Footer } from "@/components/v2/Chrome";
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

      <main id="main" className="band">
        <article className="shell col">
          <Link className="back-link" href="/#who">
            Back to the work
          </Link>

          <header style={{ marginTop: 26 }}>
            <h1 className="h1">{client.name}</h1>
            {client.sector && (
              <p className="small" style={{ marginTop: 14 }}>
                {client.sector} · {client.place}
              </p>
            )}
            <a
              className="btn btn-line"
              style={{ marginTop: 22 }}
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open {client.href.replace("https://", "")}
            </a>
          </header>

          {/* Verifiable structural facts. Not outcome claims. */}
          <div className="res-grid">
            {detail.facts.map((f) => (
              <div className="res" key={f.label}>
                <div className="res-value">{f.value}</div>
                <div className="small res-label">{f.label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            {detail.story.map((para, i) => (
              <p
                className={i === 0 ? "lead" : "prose"}
                key={para}
                style={{ marginTop: i === 0 ? 0 : 16, maxWidth: "68ch" }}
              >
                {para}
              </p>
            ))}
          </div>

          <section style={{ marginTop: 44 }} aria-labelledby="built">
            <h2 className="h3" id="built">
              What we built
            </h2>
            <ul className="built-list">
              {detail.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>

          {/*
            The outcome section, told honestly. PRODUCT.md records that no
            measured result exists for this project. Saying so costs less
            than inventing one and being asked about it in the WhatsApp thread.
          */}
          {detail.outcomes === null && (
            <section className="note" style={{ marginTop: 44 }} aria-labelledby="results">
              <h2 className="h3" id="results">
                On results
              </h2>
              <p className="prose" style={{ marginTop: 12 }}>
                We are not publishing a percentage here. We would rather you
                open the site, look at what is actually live, and ask us
                directly what it did. We will tell you straight on WhatsApp.
              </p>
            </section>
          )}

          <section style={{ marginTop: 56 }}>
            <h2 className="h2" style={{ maxWidth: "18ch" }}>
              Want the same for your business?
            </h2>
            <div className="cta-row" style={{ marginTop: 26 }}>
              <a
                className="btn btn-act"
                href={WA.fromWork(client.name)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message us about this
              </a>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
