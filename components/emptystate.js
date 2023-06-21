import styles from "../styles/favorites.module.css"
import Link from "next/link";
import Image from "next/image";
import { Text, Button } from "@mantine/core";
import { v4 as uuidv4 } from 'uuid'


const Emptystate = () => {

    return (
        <div className={styles.flex_empty}>
            <div className={styles.logo} >
                <Image src="emptyfv.svg" width={240} placeholder="blur"
                    blurDataURL={'/emptyfv.svg'}
                    height={240} alt='empty' />
                <Text fz="xl"> Упс, здесь еще ничего нет!</Text>
                <Link key={uuidv4()} href={`/`}>
                    <Button key={uuidv4()} radius="md" variant="light" >
                        Поиск вакансий
                    </Button>
                </Link>

            </div>

        </div>
    )
}

export default Emptystate