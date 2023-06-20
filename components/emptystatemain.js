import styles from "../styles/favorites.module.scss"
import Image from "next/image";


const EmptystateMain = () => {

    return (
        <div className={styles.flex_balloon}>
            <div >
                <Image src="balloon.svg" width={240} height={240} alt='empty' />
            </div>

        </div>
    )
}

export default EmptystateMain