import React from 'react'
import './App.css'
import Navbar from './component/Navbar.jsx'
import Home from './component/Home.jsx'
// import './assets/FallingDrops.js'
import ParticlesBackground from './assets/FallingDrops.jsx'
import About from './component/About.jsx'
import Skills from './component/Skills.jsx'
function App() {
  


  return (
    
    <>  
      <ParticlesBackground/>
      <Navbar/>
      <Home/>
      <About/>
      <Skills/>
    </>
  )
}

export default App
