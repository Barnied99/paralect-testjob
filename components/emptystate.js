import styles from "../styles/favorites.module.css"
import Link from "next/link";
import Image from "next/image";
import { Text, Button } from "@mantine/core";


const Emptystate = () => {

    return (
        <div className={styles.flex_empty}>
            <div className={styles.logo}>
                <Image src="emptyfv.svg" width={240} height={240} alt='empty' />
                <Text fz="xl"> Упс, здесь еще ничего нет!</Text>
                <Link href={`/`}>
                    <Button radius="md" variant="light" >
                        Поиск вакансий
                    </Button>
                </Link>

            </div>

        </div>
    )
}

export default Emptystate