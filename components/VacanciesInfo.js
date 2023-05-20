import styles from "../styles/Vacancies.module.css"
import { v4 as uuidv4 } from 'uuid'
import parse from 'html-react-parser';
import { Text } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";




const VacanciesInfo = (data) => {
    const datas = Array(data.data)

    const fixpaymentto = (el) => {
        return el == 0 ? '' : `${el} `
    }

    const fixpaymentfrom = (el) => {
        return el == 0 ? '' : `${el} -`
    }
    return (
        <div className={styles.content2}>
            <article>
                <div className={styles.vacancies}>
                    <div className={styles.flex_vac}>
                        <div className={styles.felx_main_info_v1}>
                            {datas.map((el) => (

                                <div className="flex-cont" key={uuidv4()}>
                                    <h1 key={uuidv4()} > {el.profession}</h1>
                                    <div className={styles.content}>
                                        <Text fw={600} key={uuidv4()} c="#232134" >з/п {fixpaymentfrom(el.payment_from)}</Text>
                                        <Text fw={600} key={uuidv4()} c="#232134" > {fixpaymentto(el.payment_to)}</Text>
                                        <Text fw={600} key={uuidv4()} c="#232134" >{el.currency}</Text> •
                                        <Text key={uuidv4()} className={styles.text}>{el.type_of_work.title}</Text>
                                    </div>
                                    <div className={styles.content}>
                                        <IconMapPin color='#ACADB9' size="1.3rem" />
                                        <Text key={uuidv4()} className={styles.text}>{el.town.title}</Text>
                                    </div>

                                </div>


                            )
                            )}
                        </div>


                        <div className={styles.felx_main_info_v2}>
                            {datas.map((el) => (
                                <div key={uuidv4()}>
                                    <div key={uuidv4()}>{parse(el.vacancyRichText)}</div>

                                </div>

                            )
                            )}
                        </div>
                    </div>
                </div>

            </article >

        </div >
    )
}

export default VacanciesInfo