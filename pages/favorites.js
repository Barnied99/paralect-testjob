import Head from "next/head"
// import { Button } from "@mantine/core"
import styles from "../styles/favorites.module.css"
import Image from "next/image";

const favorites = () => {
    return (
        <>
            <Head>
                <title>Избранное</title>
            </Head>
            <div className={styles.flex_empty}>
                <div className={styles.logo}>
                    <Image src="empty.svg" width={240} height={240} alt='empty' />
                    {/* <span className={styles.logoname}>Jobored</span> */}
                </div>
            </div>
        </>




    )

}

export default favorites