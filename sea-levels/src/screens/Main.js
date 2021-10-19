import About from "./About/About";
import LandingPage from "./LandingPage/LandingPage";
import Safe from "./Safe";
import React from 'react'
import Footer from "../components/Footer";

export default function Main() {
    return (
        <div>
            <LandingPage />
            <About />
            <Safe />
            <Footer />
        </div>
    )
}
