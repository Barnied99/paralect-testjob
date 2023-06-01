import Layout from '../components/Layout'
import styles from "../styles/global.css"
import { useMediaQuery } from "@mantine/hooks";

const App = ({ Component, pageProps }) => {

  const respo = useMediaQuery('(max-width:500px)')


  return (
    <>
      {respo ? (<Layout>
        <Component {...pageProps} />
      </Layout>) :
        (
          <Layout >
            <Component {...pageProps} />
          </Layout>
        )
      }
    </>

  )
}

export default App
