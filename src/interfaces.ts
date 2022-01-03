interface User {
  firstName: string
  lastName: string
  email: string
  saldo: number
}

interface Registry {
  userId: string
  value: number
  description: string
}

export type { User, Registry }
