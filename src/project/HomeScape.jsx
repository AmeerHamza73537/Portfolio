import React from "react";
import { projectData } from "./ProjectData.jsx";
import { motion } from "framer-motion";
import { useEffect } from "react";

const HomeScape = () => {
  const project = projectData.find((p) => p.id === "home-scape");

  if (!project) {
    return <div className="text-center text-white mt-20">Project not found</div>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen px-6 py-24 text-white relative z-10">
      
      <div className="max-w-5xl mx-auto">

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
        >
          
          {/* Title */}
          <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent mb-6">
            {project.name}
          </h1>

          {/* Buttons */}
          <div className="flex justify-center gap-6 flex-wrap mb-10">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 
              hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 
              transition duration-300"
            >
              🚀 View Code
            </a>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl border border-indigo-400 
                hover:bg-indigo-500/10 hover:scale-105 
                transition duration-300"
              >
                🌐 Live Demo
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed text-center mb-12 max-w-3xl mx-auto">
            {project.detailDescription}
          </p>

          {/* Technologies */}
          {project.technologies?.length > 0 && (
            <>
              <h2 className="text-3xl font-semibold text-center mb-6">
                ⚡ Technologies Used
              </h2>

              <div className="flex flex-wrap justify-center gap-4 mb-14">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-5 py-2 rounded-full bg-white/10 border border-white/20 
                    hover:bg-purple-600/20 hover:border-purple-400 
                    transition duration-300 text-sm tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Screenshots */}
          {project.screenshots?.length > 0 && (
            <>
              <h2 className="text-3xl font-semibold text-center mb-8">
                📸 Project Preview
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {project.screenshots.map((src, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-white/10 
                    hover:shadow-2xl hover:shadow-purple-500/30 
                    transition duration-500"
                  >
                    <img
                      src={src}
                      alt={`${project.name} screenshot ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default HomeScape;