import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@test.com",
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
          credentials.email === "i.patro@wp.pl" &&
          credentials.password === "pass123"
        ) {
          return {
            id: 264817401,
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
  secret: "test",
  jwt: {
    secret: "test",
  },
  session: {
    maxAge: 60,
  },
})
