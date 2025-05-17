import React from 'react'
import About from '../components/About'
import Portfolio from '../components/Portfolio'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import Visuals from '../components/Visuals'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import axios from 'axios'
import Check from '../components/Check'
const page = () => {

  return (
    <div>
    <Hero/>
      <Visuals/>
        <About/>
        <Portfolio/>
        <Gallery/>
         <Contact/>
    </div>
  )
}

export default page