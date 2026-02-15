import React from "react";
import { projectData } from "../project/ProjectData.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Projects = () => {
  const navigate = useNavigate();

  return (
    <section
      id="projects"
      className="relative min-h-screen
      px-4 sm:px-6 md:px-12 lg:px-16
      py-20 sm:py-24 md:py-28
      text-white overflow-hidden"
    >
      {/* Background Huge Text */}
      <h1
        className="absolute
        top-[-20px] sm:top-[-40px] md:top-[-50px]
        left-1/2 -translate-x-1/2
        text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px]
        font-extrabold text-white/5
        select-none pointer-events-none tracking-widest
        bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600
        opacity-20 sm:opacity-25 md:opacity-30"
      >
        PROJECTS
      </h1>

      {/* Grid Layout */}
      <div
        className="relative z-10
        grid grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6 sm:gap-8 md:gap-10
        max-w-7xl mx-auto"
      >
        {projectData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            style={{ transformPerspective: 1000 }}
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              const centerX = rect.width / 2;
              const centerY = rect.height / 2;

              const rotateX = ((y - centerY) / centerY) * 10;
              const rotateY = ((x - centerX) / centerX) * 10;

              card.style.transform = `
                perspective(1000px)
                rotateX(${-rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.05)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
            }}
            onClick={() => navigate(project.path)}
            className="group relative
            bg-[#111]/30
            rounded-2xl sm:rounded-3xl
            p-6 sm:p-8
            border border-white/10
            backdrop-blur-xl
            hover:border-purple-500/40
            transition-all duration-300
            cursor-pointer"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 group-hover:text-purple-400 transition">
                {project.name}
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="flex justify-between items-center gap-4 flex-wrap">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition"
                >
                  GitHub
                </a>

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
