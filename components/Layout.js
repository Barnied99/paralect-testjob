import Header from "./Header";

const Layout = ({ children, ...pageProps }) => {
    return (
        <>
            <div className="root">
                <Header />

                <main>
                    {children}
                </main>

            </div>
        </>


    )
};

export default Layout;