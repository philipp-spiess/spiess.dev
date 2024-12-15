import Link from "next/link"
import Avatar from "./Avatar"

export const description =
  "Philipp Spiess is an engineer at Tailwind Labs with a focus on Web technologies. Previous roles include: Engineering at Sourcegraph, UI Engineer at Meta, curator of " +
  "This Week in React, React DOM team member, and Team Lead at PSPDFKit."

interface Props {
  direction?: "row" | "column"
}
export default function Bio({ direction }: Props) {
  return (
    <div
      className={`text-left flex ${direction === "row" ? "flex-row" : "flex-col"}`}
    >
      <div className="min-w-[116px] flex pt-2">
        <Link href="/" className="shadow-none">
          <Avatar width={100} />
        </Link>
      </div>
      <div>
        <div className="text-lg font-black">
          Philipp Spiess{" "}
          <small className="text-(--muted-color)">[ˈʃpiːs]</small>
        </div>

        <p className="my-5">
          Engineer at{" "}
          <Link
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind Labs
          </Link>
          .<br />
          Prev: Engineer at{" "}
          <Link
            href="https://sourcegraph.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sourcegraph
          </Link>{" "}
          and{" "}
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meta
          </Link>
          , curator of{" "}
          <Link
            href="https://this-week-in-react.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            This Week in React
          </Link>
          ,{" "}
          <Link
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React DOM
          </Link>{" "}
          team member, and Team Lead at{" "}
          <Link
            href="https://pspdfkit.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            PSPDFKit
          </Link>
          .
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
  )
}
