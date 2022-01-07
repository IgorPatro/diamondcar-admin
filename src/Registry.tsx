import React from "react"
import { Registry as RegistryInterface } from "@src/interfaces"
import axios from "axios"
import { toast } from "react-toastify"

interface Props {
  registry: RegistryInterface
  registryId: string
  fetchUserRegistries: (userId: string) => void
  userId: string
}

const Registry = ({
  registry,
  registryId,
  fetchUserRegistries,
  userId,
}: Props) => {
  const deleteRegistry = () => {
    axios
      .post("/api/registry/deleteRegistry", { registryId })
      .then((response) => {
        if (response.data.status === "error") {
          return toast.error(response.data.message)
        }

        fetchUserRegistries(userId)

        return toast.success(response.data.message)
      })
  }

  return (
    <div className="bg-white p-5 w-full drop-shadow-md relative">
      <h4 className="text-3xl">{registry.value} zł</h4>
      <p className="text-xl mt-2">{registry.description}</p>
      <p className="absolute top-4 right-4">
        {new Date(registry.timestamp).toLocaleDateString("en-GB")}
      </p>
      <button
        type="button"
        className="absolute bottom-4 right-4 py-2 px-4 flex justify-center items-center bg-red-600 hover:bg-red-700 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
        onClick={deleteRegistry}
      >
        Delete
      </button>
    </div>
  )
}

export default Registry
