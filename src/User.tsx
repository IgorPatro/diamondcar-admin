import React from "react"
import { User as UserInterface } from "@src/interfaces"
import { toast } from "react-toastify"
import axios from "axios"

interface Props {
  user: UserInterface
  userId: string
  fetchUser: (userId: string) => void
}

const User = ({ user, userId, fetchUser }: Props) => {
  const [editionOpen, setEditionOpen] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    saldo: false,
  })
  const [editionValues, setEditionValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    saldo: "",
  })

  const updateUser = (updateData: any) => {
    axios
      .post("/api/user/updateUser", { updateData, userId })
      .then((response) => {
        if (response.data.status === "error") {
          return toast.error(response.data.message)
        }

        fetchUser(userId)

        return toast.success(response.data.message)
      })
  }

  return (
    <div>
      <div>
        <p className="text-2xl">
          {editionOpen.firstName ? (
            <>
              <input
                className="p-1"
                placeholder={user.firstName}
                value={editionValues.firstName}
                onChange={(e) =>
                  setEditionValues((prevState) => ({
                    ...prevState,
                    firstName: e.target.value,
                  }))
                }
              />
              <button
                onClick={() => {
                  setEditionOpen((prevState) => ({
                    ...prevState,
                    firstName: false,
                  }))

                  if (
                    !editionValues.firstName ||
                    editionValues.firstName === user.firstName
                  ) {
                    return
                  }

                  updateUser({ firstName: editionValues.firstName })
                }}
                className="mr-2"
              >
                ☑
              </button>
            </>
          ) : (
            <>
              <span
                className="cursor-text mr-2"
                onClick={() =>
                  setEditionOpen((prevState) => ({
                    ...prevState,
                    firstName: true,
                  }))
                }
              >
                {user.firstName}
              </span>
            </>
          )}
          {editionOpen.lastName ? (
            <>
              <input
                className="p-1"
                placeholder={user.lastName}
                value={editionValues.lastName}
                onChange={(e) =>
                  setEditionValues((prevState) => ({
                    ...prevState,
                    lastName: e.target.value,
                  }))
                }
              />
              <button
                onClick={() => {
                  setEditionOpen((prevState) => ({
                    ...prevState,
                    lastName: false,
                  }))

                  if (
                    !editionValues.lastName ||
                    editionValues.lastName === user.lastName
                  ) {
                    return
                  }

                  updateUser({ lastName: editionValues.lastName })
                }}
                className="mr-2"
              >
                ☑
              </button>
            </>
          ) : (
            <>
              <span
                className="cursor-text mr-2"
                onClick={() =>
                  setEditionOpen((prevState) => ({
                    ...prevState,
                    lastName: true,
                  }))
                }
              >
                {user.lastName}
              </span>
            </>
          )}
        </p>
        <p className="text-2xl my-3">
          {editionOpen.email ? (
            <>
              <input
                className="p-1"
                placeholder={user.email}
                value={editionValues.email}
                onChange={(e) =>
                  setEditionValues((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
              <button
                onClick={() => {
                  setEditionOpen((prevState) => ({
                    ...prevState,
                    email: false,
                  }))

                  if (
                    !editionValues.email ||
                    editionValues.email === user.email
                  ) {
                    return
                  }

                  updateUser({ email: editionValues.email })
                }}
                className="mr-2"
              >
                ☑
              </button>
            </>
          ) : (
            <>
              <span
                onClick={() =>
                  setEditionOpen((prevState) => ({
                    ...prevState,
                    email: true,
                  }))
                }
              >
                {user.email}
              </span>
            </>
          )}
        </p>
        <p className="text-2xl my-3">
          {editionOpen.saldo ? (
            <>
              <input
                className="p-1"
                placeholder={user.saldo.toString()}
                value={editionValues.saldo}
                onChange={(e) =>
                  setEditionValues((prevState) => ({
                    ...prevState,
                    saldo: e.target.value,
                  }))
                }
              />
              <button
                onClick={() => {
                  setEditionOpen((prevState) => ({
                    ...prevState,
                    saldo: false,
                  }))

                  if (
                    !editionValues.saldo ||
                    Number(editionValues.saldo) === user.saldo
                  ) {
                    return
                  }

                  updateUser({ saldo: Number(editionValues.saldo) })
                }}
                className="mr-2"
              >
                ☑
              </button>
            </>
          ) : (
            <>
              <span
                onClick={() =>
                  setEditionOpen((prevState) => ({
                    ...prevState,
                    saldo: true,
                  }))
                }
              >
                {user.saldo} zł
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default User
