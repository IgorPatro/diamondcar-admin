import FirebaseAdmin from "@src/firebaseAdmin"
import { getSession } from "next-auth/react"
import { User } from "@src/interfaces"

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

  const { userId } = req.body

  if (!userId) {
    res.json({ message: "You didn't passed required data", status: "error" })
    return
  }

  const user = await FirebaseAdmin.firestore()
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => doc.data())
    .catch((err) => {
      console.log(err)
      return false
    })

  if (!user) {
    res.json({ message: "There is no user with given id", status: "error" })
    return
  }

  res.json(user)
}

export default handler
