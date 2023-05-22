import Head from "next/head"
import styles from "../styles/favorites.module.css"
import Image from "next/image";
import { setLocalStorage, getLocalStorage } from "../utils/store"
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from "react";
import { Text, Button } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";

const FavButtondel = (el) => {
    return (
        <Image src="Star2.svg" width={20} height={20} alt='star2' />

    )
}



const Favorites = () => {


    const [datas, setdatas] = useState([])
    useEffect(() => {
        typeof window !== 'undefined' ? setdatas(getLocalStorage('data')) : console.log(null)

    }, [])
    console.log(datas)

    return (
        <>
            <Head>
                <title>Избранное</title>
            </Head>
            <div className={styles.flex_container}>
                <div className={styles.container}>
                    <div className={styles.favorite}></div>
                    {
                        datas.length !== 0 ? datas.map((el) => (
                            <div className={styles.main_info_item} key={uuidv4()}>
                                <div className={styles.main_info_item1} key={uuidv4()}>
                                    <Text fz="lg" c="#5E96FC" key={uuidv4()}>{el.profession}</Text>
                                    <Button radius="md" variant="subtle" value={el.id}>
                                        <FavButtondel />
                                    </Button>
                                </div>
                                <div className={styles.content} key={uuidv4()}>
                                    <Text fw={600} key={uuidv4()} c="#232134" >{el.payment_from}</Text>
                                    <Text fw={600} key={uuidv4()} c="#232134" > {el.payment_to}</Text>
                                    <Text fw={600} key={uuidv4()} c="#232134" >{el.currency}</Text> •
                                    <Text key={uuidv4()} className="text">{el.type_of_work.title}</Text>
                                </div>
                                <div className="content" key={uuidv4()}>
                                    <IconMapPin color='#ACADB9' size="1.3rem" />
                                    <Text key={uuidv4()} className="text">{el.town.title}</Text>
                                </div>
                            </div>
                        ))


                            : (
                                <div className={styles.flex_empty}>
                                    <div className={styles.logo}>
                                        <Image src="empty.svg" width={240} height={240} alt='empty' />
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>

        </>




    )

}

export default Favorites