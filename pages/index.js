import Head from "next/head"
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { Button, TextInput, Pagination } from "@mantine/core";
import styles from "../styles/Footer.module.css"
import { IconSearch } from "@tabler/icons-react";
import NodeCache from 'node-cache';
import nookies from 'nookies'
import axios from 'axios';
import Filter from "@/components/filter";
import IndexData from "@/components/indexdata";


const Home = ({ data, dataselect }) => {


  const inputRef = useRef(null);

  // избранное
  const [star, setStar] = useState([]);
  const [local, setLocal] = useState(typeof window !== 'undefined' && localStorage.getItem('data') ?
    JSON.parse(localStorage.getItem('data')) : []);



  useEffect(() => {
    typeof window !== 'undefined' ? window.localStorage.setItem('data', JSON.stringify(local)) : []

  }, [local]);

  // добавление избранного
  const starClick = (event, starfav) => {
    event.preventDefault();

    if (local.find((e) => e.id == starfav.id)) {
      setStar(star.filter((elem) => elem !== starfav));
      setLocal(local.filter((elem) => elem.id !== starfav.id));

    } else {
      setStar([...star, starfav]);
      setLocal([...local, starfav]);
    }
  }

  // филтрация отображения данных
  const fixPaymentTo = (el) => {
    return el == 0 ? '' : `до ${el} `
  };

  const fixPaymentFrom = (el) => {
    return el == 0 ? '' : `от ${el}`
  };

  const fixDash = (a, b) => {
    if (a && b) {
      return '-'
    }
  }


  //каталоги вакансий 
  const getKeyByValue = (obj, value) => {
    for (let key in obj) {
      if (obj[key] === value) {
        return key;
      }
    }
  };

  // сброс селекта
  const resetButton = () => {
    setNumberDataFrom(0)
    setNumberDataBefore(0)
    setSelect([])
    setSelectId([])
  };


  // поиск отрасли
  const dataSelect = dataselect.reduce((acc, el, i) => {
    return {
      ...acc,
      [el.key]: el.title.split(',')[0]
    }
  }, {});
  console.log(dataSelect);
  console.log(dataselect);
  const [value, setValue] = useState([]);


  const setValues = useCallback((e) => {
    setValue(e)
    inputRef.current.focus();

  }, [value])


  const handlesetSelect = (val) => {
    setSelect(val)
    console.log(val);
    // const strvalue = val.toString()

    const getstrvalue = val.map((el) => getKeyByValue(dataSelect, el))
    setSelectId(getstrvalue)
  }
  const [selectData, setSelect] = useState([]);
  const [selectDataId, setSelectId] = useState([]);



  // оклад

  const [numberdatafrom, setNumberDataFrom] = useState('');
  const [numberdatabefore, setNumberDataBefore] = useState('');



  const submitFilter = (e) => {
    e.preventDefault()

    if (selectData || value) {
      return router.push({
        query: `&published=1/keyword=${value}&catalogues=${selectDataId}&payment_from=${numberdatafrom}&payment_to=${numberdatabefore || numberdatafrom}`
      })
    }

  }

  // пагинация
  const items = data.objects

  const [currentPage, setCurrentPage] = useState(1);
  const pagesizemain = 20

  const onPageChange = (page) => {
    setCurrentPage(page);
  };


  const paginate = (items, currentPage, pagesizemain) => {
    const startIndex = (currentPage - 1) * pagesizemain;
    return items.slice(startIndex, startIndex + pagesizemain);
  };


  const datas = paginate(items, currentPage, pagesizemain)
  // 

  // поисковик 

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (value || selectData) {
      return router.push({
        query: `&published=1/catalogues=${selectDataId}&keyword=${value}`
      })
    }

  }
  // 



  return (
    <>
      <Head>
        <title>Поиск вакансий</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <article>
        <div className="article_main">
          <div className="flex_main">
            <aside>
              <div className="baraside">
                <Filter resetButton={resetButton} submitFilter={submitFilter} dataSelect={dataSelect} selectData={selectData} handlesetSelect={handlesetSelect} numberdatafrom={numberdatafrom} setNumberDataFrom={setNumberDataFrom} numberdatabefore={numberdatabefore} setNumberDataBefore={setNumberDataBefore} />
              </div>
            </aside>
            <div className="main_info">

              <div className="main_search">
                <form onSubmit={submitHandler}>
                  <TextInput
                    ref={inputRef}
                    data-elem='search-input'
                    placeholder="Введите название вакансии" icon={<IconSearch size="0.8rem" />}
                    size="md"
                    value={value}
                    onChange={(event) => setValues(event.currentTarget.value)}
                    radius="md"
                    border-color="#EAEBED"
                    rightSection={
                      <Button
                        data-elem='search-button'
                        right={22}
                        size="xs"
                        type="submit"
                      >Поиск</Button>}
                  />
                </form>
              </div>

              <div className="container" >
                <IndexData datas={datas} starClick={starClick} local={local} fixpaymentfrom={fixPaymentFrom} fixpayderk={fixDash} fixpaymentto={fixPaymentTo} />

              </div>
            </div>

          </div>
        </div>
      </article>

      <footer>
        <div className={styles.foot}>
          <Pagination
            value={currentPage}
            onChange={onPageChange}
            position="center"
            total={6} />
        </div>
      </footer>

    </>
  )
}

