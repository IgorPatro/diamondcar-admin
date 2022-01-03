import React from "react"
import { useSession, getSession } from "next-auth/react"
import Navigation from "@src/Navigation"

const IndexPage = () => {
  const { data: session } = useSession()

  console.log(session)

  return <Navigation />
}

export const getServerSideProps = async ({ req }: any) => {
  const session = await getSession({ req })

  console.log(session)

  // if (!session) {
  //   return { redirect: { permanent: false, destination: "/api/auth/signin" } }
  // }

  return { props: {} }
}

export default IndexPage
