import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"

export const config = {
  runtime: "experimental-edge",
}

const bold = fetch(
  new URL("../../assets/Merriweather/Merriweather-Black.ttf", import.meta.url),
).then((res) => res.arrayBuffer())
const normal = fetch(
  new URL(
    "../../assets/Merriweather/Merriweather-Regular.ttf",
    import.meta.url,
  ),
).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  const [boldData, normalData] = await Promise.all([bold, normal])

  try {
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const title = searchParams.get("title")?.slice(0, 100)
    if (!title) {
      return new Response("Missing title", { status: 400 })
    }

    // ?date=<date>
    const date = `${searchParams.get("date")?.slice(0, 100)} • ` ?? ""

    // ?sub=<sub>
    const sub = searchParams.get("sub")?.slice(0, 100) ?? ""

    return new ImageResponse(
      <div
        style={{
          backgroundColor: "#fffcf5",
          height: "100%",
          width: "100%",
          display: "flex",
          padding: "100px",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          {/* biome-ignore lint/a11y/useAltText: <explanation> */}
          <img
            height={100}
            src="https://www.gravatar.com/avatar/046db2877d2f9342de37d0d59c5df4a9?s=100"
            style={{ borderRadius: "50%" }}
            width={100}
          />
          <div
            style={{
              fontSize: 40,
              marginLeft: 35,
              fontWeight: 700,
              fontFamily: 'Merriweather"',
              color: "#8e6e15",
            }}
          >
            Philipp Spiess
          </div>
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            fontFamily: 'Merriweather"',
            color: "rgba(0,0,0,.9)",
            marginTop: 60,
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 400,
            fontFamily: 'Merriweather"',
            color: "rgba(0,0,0,.9)",
            marginTop: 10,
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            display: "flex",
          }}
        >
          {date}
          {sub.split("/").map((segment, index) => {
            if (index > 0) {
              return (
                <>
                  <span
                    style={{
                      margin: "0 0.25rem",
                      color: "rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    /
                  </span>
                  {segment}
                </>
              )
            }

            return segment
          })}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Merriweather",
            data: boldData,
            weight: 700,
          },
          {
            name: "Merriweather",
            data: normalData,
            weight: 400,
          },
        ],
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response("Failed to generate the image", {
      status: 500,
    })
  }
}
