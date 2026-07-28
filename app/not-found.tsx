import Link from "next/link";
import { Nav, Footer } from "@/components/v2/Chrome";
import { WA } from "@/lib/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="band">
        <div className="shell col">
          <p className="mono" style={{ color: "var(--brand-text)" }}>
            404
          </p>
          <h1 className="h1" style={{ marginTop: 14, maxWidth: "16ch" }}>
            That page is not here.
          </h1>
          <p className="prose" style={{ marginTop: 22 }}>
            It may have moved, or the link may be wrong. The rest of the site
            is where you left it, and if you were looking for something in
            particular you can just ask us.
          </p>
          <div className="cta-row" style={{ marginTop: 30 }}>
            <Link className="btn btn-line" href="/">
              Back to the homepage
            </Link>
            <a
              className="btn btn-act"
              href={WA.general}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
