import Head from "next/head"
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid'
import { useState } from "react";
import { useRouter } from "next/router";
import { Flex, Button, NumberInput, TextInput, Loader, MultiSelect, Pagination, Text, ActionIcon } from "@mantine/core";
import { IconChevronDown } from '@tabler/icons-react';
import styles from "../styles/Footer.module.css"
import { IconSearch } from "@tabler/icons-react";
import { IconMapPin } from "@tabler/icons-react";
import Image from "next/image";



const Home = ({ data, dataselect }) => {

  const [star, setStar] = useState(false)
  const [starId, setStarId] = useState('')

  const starClick = (event) => {
    event.preventDefault();
    setStar(!star)
    setStarId()
    console.log(event.currentTarget.value)
    // console.log(event.currentTarget)
    // const starid = event.currentTarget
    // console.log(starid)
    // if (star == "Star.svg") {
    //   setStar("Star 2.svg");
    // } else {
    //   setStar("Star.svg");

    // }
  }



  const fixpaymentto = (el) => {
    return el == 0 ? '' : `${el} `
  }

  const fixpaymentfrom = (el) => {
    return el == 0 ? '' : `${el}`
  }

  function getKeyByValue(obj, value) {
    for (let key in obj) {
      if (obj[key] === value) {
        return key;
      }
    }
  }

  const resetButton = () => {
    setNumberDataFrom(0)
    setNumberDataBefore(0)
    setSelect([])
  }



  // поиск отрасли





  const masselectTitle = dataselect.reduce((acc, el, i) => {
    return {
      ...acc,
      [el.key]: el.title.split(',')[0]
    }
  }, [])

  const selectedValues = Object.values(masselectTitle)




  const [value, setValue] = useState("");
  function handlesetSelect(value) {
    setSelect(value)
    const strvalue = value.toString()
    const getstrvalue = getKeyByValue(masselectTitle, strvalue)
    setSelectId(getstrvalue)
  }
  const [selectData, setSelect] = useState([]);
  const [selectDataId, setSelectId] = useState([]);

  // 



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
  const pageSize = 25;
  const pagesizemain = 4

  const onPageChange = (page) => {
    setCurrentPage(page);
  };



  const pagesCount = Math.ceil(items.length / pageSize);
  // if (pagesCount === 1) return null;

  const paginate = (items, currentPage, pagesizemain) => {
    const startIndex = (currentPage - 1) * pagesizemain;
    return items.slice(startIndex, startIndex + pagesizemain);
  };

  const datas = paginate(items, currentPage, pagesizemain)

  // const [value, setValue] = useState(' ');
  // 

  // поисковик 

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (value || selectData) {
      return router.push({
        query: `catalogues=${selectData}&keyword=${value}`
      })
    }
    // router.push({
    //   query: ' '

    // })
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
                    <Text>Фильтр</Text>
                    <Button
                      onClick={resetButton}
                      size={'sm'}
                      variant={"subtle"}
                      c="dimmed"
                      compact>
                      сбросить все x</Button>
                  </div>

                  <form onSubmit={submitFilter}
                  >
                    <div className="otrasl">
                      <MultiSelect
                        label="Отрасль"
                        placeholder="введите отрасль"
                        rightSection={<IconChevronDown size="1rem" />}
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
                      >
                        <NumberInput
                          label="Оклад"
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
                      <Button fullWidth variant="filled"
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

                    placeholder="Введите название вакансии" icon={<IconSearch size="0.8rem" />}
                    size="md"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    radius="md"
                    rightSection={
                      <Button
                        right={22}
                        size="xs"
                        type="submit"
                      >Поиск</Button>}
                  />
                </form>
              </div>

              <div className="container" >
                {datas.map((el) => (

                  <Link className="main_info_item" key={uuidv4()} href={`/${el.id}`}  >
                    <div className="main_info_item1"  >
                      <Text fz="lg" c="#5E96FC" key={uuidv4()}>{el.profession}</Text>
                      <Button radius="md" variant="subtle" value={el.id} onClick={(e) => starClick(e)} >
                        {star ? <Image src="Star 2.svg" width={20} height={20} alt='star' /> : <Image src="Star.svg" width={20} height={20} alt='star2' />}


                      </Button>


                    </div>

                    <div className="content">
                      <Text fw={600} key={uuidv4()} c="#232134" >з/п {fixpaymentfrom(el.payment_from)}</Text>
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
                )}
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
            total={25} />
        </div>
      </footer>


    </>
  )
}






export async function getServerSideProps(ctx) {

  const serchkeyword = ctx.query.keyword
  const datafilter = ctx.query.catalogues
  const dataFilterPaymentFrom = ctx.query.payment_from
  const dataFilterPaymentTo = ctx.query.payment_to

  console.log(dataFilterPaymentFrom)
  console.log(dataFilterPaymentTo)

  const del = await fetch('https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948', {
    method: 'Get',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
      'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'

    },
  })
  const key = await del.json()
  console.log(key)

  if (serchkeyword !== undefined ?? datafilter) {

    const response = await fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?count=100/&published=1&keyword=${serchkeyword}&catalogues=${datafilter}&payment_from=${dataFilterPaymentFrom}&payment_to=${dataFilterPaymentTo}&no_agreement=1`, {
      method: 'Get',
      mode: 'cors',
      credentials: "include",

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'Authorization': `Bearer ${key.access_token}`,
        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
      }
    })
    const data = await response.json();

    const response2 = await fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/`, {
      method: 'Get',
      mode: 'cors',
      credentials: "include",

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'Authorization': `Bearer ${key.access_token}`,
        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
      }
    })
    const dataselect = await response2.json()
    return {
      props: {
        data,
        dataselect,
      },

    }
  } else {
    const response = await fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?count=100/`, {
      method: 'Get',
      mode: 'cors',
      credentials: "include",

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'Authorization': `Bearer ${key.access_token}`,
        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
      }
    })
    const data = await response.json();

    const response2 = await fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/`, {
      method: 'Get',
      mode: 'cors',
      credentials: "include",

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'Authorization': `Bearer ${key.access_token}`,
        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
      }
    })
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