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

  const registryData = req.body

  if (!registryData || !registryData.userId) {
    res.json({ message: "You didn't passed required data", status: "error" })
    return
  }

  const userToUpdate = await FirebaseAdmin.firestore()
    .collection("users")
    .doc(registryData.userId)
    .get()
    .then((doc) => doc.data())
    .catch((err) => {
      console.log(err)
      return false
    })

  if (!userToUpdate) {
    res.json({ message: "There is no user with given id", status: "error" })
    return
  }

  const isDataAdded = await FirebaseAdmin.firestore()
    .collection("registries")
    .add({ ...registryData, timestamp: new Date().toString() })
    .then(() => true)
    .catch((err) => {
      console.log(err)
      return false
    })

  if (!isDataAdded) {
    res.json({
      message: "New registry wasn't added due to error",
      status: "error",
    })
    return
  }

  const userCurrentSaldo = await FirebaseAdmin.firestore()
    .collection("users")
    .doc(registryData.userId)
    .get()
    .then((doc) => {
      const data = doc.data()
      return data ? data.saldo : false
    })

  if (userCurrentSaldo === false) {
    res.json({
      message:
        "There was a problem with a given user. We can't read his current saldo",
      status: "error",
    })
    return
  }

  const isUserUpdated = await FirebaseAdmin.firestore()
    .collection("users")
    .doc(registryData.userId)
    .update({ saldo: userCurrentSaldo + registryData.value })
    .then(() => true)
    .catch((err) => {
      console.log(err)
      return false
    })

  if (!isUserUpdated) {
    res.json({
      message:
        "We didn't updated user saldo. It might be a big problem so check this out as fast as you can!",
      status: "error",
    })
    return
  }

  return res.json({
    message: "Registry created successfully",
    status: "success",
  })
}

export default handler
