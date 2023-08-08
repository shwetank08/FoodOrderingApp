import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";


import Header from "./components/Header";
import { Outlet } from "react-router-dom";


const App = () => {
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
}



export default App;
