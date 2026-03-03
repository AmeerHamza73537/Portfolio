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

// individual project detail pages
import JobNest from "./project/JobNest.jsx";
import HomeScape from "./project/HomeScape.jsx";
import Authify from "./project/Authify.jsx";
import SwiftManage from "./project/SwiftManage.jsx";
import CourseHub from "./project/CourseHub.jsx";

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
          <Route path="/projects/job-nest" element={<JobNest />} />
          <Route path="/projects/home-scape" element={<HomeScape />} />
          <Route path="/projects/authify" element={<Authify />} />
          <Route path="/projects/swiftmanage" element={<SwiftManage />} />
          <Route path="/projects/course-hub" element={<CourseHub />} />
        </Routes>

        <Cursor />
      </div>
    </Router>
  );
}

export default App;
