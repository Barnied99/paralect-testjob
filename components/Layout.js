import Header from "./Header";
import { useMediaQuery } from "@mantine/hooks";
import { Text } from "@mantine/core";

const Layout = ({ children, ...pageProps }) => {

    const respo = useMediaQuery('(max-width:500px)')



    return (
        <>
            {respo ? (
                <div className="root_mob">
                    <Header />

                    <main>
                        {children}
                    </main>

                </div>
            ) :
                (
                    <div className="root">
                        <Header />

                        <main>
                            {children}
                        </main>

                    </div>
                )
            }
        </>


    )
};

export default Layout;