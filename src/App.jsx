import React from 'react'
import './App.css'
import Navbar from './component/Navbar.jsx'
import Home from './component/Home.jsx'
// import './assets/FallingDrops.js'
import ParticlesBackground from './assets/FallingDrops.jsx'
import About from './component/About.jsx'
import Skills from './component/Skills.jsx'
import Contact from './component/Contact.jsx'
import Footer from './component/Footer.jsx'
import Cursor from './assets/Cursor.jsx'
import Projects from './component/Projects.jsx'
function App() {
  


  return (
    
    <div className='relative cursor-none'>  
      <ParticlesBackground/>
      <Navbar/>
      <Home/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
      <Footer/>
      <Cursor/>
    </div>
  )
}

export default App
