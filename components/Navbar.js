// import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css"
import { Text } from "@mantine/core";

const Navbar = () => {

    return (
        <>

            <nav className={styles.flexheader} >
                <div className={styles.logo}>
                    <Image src="Union.svg" width={30} height={30} alt='Jobored' />
                    <span className={styles.logoname}>Jobored</span>
                </div>
                <div className={styles.search}>
                    <Link legacyBehavior href="/" ><Text component="a" href="/" c="blue">
                        Поиск вакансии
                    </Text></Link>
                </div>
                <div className={styles.favorites}>
                    <Link legacyBehavior href="/favorites"><Text component="a" href="/favorites">
                        Избранное
                    </Text></Link>
                </div>
            </nav>

        </>
    );
};

export default Navbar;