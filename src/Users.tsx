import React from "react"
import Link from "next/link"
import { UsersObject } from "./interfaces"

interface Props {
  users: UsersObject | null
}

const Users = ({ users }: Props) => {
  return (
    <div className="p-10">
      {users ? (
        <table className="table p-4 bg-white shadow rounded-lg w-full">
          <thead>
            <tr>
              <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                #
              </th>
              <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                First name
              </th>
              <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                Last name
              </th>
              <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                Email
              </th>
              <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">
                Saldo
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(users).map((key, index) => (
              <tr className="text-gray-700" key={key}>
                <td className="border p-4 dark:border-dark-5">{index + 1}</td>
                <td className="border p-4 dark:border-dark-5">
                  <Link href={`/user/${key}`}>{users[key].firstName}</Link>
                </td>
                <td className="border p-4 dark:border-dark-5">
                  {users[key].lastName}
                </td>
                <td className="border p-4 dark:border-dark-5">
                  {users[key].email}
                </td>
                <td className="border p-4 dark:border-dark-5">
                  {users[key].saldo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <h2 className="font-bold text-3xl">There are no users</h2>
          <p>Or you are not authenticated in API</p>
        </>
      )}
    </div>
  )
}

export default Users
