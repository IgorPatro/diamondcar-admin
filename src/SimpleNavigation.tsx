import React from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"

const SimpleNavigation = () => {
  return (
    <nav className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 z-40">
      <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0 justify-between">
          <div className="text-white">
            <Link href="/">Home</Link>
          </div>
          <button
            type="button"
            className="px-5 py-3 bg-pink-600 hover:bg-pink-700 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md   rounded-full"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default SimpleNavigation
