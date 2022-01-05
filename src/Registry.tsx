import React from "react"
import { Registry as RegistryInterface } from "@src/interfaces"

interface Props {
  registry: RegistryInterface
}

const Registry = ({ registry }: Props) => {
  return (
    <div className="bg-white p-5 w-full drop-shadow-md relative">
      <h4 className="text-3xl">{registry.value} zł</h4>
      <p className="text-xl mt-2">{registry.description}</p>
      <p className="absolute top-4 right-4">
        {new Date(registry.timestamp).toLocaleDateString("en-GB")}
      </p>
    </div>
  )
}

export default Registry
