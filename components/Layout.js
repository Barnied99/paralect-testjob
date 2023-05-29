import Header from "./Header";
import { useState, useEffect } from "react";
import { Loader } from "@mantine/core";

const Layout = ({ children, ...pageProps }) => {



    return (
        <div className="root">
            <Header />

            <main>
                {children}
            </main>

        </div>

    )
};

export default Layout;
