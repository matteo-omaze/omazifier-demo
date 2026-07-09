"use client";
import Link from "next/link";

// App CHROME (not an omazifier block): the same header on every route. It's a plain app component
// the shell renders around whatever page omazifier composed. The wordmark links home.
export function Header({ market }: { market: string }) {
  return (
    <header className="appheader">
      <Link href="/" className="appheader__brand">
        OMAZE
      </Link>
      <span className="appheader__tag">omazifier demo</span>
    </header>
  );
}
