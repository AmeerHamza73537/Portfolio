import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import ParticlesBackground from "./assets/FallingDrops.jsx";
import About from "./component/About.jsx";
import Skills from "./component/Skills.jsx";
import Contact from "./component/Contact.jsx";
import Footer from "./component/Footer.jsx";
import Cursor from "./assets/Cursor.jsx";
import Projects from "./component/Projects.jsx";

import MernAuth from "./projects/mern-auth.jsx";
import MernCrud from "./projects/mern-crud.jsx";

function App() {
  return (
    <Router>
      <div className="relative cursor-none hover:cursor-none">
        <ParticlesBackground />
        <Navbar />

        {/* Define Routes here */}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* Project Detail Pages */}
          <Route path="/mern-auth" element={<MernAuth />} />
          <Route path="/mern-crud" element={<MernCrud />} />
        </Routes>

        <Cursor />
      </div>
    </Router>
  );
}

export default App;
