import Link from "next/link";
import { Nav, Footer } from "@/components/Chrome";
import { WA } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-4 py-20 text-center sm:px-6"
      >
        <div className="tarp tarp-scallop mx-auto mb-8 h-7 w-full max-w-xs" aria-hidden="true" />
        <h1 className="shout text-5xl leading-[0.9] text-fluoro sm:text-6xl">
          This stall&rsquo;s
          <br />
          <span className="text-tungsten">packed up.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-tarp-pale/80">
          Nothing here. The rest of the lane is still open.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="chop border-tungsten px-5 py-3 font-black text-tungsten no-underline"
          >
            Back to the lane
          </Link>
          <a
            href={WA.general}
            className="chop border-chop-deep bg-chop px-5 py-3 font-black text-ink no-underline"
          >
            WhatsApp us
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
