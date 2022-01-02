import FirebaseAdmin from "@src/firebaseAdmin"

const handler = async (req: any, res: any) => {
  FirebaseAdmin.firestore()
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
      })
    })

  res.json({ response: "IDK" })
}

export default handler
