import React from "react"
import { User as UserInterface, RegistriesObject } from "@src/interfaces"
import { toast } from "react-toastify"
import axios from "axios"
import BasicUserInfo from "./BasicUserInfo"
import Registry from "./Registry"
import RegistryForm from "./RegistryForm"

const registry = {
  userId: "jRdPPGG6vWO3X5i7lH93c5VGvnC2",
  value: 100,
  description: "Mycie auta",
}

interface Props {
  user: UserInterface
  userId: string
  fetchUser: (userId: string) => void
}

const User = ({ user, userId, fetchUser }: Props) => {
  const [registries, setRegistries] = React.useState<RegistriesObject | null>(
    null
  )

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

  const sendPasswordReset = () => {
    axios.post("/api/user/sendPasswordReset", { userId }).then((response) => {
      if (response.data.status === "error") {
        return toast.error(response.data.message)
      }

      return toast.success(response.data.message)
    })
  }

  const fetchUserRegistries = (userId: string) => {
    axios
      .post("/api/registry/getRegistriesForUser", { userId })
      .then((response) => {
        if (response.data.status === "error") {
          return toast.error(response.data.message)
        }

        setRegistries(response.data)
      })
  }

  React.useEffect(() => {
    fetchUserRegistries(userId)
  }, [userId])

  return (
    <div className="flex">
      <div className="w-2/3">
        <BasicUserInfo user={user} userId={userId} updateUser={updateUser} />
        <button
          type="button"
          className="py-2 px-4 mt-5 bg-indigo-600 hover:bg-indigo-700 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
          onClick={sendPasswordReset}
        >
          Send password reset
        </button>
        <RegistryForm
          userId={userId}
          fetchUserRegistries={fetchUserRegistries}
          fetchUser={fetchUser}
        />
      </div>
      <div className="w-full flex flex-col gap-5">
        {registries && Object.keys(registries).length ? (
          Object.keys(registries).map((key) => (
            <Registry
              key={key}
              registry={registries[key]}
              registryId={key}
              userId={userId}
              fetchUserRegistries={fetchUserRegistries}
            />
          ))
        ) : (
          <h2 className="text-2xl">There are no registries for this user</h2>
        )}
      </div>
    </div>
  )
}

export default User
