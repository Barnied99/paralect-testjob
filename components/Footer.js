// import Heading from "./Heading";
// import { Pagination } from "@mantine/core";
// import styles from "../styles/Footer.module.css"
// import { useState } from "react";

// const Footer = ({ data,}) => {

    // const items = data.objects
    // const itemsl = data.objects.length

    // const [currentPage, setCurrentPage] = useState(1);
    // const pageSize = 25;
    // const pagesizemain = 4

    // const onPageChange = (page) => {
    //     setCurrentPage(page);
    // };



    // const pagesCount = Math.ceil(items.length / pageSize);
    // if (pagesCount === 1) return null;
    // const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

    // const paginate = (items, currentPage, pagesizemain) => {
    //     const startIndex = (currentPage - 1) * pagesizemain;
    //     return items.slice(startIndex, startIndex + pagesizemain);
    // };

    // const datas = paginate(items, currentPage, pagesizemain)
    // console.log(datas)

    // const chunki = (numb, sz) => {
    //     const count = Math.ceil(numb.length / sz)
    //     const count1 = Array.from(new Array(count).keys()).reduce(
    //         (acc, el) => {
    //             const start = el * sz
    //             acc.push(numb.slice(start, sz + start));
    //             return acc
    //         }, []
    //     )
    //     return count1
    // }

    // const ch = chunki(items, 4)



//     return (
//         <>
//             <footer>
//                 <div className={styles.foot}>
//                     <Pagination
//                         value={1}
//                         // onChange={updatePages}
//                         position="center"
//                         total={25} />
//                 </div>
//             </footer>
//         </>

//     )
// };

// export default Footer;
