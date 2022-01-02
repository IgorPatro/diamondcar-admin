import { getSession } from "next-auth/react"

const handler = async (req: any, res: any) => {
  const session = await getSession({ req })

  console.log(session)

  res.json(session)
}

export default handler
