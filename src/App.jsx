import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LenisProvider } from "./context/LenisProvider.jsx";
import { useLenisContext } from "./context/useLenisContext.js";

import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import About from "./component/About.jsx";
import Skills from "./component/Skills.jsx";
import Contact from "./component/Contact.jsx";
import Footer from "./component/Footer.jsx";
import Cursor from "./assets/Cursor.jsx";
import Projects from "./component/Projects.jsx";
import SectionMarquee from "./component/SectionMarquee.jsx";
import ProjectDetail from "./project/ProjectDetail.jsx";

function HomePage() {
  const location = useLocation();
  const { scrollToId } = useLenisContext();

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (targetId) {
      const t = setTimeout(() => scrollToId(targetId), 80);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [location.state, scrollToId]);

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
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
            </Routes>
            <Cursor />
          </div>
        </div>
      </LenisProvider>
    </Router>
  );
}

export default App;
