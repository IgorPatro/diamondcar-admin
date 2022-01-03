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

  const newUserData = req.body

  if (!newUserData) {
    res.json({ message: "You didn't passed required data", status: "error" })
    return
  }

  // 1. Create new user in firebase auth and fetch new id
  const userInAuthService = await FirebaseAdmin.auth()
    .createUser({
      email: newUserData.email,
      emailVerified: false,
      password:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      disabled: false,
    })
    .then((userRecord) => userRecord)
    .catch((err) => {
      console.log(err)
      false
    })

  if (!userInAuthService) {
    res.json({ message: "User wasn't created due to error", status: "error" })
    return
  }

  // 2. Create new record with user in firestore
  await FirebaseAdmin.firestore()
    .collection("users")
    .doc(userInAuthService.uid)
    .set(newUserData)

  // TODO: 3. Send email to set password to new user

  return res.json({ message: "User created successfully", status: "success" })
}

export default handler
