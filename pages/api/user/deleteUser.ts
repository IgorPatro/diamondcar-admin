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

  const { userId } = req.body

  if (!userId) {
    res.json({ message: "You didn't passed required data", status: "error" })
    return
  }

  const isUserInAuthServiceDeleted = await FirebaseAdmin.auth()
    .deleteUser(userId)
    .then(() => true)
    .catch((err) => {
      console.log(err)
      return false
    })

  if (!isUserInAuthServiceDeleted) {
    res.json({ message: "User wasn't deleted due to error", status: "error" })
    return
  }

  const isDatabaseUserDeleted = await FirebaseAdmin.firestore()
    .collection("users")
    .doc(userId)
    .delete()
    .then(() => true)
    .catch((err) => {
      console.log(err)
      return false
    })

  if (!isDatabaseUserDeleted) {
    res.json({
      message: "User in database wasn't deleted due to error",
      status: "error",
    })
    return
  }

  return res.json({ message: "User deleted successfully", status: "success" })
}

export default handler
