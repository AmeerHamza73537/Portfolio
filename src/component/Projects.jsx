import React, { useLayoutEffect, useRef } from "react";
import { projectData } from "../project/ProjectData.jsx";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Projects = () => {
  const navigate = useNavigate();
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 80,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="projects"
      className="relative section-pad section-divider text-[#f5f0e8] overflow-hidden"
    >
      <div className="site-container relative z-10">
        <p className="font-mono-label mb-10 md:mb-12">— 03. PROJECTS</p>

        <div className="projects-flex">
          {projectData.map((project) => (
            <article
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(project.path)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(project.path);
                }
              }}
              className="project-card"
            >
              <h3
                className="mb-3 sm:mb-4 project-card-title-link"
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(project.path);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(project.path);
                  }
                }}
              >
                {project.name}
              </h3>

              <p className="project-card-desc">{project.description}</p>

              <div className="project-card-actions relative z-[1]">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-ghost-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub
                </a>

                <a
                  href={project.liveDemo || project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="project-ghost-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Demo
                </a>

                <button
                  type="button"
                  className="project-ghost-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(project.path);
                  }}
                >
                  Case Study →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
