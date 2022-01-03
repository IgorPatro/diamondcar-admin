import React from "react"
import { useSession, getSession } from "next-auth/react"
import { UsersObject } from "@src/interfaces"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import Navigation from "@src/Navigation"
import Users from "@src/Users"
import "react-toastify/dist/ReactToastify.css"

const IndexPage = () => {
  const [users, setUsers] = React.useState<null | UsersObject>(null)

  React.useEffect(() => {
    axios.get("/api/user/getUsers").then((response) => {
      if (response.data.status === "error") {
        return toast.error(response.data.message)
      }

      setUsers(response.data)
    })
  }, [])

  React.useEffect(() => {
    console.log(users)
  }, [users])

  return (
    <>
      <Navigation />
      <Users users={users} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export const getServerSideProps = async ({ req }: any) => {
  const session = await getSession({ req })

  // console.log(session)

  // if (!session) {
  //   return { redirect: { permanent: false, destination: "/api/auth/signin" } }
  // }

  return { props: {} }
}

export default IndexPage
