import React from "react";

const Projects = () => {
  const projects = [
    { name: "Project 1" },
    { name: "Project 2" },
    { name: "Project 3" },
    { name: "Project 4" },
    { name: "Project 5" },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      {/* Heading */}
      <h1 className="text-center mb-16 text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 tracking-wide">
        PROJECTS
      </h1>

      {/* Projects List */}
      <div className="space-y-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border-b border-[#6D6A6A] pb-4"
          >
            <a
              href="#"
              className="block text-3xl md:text-4xl lg:text-5xl text-white hover:text-[#6D6A6A] transition-colors duration-300"
            >
              {project.name}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
