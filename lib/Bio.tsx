import Link from "next/link";
import Avatar from "./Avatar";

export const description =
  "Philipp Spiess – Somewhere between AI and UI. " +
  "Prev: Tailwind Labs, Sourcegraph, Meta, React DOM team.";

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
            href="https://sourcegraph.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sourcegraph
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
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React DOM
          </Link>{" "}
          team
        </p>
        <ul className="m-0 flex list-none max-w-[300px]">
          <li className="m-[0.29rem] mt-0 first:ml-0 last:mr-0">
            <Link
              href="https://twitter.com/philippspiess"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </Link>
          </li>
          <li className="m-[0.29rem] mt-0 first:ml-0 last:mr-0">
            <Link
              href="https://github.com/philipp-spiess"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </li>
          <li className="m-[0.29rem] mt-0 first:ml-0 last:mr-0">
            <Link
              href="https://www.linkedin.com/in/philipp-spiess/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
