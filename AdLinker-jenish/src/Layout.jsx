import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar/Navbar";
import Footer from "../component/footer/Footer";

// import ParticlesBackground from "./components/ParticlesBackground";
// import Background from "./components/background";


function Layout(){
    return( 
        <>
         
        <Navbar/>
        
        <div 
  className="bg-cover bg-center bg-fixed px-6"
  style={{ backgroundImage: "url('/im3.jpg')" }}
>
    <Outlet/>

        </div>
        <Footer/>
        
        </>
    )
}

export default Layout