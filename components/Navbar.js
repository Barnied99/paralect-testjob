import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css"
import { Text } from "@mantine/core";
import { useRouter } from "next/router";
import { IconSearch } from "@tabler/icons-react";
import FavButtondel from "@/components/favbuttondel";


const Navbar = () => {

    const { pathname } = useRouter()

    return (
        <>
            <nav className={styles.flexheader} >
                <div className={styles.logo}>
                    <Image src="Union.svg" width={30} height={30} alt='Jobored' />
                    <Text className={styles.logoname}>Jobored</Text>
                </div>
                <div className={styles.search}>
                    <Link legacyBehavior href="/" >
                        <Text component="a" href="/" className={pathname === '/' ? styles.active : null}>
                            Поиск вакансии
                        </Text>
                    </Link>
                </div>
                <div className={styles.favorites}>
                    <Link legacyBehavior href="/favorites">
                        <Text component="a" href="/favorites" className={pathname === '/favorites' ? styles.active : null} >
                            Избранное
                        </Text>
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;