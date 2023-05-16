import Head from "next/head"
import VacanciesInfo from "@/components/VacanciesInfo"
import { useRouter } from "next/router"

const Vacancies = ({ data }) => {
    const router = useRouter()
    const { id } = router.query
    const datas = data


    return (
        <>
            <Head>
                <title>Вакансия</title>
            </Head>
            <VacanciesInfo data={datas} />
        </>
    )
}


export async function getServerSideProps(ctx) {

    const serchkeyword1 = ctx.query.id


    const response = await fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${serchkeyword1}`, {
        method: 'Get',
        mode: 'cors',
        credentials: "include",

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
            'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
        }

    })

    const data = await response.json();
    return {
        props: { data },

    }
}

export default Vacancies