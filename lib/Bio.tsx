import Link from "next/link";
import Avatar from "./Avatar";

export const description =
  "Philipp Spiess – Somewhere between AI and UI. " +
  "Prev: Tailwind Labs, Meta, Sourcegraph, React DOM team.";

interface Props {
  direction?: "row" | "column";
}
export default function Bio({ direction }: Props) {
  return (
    <div
      className={`text-left flex ${
        direction === "row" ? "flex-row" : "flex-col"
      }`}
    >
      <div className="min-w-[116px] flex pt-2">
        <Link href="/" className="shadow-none">
          <Avatar width={100} />
        </Link>
      </div>
      <div>
        <div className="text-lg font-black">
          Philipp Spiess{" "}
          <small
            className="text-(--muted-color)"
            style={{
              fontFamily:
                "var(--marriweather), 'Doulos SIL', 'Charis SIL', 'Times New Roman', 'DejaVu Serif', serif",
              fontFeatureSettings: '"kern", "liga", "clig", "calt"',
            }}
          >
            [ˈʃpiːs]
          </small>
        </div>

        <p className="my-5">
          Somewhere between AI and UI.
          <br />
          Prev:{" "}
          <Link
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind Labs
          </Link>
          ,{" "}
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meta
          </Link>
          ,{" "}
          <Link
            href="https://sourcegraph.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sourcegraph
          </Link>
          ,{" "}
          <Link
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React DOM
          </Link>{" "}
          team.
        </p>
        <div className="mt-2 flex items-center gap-3 text-(--muted-color)">
          <Link
            href="https://twitter.com/philippspiess"
            target="_blank"
            rel="noopener noreferrer"
            title="X"
            aria-label="X"
            className="inline-flex no-underline [box-shadow:none] text-(--muted-color) transition-colors hover:text-[rgba(var(--fg-color),0.85)]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>

          <Link
            href="https://github.com/philipp-spiess"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub"
            className="inline-flex no-underline [box-shadow:none] text-(--muted-color) transition-colors hover:text-[rgba(var(--fg-color),0.85)]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.05-1.61-4.05-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.77-1.6-2.66-.3-5.47-1.33-5.47-5.9 0-1.3.47-2.37 1.24-3.2-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.22A11.45 11.45 0 0 1 12 5.8c1.02 0 2.05.14 3.01.41 2.29-1.54 3.3-1.22 3.3-1.22.66 1.65.24 2.88.12 3.18.77.83 1.24 1.9 1.24 3.2 0 4.58-2.81 5.59-5.49 5.89.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58C20.57 21.79 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </Link>

          <Link
            href="https://www.linkedin.com/in/philipp-spiess/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            aria-label="LinkedIn"
            className="inline-flex no-underline [box-shadow:none] text-(--muted-color) transition-colors hover:text-[rgba(var(--fg-color),0.85)]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>

          <Link
            href="mailto:hi@spiess.dev"
            title="Email"
            aria-label="Email"
            className="inline-flex no-underline [box-shadow:none] text-(--muted-color) transition-colors hover:text-[rgba(var(--fg-color),0.85)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5.5 w-5.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
