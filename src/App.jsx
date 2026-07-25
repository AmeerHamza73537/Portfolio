import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LenisProvider } from "./context/LenisProvider.jsx";
import { useLenisContext } from "./context/useLenisContext.js";

import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import About from "./component/About.jsx";
import Skills from "./component/Skills.jsx";
import Experience from "./component/Experience.jsx";
import Contact from "./component/Contact.jsx";
import Footer from "./component/Footer.jsx";
import Cursor from "./assets/Cursor.jsx";
import Projects from "./component/Projects.jsx";
import SectionMarquee from "./component/SectionMarquee.jsx";
import ProjectDetail from "./project/ProjectDetail.jsx";

const experiences = [
  {
    id: "developers-hub-2026",
    role: "Full Stack Developer",
    company: "Developer's Hub Corporation",
    duration: "Jun 2026 – Jul 2026",
    bullets: [
      "Delivered a responsive operations portal with React, Tailwind CSS, and Node.js, cutting average page-load time by 28%.",
      "Automated REST API validation with Express.js and MongoDB, reducing regression defects by 35%.",
      "Collaborated on role-based admin workflows with JWT and React Hook Form, shortening routine content updates from minutes to seconds.",
    ],
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
    ],
  },
  {
    id: "developers-hub-2025",
    role: "Full Stack Developer",
    company: "Developer's Hub Corporation",
    duration: "2 months",
    bullets: [
      "Shipped reusable dashboard modules with React and Tailwind CSS, reducing duplicate interface code by 30%.",
      "Refactored Express.js services and MongoDB queries, improving median API response time by 22%.",
      "Maintained collaborative Git workflows and debugged release issues, sustaining reliable weekly deployments.",
    ],
    technologies: [
      "React",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
      "Git",
    ],
  },
];

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
      <Experience experiences={experiences} />
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
