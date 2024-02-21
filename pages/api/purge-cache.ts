import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.query.token !== process.env.GITHUB_TOKEN) {
      return res.status(401).json({ message: "Invalid token" })
    }

    await res.revalidate("/")
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send("Error revalidating. Did you set a token?")
  }
}
