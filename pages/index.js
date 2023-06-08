import Head from "next/head"
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Button, NumberInput, TextInput, MultiSelect, Pagination, Text, ScrollArea } from "@mantine/core";
import { IconChevronDown } from '@tabler/icons-react';
import styles from "../styles/Footer.module.css"
import { IconSearch } from "@tabler/icons-react";
import { IconMapPin } from "@tabler/icons-react";
import FavButtonadd from "@/components/favbuttonadd";
import FavButtondel from "@/components/favbuttondel";
import EmptystateMain from "@/components/emptystatemain";
import nookies from 'nookies'


const Home = ({ data, dataselect }) => {


  // избранное
  const [star, setStar] = useState([]);
  const [local, setLocal] = useState(typeof window !== 'undefined' && localStorage.getItem('data') ?
    JSON.parse(localStorage.getItem('data')) : []);



  useEffect(() => {
    typeof window !== 'undefined' ? window.localStorage.setItem('data', JSON.stringify(local)) : []

  }, [local]);



  const starClick = (event, el) => {
    event.preventDefault();

    if (star.includes(el)) {
      setStar(star.filter((elem) => elem !== el));
      setLocal(local.filter((elem) => elem !== el));

    } else {
      setStar([...star, el]);
      setLocal([...local, el]);
    }
  };


  const fixpaymentto = (el) => {

    return el == 0 ? '' : `до ${el} `
  };

  const fixpaymentfrom = (el) => {
    return el == 0 ? '' : `от ${el}`
  };

  const fixpayderk = (a, b) => {
    if (a && b) {
      return '-'
    }
  }


  //catalogues=number 
  function getKeyByValue(obj, value) {
    for (let key in obj) {
      if (obj[key] === value) {
        return key;
      }
    }
  };

  // reset
  const resetButton = () => {
    setNumberDataFrom(0)
    setNumberDataBefore(0)
    setSelect([])
    setSelectId([])
  };


  // поиск отрасли

  const masselectTitle = dataselect.reduce((acc, el, i) => {
    return {
      ...acc,
      [el.key]: el.title.split(',')[0]
    }
  }, []);



  const [value, setValue] = useState([]);
  function handlesetSelect(val) {
    setSelect(val)
    const strvalue = val.toString()

    const getstrvalue = val.map((el) => getKeyByValue(masselectTitle, el))
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
        query: `keyword=${value}&catalogues=${selectDataId}&payment_from=${numberdatafrom}&payment_to=${numberdatabefore}`
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
        query: `catalogues=${selectDataId}&keyword=${value}`
      })
    }

  }
  // 



  return (
    <>
      <Head>
        <title>Поиск вакансий</title>
      </Head>

      <article>
        <div className="article_main">
          <div className="flex_main">
            <aside>
              <div className="baraside">
                <div className="filter">
                  <div className="fil">
                    <Text fw={600} size={20} style={{ minWidth: '93px' }}>Фильтр</Text>
                    <Button
                      onClick={resetButton}
                      size={'sm'}
                      variant="subtle"
                      c="#ACADB9"
                      compact><Text fw={450}>Сбросить все x</Text>
                    </Button>
                  </div>

                  <form onSubmit={submitFilter}
                  >
                    <div className="otrasl">
                      <Text fw={600} size={16} style={{ maxWidth: '70px' }}>Отрасль</Text>
                      <MultiSelect
                        data-elem='industry-select'
                        placeholder="введите отрасль"
                        styles={{ rightSection: { pointerEvents: 'none' } }}

                        rightSection={<IconChevronDown
                          size="1rem" />}
                        rightSectionWidth={40}
                        data={Object.values(masselectTitle)}
                        value={selectData}
                        onChange={(value) => handlesetSelect(value)}
                        maxDropdownHeight={150}
                      />
                    </div>

                    <div className="oklad">

                      <Flex
                        gap="sm"
                        direction="column"
                      ><Text fw={600} size={16} style={{ maxWidth: '52px' }}>Оклад</Text>
                        <NumberInput
                          data-elem='salary-from-input'
                          precision={0}
                          min={0}

                          step={1000}
                          max={100000000}
                          placeholder="От"
                          value={numberdatafrom}
                          onChange={setNumberDataFrom}
                        />
                        <NumberInput
                          precision={0}
                          data-elem='salary-to-input'
                          min={0}

                          step={1000}
                          max={100000000}
                          placeholder="До"
                          value={numberdatabefore}
                          onChange={setNumberDataBefore}
                        />
                      </Flex>

                    </div>

                    <div className="button">
                      <Button data-elem='search-button' fullWidth variant="filled"
                        type="submit"
                      >Применить</Button>
                    </div>
                  </form>
                </div>
              </div>

            </aside>
            <div className="main_info">

              <div className="main_search">
                <form onSubmit={submitHandler}
                >
                  <TextInput
                    data-elem='search-input'
                    placeholder="Введите название вакансии" icon={<IconSearch size="0.8rem" />}
                    size="md"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    radius="md"
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
                <ScrollArea h={580} type="never"  >
                  <Flex gap="md"
                    direction="column"

                  >
                    {
                      datas.length !== 0 ? datas.map((el) => (
                        <Link className="main_info_item" key={uuidv4()} href={`/${el.id}`} data-elem={`vacancy-${el.id}`}  >
                          <div className="main_info_item1"  >
                            <Text fz="lg" c="#5E96FC" key={uuidv4()}>{el.profession}</Text>


                            <Button radius="md" variant="subtle" value={el.id} onClick={(e) => starClick(e, el)} >
                              {star.includes(el) ? <FavButtondel el={el.id} /> : <FavButtonadd el={el.id} />
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


// getStaticProps
// getServerSideProps 
export const getServerSideProps = async (ctx) => {


  const serchkeyword = ctx.query.keyword
  const datafilter = ctx.query.catalogues
  const dataFilterPaymentFrom = ctx.query.payment_from
  const dataFilterPaymentTo = ctx.query.payment_to

  // const serchkeyword = ctx.keyword
  // const datafilter = ctx.catalogues
  // const dataFilterPaymentFrom = ctx.payment_from
  // const dataFilterPaymentTo = ctx.payment_to

  const url = {
    rail: 'https://startup-summer-proxy-production.up.railway.app',
    rend: 'https://startup-summer-2023-proxy.onrender.com',
    orig: 'https://api.superjob.ru',
  }


  const auth = {
    login: 'sergei.stralenia@gmail.com',
    password: 'paralect123',
    client_id: '2356',
    client_secret: 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
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
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Api-App-Id': 'v3.r.137589215.fcf4c49c52536b90f4627b136495a9ba55600c5d.83d03895eee6bdcc01e9104ccc143e6af6c9263c',
      'Authorization': `Bearer `,

    }
  }

  let cookies = nookies.get(ctx)
  const access = cookies['cookaccess']
  const ttl = cookies['cookttl']


  if (ttl * 1000 > Date.now()) {

    optionsAccess.headers.Authorization = `Bearer ${access}`

  } else {

    let defresp = await fetch(`${url.orig}/2.0/oauth2/password/?login=${auth2.login}&password=${auth2.password}&client_id=${auth2.client_id}&client_secret=${auth2.client_secret}`, optionsLogin)
    let defrespdata = await defresp.json()
    nookies.set(ctx, 'cookaccess', `${defrespdata.access_token}`, {
      path: '/',
    })
    nookies.set(ctx, 'cookttl', `${defrespdata.ttl}`, {
      path: '/',
    })

  }




  if (optionsAccess.headers.Authorization.length > 20 && serchkeyword !== undefined) {


    const response = await fetch(`${url.orig}/2.0/vacancies/?count=100/&published=1&keyword=${serchkeyword}&catalogues=${datafilter}&payment_from=${dataFilterPaymentFrom}&payment_to=${dataFilterPaymentTo}&no_agreement=1`, optionsAccess)
    const data = await response.json();
    const response2 = await fetch(`${url.orig}/2.0/catalogues/`, optionsAccess)
    const dataselect = await response2.json()
    return {
      props: {
        data,
        dataselect,
      },

    }

  } else {
    const response = await fetch(`${url.orig}/2.0/vacancies/?count=100/`, optionsLogin)
    const data = await response.json();
    const response2 = await fetch(`${url.orig}/2.0/catalogues/`, optionsLogin)
    const dataselect = await response2.json()
    return {
      props: {
        data,
        dataselect,

      }

    }



  }





}

export default Home 