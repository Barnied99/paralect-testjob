import Head from "next/head"
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid'
import { useState } from "react";
import { useRouter } from "next/router";
import { Flex, Button, NumberInput, TextInput, Loader, MultiSelect, Pagination, Text } from "@mantine/core";
import { IconChevronDown } from '@tabler/icons-react';
import styles from "../styles/Footer.module.css"



const Home = ({ data, dataselect }) => {


  const resetButton = () => {
    setNumberDataFrom(0)
    setNumberDataBefore(0)
    setSelect([])
  }

  // поиск отрасли


  // const masselectkey = dataselect.reduce((acc, el, i) => {
  //   return {
  //     ...acc,
  //     [i]: el.key
  //   }
  // })


  const masselectTitle = dataselect.reduce((acc, el, i) => {
    return {
      ...acc,
      [el.key]: el.title.split(',')[0]
    }
  }, [])

  const selectedValues = Object.values(masselectTitle)
  const selectedKey = Object.keys(masselectTitle)
  // console.log(selectedKey)
  // console.log(selectedValues)
  const [value, setValue] = useState(' ');

  const [selectData, setSelect] = useState([]);
  // console.log(selectData)
  // 



  // оклад

  const [numberdatafrom, setNumberDataFrom] = useState('');
  const [numberdatabefore, setNumberDataBefore] = useState('');



  const submitFilter = (e) => {
    e.preventDefault()
    if (selectData || value) {
      router.push({
        query: `keyword=${value}&catalogues=${selectData}`
      })
    }

  }


  // 




  // пагинация
  const items = data.objects

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;
  const pagesizemain = 4

  const onPageChange = (page) => {
    setCurrentPage(page);
  };



  const pagesCount = Math.ceil(items.length / pageSize);
  if (pagesCount === 1) return null;

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
      router.push({
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
                    {/* <span>Сбросить все x</span> */}
                  </div>

                  <form onSubmit={submitFilter}
                  >
                    <div className="otrasl">
                      <MultiSelect
                        label="Отрасль"
                        placeholder="введите отрасль"
                        rightSection={<IconChevronDown size="1rem" />}
                        rightSectionWidth={40}
                        data={selectedValues}
                        value={selectData}
                        onChange={setSelect}
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
                          precision={1}
                          min={-1}
                          step={1000}
                          max={100000000}
                          placeholder="От"
                          value={numberdatafrom}
                          onChange={setNumberDataFrom}
                        />
                        <NumberInput
                          precision={1}
                          min={-1}
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
                    size="md"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    radius="md"
                    placeholder="Введите название вакансии"
                    rightSection={
                      <Button
                        right={22}
                        size="xs"
                        type="submit"
                      >Поиск</Button>}
                  />
                </form>
              </div>

              <div className="container">
                {datas.map((el) => (
                  <Link key={uuidv4()} href={`/${el.id}`} >
                    <div className="main_info_item" key={uuidv4()} >
                      <div key={uuidv4()} className="text">{el.profession}</div>
                      <div key={uuidv4()} className="text">{el.firm_name}</div>
                      <div key={uuidv4()} className="text">{el.town.title}</div>
                      <div key={uuidv4()} className="text">{el.type_of_work.title}</div>
                      <div key={uuidv4()} className="text">{el.payment_to}</div>
                      <div key={uuidv4()} className="text">{el.payment_from}</div>
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
  console.log(serchkeyword)
  console.log(datafilter)

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


  if (serchkeyword !== undefined) {

    const response = await fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?count=100/&published=1&keyword=${serchkeyword}&catalogues=${datafilter}/`, {
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