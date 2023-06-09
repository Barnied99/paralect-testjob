import Link from "next/link";
import { v4 as uuidv4 } from 'uuid'
import { Flex, Button, Text, ScrollArea } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import FavButtonadd from "@/components/favbuttonadd";
import FavButtondel from "@/components/favbuttondel";
import EmptystateMain from "@/components/emptystatemain";
import styles from "../styles/Footer.module.css"


const IndexData = ({ local, datas, starClick, fixpaymentfrom, fixpayderk, fixpaymentto }) => {

    const chu = (elem) => local.find((el) => {

        if (elem === el.id) {
            return el.id
        }
    })

    return (
        <>
            <ScrollArea h={580} type="never"  >
                <Flex gap="md"
                    direction="column">
                    {
                        datas.length !== 0 ? datas.map((el) => (
                            <Link className="main_info_item" key={uuidv4()} href={`/${el.id}`} data-elem={`vacancy-${el.id}`}  >
                                <div className="main_info_item1"  >
                                    <Text fz="lg" c="#5E96FC" key={uuidv4()}>{el.profession}</Text>
                                    <Button radius="md" variant="subtle" value={el.id} onClick={(e) => starClick(e, el)} >
                                        {chu(el.id) !== undefined ? <FavButtondel el={el.id} /> : <FavButtonadd el={el.id} />
                                        }

                                    </Button>
                                </div>
                                <div className="content">
                                    <Text fw={600} key={uuidv4()} c="#232134" >з/п {fixpaymentfrom(el.payment_from)}</Text>
                                    {fixpayderk(el.payment_from, el.payment_to)}
                                    <Text fw={600} key={uuidv4()} c="#232134" > {fixpaymentto(el.payment_to)}</Text>
                                    <Text fw={600} key={uuidv4()} c="#232134" >{el.currency}</Text> •
                                    <Text key={uuidv4()} className="text">{el.type_of_work.title}</Text>
                                </div>
                                <div className="content">
                                    <IconMapPin color='#ACADB9' size="1.3rem" />
                                    <Text key={uuidv4()} className="text">{el.town.title}</Text>
                                </div>

                            </Link>
                        )

                        )
                            : <EmptystateMain />
                    }
                </Flex>
            </ScrollArea>
        </>
    )
}


export default IndexData