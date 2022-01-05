interface User {
  firstName: string
  lastName: string
  email: string
  saldo: number
}

type UsersObject = Record<string, User>

interface Registry {
  userId: string
  value: number
  description: string
  timestamp: string
}

type RegistriesObject = Record<string, Registry>

export type { User, Registry, UsersObject, RegistriesObject }
