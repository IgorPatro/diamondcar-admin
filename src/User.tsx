import React from "react"
import { User as UserInterface } from "@src/interfaces"
import { toast } from "react-toastify"
import axios from "axios"
import BasicUserInfo from "./BasicUserInfo"

interface Props {
  user: UserInterface
  userId: string
  fetchUser: (userId: string) => void
}

const User = ({ user, userId, fetchUser }: Props) => {
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

  return (
    <div>
      <BasicUserInfo user={user} userId={userId} updateUser={updateUser} />

      <button
        type="button"
        className="py-2 px-4 mt-5 bg-indigo-600 hover:bg-indigo-700 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
        onClick={sendPasswordReset}
      >
        Send password reset
      </button>
    </div>
  )
}

export default User
