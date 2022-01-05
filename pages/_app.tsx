import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify"
import { AppProps } from "next/app"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </SessionProvider>
  )
}

export default App
