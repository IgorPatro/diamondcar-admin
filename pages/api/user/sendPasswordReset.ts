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

  const user = await FirebaseAdmin.auth()
    .getUser(userId)
    .then((userRecord) => userRecord)
    .catch((err) => {
      console.log(err)
      return false
    })

  if (!user || user === true) {
    res.json({ message: "There is no user with given id", status: "error" })
    return
  }

  const passwordResetRecord = await FirebaseAdmin.firestore()
    .collection("passwordResets")
    .add({
      email: user.email,
      userId,
    })
    .then((doc) => doc.id)
    .catch((err) => {
      console.log(err)
      return false
    })

  if (!passwordResetRecord) {
    res.json({
      message: "Password reset wasn't added due to error",
      status: "error",
    })
    return
  }

  // TODO: Send password reset email

  res.json({ message: "Password reset sent", status: "success" })
}

export default handler
