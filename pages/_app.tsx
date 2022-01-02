import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import "./index.css"

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App
