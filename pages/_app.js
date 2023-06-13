import Layout from '../components/Layout'
import styles from "../styles/global.css"
// import { MantineProvider, createEmotionCache } from '@mantine/core';

// const myCache = createEmotionCache({ key: 'mantine' });

const App = ({ Component, pageProps }) => {



  return (
    <>
      {/* <MantineProvider emotionCache={myCache} withGlobalStyles withNormalizeCSS> */}

      <Layout >
        <Component {...pageProps} />
      </Layout>
      {/* </MantineProvider> */}

    </>

  )
}

export default App
