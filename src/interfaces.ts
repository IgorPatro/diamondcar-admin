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
}

export type { User, Registry, UsersObject }
