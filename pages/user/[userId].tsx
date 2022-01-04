import React from "react"
import { getSession } from "next-auth/react"
import SimpleNavigation from "@src/SimpleNavigation"

interface Props {
  userId: string
}

const UserPage = ({ userId }: Props) => {
  return (
    <>
      <SimpleNavigation />
      <div className="p-10">{userId}</div>
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