const cache = new NodeCache({ stdTTL: 6, checkperiod: 180 });

export const getServerSideProps = async (ctx) => {


  const url = {
    rail: 'https://startup-summer-proxy-production.up.railway.app',
    rend: 'https://startup-summer-2023-proxy.onrender.com',
    orig: 'https://api.superjob.ru',
  }


  const auth2 = {
    login: 'darkbarnied99@gmail.com',
    password: 'DFio3380',
    client_id: '2547',
    client_secret: 'v3.r.137589215.fcf4c49c52536b90f4627b136495a9ba55600c5d.83d03895eee6bdcc01e9104ccc143e6af6c9263c'
  }

  const optionsLogin = {
    method: 'Get',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Api-App-Id': 'v3.r.137589215.fcf4c49c52536b90f4627b136495a9ba55600c5d.83d03895eee6bdcc01e9104ccc143e6af6c9263c'

    }
  }


  const optionsAccess = {
    method: 'Get',
    mode: 'cors',
    credentials: "same-origin",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Api-App-Id': 'v3.r.137589215.fcf4c49c52536b90f4627b136495a9ba55600c5d.83d03895eee6bdcc01e9104ccc143e6af6c9263c',
      'Authorization': `Bearer `,

    }
  }

  const serchkeyword = ctx.query.keyword
  const datafilter = ctx.query.catalogues
  const dataFilterPaymentFrom = ctx.query.payment_from
  const dataFilterPaymentTo = ctx.query.payment_to

  // cache
  const cachekeyd = cache.get('cacheserchkeyword')
  const cachekeyd2 = cache.get('cacheserchkeyword1')
  if (cachekeyd) {
    return {
      props: {
        data: cachekeyd,
        dataselect: cachekeyd2,
      }
    }
  }



  let cookies = nookies.get(ctx)
  const access = cookies['cookaccess']
  const ttl = cookies['cookttl']



  if (ttl * 1000 > Date.now()) {

    optionsAccess.headers.Authorization = `Bearer ${access}`

  } else {

    let defresp2 = await axios.get(`${url.orig}/2.0/oauth2/password/?login=${auth2.login}&password=${auth2.password}&client_id=${auth2.client_id}&client_secret=${auth2.client_secret}`, optionsLogin)
    let defrespdata2 = defresp2.data
    nookies.set(ctx, 'cookaccess', `${defrespdata2.access_token}`, {
      path: '/',
    })
    nookies.set(ctx, 'cookttl', `${defrespdata2.ttl}`, {
      path: '/',
    })
  }

  if (optionsAccess.headers.Authorization.length > 20 && serchkeyword !== undefined) {

    const [responseax, responseax2] = await Promise.all([
      axios.get(`${url.orig}/2.0/vacancies/?count=100/&published=1&keyword=${serchkeyword}&catalogues=${datafilter}&payment_from=${dataFilterPaymentFrom}&payment_to=${dataFilterPaymentTo}&no_agreement=1`, optionsAccess),

      axios.get(`${url.orig}/2.0/catalogues/`, optionsAccess)
    ])
    cache.set('cacheserchkeyword', responseax.data)
    cache.set('cacheserchkeyword1', responseax2.data)



    return {
      props: {
        data: responseax.data,
        dataselect: responseax2.data,
      },

    }

  }
  else {
    const [responseax, responseax2] = await Promise.all([
      axios.get(`${url.orig}/2.0/vacancies/?count=100/&published=1/&catalogues=${datafilter}&payment_from=${dataFilterPaymentFrom}&payment_to=${dataFilterPaymentTo}&no_agreement=1`, optionsLogin),
      axios.get(`${url.orig}/2.0/catalogues/`, optionsLogin)
    ])
    cache.set('cacheserchkeyword', responseax.data)
    cache.set('cacheserchkeyword1', responseax2.data)
    return {
      props: {
        data: responseax.data,
        dataselect: responseax2.data,

      }

    }
  }
}

export default Home