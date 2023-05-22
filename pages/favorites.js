import Head from "next/head"
import styles from "../styles/favorites.module.css"
import Image from "next/image";
import { setLocalStorage, getLocalStorage } from "../utils/store"
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from "react";
import { Text, Button, Pagination } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import stylesf from "../styles/Footer.module.css"


const FavButtondel = () => {
    return (
        <Image src="Star2.svg" width={20} height={20} alt='star2' />

    )
}

const FavButtonadd = () => {
    return (
        <Image src="Star.svg" width={20} height={20} alt='star' />

    )
}

const Favorites = () => {


    const [datas, setdatas] = useState([])
    useEffect(() => {
        typeof window !== 'undefined' ? setdatas(getLocalStorage('data')) : console.log(null)

    }, [])




    const starClickFav = (event, el) => {
        event.preventDefault();

        if (datas.includes(el)) {
            setdatas(datas.filter((elem) => elem !== el))
        } else {
            setdatas([...datas, el])
        }
    }

    const items = datas

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    const pagesizemain = 4

    const onPageChange = (page) => {
        setCurrentPage(page);
    };




    const paginate = (items, currentPage, pagesizemain) => {
        const startIndex = (currentPage - 1) * pagesizemain;
        return items.slice(startIndex, startIndex + pagesizemain);
    };

    const datase = paginate(items, currentPage, pagesizemain)



    return (
        <>
            <Head>
                <title>Избранное</title>
            </Head>

            <article>
                <div className={styles.flex_container}>
                    <div className={styles.container}>
                        <div className={styles.favorite}></div>
                        {
                            datase.length !== 0 ? datase.map((el) => (
                                <Link className={styles.main_info_item} key={uuidv4()} href={`/${el.id}`}>
                                    <div className={styles.main_info_item1} key={uuidv4()}>
                                        <Text fz="lg" c="#5E96FC" key={uuidv4()}>{el.profession}</Text>
                                        <Button radius="md" variant="subtle" value={el.id} onClick={(e) => starClickFav(e, el)}>
                                            {datas.includes(el) ? <FavButtondel /> : <FavButtonadd />}
                                        </Button>

                                    </div>
                                    <div className={styles.content} key={uuidv4()}>
                                        <Text fw={600} key={uuidv4()} c="#232134" >з/п {el.payment_from}</Text>
                                        <Text fw={600} key={uuidv4()} c="#232134" > {el.payment_to}</Text>
                                        <Text fw={600} key={uuidv4()} c="#232134" >{el.currency}</Text> •
                                        <Text key={uuidv4()} className="text">{el.type_of_work.title}</Text>
                                    </div>
                                    <div className="content" key={uuidv4()}>
                                        <IconMapPin color='#ACADB9' size="1.3rem" />
                                        <Text key={uuidv4()} className="text">{el.town.title}</Text>
                                    </div>
                                </Link>
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
            </article>

            <footer>
                <div className={stylesf.foot}>
                    <Pagination
                        value={currentPage}
                        onChange={onPageChange}
                        position="center"
                        total={3}

                    />
                </div>
            </footer>

        </>


    )

}

export default Favorites