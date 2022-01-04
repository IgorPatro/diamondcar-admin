import React from "react"
import { getSession } from "next-auth/react"
import axios from "axios"
import { toast } from "react-toastify"
import SimpleNavigation from "@src/SimpleNavigation"
import { User } from "@src/interfaces"

interface Props {
  userId: string
}

const UserPage = ({ userId }: Props) => {
  const [user, setUser] = React.useState<User | null>(null)

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
          <div>
            <h3 className="text-3xl">{`${user.firstName} ${user.lastName}`}</h3>
            <h3 className="text-3xl">{user.email}</h3>
            <h3 className="text-3xl">{user.saldo} zł</h3>
          </div>
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
