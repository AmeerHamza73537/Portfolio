import React, { useEffect } from "react";
import { projectData } from "./ProjectData.jsx";

const CourseHub = () => {
  const project = projectData.find((p) => p.id === "course-hub");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="text-center text-[#f5f0e8] mt-24 pt-24 font-['DM_Sans',sans-serif]">
        Project not found
      </div>
    );
  }

  return (
    <section className="min-h-screen px-6 py-24 text-[#f5f0e8] relative z-10 pt-28">
      <div className="max-w-5xl mx-auto">
        <div className="project-detail-card">
          <h1 className="project-detail-title">{project.name}</h1>

          <div className="flex justify-center gap-6 flex-wrap mb-10">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-detail-primary inline-block"
            >
              📂 View Code
            </a>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="project-detail-ghost inline-block"
              >
                🌐 Live Demo
              </a>
            )}
          </div>

          <p className="text-[#7a7a7a] text-lg leading-relaxed text-center mb-12 max-w-3xl mx-auto font-['DM_Sans',sans-serif]">
            {project.detailDescription}
          </p>

          {project.technologies?.length > 0 && (
            <>
              <h2 className="text-3xl font-semibold text-center mb-6 font-['DM_Sans',sans-serif] text-[#f5f0e8]">
                ⚡ Technologies Used
              </h2>

              <div className="flex flex-wrap justify-center gap-4 mb-14">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </>
          )}

          {project.screenshots?.length > 0 && (
            <>
              <h2 className="text-3xl font-semibold text-center mb-8 font-['DM_Sans',sans-serif] text-[#f5f0e8]">
                📸 Project Preview
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {project.screenshots.map((src, index) => (
                  <div key={index} className="project-shot">
                    <img src={src} alt={`${project.name} screenshot ${index + 1}`} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseHub;
