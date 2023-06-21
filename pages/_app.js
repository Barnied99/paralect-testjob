import Layout from '../components/Layout'
import styles from "../styles/global.css"


const App = ({ Component, pageProps }) => {



  return (
    <>

      <Layout >
        <Component {...pageProps} />
      </Layout>

    </>

  )
}

export default App
