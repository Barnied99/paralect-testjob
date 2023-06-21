import Emptystate from "@/components/emptystate";
import FavButtonadd from "@/components/favbuttonadd";
import FavButtondel from "@/components/favbuttondel";
import { Text, Button } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import styles from "../styles/favorites.module.css"
import { v4 as uuidv4 } from 'uuid'


const Favoritesdata = (props) => {

    return (
        <>
            {
                props.datase.length !== 0 ? props.datase.map((el) => (

                    <div key={uuidv4()} >
                        <Link className={styles.main_info_item} key={uuidv4()} href={`/${el.id}`}>
                            <div className={styles.main_info_item1} key={uuidv4()}>
                                <Text fz="lg" c="#5E96FC" key={uuidv4()}>{el.profession}</Text>
                                <Button radius="md" variant="subtle" value={el.id} onClick={(e) => props.starClickFav(e, el)}>
                                    {props.local.includes(el) ? <FavButtondel /> : <FavButtonadd />}
                                </Button>

                            </div>
                            <div className={styles.content} key={uuidv4()}>
                                <Text fw={600} key={uuidv4()} c="#232134" >з/п {props.fixpaymentfrom(el.payment_from)}</Text>
                                {props.fixpayderk(el.payment_from, el.payment_to)}

                                <Text fw={600} key={uuidv4()} c="#232134" > {props.fixpaymentto(el.payment_to)}</Text>
                                <Text fw={600} key={uuidv4()} c="#232134" >{el.currency}</Text> •
                                <Text key={uuidv4()} className="text">{el.type_of_work.title}</Text>
                            </div>
                            <div className={styles.content} key={uuidv4()}>
                                <IconMapPin color='#ACADB9' size="1.3rem" />
                                <Text key={uuidv4()} className="text">{el.town.title}</Text>
                            </div>
                        </Link>
                    </div>
                ))
                    :
                    <Emptystate />

            }
        </>
    )
}

export default Favoritesdata