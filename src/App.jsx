import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LenisProvider } from "./context/LenisProvider.jsx";

import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import About from "./component/About.jsx";
import Skills from "./component/Skills.jsx";
import Contact from "./component/Contact.jsx";
import Footer from "./component/Footer.jsx";
import Cursor from "./assets/Cursor.jsx";
import Projects from "./component/Projects.jsx";
import SectionMarquee from "./component/SectionMarquee.jsx";

import JobNest from "./project/JobNest.jsx";
import HomeScape from "./project/HomeScape.jsx";
import Authify from "./project/Authify.jsx";
import SwiftManage from "./project/SwiftManage.jsx";
import CourseHub from "./project/CourseHub.jsx";

function HomePage() {
  return (
    <>
      <Home />
      <About />
      <SectionMarquee />
      <Skills />
      <SectionMarquee />
      <Projects />
      <SectionMarquee />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <LenisProvider>
        <div className="relative cursor-none hover:cursor-none min-h-screen bg-[#0c0c0c]">
          <div className="grain-layer" aria-hidden="true" />
          <div className="app-content">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/job-nest" element={<JobNest />} />
              <Route path="/projects/home-scape" element={<HomeScape />} />
              <Route path="/projects/authify" element={<Authify />} />
              <Route path="/projects/swiftmanage" element={<SwiftManage />} />
              <Route path="/projects/course-hub" element={<CourseHub />} />
            </Routes>
            <Cursor />
          </div>
        </div>
      </LenisProvider>
    </Router>
  );
}

export default App;
