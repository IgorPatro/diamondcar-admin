import React from "react"
import { UsersObject } from "./interfaces"

interface Props {
  users: UsersObject | null
}

const Users = ({ users }: Props) => {
  return users ? (
    <div>{Object.keys(users).map((key) => key)}</div>
  ) : (
    <h2>There are no users</h2>
  )
}

export default Users
