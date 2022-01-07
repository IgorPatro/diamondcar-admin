import axios from "axios"
import React from "react"
import { toast } from "react-toastify"

interface Props {
  fetchUsers: () => void
}

const UserForm = ({ fetchUsers }: Props) => {
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [saldo, setSaldo] = React.useState("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    axios
      .post("/api/user/addUser", {
        firstName,
        lastName,
        email,
        saldo: Number(saldo),
      })
      .then((response) => {
        if (response.data.status === "error") {
          return toast.error(response.data.message)
        }

        fetchUsers()

        setFirstName("")
        setLastName("")
        setEmail("")
        setSaldo("")

        return toast.success(response.data.message)
      })
  }

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 left-5 flex justify-center items-center w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white transition ease-in duration-200 text-center text-5xl font-semibold shadow-md rounded-full"
        onClick={() => setIsFormOpen((prevState) => !prevState)}
      >
        <span className="-mt-3">{isFormOpen ? "-" : "+"}</span>
      </button>
      {isFormOpen && (
        <div className="flex justify-center w-1/2 bg-white shadow-xl h-1/2 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <form className="flex max-w-none" onSubmit={onSubmit}>
            <div className="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-white rounded-lg">
              <div className="mb-10 text-3xl font-light text-center text-gray-800">
                Add new user
              </div>
              <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                <div className="col-span-2 lg:col-span-1">
                  <div className=" relative ">
                    <input
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <div className=" relative ">
                    <input
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <div className=" relative ">
                    <input
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <div className=" relative ">
                    <input
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Saldo"
                      onChange={(e) => setSaldo(e.target.value)}
                      value={saldo}
                    />
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
                    disabled={!firstName || !lastName || !email || !saldo}
                  >
                    Add user
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default UserForm
