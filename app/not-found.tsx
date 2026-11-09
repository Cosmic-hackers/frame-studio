import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="grid min-h-screen place-items-center px-6">
      <div>
        <p className="kicker">404</p>
        <h1 className="display mt-4 max-w-3xl text-6xl md:text-8xl">This frame is empty.</h1>
        <p className="mt-6 max-w-md text-mute">The page is not part of the studio. The work, the journal, and the desk are.</p>
        <Link href="/" className="mt-8 inline-flex bg-lime px-5 py-3 text-sm font-semibold text-ink">
          Back to the studio
        </Link>
      </div>
    </main>
  );
}
