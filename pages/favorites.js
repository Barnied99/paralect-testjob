import Head from "next/head"
import styles from "../styles/favorites.module.css"
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from "react";
import { Text, Button, Pagination } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import stylesf from "../styles/Footer.module.css"
import FavButtonadd from "@/components/favbuttonadd";
import FavButtondel from "@/components/favbuttondel";
import Emptystate from "@/components/emptystate";


const Favorites = () => {


    const fixpaymentto = (el) => {

        return el == 0 ? '' : `до ${el} `
    };

    const fixpaymentfrom = (el) => {
        return el == 0 ? '' : `от ${el}`
    };

    const fixpayderk = (a, b) => {
        if (a && b) {
            return '-'
        }
    }

    const [local, setLocal] = useState(typeof window !== 'undefined' && localStorage.getItem('data') ?
        JSON.parse(localStorage.getItem('data')) : [])



    useEffect(() => {
        typeof window !== 'undefined' ? window.localStorage.setItem('data', JSON.stringify(local)) : []

    }, [local])


    const starClickFav = (event, el) => {
        event.preventDefault();

        if (local.includes(el)) {
            setLocal(local.filter((elem) => elem !== el))
        }

    }

    const items = local

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
                                            {local.includes(el) ? <FavButtondel /> : <FavButtonadd />}
                                        </Button>

                                    </div>
                                    <div className={styles.content} key={uuidv4()}>
                                        <Text fw={600} key={uuidv4()} c="#232134" >з/п {fixpaymentfrom(el.payment_from)}</Text>
                                        {fixpayderk(el.payment_from, el.payment_to)}

                                        <Text fw={600} key={uuidv4()} c="#232134" > {fixpaymentto(el.payment_to)}</Text>
                                        <Text fw={600} key={uuidv4()} c="#232134" >{el.currency}</Text> •
                                        <Text key={uuidv4()} className="text">{el.type_of_work.title}</Text>
                                    </div>
                                    <div className="content" key={uuidv4()}>
                                        <IconMapPin color='#ACADB9' size="1.3rem" />
                                        <Text key={uuidv4()} className="text">{el.town.title}</Text>
                                    </div>
                                </Link>
                            ))
                                :
                                <Emptystate />

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