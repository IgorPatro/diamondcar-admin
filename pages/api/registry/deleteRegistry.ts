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

  const { registryId } = req.body

  if (!registryId) {
    res.json({ message: "You didn't passed required data", status: "error" })
    return
  }

  const isDataDeleted = await FirebaseAdmin.firestore()
    .collection("registries")
    .doc(registryId)
    .delete()
    .then(() => true)
    .catch((err) => {
      console.log(err)
      return false
    })

  if (!isDataDeleted) {
    res.json({
      message: "Registry wasn't deleted due to error",
      status: "error",
    })
    return
  }

  return res.json({
    message: "Registry deleted successfully",
    status: "success",
  })
}

export default handler
