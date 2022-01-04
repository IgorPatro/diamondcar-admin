import React from "react"
import { getSession } from "next-auth/react"
import axios from "axios"
import { toast } from "react-toastify"
import SimpleNavigation from "@src/SimpleNavigation"
import { User as UserInterface } from "@src/interfaces"
import User from "@src/User"

interface Props {
  userId: string
}

const UserPage = ({ userId }: Props) => {
  const [user, setUser] = React.useState<UserInterface | null>(null)

  const fetchUser = (userId: string) => {
    axios.post("/api/user/getUser", { userId }).then((response) => {
      if (response.data.status === "error") {
        return toast.error(response.data.message)
      }

      setUser(response.data)
    })
  }

  React.useEffect(() => {
    fetchUser(userId)
  }, [userId])

  return (
    <>
      <SimpleNavigation />
      <div className="m-20 p-10 drop-shadow-lg bg-gray-200">
        {user ? (
          <User user={user} userId={userId} fetchUser={fetchUser} />
        ) : (
          <h2 className="font-bold text-3xl">There is no user with given id</h2>
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async ({ req, query }: any) => {
  const session = await getSession({ req })

  // if (!session) {
  //   return { redirect: { permanent: false, destination: "/api/auth/signin" } }
  // }

  const { userId } = query

  return {
    props: {
      userId,
    },
  }
}

export default UserPage
