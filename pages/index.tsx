import React from "react"
import { useSession, getSession, signOut } from "next-auth/react"

const IndexPage = () => {
  const { data: session } = useSession()

  console.log(session)

  return (
    <div>
      <h1 className="text-4xl font-bold underline">Hello world!</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}

export const getServerSideProps = async ({ req }: any) => {
  const session = await getSession({ req })

  // if (!session) {
  //   return { redirect: { permanent: false, destination: "/api/auth/signin" } }
  // }

  return { props: {} }
}

export default IndexPage
