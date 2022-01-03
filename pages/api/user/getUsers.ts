import FirebaseAdmin from "@src/firebaseAdmin"
import { getSession } from "next-auth/react"

const handler = async (req: any, res: any) => {
  const session = await getSession({ req })

  // TODO: uncomment
  // if (!session) {
  //   res.json({
  //     message: "You have to be authorized to use this API",
  //     status: "error",
  //   })
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
