import Header from "./Header";
// import Footer from "./Footer";

const Layout = ({ children, ...pageProps }) => (
    <div className="root">
        <Header />
        <main>
            {children}
        </main>
    </div>
);

export default Layout;
