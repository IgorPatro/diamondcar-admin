import React from "react"
import axios from "axios"
import { toast } from "react-toastify"

interface Props {
  userId: string
  fetchUserRegistries: (userId: string) => void
  fetchUser: (userId: string) => void
}

const RegistryForm = ({ userId, fetchUserRegistries, fetchUser }: Props) => {
  const [value, setValue] = React.useState("")
  const [description, setDescription] = React.useState("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    axios
      .post("/api/registry/addRegistry", {
        value: Number(value),
        description,
        userId,
      })
      .then((response) => {
        if (response.data.status === "error") {
          return toast.error(response.data.message)
        }

        fetchUserRegistries(userId)
        fetchUser(userId)

        setValue("")
        setDescription("")

        return toast.success(response.data.message)
      })
  }

  return (
    <form className="flex max-w-none" onSubmit={onSubmit}>
      <div className="px-5 max-w-none py-7 mt-10 bg-white rounded-lg">
        <input
          type="text"
          className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          placeholder="Value e.g. -100"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <div className="col-span-2">
          <label className="text-gray-700" htmlFor="name">
            <textarea
              className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base min-h-min my-2"
              id="comment"
              placeholder="Description"
              rows={5}
              cols={40}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="col-span-2 text-right">
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg "
          >
            Send
          </button>
        </div>
      </div>
    </form>
  )
}

export default RegistryForm
