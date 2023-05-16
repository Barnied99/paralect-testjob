import styles from "../styles/Vacancies.module.css"
import { v4 as uuidv4 } from 'uuid'
import parse from 'html-react-parser';


const VacanciesInfo = (data) => {
    const datas = Array(data.data)
    return (
        <div className="content">
            <article>
                <div className={styles.vacancies}>
                    <div className={styles.flex_vac}>
                        <div className={styles.felx_main_info_v1}>
                            {datas.map((el) => (

                                <div className="flex-cont" key={uuidv4()}>
                                    <h1 key={uuidv4()}>{el.profession}</h1>
                                    <div key={uuidv4()}>{el.town.title}</div>
                                    <div key={uuidv4()}>{el.type_of_work.title}</div>
                                    <div key={uuidv4()}>{el.payment_to}</div>
                                    <div key={uuidv4()}>{el.payment_from}</div>
                                    <div key={uuidv4()}>{el.currency}</div>
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

            </article>

        </div>
    )
}

export default VacanciesInfo