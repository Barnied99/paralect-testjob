import Head from "next/head"
import VacanciesInfo from "@/components/VacanciesInfo"
import { useRouter } from "next/router"
import nookies from 'nookies'

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


export const getServerSideProps = async (ctx) => {

    const serchkeyword1 = ctx.query.id
    let cookies = nookies.get(ctx)
    const ac = cookies['cookaccess']

    const response = await fetch(`https://api.superjob.ru/2.0/vacancies/${serchkeyword1}`, {
        method: 'Get',
        mode: 'cors',
        credentials: "include",

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Api-App-Id': 'v3.r.137589215.fcf4c49c52536b90f4627b136495a9ba55600c5d.83d03895eee6bdcc01e9104ccc143e6af6c9263c',

            'Authorization': `Bearer ${ac}`,

        }

    })

    const data = await response.json();

    return {
        props: { data },
    }
}

export default Vacancies