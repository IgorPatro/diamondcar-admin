import React from "react"
import { getSession } from "next-auth/react"
import { UsersObject, User } from "@src/interfaces"
import axios from "axios"
import { toast } from "react-toastify"
import Navigation from "@src/Navigation"
import Users from "@src/Users"
import UserForm from "@src/UserForm"

const IndexPage = () => {
  const [users, setUsers] = React.useState<null | UsersObject>(null)
  const [filteredUsers, setFilteredUsers] = React.useState<null | UsersObject>(
    null
  )
  const [filter, setFilter] = React.useState<string>("")

  const fetchUsers = () => {
    axios.get("/api/user/getUsers").then((response) => {
      if (response.data.status === "error") {
        return toast.error(response.data.message)
      }

      setUsers(response.data)
    })
  }

  React.useEffect(() => {
    fetchUsers()
  }, [])

  React.useEffect(() => {
    if (!users) {
      return
    }

    const usersIds = Object.keys(users).map((key) => key)

    const filterUsers: Record<string, User> = {}
    usersIds.forEach((userId) => {
      const currentUser = users[userId]
      const filterToLowerCase = filter.toLowerCase()

      if (
        currentUser.firstName.toLowerCase().includes(filterToLowerCase) ||
        currentUser.lastName.toLowerCase().includes(filterToLowerCase) ||
        currentUser.email.toLowerCase().includes(filterToLowerCase) ||
        currentUser.saldo === Number(filterToLowerCase)
      ) {
        filterUsers[userId] = users[userId]
      }
    })

    setFilteredUsers(Object.keys(filterUsers).length ? filterUsers : null)
  }, [filter, users])

  return (
    <>
      <Navigation setFilter={setFilter} filter={filter} />
      <Users users={filter ? filteredUsers : users} />
      <UserForm fetchUsers={fetchUsers} />
    </>
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
