import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        login: {
          label: "Login",
          type: "text",
          placeholder: "login",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*************",
        },
      },
      authorize: (credentials) => {
        if (!credentials) {
          return null
        }

        if (
          credentials.login === "diamondCarAdmin17" &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "admin",
            name: "admin",
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }

      return session
    },
  },
  secret: process.env.NEXTAUTH_JWT_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  session: {
    maxAge: 60,
  },
})
