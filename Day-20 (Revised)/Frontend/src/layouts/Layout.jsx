import React from "react";
import { Outlet } from "react-router";
import Footer from "../features/shared/components/Footer";
// import Footer from "../../components/Footer/Footer";

const MainLayout = () => {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;