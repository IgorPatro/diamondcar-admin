import FirebaseAdmin from "@src/firebaseAdmin"
import { getSession } from "next-auth/react"

const handler = async (req: any, res: any) => {
  const session = await getSession({ req })

  // if (!session) {
  //   res.statusMessage = `You have to be authorized to use this api.`
  //   res.status(401).end()
  //   return
  // }

  const data: Record<string, any> = {}
  await FirebaseAdmin.firestore()
    .collection("users")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        data[doc.id] = doc.data()
      })
    })

  res.json(data)
}

export default handler
