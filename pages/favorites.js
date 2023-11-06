import Head from "next/head"
import styles from "../styles/favorites.module.css"
import { useState, useEffect } from "react";
import { Pagination } from "@mantine/core";
import stylesf from "../styles/Footer.module.css"
import Favoritesdata from "@/components/favoritesdata";


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



    const [local, setLocal] = useState([])



    useEffect(() => {
        const chunck = localStorage.getItem('data')
        if (chunck !== undefined) {
            setLocal(JSON.parse(chunck))
        }
    }, [])


    const starClickFav = (event, el) => {
        event.preventDefault();

        if (local.includes(el)) {
            setLocal(local.filter((elem) => elem !== el))

            localStorage.setItem('data', JSON.stringify(local.filter((elem) => elem !== el)))
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
                        <Favoritesdata datase={datase} starClickFav={starClickFav} local={local} fixpaymentto={fixpaymentto} fixpaymentfrom={fixpaymentfrom} fixpayderk={fixpayderk} />


                    </div>
                </div>
            </article>
            <footer>
                <div className={stylesf.foot}>
                    <Pagination
                        value={currentPage}
                        onChange={onPageChange}
                        position="center"
                        total={pageSize}

                    />
                </div>
            </footer>
        </>
    )

}



export default Favorites

