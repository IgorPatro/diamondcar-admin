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

  const { updateData, userId } = req.body

  if (!updateData || !userId) {
    res.json({ message: "You didn't passed required data", status: "error" })
    return
  }

  const user = await FirebaseAdmin.firestore()
    .collection("users")
    .doc(userId)
    .update(updateData)
    .then(() => true)
    .catch((err) => {
      console.log(err)
      return false
    })

  if (!user) {
    res.json({ message: "There is no user with given id", status: "error" })
    return
  }

  res.json({ message: "User updated successfully", status: "success" })
}

export default handler
