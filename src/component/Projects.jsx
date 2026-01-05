import React from "react";
import { projectData } from "../project/ProjectData.jsx";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const Projects = () => {
  const navigate = useNavigate();

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
    >
      {/* Heading */}
      <h1 className="text-center mb-16 text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 tracking-wide">
        PROJECTS
      </h1>

      {/* Projects Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {projectData.map((project) => {
          const x = useMotionValue(0);
          const y = useMotionValue(0);

          // Smooth spring for rotation
          const springConfig = { stiffness: 200, damping: 20 };
          const rotateX = useTransform(y, [0, 200], [10, -10]);
          const rotateYSpring = useSpring(useTransform(x, [0, 300], [-10, 10]), springConfig);
          const rotateXSpring = useSpring(rotateX, springConfig);

          return (
            <motion.div
              key={project.id}
              style={{ rotateX: rotateXSpring, rotateY: rotateYSpring }}
              className="w-[300px] md:w-[360px] lg:w-[400px] bg-[#111] border border-[#2a2a2a] rounded-2xl p-6 cursor-pointer shadow-xl transition-transform duration-300 perspective-1000"
              onClick={() => navigate(project.path)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const offsetY = e.clientY - rect.top;
                x.set(offsetX);
                y.set(offsetY);
              }}
              // onMouseLeave={() => {
              //   // Smoothly animate back to center
              //   x.set(150);
              //   y.set(100);
              // }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Project Name */}
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                {project.name}
              </h2>

              {/* Project Description */}
              <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                {project.description}
              </p>

              {/* Links */}
              <div className="flex justify-between items-center mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs px-3 py-1.5 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition"
                >
                  GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs px-3 py-1.5 rounded-full border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition"
                >
                  Live Demo
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;



